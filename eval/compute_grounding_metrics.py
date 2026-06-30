#!/usr/bin/env python3
"""Compute Reference-DINO and CLIP-text metrics from per-video grounding logs.

Reads the merged ``{base}_grounding_log.json`` files produced by
``run_grounding_sam_masking.py`` and computes, for each video:

  * **Reference DINO score** — for every entity that has a ``ref_image_path``
    (after truncation), compute DINO image-image cosine similarity between the
    bbox crop and the GT reference image, take the max across all Grounding-DINO
    candidate boxes within each disjoint interval, then mean across the
    entity's disjoint intervals. Per-video score is the mean across the
    truncated entities that have a ref image. Empty-detection intervals
    contribute 0.
  * **CLIP-text score** — same scheme but with cosine similarity between the
    bbox crop's CLIP image embedding and the entity's text embedding.
    Computed for every truncated entity that is not ``{camera}``,
    ``{shot_transition}``, or scene-prefixed.
  * **Masked CLIP-text score / Masked DINO score** — same as the unmasked
    scores but with the per-keyframe SAM mask image (saved by ``--save_sam_masks``
    in ``run_grounding_sam_masking.py``) applied to the candidate frame before
    cropping. Computed whenever any keyframe mask image was saved for the
    entity (independent of whether the SAM2-propagated mask *video* is
    present). Masked DINO uses the ref-image-mask-masked GT.
  * **Masked-video CLIP-text / Masked-video DINO** — same scheme but using the
    SAM2-propagated mask *video* (one mask frame per video frame) at each
    candidate's frame index. Computed only when the per-entity mask video
    exists. Equivalent to the keyframe-masked metric at percentile frames in
    the common case; differs when SAM2 propagation degraded or when keyframe
    images were not saved.

All averaging is *count-stable*: the denominators (number of disjoint
intervals per entity, number of entities per video) come from the truncated
source JSON and do **not** depend on Grounding DINO yielding 0/1/many boxes
per interval or on SAM mask quality.

Usage:
    python scripts/ultra_dense/compute_grounding_metrics.py \\
        --logs-dir /path/to/intermediate_dir \\
        --output /path/to/metrics.json
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import warnings
from typing import Any

os.environ["TORCH_CUDNN_SDPA_ENABLED"] = "0"
# Silence HF model-loading progress bars / advisory warnings before any
# transformers import. dist_utils.quiet_hf() also disables them post-import.
os.environ.setdefault("HF_HUB_DISABLE_PROGRESS_BARS", "1")
os.environ.setdefault("HF_HUB_DISABLE_TELEMETRY", "1")
os.environ.setdefault("TRANSFORMERS_VERBOSITY", "error")
os.environ.setdefault("TRANSFORMERS_NO_ADVISORY_WARNINGS", "1")
# Force offline mode — all models live on /fsx; online HEAD requests race
# across ranks and cause spurious "does not appear to have a file" errors.
warnings.filterwarnings("ignore", category=UserWarning)

import cv2
import numpy as np
import torch
import torch.nn.functional as F
from PIL import Image
from tqdm import tqdm

try:
    import clip as openai_clip
except ImportError:  # pragma: no cover
    openai_clip = None


def log(msg: str) -> None:
    tqdm.write(msg)
    sys.stdout.flush()


# Required keys in a per-video grounding-metric JSON. If any are missing the
# JSON was written by a stale code version (e.g., before masked_video_* was
# added) and the video must be reprocessed. Update this set whenever you add
# a new metric to ``process_one_video``'s return dict.
_REQUIRED_KEYS = frozenset({
    "video_path",
    "n_dino_entities", "n_clip_entities",
    "n_masked_clip_entities", "n_masked_dino_entities",
    "n_masked_video_clip_entities", "n_masked_video_dino_entities",
    "dino", "clip_text", "clip_text_trim",
    "masked_clip_text", "masked_clip_text_trim", "masked_dino",
    "masked_video_clip_text", "masked_video_clip_text_trim",
    "masked_video_dino",
})


def is_video_complete(per_video_json_path: str) -> bool:
    """True iff the per-video metric JSON exists, parses, and has every key
    the current ``process_one_video`` is expected to emit. Adding a new
    metric (a new key in ``_REQUIRED_KEYS``) automatically invalidates any
    JSON written by an older run, forcing reprocessing under --skip-existing.
    """
    if not os.path.exists(per_video_json_path):
        return False
    try:
        with open(per_video_json_path) as f:
            d = json.load(f)
    except (json.JSONDecodeError, OSError):
        return False
    return isinstance(d, dict) and _REQUIRED_KEYS.issubset(d.keys())


# ---------------------------------------------------------------------------
# Video / mask helpers (shared with run_grounding_sam_masking.py logic)
# ---------------------------------------------------------------------------

def extract_frames_to_dir(video_path: str, out_dir: str) -> None:
    os.makedirs(out_dir, exist_ok=True)
    subprocess.run(
        ["ffmpeg", "-y", "-nostdin", "-i", video_path, "-q:v", "2",
         os.path.join(out_dir, "%06d.jpg")],
        capture_output=True, text=True, check=True, stdin=subprocess.DEVNULL,
    )


def list_frame_paths(frames_dir: str) -> list[str]:
    files = [
        f for f in os.listdir(frames_dir)
        if f.endswith(".jpg") or f.endswith(".jpeg") or f.endswith(".png")
    ]
    files.sort(
        key=lambda p: int(re.sub(r"[^0-9]", "", os.path.splitext(p)[0]) or "0")
    )
    return [os.path.join(frames_dir, f) for f in files]


def load_video_frames(video_path: str) -> list[Image.Image]:
    with tempfile.TemporaryDirectory(prefix="metric_frames_") as tmp:
        extract_frames_to_dir(video_path, tmp)
        return [Image.open(p).convert("RGB").copy() for p in list_frame_paths(tmp)]


def load_mask_video_as_array(mask_video_path: str) -> np.ndarray | None:
    """Decode mask video into (T, H, W) uint8 binary array (0/1)."""
    if not mask_video_path or not os.path.exists(mask_video_path):
        return None
    with tempfile.TemporaryDirectory(prefix="metric_mask_") as tmp:
        extract_frames_to_dir(mask_video_path, tmp)
        frames = []
        for p in list_frame_paths(tmp):
            arr = np.array(Image.open(p).convert("L"), dtype=np.uint8)
            frames.append((arr > 127).astype(np.uint8))
        if not frames:
            return None
        return np.stack(frames, axis=0)


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

def load_dino(model_id: str, device: torch.device):
    from transformers import AutoImageProcessor, AutoModel
    proc = AutoImageProcessor.from_pretrained(model_id)
    model = AutoModel.from_pretrained(model_id).to(device)
    model.eval()
    return model, proc


def load_clip(model_name: str, device: torch.device):
    if openai_clip is None:
        raise RuntimeError("openai-clip is required")
    model, preprocess = openai_clip.load(model_name, device=device)
    model.eval()
    return model, preprocess


@torch.inference_mode()
def encode_images_dino(model, processor, images: list[Image.Image], device: torch.device, batch_size: int = 32) -> torch.Tensor:
    """Return (N, D) L2-normalized embedding from DINO CLS token."""
    feats: list[torch.Tensor] = []
    for i in range(0, len(images), batch_size):
        batch = images[i: i + batch_size]
        inputs = processor(images=batch, return_tensors="pt").to(device)
        out = model(**inputs)
        # CLS token on transformer encoders; fall back to pooler for robustness
        if hasattr(out, "last_hidden_state"):
            f = out.last_hidden_state[:, 0]
        else:
            f = out.pooler_output
        f = F.normalize(f, dim=-1)
        feats.append(f.float().cpu())
    if not feats:
        return torch.empty((0, 0))
    return torch.cat(feats, dim=0)


@torch.inference_mode()
def encode_images_clip(model, preprocess, images: list[Image.Image], device: torch.device, batch_size: int = 32) -> torch.Tensor:
    feats: list[torch.Tensor] = []
    for i in range(0, len(images), batch_size):
        batch = images[i: i + batch_size]
        x = torch.stack([preprocess(im) for im in batch]).to(device)
        f = model.encode_image(x)
        f = F.normalize(f, dim=-1)
        feats.append(f.float().cpu())
    if not feats:
        return torch.empty((0, 0))
    return torch.cat(feats, dim=0)


@torch.inference_mode()
def encode_text_clip(model, text: str, device: torch.device) -> torch.Tensor:
    tokens = openai_clip.tokenize([text], truncate=True).to(device)
    f = model.encode_text(tokens)
    f = F.normalize(f, dim=-1)
    return f.float().cpu().squeeze(0)


def build_clip_text(description: str, fallback_natural_name: str) -> str:
    """Build the FULL CLIP-text query from the entity's appearance description.

    Replaces every ``{tag_name}`` with ``tag name`` and returns the whole
    description; CLIP's tokenizer (with ``truncate=True``) silently drops
    anything past 77 tokens. Falls back to ``fallback_natural_name``
    (e.g. ``"man young."``) when no description was saved for the entity.
    """
    text = description or ""
    text = re.sub(r"\{([^}]+)\}", lambda m: m.group(1).replace("_", " "), text)
    if not text:
        return fallback_natural_name
    return text.strip()


def build_clip_text_trim(description: str, fallback_natural_name: str) -> str:
    """Same as :func:`build_clip_text` but trimmed to the first sentence.

    The first sentence is the entity's appearance-defining clause; later
    sentences typically describe outfit/location changes across shots which
    can drift away from a single crop's visual content. Reported as the
    ``*_trim`` companion metric to the full-description variant.
    """
    text = description or ""
    text = re.sub(r"\{([^}]+)\}", lambda m: m.group(1).replace("_", " "), text)
    if not text:
        return fallback_natural_name
    m = re.search(r"^[^.]*\.", text)
    if m:
        text = m.group(0)
    return text.strip()


# ---------------------------------------------------------------------------
# Per-video metric pipeline
# ---------------------------------------------------------------------------

def is_target_entity(name: str) -> bool:
    if name in ("{camera}", "{shot_transition}"):
        return False
    if name.startswith("{scene_"):
        return False
    return True


def crop_pil(image: Image.Image, box_xyxy_pixel: list[float]) -> Image.Image | None:
    x1, y1, x2, y2 = (int(round(v)) for v in box_xyxy_pixel)
    x1 = max(0, x1); y1 = max(0, y1)
    x2 = min(image.width, x2); y2 = min(image.height, y2)
    if x2 <= x1 + 1 or y2 <= y1 + 1:
        return None
    return image.crop((x1, y1, x2, y2))


def crop_masked_pil(image: Image.Image, mask_2d: np.ndarray, box_xyxy_pixel: list[float]) -> Image.Image | None:
    x1, y1, x2, y2 = (int(round(v)) for v in box_xyxy_pixel)
    x1 = max(0, x1); y1 = max(0, y1)
    x2 = min(image.width, x2); y2 = min(image.height, y2)
    if x2 <= x1 + 1 or y2 <= y1 + 1:
        return None
    arr = np.array(image, dtype=np.uint8)
    m = mask_2d[..., None] if mask_2d.ndim == 2 else mask_2d
    masked = arr * m  # zero outside mask
    return Image.fromarray(masked).crop((x1, y1, x2, y2))


def derive_ref_mask_path(ref_image_path: str) -> str:
    """``..._ref_image_NN_{name}.png`` → ``..._ref_image_mask_NN_{name}.png``.
    Mirrors the convention in mask_ref_images.py.
    """
    base = os.path.basename(ref_image_path)
    new_base = base.replace("ref_image", "ref_image_mask", 1)
    if new_base == base:
        stem, ext = os.path.splitext(base)
        new_base = f"{stem}_mask{ext}"
    return os.path.join(os.path.dirname(ref_image_path), new_base)


def load_ref_image_mask(ref_image_path: str) -> np.ndarray | None:
    """Load the (H,W) uint8 binary mask alongside ``ref_image_path``."""
    mp = derive_ref_mask_path(ref_image_path)
    if not os.path.exists(mp):
        return None
    arr = np.array(Image.open(mp).convert("L"), dtype=np.uint8)
    return (arr > 127).astype(np.uint8)


def apply_mask_to_image(image: Image.Image, mask_2d: np.ndarray) -> Image.Image:
    """Zero out pixels outside the mask. ``mask_2d`` is auto-resized if it
    doesn't match ``image``'s spatial size."""
    arr = np.array(image, dtype=np.uint8)
    if mask_2d.shape != arr.shape[:2]:
        m = cv2.resize(mask_2d, (arr.shape[1], arr.shape[0]),
                       interpolation=cv2.INTER_NEAREST)
    else:
        m = mask_2d
    return Image.fromarray(arr * m[..., None])


def safe_mean(values: list[float]) -> float | None:
    if not values:
        return None
    return float(np.mean(values))


def safe_max(values: list[float]) -> float:
    return float(max(values)) if values else 0.0


def _load_keyframe_mask_lookup(ent: dict) -> dict[tuple[int, int], np.ndarray]:
    """Load saved per-keyframe SAM mask images for one entity.

    Returns a dict keyed by ``(interval_idx, global_frame)`` mapping to a
    ``(H, W) uint8`` 0/1 mask. Files are written by run_grounding_sam_masking
    when ``--save_sam_masks`` is set; missing files are silently skipped.
    """
    out: dict[tuple[int, int], np.ndarray] = {}
    for km in ent.get("saved_keyframe_masks", []):
        path = km.get("path")
        if not path or not os.path.exists(path):
            continue
        try:
            arr = np.array(Image.open(path).convert("L"), dtype=np.uint8)
        except Exception as exc:
            log(f"  WARN: failed to load keyframe mask {path}: {exc}")
            continue
        out[(int(km["interval_idx"]), int(km["frame"]))] = (arr > 127).astype(np.uint8)
    return out


def process_one_video(
    log_dict: dict,
    dino_model, dino_proc,
    clip_model, clip_preprocess, device: torch.device,
    metric_batch_size: int,
) -> dict:
    video_path = log_dict["video_path"]
    if not os.path.exists(video_path):
        log(f"  WARN: video missing: {video_path}")
        return {"per_entity": [], "n_dino_entities": 0, "n_clip_entities": 0}

    video_pil = load_video_frames(video_path)
    n_frames = len(video_pil)

    per_entity_records: list[dict] = []

    for ent in log_dict.get("entities", []):
        name = ent["entity_name"]
        if not is_target_entity(name):
            continue

        ref_image: Image.Image | None = None
        ref_path = ent.get("ref_image_path")
        ref_mask_2d: np.ndarray | None = None
        masked_ref_image: Image.Image | None = None
        if ref_path and os.path.exists(ref_path):
            try:
                ref_image = Image.open(ref_path).convert("RGB").copy()
            except Exception as exc:
                log(f"  WARN: failed to load ref image {ref_path}: {exc}")
                ref_image = None
            if ref_image is not None:
                ref_mask_2d = load_ref_image_mask(ref_path)
                if ref_mask_2d is not None:
                    masked_ref_image = apply_mask_to_image(ref_image, ref_mask_2d)

        # Per-keyframe masks (saved by --save_sam_masks). Used for masked_*.
        keyframe_masks = _load_keyframe_mask_lookup(ent)
        has_keyframe_masks = bool(keyframe_masks)

        # SAM2-propagated mask video (one mask per video frame). Used for
        # masked_video_*.
        mask_video = ent.get("mask_video_path")
        mask_arr = load_mask_video_as_array(mask_video) if mask_video else None
        if mask_arr is not None and mask_arr.shape[0] != n_frames:
            log(f"  WARN: mask vs video frame mismatch for {name} "
                f"({mask_arr.shape[0]} vs {n_frames}); will index by available frames")

        desc_raw = ent.get("description") or ""
        gn_fallback = ent.get("grounding_text") or ""
        text = build_clip_text(desc_raw, gn_fallback)
        text_trim = build_clip_text_trim(desc_raw, gn_fallback)
        text_embed = encode_text_clip(clip_model, text, device) if text else None
        text_embed_trim = (
            encode_text_clip(clip_model, text_trim, device) if text_trim else None
        )

        ref_embed = None
        masked_ref_embed = None
        if ref_image is not None:
            ref_embed = encode_images_dino(
                dino_model, dino_proc, [ref_image], device,
            )[0]
        if masked_ref_image is not None:
            masked_ref_embed = encode_images_dino(
                dino_model, dino_proc, [masked_ref_image], device,
            )[0]

        # Gather all (frame, box) candidates per disjoint interval
        per_iv_dino: list[float] = []
        per_iv_clip: list[float] = []                    # vs full description
        per_iv_clip_trim: list[float] = []               # vs first-sentence
        per_iv_masked_clip: list[float] = []             # keyframe-image masked, full
        per_iv_masked_clip_trim: list[float] = []        # keyframe-image masked, trim
        per_iv_masked_dino: list[float] = []             # keyframe-image masked
        per_iv_masked_video_clip: list[float] = []       # mask-video masked, full
        per_iv_masked_video_clip_trim: list[float] = []  # mask-video masked, trim
        per_iv_masked_video_dino: list[float] = []       # mask-video masked

        for iv_idx, iv in enumerate(ent.get("intervals", [])):
            crops_unmasked: list[Image.Image] = []
            crops_kf_masked: list[Image.Image] = []      # SAM keyframe mask
            crops_video_masked: list[Image.Image] = []   # SAM2 propagated mask video

            for cand in iv.get("candidates", []):
                fr = int(cand["frame"])
                if fr < 0 or fr >= n_frames:
                    continue
                base_img = video_pil[fr]
                kf_m = keyframe_masks.get((iv_idx, fr))
                vid_m = (
                    mask_arr[fr]
                    if (mask_arr is not None and 0 <= fr < mask_arr.shape[0])
                    else None
                )
                for b in cand.get("boxes", []):
                    box = b["xyxy_pixel"]
                    cu = crop_pil(base_img, box)
                    if cu is None:
                        continue
                    crops_unmasked.append(cu)
                    if kf_m is not None:
                        cm = crop_masked_pil(base_img, kf_m, box)
                        crops_kf_masked.append(cm if cm is not None else cu)
                    if vid_m is not None:
                        cm = crop_masked_pil(base_img, vid_m, box)
                        crops_video_masked.append(cm if cm is not None else cu)

            # DINO score: max over unmasked crops vs ref_image
            if ref_embed is not None and crops_unmasked:
                feats = encode_images_dino(
                    dino_model, dino_proc, crops_unmasked, device,
                    batch_size=metric_batch_size,
                )
                per_iv_dino.append(safe_max((feats @ ref_embed).tolist()))
            else:
                per_iv_dino.append(0.0)

            # CLIP-text scores (full description + first-sentence trim variant):
            # max over unmasked crops. Crops are encoded once and reused.
            if (text_embed is not None or text_embed_trim is not None) and crops_unmasked:
                feats_clip_unmasked = encode_images_clip(
                    clip_model, clip_preprocess, crops_unmasked, device,
                    batch_size=metric_batch_size,
                )
            else:
                feats_clip_unmasked = None
            if text_embed is not None and feats_clip_unmasked is not None:
                per_iv_clip.append(safe_max((feats_clip_unmasked @ text_embed).tolist()))
            else:
                per_iv_clip.append(0.0)
            if text_embed_trim is not None and feats_clip_unmasked is not None:
                per_iv_clip_trim.append(safe_max((feats_clip_unmasked @ text_embed_trim).tolist()))
            else:
                per_iv_clip_trim.append(0.0)

            # Masked CLIP-text (per-keyframe SAM mask images), full + trim
            if (text_embed is not None or text_embed_trim is not None) and crops_kf_masked:
                feats_clip_kf = encode_images_clip(
                    clip_model, clip_preprocess, crops_kf_masked, device,
                    batch_size=metric_batch_size,
                )
            else:
                feats_clip_kf = None
            if text_embed is not None and feats_clip_kf is not None:
                per_iv_masked_clip.append(safe_max((feats_clip_kf @ text_embed).tolist()))
            else:
                per_iv_masked_clip.append(0.0)
            if text_embed_trim is not None and feats_clip_kf is not None:
                per_iv_masked_clip_trim.append(safe_max((feats_clip_kf @ text_embed_trim).tolist()))
            else:
                per_iv_masked_clip_trim.append(0.0)

            # Masked DINO (per-keyframe SAM mask images): keyframe-masked crop
            # vs ref-image-mask-masked GT
            if masked_ref_embed is not None and crops_kf_masked:
                feats = encode_images_dino(
                    dino_model, dino_proc, crops_kf_masked, device,
                    batch_size=metric_batch_size,
                )
                per_iv_masked_dino.append(safe_max((feats @ masked_ref_embed).tolist()))
            else:
                per_iv_masked_dino.append(0.0)

            # Masked-video CLIP-text (full + trim)
            if (text_embed is not None or text_embed_trim is not None) and crops_video_masked:
                feats_clip_video = encode_images_clip(
                    clip_model, clip_preprocess, crops_video_masked, device,
                    batch_size=metric_batch_size,
                )
            else:
                feats_clip_video = None
            if text_embed is not None and feats_clip_video is not None:
                per_iv_masked_video_clip.append(safe_max((feats_clip_video @ text_embed).tolist()))
            else:
                per_iv_masked_video_clip.append(0.0)
            if text_embed_trim is not None and feats_clip_video is not None:
                per_iv_masked_video_clip_trim.append(safe_max((feats_clip_video @ text_embed_trim).tolist()))
            else:
                per_iv_masked_video_clip_trim.append(0.0)

            # Masked-video DINO: mask-video-masked crop vs ref-image-mask-masked GT
            if masked_ref_embed is not None and crops_video_masked:
                feats = encode_images_dino(
                    dino_model, dino_proc, crops_video_masked, device,
                    batch_size=metric_batch_size,
                )
                per_iv_masked_video_dino.append(safe_max((feats @ masked_ref_embed).tolist()))
            else:
                per_iv_masked_video_dino.append(0.0)

        ent_dino = safe_mean(per_iv_dino) if ref_embed is not None else None
        ent_clip = safe_mean(per_iv_clip) if text_embed is not None else None
        ent_clip_trim = (
            safe_mean(per_iv_clip_trim) if text_embed_trim is not None else None
        )
        ent_masked_clip = (
            safe_mean(per_iv_masked_clip)
            if (text_embed is not None and has_keyframe_masks)
            else None
        )
        ent_masked_clip_trim = (
            safe_mean(per_iv_masked_clip_trim)
            if (text_embed_trim is not None and has_keyframe_masks)
            else None
        )
        ent_masked_dino = (
            safe_mean(per_iv_masked_dino)
            if (masked_ref_embed is not None and has_keyframe_masks)
            else None
        )
        ent_masked_video_clip = (
            safe_mean(per_iv_masked_video_clip)
            if (text_embed is not None and mask_arr is not None)
            else None
        )
        ent_masked_video_clip_trim = (
            safe_mean(per_iv_masked_video_clip_trim)
            if (text_embed_trim is not None and mask_arr is not None)
            else None
        )
        ent_masked_video_dino = (
            safe_mean(per_iv_masked_video_dino)
            if (masked_ref_embed is not None and mask_arr is not None)
            else None
        )

        per_entity_records.append({
            "entity_name": name,
            "has_ref_image": ref_embed is not None,
            "has_ref_image_mask": masked_ref_embed is not None,
            "has_keyframe_masks": has_keyframe_masks,
            "has_mask_video": mask_arr is not None,
            "n_intervals": len(per_iv_dino),
            "per_interval_dino": per_iv_dino,
            "per_interval_clip_text": per_iv_clip,
            "per_interval_clip_text_trim": per_iv_clip_trim,
            "per_interval_masked_clip_text": per_iv_masked_clip,
            "per_interval_masked_clip_text_trim": per_iv_masked_clip_trim,
            "per_interval_masked_dino": per_iv_masked_dino,
            "per_interval_masked_video_clip_text": per_iv_masked_video_clip,
            "per_interval_masked_video_clip_text_trim": per_iv_masked_video_clip_trim,
            "per_interval_masked_video_dino": per_iv_masked_video_dino,
            "dino": ent_dino,
            "clip_text": ent_clip,
            "clip_text_trim": ent_clip_trim,
            "masked_clip_text": ent_masked_clip,
            "masked_clip_text_trim": ent_masked_clip_trim,
            "masked_dino": ent_masked_dino,
            "masked_video_clip_text": ent_masked_video_clip,
            "masked_video_clip_text_trim": ent_masked_video_clip_trim,
            "masked_video_dino": ent_masked_video_dino,
        })

    n_dino = sum(1 for r in per_entity_records if r["has_ref_image"])
    n_clip = len(per_entity_records)
    n_masked_clip = sum(
        1 for r in per_entity_records
        if r["has_keyframe_masks"]
    )
    n_masked_dino = sum(
        1 for r in per_entity_records
        if r["has_ref_image_mask"] and r["has_keyframe_masks"]
    )
    n_masked_video_clip = sum(
        1 for r in per_entity_records
        if r["has_mask_video"]
    )
    n_masked_video_dino = sum(
        1 for r in per_entity_records
        if r["has_ref_image_mask"] and r["has_mask_video"]
    )

    def _video_mean(key: str) -> float | None:
        return safe_mean([r[key] for r in per_entity_records if r[key] is not None])

    # Shotwise mode: per-video score = mean over chunks of (mean over
    # entities visible in chunk of mean-over-that-entity's-sub-intervals).
    # Falls back to the legacy per-entity-then-per-video mean when the log
    # has no chunks (i.e. the run wasn't shotwise).
    _IV_KEY_BY_METRIC = {
        "dino": "per_interval_dino",
        "clip_text": "per_interval_clip_text",
        "clip_text_trim": "per_interval_clip_text_trim",
        "masked_clip_text": "per_interval_masked_clip_text",
        "masked_clip_text_trim": "per_interval_masked_clip_text_trim",
        "masked_dino": "per_interval_masked_dino",
        "masked_video_clip_text": "per_interval_masked_video_clip_text",
        "masked_video_clip_text_trim": "per_interval_masked_video_clip_text_trim",
        "masked_video_dino": "per_interval_masked_video_dino",
    }

    def _shotwise_video_mean(key: str) -> float | None:
        chunks = log_dict.get("chunks") or []
        if not chunks:
            return None
        iv_key = _IV_KEY_BY_METRIC.get(key)
        if iv_key is None:
            return None
        rec_by_name = {r["entity_name"]: r for r in per_entity_records}
        chunk_scores: list[float] = []
        for chunk in chunks:
            ent_groups: dict[str, list[float]] = {}
            for entry in chunk.get("entries", []) or []:
                ename = entry.get("entity_name")
                iidx = entry.get("interval_index")
                rec = rec_by_name.get(ename)
                if rec is None or iidx is None:
                    continue
                # Skip entities whose entity-level metric is N/A (e.g. no
                # ref-image embed for a {camera} or {shot_transition}, or
                # no keyframe masks for the masked_* variants).
                if rec.get(key) is None:
                    continue
                iv_list = rec.get(iv_key, []) or []
                if 0 <= iidx < len(iv_list):
                    ent_groups.setdefault(ename, []).append(iv_list[iidx])
            ent_means = [
                safe_mean(vs)
                for vs in ent_groups.values()
            ]
            ent_means = [m for m in ent_means if m is not None]
            if ent_means:
                chunk_scores.append(sum(ent_means) / len(ent_means))
        return safe_mean(chunk_scores)

    is_shotwise = bool(log_dict.get("shotwise") and log_dict.get("chunks"))
    if is_shotwise:
        score_fn = _shotwise_video_mean
    else:
        score_fn = _video_mean

    return {
        "video_path": video_path,
        "n_dino_entities": n_dino,
        "n_clip_entities": n_clip,
        "n_masked_clip_entities": n_masked_clip,
        "n_masked_dino_entities": n_masked_dino,
        "n_masked_video_clip_entities": n_masked_video_clip,
        "n_masked_video_dino_entities": n_masked_video_dino,
        "shotwise": is_shotwise,
        "n_chunks": len(log_dict.get("chunks") or []) if is_shotwise else None,
        "dino": score_fn("dino"),
        "clip_text": score_fn("clip_text"),
        "clip_text_trim": score_fn("clip_text_trim"),
        "masked_clip_text": score_fn("masked_clip_text"),
        "masked_clip_text_trim": score_fn("masked_clip_text_trim"),
        "masked_dino": score_fn("masked_dino"),
        "masked_video_clip_text": score_fn("masked_video_clip_text"),
        "masked_video_clip_text_trim": score_fn("masked_video_clip_text_trim"),
        "masked_video_dino": score_fn("masked_video_dino"),
        "per_entity": per_entity_records,
    }


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def _process_one_run(
    *, logs_dir: str, output: str,
    dino_model, dino_proc, clip_model, clip_preprocess,
    device: torch.device,
    args, rank: int, world_size: int,
    log_dist, slice_for_rank, is_aggregator,
    reset_done_sentinels, mark_rank_done, mark_aggregator_done,
    wait_for_all_ranks, wait_for_aggregator,
) -> None:
    """Body of a single (logs_dir, output) run.  Models are passed in pre-loaded
    so the cost is amortised across runs in the outer loop.  Filesystem-
    barrier semantics are preserved per run via the partial_dir sentinels.
    """
    partial_dir = os.path.abspath(output) + ".partial"
    reset_done_sentinels(partial_dir)

    log_paths_all = sorted(
        os.path.join(logs_dir, f) for f in os.listdir(logs_dir)
        if f.endswith("_grounding_log.json")
    )
    log_dist(f"[run] {logs_dir}: found {len(log_paths_all)} grounding logs")
    if args.start:
        log_paths_all = log_paths_all[args.start:]
    if args.limit is not None:
        log_paths_all = log_paths_all[: args.limit]
    log_dist(f"[run] after start/limit: {len(log_paths_all)}")

    def per_video_path(log_path: str) -> str:
        base = os.path.basename(log_path).replace("_grounding_log.json", "")
        return os.path.join(partial_dir, f"{base}.json")

    pending = log_paths_all
    if args.skip_existing:
        pending = [p for p in log_paths_all if not is_video_complete(per_video_path(p))]
        log_dist(f"[run] after --skip-existing: {len(pending)} remaining")

    my_paths = slice_for_rank(pending)
    log_dist(f"[run] rank gets {len(my_paths)} videos")

    if my_paths:
        run_name = re.sub(r"^intermediate(?:_shotwise)?(?:_caption_comp)?_", "",
                          os.path.basename(os.path.normpath(logs_dir)))
        tqdm_desc = f"[compute_grounding|{run_name}] rank{rank}"
        for lp in tqdm(my_paths, desc=tqdm_desc):
            try:
                with open(lp) as f:
                    log_dict = json.load(f)
                res = process_one_video(
                    log_dict, dino_model, dino_proc,
                    clip_model, clip_preprocess, device,
                    metric_batch_size=args.batch_size,
                )
                res["log_path"] = os.path.abspath(lp)
                tmp = per_video_path(lp) + ".tmp"
                with open(tmp, "w") as f:
                    json.dump(res, f, indent=2)
                os.replace(tmp, per_video_path(lp))
            except Exception as exc:
                log_dist(f"!! ERROR on {os.path.basename(lp)}: {exc}")
                import traceback
                traceback.print_exc()

    mark_rank_done(partial_dir)
    log_dist("[run] rank done; waiting for aggregator")

    if not is_aggregator():
        wait_for_aggregator(partial_dir)
        log_dist("[run] aggregator finished")
        return

    wait_for_all_ranks(partial_dir, world_size)
    log_dist("[run] all ranks done; merging")

    per_video_results: list[dict] = []
    for lp in log_paths_all:
        pvp = per_video_path(lp)
        if not os.path.exists(pvp):
            continue
        with open(pvp) as f:
            per_video_results.append(json.load(f))
    log(f"\n[aggregator|{logs_dir}] loaded {len(per_video_results)} per-video files")

    def agg(key: str) -> float | None:
        vals = [r[key] for r in per_video_results if r.get(key) is not None]
        return safe_mean(vals)

    aggregate = {
        "n_videos": len(per_video_results),
        "n_videos_with_dino": sum(1 for r in per_video_results if r.get("dino") is not None),
        "n_videos_with_clip_text": sum(1 for r in per_video_results if r.get("clip_text") is not None),
        "n_videos_with_clip_text_trim": sum(1 for r in per_video_results if r.get("clip_text_trim") is not None),
        "n_videos_with_masked_clip_text": sum(1 for r in per_video_results if r.get("masked_clip_text") is not None),
        "n_videos_with_masked_clip_text_trim": sum(1 for r in per_video_results if r.get("masked_clip_text_trim") is not None),
        "n_videos_with_masked_dino": sum(1 for r in per_video_results if r.get("masked_dino") is not None),
        "n_videos_with_masked_video_clip_text": sum(
            1 for r in per_video_results if r.get("masked_video_clip_text") is not None
        ),
        "n_videos_with_masked_video_clip_text_trim": sum(
            1 for r in per_video_results if r.get("masked_video_clip_text_trim") is not None
        ),
        "n_videos_with_masked_video_dino": sum(
            1 for r in per_video_results if r.get("masked_video_dino") is not None
        ),
        "dino": agg("dino"),
        "clip_text": agg("clip_text"),
        "clip_text_trim": agg("clip_text_trim"),
        "masked_clip_text": agg("masked_clip_text"),
        "masked_clip_text_trim": agg("masked_clip_text_trim"),
        "masked_dino": agg("masked_dino"),
        "masked_video_clip_text": agg("masked_video_clip_text"),
        "masked_video_clip_text_trim": agg("masked_video_clip_text_trim"),
        "masked_video_dino": agg("masked_video_dino"),
    }

    out_blob = {
        "config": {
            "logs_dir": os.path.abspath(logs_dir),
            "dino_model_id": args.dino_model_id,
            "clip_model_name": args.clip_model_name,
        },
        "aggregate": aggregate,
        "per_video": per_video_results,
    }
    os.makedirs(os.path.dirname(os.path.abspath(output)) or ".", exist_ok=True)
    with open(output, "w") as f:
        json.dump(out_blob, f, indent=2)
    log(f"\n[aggregator] wrote {output}")
    log(f"  Aggregate: DINO={aggregate['dino']}  CLIP={aggregate['clip_text']}  "
        f"MaskedCLIP={aggregate['masked_clip_text']}  "
        f"MaskedDINO={aggregate['masked_dino']}  "
        f"MaskedVideoCLIP={aggregate['masked_video_clip_text']}  "
        f"MaskedVideoDINO={aggregate['masked_video_dino']}")

    mark_aggregator_done(partial_dir)
    log_dist("[run] aggregator wrote _AGG.done")


def main() -> None:
    ap = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    ap.add_argument("--logs-dir",
                    help="Dir containing {base}_grounding_log.json from run_grounding_sam_masking.py "
                         "(single-run / backward-compat shape).")
    ap.add_argument("--output",
                    help="Where to write the per-video + aggregate metrics JSON "
                         "(single-run / backward-compat shape).")
    ap.add_argument("--run", action="append", nargs=2, metavar=("LOGS_DIR", "OUTPUT"),
                    help="Add (logs_dir, output) pair to the runs list.  Repeat for "
                         "more runs; models are loaded once and amortised across them.  "
                         "Mutually exclusive with --logs-dir/--output.")
    ap.add_argument("--dino-model-id", default="facebook/dinov2-base")
    ap.add_argument("--clip-model-name", default="ViT-B/32")
    ap.add_argument("--device", default=None,
                    help="Override device. Default: cuda:LOCAL_RANK if available else cpu.")
    ap.add_argument("--batch-size", type=int, default=32, help="Batch size for DINO/CLIP image encoding.")
    ap.add_argument("--limit", type=int, default=None)
    ap.add_argument("--start", type=int, default=0)
    ap.add_argument("--skip-existing", action="store_true",
                    help="Skip videos whose per-video metric JSON already exists in <output>.partial/.")
    args = ap.parse_args()

    # Resolve runs list (backward-compat: --logs-dir/--output collapses to a single run).
    if args.run:
        if args.logs_dir or args.output:
            ap.error("--run cannot be combined with --logs-dir / --output; pick one shape.")
        runs = [(li, oi) for li, oi in args.run]
    else:
        if not (args.logs_dir and args.output):
            ap.error("Must supply either --run LOGS_DIR OUTPUT (one or more) "
                     "or both --logs-dir and --output.")
        runs = [(args.logs_dir, args.output)]

    # Distributed setup (no NCCL — filesystem barrier; see dist_utils.py)
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from dist_utils import (
        init_workers, slice_for_rank, is_aggregator, log_dist, env_summary,
        reset_done_sentinels, mark_rank_done, mark_aggregator_done,
        wait_for_all_ranks, wait_for_aggregator,
    )
    rank, world_size, local_rank, default_device = init_workers()
    device = torch.device(args.device) if args.device else default_device
    log_dist("env:", env_summary(), "device:", device, "runs:", len(runs))

    # Load models ONCE up front — this is the whole point of the refactor.
    log_dist("Loading DINO...")
    dino_model, dino_proc = load_dino(args.dino_model_id, device)
    log_dist("Loading CLIP...")
    clip_model, clip_preprocess = load_clip(args.clip_model_name, device)
    log_dist("Models ready.")

    failures: list[tuple[str, str]] = []  # (logs_dir, error_str) for runs that aborted entirely
    for run_idx, (logs_dir, output) in enumerate(runs):
        log_dist(f"=== run {run_idx + 1}/{len(runs)}: {logs_dir} -> {output} ===")
        try:
            _process_one_run(
                logs_dir=logs_dir, output=output,
                dino_model=dino_model, dino_proc=dino_proc,
                clip_model=clip_model, clip_preprocess=clip_preprocess,
                device=device,
                args=args, rank=rank, world_size=world_size,
                log_dist=log_dist, slice_for_rank=slice_for_rank,
                is_aggregator=is_aggregator,
                reset_done_sentinels=reset_done_sentinels,
                mark_rank_done=mark_rank_done,
                mark_aggregator_done=mark_aggregator_done,
                wait_for_all_ranks=wait_for_all_ranks,
                wait_for_aggregator=wait_for_aggregator,
            )
        except Exception as exc:
            import traceback
            log_dist(f"!! RUN-LEVEL ERROR on {logs_dir}: {exc}")
            traceback.print_exc()
            failures.append((logs_dir, str(exc)))

    if failures:
        log_dist(f"=== summary: {len(failures)} of {len(runs)} runs failed at the run level ===")
        for ld, err in failures:
            log_dist(f"  - {ld}: {err}")


if __name__ == "__main__":
    main()
