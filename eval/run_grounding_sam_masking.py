#!/usr/bin/env python3
"""Per-entity Grounding-DINO + CLIP + SAM2 masking of generated ultra-dense videos.

For each generated video:
  1. Pair the video to the matching ultra-dense JSON (via prompts file or dir).
  2. Apply the same truncation as ``video_generation_from_prompts_file.py`` to
     pick the surviving entities/dense events given the model's max counts and
     effective duration.
  3. For each non-{camera}/{shot_transition}/{scene_*} entity:
     a. Merge its (post-truncation) dense intervals into disjoint intervals.
     b. Within each disjoint interval, sample percentile keyframes
        (``--percentiles``).
     c. Run Grounding DINO on each percentile keyframe.
     d. For every detected box, compute OpenAI-CLIP similarity between the
        cropped region and the entity's text description (entity name expanded,
        truncated at first period).
     e. Keep ALL boxes with CLIP score >= ``--clip-threshold`` as separate SAM2
        prompts (each box becomes its own ``obj_id`` in the interval session;
        per-frame masks are OR-combined across the obj_ids to form the
        entity's mask for that frame).
     f. Optionally:
        - ``--save_sam_masks``: write a single-channel JPG mask for every
          keyframe that has a surviving box, named ``{base}_maskimg_{ii}_{name}_iv{iv}_f{frame}.jpg``.
        - ``--skip_mask_tracking``: do NOT propagate SAM2 through the interval;
          only the keyframe masks (if ``--save_sam_masks``) are produced.
     g. If propagation runs (default), build a single full-length mask video
        ``{base}_mask_{ii}_{name}.mp4`` (zeros outside any disjoint interval
        and where SAM produced no mask). H264 with ``--mask-crf`` (default 28).
  4. Per-entity sub-log written to ``{out}/{base}_progress/{ii}_{name}.json`` and
     used as the resume marker. The full per-video log is reassembled from the
     sub-logs and written to ``{out}/{base}_grounding_log.json``.

Resume: if a sub-log already exists for an entity, that entity is skipped.

Usage:
    python scripts/ultra_dense/run_grounding_sam_masking.py \\
        --videos-dir /path/to/videos \\
        --prompts-file /path/to/prompts.json \\
        --output-root /path/to/intermediate \\
        --time 10.2 \\
        [--save_sam_masks] [--skip_mask_tracking] \\
        [--mask-crf 28] [--mask-image-quality 90]
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import warnings
from typing import Any

# ---------------------------------------------------------------------------
# Silence noisy SDPA / cudnn warnings from SAM
# ---------------------------------------------------------------------------
os.environ.setdefault("PYTORCH_ENABLE_MPS_FALLBACK", "1")
os.environ["TORCH_CUDNN_SDPA_ENABLED"] = "0"
# Silence HF model-loading progress bars / advisory warnings before any
# transformers import. dist_utils.quiet_hf() also disables them post-import.
os.environ.setdefault("HF_HUB_DISABLE_PROGRESS_BARS", "1")
os.environ.setdefault("HF_HUB_DISABLE_TELEMETRY", "1")
os.environ.setdefault("TRANSFORMERS_VERBOSITY", "error")
os.environ.setdefault("TRANSFORMERS_NO_ADVISORY_WARNINGS", "1")
# Force offline mode — all models live on /fsx; online HEAD requests race
# across ranks and cause spurious "does not appear to have a file" errors.
for _pat in (
    r"Memory [eE]fficient",
    r"Flash [aA]ttention",
    r"Falling back to all available kernels",
    r"Expected query, key and value",
    r"CuDNN",
    r"cannot import name '_C' from 'sam2'",
    r"Skipping the post-processing step",
    r"adding a box after tracking starts",
):
    warnings.filterwarnings("ignore", category=UserWarning, message=_pat)

import cv2
import numpy as np
import torch
from PIL import Image
from tqdm import tqdm

try:
    import clip as openai_clip
except ImportError:  # pragma: no cover
    openai_clip = None



# ---------------------------------------------------------------------------
# Tiny utilities
# ---------------------------------------------------------------------------

def log(msg: str) -> None:
    tqdm.write(msg)
    sys.stdout.flush()


def _sanitize(name: str, max_len: int = 64) -> str:
    s = (name or "entity").strip()
    s = re.sub(r"[\s/\\:*?\"<>|]+", "_", s)
    s = re.sub(r"_+", "_", s).strip("_")
    return s[:max_len] if len(s) > max_len else s or "entity"


def _natural_name(braced: str) -> str:
    """{birthday_girl_aria} -> 'birthday girl aria'."""
    return braced.strip().lstrip("{").rstrip("}").replace("_", " ")


def _entity_text_for_grounding(braced_name: str, description: str) -> str:
    text = description or ""
    text = re.sub(
        r"\{([^}]+)\}",
        lambda m: m.group(1).replace("_", " "),
        text,
    )
    if not text:
        return _natural_name(braced_name)
    m = re.search(r"^[^.]*\.", text)
    if m:
        text = m.group(0)
    return text.strip()


def _normalize_grounding_text(text: str) -> str:
    t = text.strip().lower()
    if not t:
        return "object."
    if not t.endswith("."):
        t += "."
    return t


# ---------------------------------------------------------------------------
# Truncation logic mirroring parse_ultra_dense_prompts (entity-name preserving)
# ---------------------------------------------------------------------------

def _subtract_intervals(
    keep: list[tuple[float, float]],
    remove: list[tuple[float, float]],
) -> list[tuple[float, float]]:
    """Return ``keep \\ union(remove)`` as a list of (s, e) intervals.

    Used to compute a chunk's "valid range" — the chunk minus any
    shot_transition intersections.  Inputs may be unsorted; output is
    coalesced and sorted.
    """
    out: list[tuple[float, float]] = []
    for ks, ke in keep:
        cur = [(ks, ke)]
        for rs, re_ in remove:
            new_cur: list[tuple[float, float]] = []
            for cs, ce in cur:
                # Subtract (rs, re_) from (cs, ce).
                if re_ <= cs or rs >= ce:
                    new_cur.append((cs, ce))
                    continue
                if rs > cs:
                    new_cur.append((cs, rs))
                if re_ < ce:
                    new_cur.append((re_, ce))
            cur = new_cur
        out.extend(cur)
    out = [(s, e) for (s, e) in out if e > s + 1e-9]
    out.sort()
    return out


def _build_chunks(
    *, dense_events: list[dict], video_duration: float,
    min_chunk_valid_duration_s: float = 0.5,
) -> list[dict]:
    """Split [0, video_duration] into chunks at the midpoints of every
    shot_transition event in ``dense_events``.

    Each chunk's "valid range" is the chunk minus the union of all
    shot_transition overlaps (so frames inside the transition are never
    used for percentile selection / grounding / SAM).

    Chunks with valid duration < ``min_chunk_valid_duration_s`` are
    dropped (they contribute nothing to averaging).
    """
    transitions = [
        (float(de["start"]), float(de["end"]))
        for de in dense_events if de.get("name") == "{shot_transition}"
    ]
    transitions.sort()
    # Keep only transitions actually inside the video.
    transitions = [(max(0.0, s), min(video_duration, e))
                   for s, e in transitions if e > 0 and s < video_duration]
    transitions = [(s, e) for s, e in transitions if e > s + 1e-9]

    boundaries = [0.0]
    for s, e in transitions:
        boundaries.append((s + e) / 2.0)
    boundaries.append(float(video_duration))

    chunks: list[dict] = []
    for i in range(len(boundaries) - 1):
        cs, ce = boundaries[i], boundaries[i + 1]
        if ce <= cs + 1e-9:
            continue
        valid = _subtract_intervals([(cs, ce)], transitions)
        valid_dur = sum(e - s for s, e in valid)
        if valid_dur < min_chunk_valid_duration_s:
            continue
        chunks.append({
            "chunk_index": len(chunks),
            "chunk_range": [cs, ce],
            "valid_range": [[s, e] for s, e in valid],
            "valid_duration": valid_dur,
            "transition_intersections": [
                [max(cs, ts), min(ce, te)]
                for (ts, te) in transitions
                if ts < ce and te > cs
            ],
            "entries": [],   # filled by caller: (entity_name, interval_index, sub_interval)
        })
    return chunks


REFS_DIR: str | None = None


def _resolve_ref(path: str | None) -> str | None:
    """Resolve a reference-image path. Absolute existing paths are kept as-is;
    bare filenames are resolved against ``--refs-dir`` when provided."""
    if not path:
        return path
    if os.path.isabs(path) and os.path.exists(path):
        return path
    if REFS_DIR:
        cand = os.path.join(REFS_DIR, os.path.basename(path))
        if os.path.exists(cand):
            return cand
    return path


def truncate_prompt(
    json_data: dict,
    max_entities: int,
    max_dense_events: int,
    max_entity_intervals: int,
    eval_duration: float | None,
    max_ref_entities: int,
    caption_compressed: bool = False,
    shotwise: bool = False,
) -> dict:
    """If ``caption_compressed`` is True, do NOT drop dense events that start
    past ``eval_duration``; instead, keep every event, apply max_entities /
    max_dense_events caps, then rescale every surviving event's time
    interval by ``video_duration / orig_total`` where ``orig_total`` is the
    max end time across the events that survived capping.  The result is a
    timeline whose dense captions exactly fit ``[0, video_duration]``.
    Frame extraction, mask propagation and downstream metric clipping all
    use these compressed times unchanged.
    """
    global_entities_raw = json_data.get("global_entities", [])
    dense_entities_raw = json_data.get("dense_entities", [])

    if eval_duration is not None and eval_duration > 0:
        video_duration = float(eval_duration)
    else:
        all_times: list[float] = []
        for ent in dense_entities_raw:
            all_times.extend(ent.get("time_intervals", []))
        video_duration = max(all_times) if all_times else 1.0
    video_duration = max(video_duration, 1e-6)

    kept_dense: list[dict] = []
    for ent in dense_entities_raw:
        iv = ent.get("time_intervals", [0.0, 0.0])
        if len(iv) < 2:
            continue
        s, e = float(iv[0]), float(iv[1])
        if caption_compressed:
            # Keep every event with original times; compression happens
            # after max_entities / max_dense_events caps.
            kept_dense.append({
                "name": ent.get("name"),
                "description": ent.get("description", ""),
                "time_intervals": [s, e],
            })
            continue
        # Default: drop events whose start is past the video, clip end.
        if s >= video_duration:
            continue
        kept_dense.append({
            "name": ent.get("name"),
            "description": ent.get("description", ""),
            "time_intervals": [s, min(e, video_duration)],
        })
    dense_entities_raw = kept_dense

    dense_names = {e["name"] for e in dense_entities_raw}
    global_kept = [g for g in global_entities_raw if g.get("name") in dense_names]

    entity_names_ordered: list[str] = []
    for g in global_kept:
        n = g.get("name")
        if n and n not in entity_names_ordered:
            entity_names_ordered.append(n)
    entities_kept = entity_names_ordered[:max_entities]
    surviving = set(entities_kept)
    dense_entities_raw = [d for d in dense_entities_raw if d["name"] in surviving]

    entity_to_index: dict[str, int] = {}
    if "{camera}" in surviving:
        entity_to_index["{camera}"] = 1
    if "{shot_transition}" in surviving:
        entity_to_index["{shot_transition}"] = 2
    next_idx = 3
    for ent in entities_kept:
        if ent in entity_to_index:
            continue
        entity_to_index[ent] = next_idx
        next_idx += 1
    sorted_entities = sorted(entities_kept, key=lambda n: entity_to_index[n])

    dense_events: list[dict] = []
    for ent in dense_entities_raw:
        iv = ent["time_intervals"]
        dense_events.append({
            "name": ent["name"],
            "description": ent.get("description", ""),
            "start": iv[0],
            "end": iv[1],
        })
    name_to_pos = {n: i for i, n in enumerate(sorted_entities)}
    dense_events.sort(
        key=lambda d: (d["start"], d["end"], name_to_pos.get(d["name"], 1e9))
    )
    dense_events = dense_events[:max_dense_events]

    # Caption-compressed mode: rescale every surviving event's interval so
    # that the max end time across the capped set lands at video_duration.
    # orig_total is taken AFTER max_entities + max_dense_events caps (per the
    # design: a dropped tail-end event that was the longest is gone, so the
    # surviving set's max end is the right reference).
    orig_total: float | None = None
    compression_ratio = 1.0
    if caption_compressed and dense_events:
        orig_total = max(float(de["end"]) for de in dense_events)
        orig_total = max(orig_total, 1e-6)
        compression_ratio = float(video_duration) / orig_total
        for de in dense_events:
            de["start"] = float(de["start"]) * compression_ratio
            de["end"] = float(de["end"]) * compression_ratio

    per_entity_intervals: dict[str, list[tuple[float, float]]] = {}
    for de in dense_events:
        if de["start"] > 0 or de["end"] > 0:
            per_entity_intervals.setdefault(de["name"], []).append(
                (de["start"], de["end"])
            )

    name_to_global = {g["name"]: g for g in global_kept}
    entities_out: list[dict | None] = []
    for n in sorted_entities:
        g = name_to_global.get(n, {})
        ivs = per_entity_intervals.get(n, [])[:max_entity_intervals]
        entities_out.append({
            "name": n,
            "description": g.get("description", ""),
            "ref_image_path": _resolve_ref(g.get("ref_image_path")),
            "intervals": ivs,
            "entity_index": entity_to_index[n],
        })
    while len(entities_out) < max_entities:
        entities_out.append(None)

    ref_paths: list[dict] = []
    for ent in entities_out:
        if ent is None:
            continue
        if ent["entity_index"] <= 2:
            continue
        if ent.get("ref_image_path"):
            ref_paths.append({
                "entity": ent["name"],
                "ref_image_path": ent["ref_image_path"],
            })
            if len(ref_paths) >= max_ref_entities:
                break

    chunks_out: list[dict] = []
    if shotwise:
        # Compute chunks from the (possibly compressed) shot_transition events.
        chunks_out = _build_chunks(
            dense_events=dense_events, video_duration=video_duration,
        )
        # For each entity, replace its ``intervals`` list with the per-chunk
        # sub-intervals (intersection of every original interval with every
        # chunk's valid range).  Entries are ordered chunk-first, so an
        # entity's interval[i] is exactly the i-th sub-interval recorded in
        # the ``chunks`` block (by the order entries are appended).  This
        # lets compute_grounding look up `entities[name].metrics_per_interval[i]`
        # via the (chunk_index, interval_index) pair we record here.
        for ent in entities_out:
            if ent is None:
                continue
            orig_ivs = list(ent["intervals"])
            new_ivs: list[tuple[float, float]] = []
            for chunk in chunks_out:
                valid = chunk["valid_range"]
                for orig_iv in orig_ivs:
                    o_s, o_e = float(orig_iv[0]), float(orig_iv[1])
                    for vs, ve in valid:
                        s = max(o_s, vs)
                        e = min(o_e, ve)
                        if e > s + 1e-9:
                            interval_index = len(new_ivs)
                            new_ivs.append((s, e))
                            chunk["entries"].append({
                                "entity_name": ent["name"],
                                "interval_index": interval_index,
                                "sub_interval": [s, e],
                            })
            ent["intervals"] = new_ivs

    return {
        "video_duration": video_duration,
        "entities": entities_out,
        "dense_events": dense_events,
        "ref_images": ref_paths,
        "caption_compressed": bool(caption_compressed),
        "orig_total": orig_total,
        "compression_ratio": compression_ratio if caption_compressed else None,
        "shotwise": bool(shotwise),
        "chunks": chunks_out,
    }


# ---------------------------------------------------------------------------
# Interval helpers
# ---------------------------------------------------------------------------

def merge_intervals(
    intervals: list[tuple[float, float]],
    epsilon: float = 1e-3,
) -> list[tuple[float, float]]:
    if not intervals:
        return []
    sorted_iv = sorted([(float(s), float(e)) for s, e in intervals if e > s])
    merged: list[tuple[float, float]] = []
    for s, e in sorted_iv:
        if not merged:
            merged.append((s, e))
            continue
        ps, pe = merged[-1]
        if s <= pe + epsilon:
            merged[-1] = (ps, max(pe, e))
        else:
            merged.append((s, e))
    return merged


def percentile_frame_indices(
    start_sec: float,
    end_sec: float,
    fps: float,
    n_frames_total: int,
    percentiles: tuple[float, ...] = (0.2, 0.5, 0.8),
) -> list[int]:
    last = n_frames_total - 1
    s_frame = max(0, min(last, int(round(start_sec * fps))))
    e_frame = max(0, min(last, int(round(end_sec * fps)) - 1))
    if e_frame < s_frame:
        e_frame = s_frame
    out: list[int] = []
    seen: set[int] = set()
    for p in percentiles:
        idx = int(round(s_frame + p * (e_frame - s_frame)))
        idx = max(s_frame, min(e_frame, idx))
        if idx not in seen:
            out.append(idx)
            seen.add(idx)
    return out


# ---------------------------------------------------------------------------
# Video I/O
# ---------------------------------------------------------------------------

def probe_video(path: str) -> tuple[int, int, int, float, float]:
    info = subprocess.run(
        ["ffprobe", "-v", "quiet", "-print_format", "json",
         "-show_streams", path],
        capture_output=True, text=True, check=True, stdin=subprocess.DEVNULL,
    )
    streams = json.loads(info.stdout)["streams"]
    v = next(s for s in streams if s["codec_type"] == "video")
    num, den = (v.get("r_frame_rate", "30/1").split("/") + ["1"])[:2]
    fps = float(num) / max(1.0, float(den))
    width = int(v["width"])
    height = int(v["height"])
    duration = float(v.get("duration", 0.0))
    n_frames = int(v.get("nb_frames", 0))
    if n_frames == 0:
        n_frames = max(1, int(round(duration * fps)))
    return n_frames, height, width, fps, duration


def extract_frames_to_dir(video_path: str, out_dir: str) -> None:
    os.makedirs(out_dir, exist_ok=True)
    cmd = [
        "ffmpeg", "-y", "-nostdin", "-i", video_path,
        "-q:v", "2",
        os.path.join(out_dir, "%06d.jpg"),
    ]
    subprocess.run(cmd, capture_output=True, text=True, check=True,
                   stdin=subprocess.DEVNULL)


def list_frame_paths(frames_dir: str) -> list[str]:
    files = [
        f for f in os.listdir(frames_dir)
        if f.endswith(".jpg") or f.endswith(".jpeg") or f.endswith(".png")
    ]
    files.sort(
        key=lambda p: int(re.sub(r"[^0-9]", "", os.path.splitext(p)[0]) or "0")
    )
    return [os.path.join(frames_dir, f) for f in files]


def write_mask_video(
    mask_arr: np.ndarray,
    out_path: str,
    fps: float,
    crf: int = 23,
) -> None:
    """Write a (T, H, W) uint8 binary mask as an mp4.

    Uses libx264 with yuv420p output. Input is RGB with the mask value
    duplicated across all channels so the resulting yuv420p stream has zero
    chroma (no color leak) and a near-binary luma channel.
    """
    T, H, W = mask_arr.shape
    rgb = np.repeat(mask_arr[..., None] * 255, 3, axis=-1).astype(np.uint8)
    cmd = [
        "ffmpeg", "-y", "-nostdin",
        "-f", "rawvideo", "-vcodec", "rawvideo",
        "-s", f"{W}x{H}", "-pix_fmt", "rgb24", "-r", str(fps), "-i", "-",
        "-vcodec", "libx264", "-crf", str(int(crf)),
        "-pix_fmt", "yuv420p", "-an", "-loglevel", "error",
        out_path,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    proc.communicate(input=rgb.tobytes())
    if proc.stdin:
        proc.stdin.close()


def write_mask_image(
    mask: np.ndarray,
    out_path: str,
    quality: int = 90,
) -> None:
    """Write a single (H, W) uint8 binary mask as a grayscale JPG."""
    img = (mask.astype(np.uint8) * 255)
    cv2.imwrite(out_path, img, [int(cv2.IMWRITE_JPEG_QUALITY), int(quality)])


# ---------------------------------------------------------------------------
# Model loading
# ---------------------------------------------------------------------------

def load_grounding_dino(model_id: str, device: torch.device):
    from transformers import AutoModelForZeroShotObjectDetection, AutoProcessor
    proc = AutoProcessor.from_pretrained(model_id)
    model = AutoModelForZeroShotObjectDetection.from_pretrained(model_id).to(device)
    model.eval()
    return model, proc


def load_clip(model_name: str, device: torch.device):
    if openai_clip is None:
        raise RuntimeError("openai-clip is not installed; pip install git+https://github.com/openai/CLIP.git")
    model, preprocess = openai_clip.load(model_name, device=device)
    model.eval()
    return model, preprocess


def load_sam(sam_variant: str, sam_id: str, device: torch.device):
    if sam_variant == "sam2":
        from transformers import Sam2VideoModel, Sam2VideoProcessor
        dtype = torch.bfloat16 if device.type == "cuda" else torch.float32
        model = Sam2VideoModel.from_pretrained(sam_id).to(device, dtype=dtype)
        processor = Sam2VideoProcessor.from_pretrained(sam_id)
    elif sam_variant == "sam3":
        from transformers import Sam3TrackerVideoModel, Sam3TrackerVideoProcessor
        dtype = torch.bfloat16 if device.type == "cuda" else torch.float32
        model = Sam3TrackerVideoModel.from_pretrained(sam_id).to(device, dtype=dtype)
        processor = Sam3TrackerVideoProcessor.from_pretrained(sam_id)
    else:
        raise ValueError(f"unknown sam_variant: {sam_variant!r}")
    model.eval()
    return model, processor


# ---------------------------------------------------------------------------
# Grounding DINO + CLIP
# ---------------------------------------------------------------------------

def run_grounding_dino(
    model,
    processor,
    image: Image.Image,
    text: str,
    box_threshold: float,
    text_threshold: float,
    device: torch.device,
) -> list[dict]:
    inputs = processor(images=image, text=text, return_tensors="pt").to(device)
    with torch.no_grad():
        outputs = model(**inputs)
    target_sizes = torch.tensor([image.size[::-1]], device=device)
    results = processor.post_process_grounded_object_detection(
        outputs,
        threshold=box_threshold,
        text_threshold=text_threshold,
        target_sizes=target_sizes,
    )[0]
    boxes_xyxy = results.get("boxes")
    scores = results.get("scores")
    out: list[dict] = []
    if boxes_xyxy is None or len(boxes_xyxy) == 0:
        return out
    W, H = image.size
    for box, score in zip(boxes_xyxy.cpu().tolist(), scores.cpu().tolist()):
        x1, y1, x2, y2 = box
        x1 = max(0.0, min(float(x1), W - 1))
        y1 = max(0.0, min(float(y1), H - 1))
        x2 = max(0.0, min(float(x2), W - 1))
        y2 = max(0.0, min(float(y2), H - 1))
        if x2 <= x1 or y2 <= y1:
            continue
        out.append({
            "xyxy_norm": [x1 / W, y1 / H, x2 / W, y2 / H],
            "xyxy_pixel": [x1, y1, x2, y2],
            "score": float(score),
        })
    return out


def clip_score(
    clip_model,
    clip_preprocess,
    image: Image.Image,
    box_xyxy_pixel: list[float],
    text: str,
    device: torch.device,
) -> float:
    if openai_clip is None:
        return 0.0
    x1, y1, x2, y2 = box_xyxy_pixel
    crop = image.crop((int(x1), int(y1), int(x2), int(y2)))
    if crop.size[0] <= 1 or crop.size[1] <= 1:
        return 0.0
    img_tensor = clip_preprocess(crop).unsqueeze(0).to(device)
    tokens = openai_clip.tokenize([text], truncate=True).to(device)
    with torch.no_grad():
        i = clip_model.encode_image(img_tensor)
        t = clip_model.encode_text(tokens)
        i = i / i.norm(dim=-1, keepdim=True)
        t = t / t.norm(dim=-1, keepdim=True)
        sim = (i * t).sum(dim=-1)
    return float(sim.cpu().item())


# ---------------------------------------------------------------------------
# SAM driver: per-interval add_inputs + (optional) propagation
# ---------------------------------------------------------------------------

def _post_process_to_2d_mask(
    sam_processor,
    pred_masks: torch.Tensor,
    H: int,
    W: int,
) -> np.ndarray:
    """Return (num_objs, H, W) uint8 binary mask array."""
    masks = sam_processor.post_process_masks(
        [pred_masks], original_sizes=[[H, W]], binarize=True,
    )[0]
    out = []
    for k in range(masks.shape[0]):
        m = masks[k].cpu().numpy().astype(np.uint8)
        if m.ndim == 3:
            m = m.squeeze(0)
        out.append((m > 0).astype(np.uint8))
    if not out:
        return np.zeros((0, H, W), dtype=np.uint8)
    return np.stack(out, axis=0)


def run_sam_for_interval(
    sam_model,
    sam_processor,
    sub_frames: list[Image.Image],
    boxes: list[dict],
    H: int,
    W: int,
    skip_propagation: bool,
    save_keyframes: bool,
) -> tuple[dict[int, np.ndarray], dict[int, np.ndarray]]:
    """Run SAM2/SAM3 on a single disjoint interval.

    Args:
        sub_frames: PIL frames covering ``[s_frame, e_frame]`` of the original video.
        boxes: list of dicts with ``local_frame_idx`` and ``xyxy_pixel``. Each
            entry becomes its own ``obj_id`` in the SAM session.
        skip_propagation: if True, only run SAM at the keyframes; do NOT
            propagate through other frames.
        save_keyframes: if True, ensure the keyframe masks are returned in
            ``keyframe_masks`` (otherwise that dict is empty).

    Returns:
        ``per_frame_mask``: dict ``local_frame_idx -> (H, W) uint8`` (only
            populated when propagation runs).
        ``keyframe_masks``: dict ``local_frame_idx -> (H, W) uint8`` for each
            distinct keyframe local index. If multiple boxes share a keyframe
            local index, masks are OR-combined into one entry.
    """
    per_frame_mask: dict[int, np.ndarray] = {}
    keyframe_masks: dict[int, np.ndarray] = {}
    if not boxes or not sub_frames:
        return per_frame_mask, keyframe_masks

    session = sam_processor.init_video_session(
        video=sub_frames,
        inference_device=sam_model.device,
        processing_device="cpu",
        video_storage_device="cpu",
        dtype=sam_model.dtype,
    )
    n_local = len(sub_frames)

    distinct_keyframes = sorted({int(b["local_frame_idx"]) for b in boxes})

    # Group kept boxes by local-frame, picking the top-CLIP box per frame as the
    # SAM2 prompt. SAM2 disallows different obj_ids whose initial-conditioning
    # frames differ, so multi-keyframe must use a single obj_id. Multiple boxes
    # at the SAME frame for the SAME obj_id can't be combined either (default
    # ``clear_old_inputs=True`` overwrites; ``clear_old_inputs=False`` errors
    # out once a box has been added). The full per-frame box set is preserved
    # in the log for analysis even though only the top-CLIP box at each frame
    # acts as the SAM2 prompt.
    boxes_by_frame: dict[int, list[dict]] = {}
    for b in boxes:
        f_local = int(b["local_frame_idx"])
        f_local = max(0, min(n_local - 1, f_local))
        boxes_by_frame.setdefault(f_local, []).append(b)

    n_added = 0
    for f_local in sorted(boxes_by_frame.keys()):
        frame_boxes = sorted(
            boxes_by_frame[f_local],
            key=lambda x: x["clip_score"], reverse=True,
        )
        primary = frame_boxes[0]
        x1, y1, x2, y2 = (float(v) for v in primary["xyxy_pixel"])
        try:
            sam_processor.add_inputs_to_inference_session(
                inference_session=session,
                frame_idx=f_local,
                obj_ids=1,
                input_boxes=[[[x1, y1, x2, y2]]],
            )
            n_added += 1
        except Exception as exc:
            log(f"  SAM add_inputs failed at frame {f_local}: {exc}")
    if n_added == 0:
        return per_frame_mask, keyframe_masks

    if skip_propagation:
        if save_keyframes:
            for kf_local in distinct_keyframes:
                try:
                    it = sam_model.propagate_in_video_iterator(
                        session,
                        start_frame_idx=kf_local,
                        max_frame_num_to_track=1,
                        reverse=False,
                    )
                    for output in it:
                        masks = _post_process_to_2d_mask(
                            sam_processor, output.pred_masks, H, W,
                        )
                        if masks.shape[0] == 0:
                            break
                        union = np.any(masks > 0, axis=0).astype(np.uint8)
                        keyframe_masks[kf_local] = union
                        break
                except Exception as exc:
                    log(f"  SAM single-frame inference failed at local {kf_local}: {exc}")
        return per_frame_mask, keyframe_masks

    earliest_kf = distinct_keyframes[0]
    latest_kf = distinct_keyframes[-1]

    # Forward propagation (earliest keyframe -> end of interval)
    try:
        for output in sam_model.propagate_in_video_iterator(
            session, start_frame_idx=earliest_kf, reverse=False,
        ):
            masks = _post_process_to_2d_mask(
                sam_processor, output.pred_masks, H, W,
            )
            if masks.shape[0] == 0:
                continue
            union = np.any(masks > 0, axis=0).astype(np.uint8)
            f_local = int(output.frame_idx)
            per_frame_mask[f_local] = union
    except Exception as exc:
        log(f"  SAM forward propagation failed: {exc}")

    # Backward propagation (latest keyframe -> start of interval)
    try:
        for output in sam_model.propagate_in_video_iterator(
            session, start_frame_idx=latest_kf, reverse=True,
        ):
            masks = _post_process_to_2d_mask(
                sam_processor, output.pred_masks, H, W,
            )
            if masks.shape[0] == 0:
                continue
            union = np.any(masks > 0, axis=0).astype(np.uint8)
            f_local = int(output.frame_idx)
            if f_local not in per_frame_mask:
                per_frame_mask[f_local] = union
    except Exception as exc:
        log(f"  SAM backward propagation failed: {exc}")

    if save_keyframes:
        for kf_local in distinct_keyframes:
            if kf_local in per_frame_mask:
                keyframe_masks[kf_local] = per_frame_mask[kf_local]

    return per_frame_mask, keyframe_masks


# ---------------------------------------------------------------------------
# Per-entity processing
# ---------------------------------------------------------------------------

def process_entity(
    *,
    ent: dict,
    ent_idx: int,
    base_name: str,
    out_root: str,
    args,
    grounding_model,
    grounding_proc,
    clip_model,
    clip_preprocess,
    sam_model,
    sam_proc,
    device: torch.device,
    video_pil: list[Image.Image],
    n_frames: int,
    H: int,
    W: int,
    fps: float,
) -> dict:
    """Run grounding + clip + sam2 for one entity. Returns the entity sub-log."""
    timings: dict[str, float] = {
        "gdino": 0.0,
        "clip": 0.0,
        "sam_init": 0.0,
        "sam_keyframes": 0.0,
        "sam_propagation": 0.0,
        "mask_video_write": 0.0,
        "mask_image_write": 0.0,
    }

    disjoint = merge_intervals(ent["intervals"])

    # Strategy: feed Grounding DINO just the natural entity name so its boxes
    # are not biased by clothing / jewelry / accessory tokens in the long
    # description. The full first-sentence description (``text_raw``) is still
    # used for CLIP-text similarity (saved on every kept box and used as the
    # selection metric for SAM2 prompting).
    text_raw = _entity_text_for_grounding(ent["name"], ent["description"])
    grounding_text = _normalize_grounding_text(_natural_name(ent["name"]))

    full_mask = np.zeros((n_frames, H, W), dtype=np.uint8)

    sub_log: dict[str, Any] = {
        "entity_name": ent["name"],
        "entity_index": ent["entity_index"],
        "description": ent["description"],
        "ref_image_path": ent["ref_image_path"],
        "intervals_sec": list(ent["intervals"]),
        "disjoint_intervals_sec": [list(iv) for iv in disjoint],
        "grounding_text": grounding_text,
        "intervals": [],
        "mask_video_path": None,
        "saved_keyframe_masks": [],
        "timings": timings,
    }

    for iv_idx, (s_sec, e_sec) in enumerate(disjoint):
        last = n_frames - 1
        s_frame = max(0, min(last, int(round(s_sec * fps))))
        e_frame = max(0, min(last, int(round(e_sec * fps)) - 1))
        if e_frame < s_frame:
            e_frame = s_frame
        pcts = percentile_frame_indices(
            s_sec, e_sec, fps, n_frames, percentiles=tuple(args.percentiles),
        )
        iv_log: dict[str, Any] = {
            "interval_idx": iv_idx,
            "start_sec": s_sec,
            "end_sec": e_sec,
            "start_frame": s_frame,
            "end_frame": e_frame,
            "candidates": [],
            "kept_boxes": [],
        }
        kept: list[dict] = []
        for fr in pcts:
            img = video_pil[fr]
            t0 = time.time()
            boxes = run_grounding_dino(
                grounding_model, grounding_proc, img, grounding_text,
                box_threshold=args.gd_box_threshold,
                text_threshold=args.gd_text_threshold,
                device=device,
            )
            timings["gdino"] += time.time() - t0
            cand_log = {"frame": fr, "boxes": []}
            if boxes:
                # Compute CLIP-text similarity for every gdino box against the
                # full description, then keep the highest-scoring one. (gdino
                # got the entity name only as its prompt, so its own scores
                # don't disambiguate between e.g. multiple people in the frame
                # — only the full description does.)
                t0 = time.time()
                clip_scores = [
                    clip_score(
                        clip_model, clip_preprocess, img,
                        b["xyxy_pixel"], text_raw, device,
                    )
                    for b in boxes
                ]
                timings["clip"] += time.time() - t0
                top_idx = int(np.argmax(clip_scores))
                top_box = boxes[top_idx]
                cs = clip_scores[top_idx]
                b_entry = {
                    "xyxy_norm": top_box["xyxy_norm"],
                    "xyxy_pixel": top_box["xyxy_pixel"],
                    "grounding_score": float(top_box.get("score") or 0.0),
                    "clip_score": cs,
                    "selection_metric": "clip_score",
                    "n_gdino_boxes": len(boxes),
                    "kept": cs >= args.clip_threshold,
                }
                cand_log["boxes"].append(b_entry)
                if cs >= args.clip_threshold:
                    kept.append({
                        "frame": fr,
                        "local_frame_idx": fr - s_frame,
                        "xyxy_pixel": top_box["xyxy_pixel"],
                        "xyxy_norm": top_box["xyxy_norm"],
                        "grounding_score": float(top_box.get("score") or 0.0),
                        "clip_score": cs,
                    })
            iv_log["candidates"].append(cand_log)
        iv_log["kept_boxes"] = kept

        # Run SAM if any kept boxes AND we need SAM output (mask video or kf imgs)
        sam_needed = kept and (
            (not args.skip_mask_tracking) or args.save_sam_masks
        )
        if sam_needed:
            sub_frames = video_pil[s_frame:e_frame + 1]
            t0 = time.time()
            per_frame, keyframe_masks = run_sam_for_interval(
                sam_model, sam_proc,
                sub_frames, kept, H, W,
                skip_propagation=args.skip_mask_tracking,
                save_keyframes=args.save_sam_masks,
            )
            elapsed = time.time() - t0
            if args.skip_mask_tracking:
                timings["sam_keyframes"] += elapsed
            else:
                timings["sam_propagation"] += elapsed

            # Apply propagation masks to the full-length array (only when not skipping)
            if not args.skip_mask_tracking:
                for f_local, m in per_frame.items():
                    gf = s_frame + f_local
                    if s_frame <= gf <= e_frame:
                        full_mask[gf] = m

            # Save per-keyframe mask images
            if args.save_sam_masks and keyframe_masks:
                t0 = time.time()
                for f_local, m in keyframe_masks.items():
                    gf = s_frame + f_local
                    img_path = os.path.join(
                        out_root,
                        f"{base_name}_maskimg_{ent_idx:02d}_"
                        f"{_sanitize(ent['name'])}_iv{iv_idx:02d}_f{gf:04d}.jpg",
                    )
                    write_mask_image(m, img_path, quality=args.mask_image_quality)
                    sub_log["saved_keyframe_masks"].append({
                        "interval_idx": iv_idx,
                        "frame": gf,
                        "path": os.path.abspath(img_path),
                    })
                timings["mask_image_write"] += time.time() - t0

        sub_log["intervals"].append(iv_log)

    if not args.skip_mask_tracking:
        mask_path = os.path.join(
            out_root,
            f"{base_name}_mask_{ent_idx:02d}_{_sanitize(ent['name'])}.mp4",
        )
        t0 = time.time()
        write_mask_video(full_mask, mask_path, fps, crf=args.mask_crf)
        timings["mask_video_write"] += time.time() - t0
        sub_log["mask_video_path"] = os.path.abspath(mask_path)
    sub_log["active_frames"] = int(full_mask.any(axis=(1, 2)).sum())
    return sub_log


# ---------------------------------------------------------------------------
# Per-video processing
# ---------------------------------------------------------------------------

def process_video(
    *,
    video_path: str,
    json_path: str,
    out_root: str,
    base_name: str,
    args,
    grounding_model,
    grounding_proc,
    clip_model,
    clip_preprocess,
    sam_model,
    sam_proc,
    device: torch.device,
) -> dict:
    log(f"=== {base_name}: {os.path.basename(video_path)} <- {os.path.basename(json_path)}")

    with open(json_path) as f:
        json_data = json.load(f)

    n_frames, H, W, fps, duration = probe_video(video_path)
    eval_duration = args.time if args.time is not None else duration
    truncated = truncate_prompt(
        json_data,
        max_entities=args.max_entities,
        max_dense_events=args.max_dense_events,
        max_entity_intervals=args.max_entity_intervals,
        eval_duration=eval_duration,
        max_ref_entities=args.max_ref_entities,
        caption_compressed=getattr(args, "caption_compressed", False),
        shotwise=getattr(args, "shotwise", False),
    )
    log(f"  duration={duration:.2f}s eval_duration={eval_duration:.2f}s "
        f"frames={n_frames} fps={fps:.2f} HxW={H}x{W}")

    target_entities = []
    for ent in truncated["entities"]:
        if ent is None:
            continue
        if ent["name"] in ("{camera}", "{shot_transition}"):
            continue
        if ent["name"].startswith("{scene_"):
            continue
        if not ent["intervals"]:
            continue
        target_entities.append(ent)
    log(f"  {len(target_entities)} target entities for masking")

    progress_dir = os.path.join(out_root, f"{base_name}_progress")
    os.makedirs(progress_dir, exist_ok=True)

    # Quick pre-check: are all entities already done? Even before extracting frames.
    if args.skip_existing:
        all_done = True
        for ent_idx, ent in enumerate(target_entities):
            sub_log_path = os.path.join(
                progress_dir, f"{ent_idx:02d}_{_sanitize(ent['name'])}.json",
            )
            if not os.path.exists(sub_log_path):
                all_done = False
                break
        if all_done and target_entities:
            log("  all entities already processed; rebuilding merged log only")
            sub_logs = []
            for ent_idx, ent in enumerate(target_entities):
                p = os.path.join(progress_dir, f"{ent_idx:02d}_{_sanitize(ent['name'])}.json")
                with open(p) as f:
                    sub_logs.append(json.load(f))
            return _write_merged_log(
                video_path, json_path, eval_duration, duration, fps, H, W,
                n_frames, truncated, sub_logs, out_root, base_name,
            )

    # Extract video frames
    with tempfile.TemporaryDirectory(prefix=f"frames_{base_name}_") as tmp:
        extract_frames_to_dir(video_path, tmp)
        frame_paths = list_frame_paths(tmp)
        if len(frame_paths) != n_frames:
            log(f"  WARN: expected {n_frames} frames, found {len(frame_paths)}")
            n_frames = len(frame_paths)
        video_pil = [Image.open(p).convert("RGB") for p in frame_paths]
        H = video_pil[0].height
        W = video_pil[0].width

        sub_logs: list[dict] = []
        for ent_idx, ent in enumerate(target_entities):
            sub_log_path = os.path.join(
                progress_dir, f"{ent_idx:02d}_{_sanitize(ent['name'])}.json",
            )
            if args.skip_existing and os.path.exists(sub_log_path):
                with open(sub_log_path) as f:
                    sub_logs.append(json.load(f))
                log(f"  -> {ent['name']}  [skipped, already done]")
                continue

            t_start = time.time()
            sub_log = process_entity(
                ent=ent, ent_idx=ent_idx, base_name=base_name,
                out_root=out_root, args=args,
                grounding_model=grounding_model, grounding_proc=grounding_proc,
                clip_model=clip_model, clip_preprocess=clip_preprocess,
                sam_model=sam_model, sam_proc=sam_proc, device=device,
                video_pil=video_pil, n_frames=n_frames, H=H, W=W, fps=fps,
            )
            sub_log["wall_time_sec"] = time.time() - t_start
            with open(sub_log_path, "w") as f:
                json.dump(sub_log, f, indent=2)
            sub_logs.append(sub_log)

            n_kept = sum(len(iv["kept_boxes"]) for iv in sub_log["intervals"])
            n_disjoint = len(sub_log["disjoint_intervals_sec"])
            n_imgs = len(sub_log["saved_keyframe_masks"])
            af = sub_log.get("active_frames", 0)
            log(f"  -> {ent['name']}  intervals={n_disjoint}  kept_boxes={n_kept}  "
                f"keyframe_imgs={n_imgs}  active_frames={af}/{n_frames}  "
                f"wall={sub_log['wall_time_sec']:.1f}s "
                f"(gdino={sub_log['timings']['gdino']:.1f} "
                f"clip={sub_log['timings']['clip']:.1f} "
                f"sam_kf={sub_log['timings']['sam_keyframes']:.1f} "
                f"sam_prop={sub_log['timings']['sam_propagation']:.1f})")

    return _write_merged_log(
        video_path, json_path, eval_duration, duration, fps, H, W,
        n_frames, truncated, sub_logs, out_root, base_name,
    )


def _write_merged_log(
    video_path: str,
    json_path: str,
    eval_duration: float,
    duration: float,
    fps: float,
    H: int,
    W: int,
    n_frames: int,
    truncated: dict,
    sub_logs: list[dict],
    out_root: str,
    base_name: str,
) -> dict:
    log_record = {
        "video_path": os.path.abspath(video_path),
        "json_path": os.path.abspath(json_path),
        "video_duration": duration,
        "eval_duration": eval_duration,
        "fps": fps,
        "height": H,
        "width": W,
        "n_frames": n_frames,
        "ref_images": truncated["ref_images"],
        "dense_events": truncated["dense_events"],
        "entities": sub_logs,
        # Shotwise / caption-compressed metadata.  Empty (or False) when
        # the corresponding mode was off — downstream scripts can branch
        # on the presence of the ``chunks`` list.
        "shotwise": bool(truncated.get("shotwise", False)),
        "chunks": truncated.get("chunks", []) or [],
        "caption_compressed": bool(truncated.get("caption_compressed", False)),
        "compression_ratio": truncated.get("compression_ratio"),
        "orig_total": truncated.get("orig_total"),
    }
    log_path = os.path.join(out_root, f"{base_name}_grounding_log.json")
    with open(log_path, "w") as f:
        json.dump(log_record, f, indent=2)
    log(f"  log: {log_path}")
    return log_record


# ---------------------------------------------------------------------------
# Skip-existing: per-video artifact completeness
# ---------------------------------------------------------------------------

def is_video_complete(out_root: str, base_name: str, args) -> bool:
    """Return True iff every per-video artifact expected for this run's flags
    is present on disk.

    Re-checked under the *current run's* flags so adding ``--save_sam_masks``
    or removing ``--skip_mask_tracking`` correctly invalidates a prior log
    that lacks the new artifacts.

    Conditions:
      * ``{base}_grounding_log.json`` exists and parses.
      * For each entity that has at least one kept box from Grounding DINO:
          - if not ``--skip_mask_tracking``: ``mask_video_path`` is set and
            the file exists on disk.
          - if ``--save_sam_masks``: ``saved_keyframe_masks`` is non-empty
            and every listed ``path`` exists on disk.
      * Entities with zero kept boxes are trivially complete (no SAM work).
    """
    log_path = os.path.join(out_root, f"{base_name}_grounding_log.json")
    if not os.path.exists(log_path):
        return False
    try:
        with open(log_path) as f:
            log_dict = json.load(f)
    except (json.JSONDecodeError, OSError):
        return False
    for ent in log_dict.get("entities") or []:
        n_kept = sum(len(iv.get("kept_boxes", []))
                     for iv in ent.get("intervals", []))
        if n_kept <= 0:
            continue
        if not args.skip_mask_tracking:
            mvp = ent.get("mask_video_path")
            if not mvp or not os.path.exists(mvp):
                return False
        if args.save_sam_masks:
            keyframes = ent.get("saved_keyframe_masks") or []
            if not keyframes:
                return False
            for kf in keyframes:
                if not os.path.exists(kf.get("path", "")):
                    return False
    return True


# ---------------------------------------------------------------------------
# Pairing videos with prompts
# ---------------------------------------------------------------------------

def list_videos(videos_dir: str) -> list[tuple[int, str]]:
    out: list[tuple[int, str]] = []
    for f in sorted(os.listdir(videos_dir)):
        if not f.endswith(".mp4"):
            continue
        m = re.match(r"^(\d+)\.mp4$", f)
        if not m:
            continue
        out.append((int(m.group(1)), os.path.join(videos_dir, f)))
    out.sort(key=lambda x: x[0])
    return out


def resolve_json_for_index(
    idx: int,
    prompts_data: list | None,
    sorted_dir_jsons: list[str] | None,
) -> str | None:
    if prompts_data is not None:
        list_idx = idx - 1
        if list_idx < 0 or list_idx >= len(prompts_data):
            return None
        entry = prompts_data[list_idx]
        if "enhanced_prompt" in entry and "ultra_dense_json" in entry["enhanced_prompt"]:
            return entry["enhanced_prompt"]["ultra_dense_json"]
        if "ultra_dense_json" in entry:
            return entry["ultra_dense_json"]
        return None
    if sorted_dir_jsons is not None:
        list_idx = idx - 1
        if 0 <= list_idx < len(sorted_dir_jsons):
            return sorted_dir_jsons[list_idx]
    return None


def find_dir_jsons(prompts_dir: str) -> list[str]:
    files = [
        f for f in os.listdir(prompts_dir)
        if f.endswith("_ultra_dense.json")
    ]
    files.sort()
    return [os.path.join(prompts_dir, f) for f in files]


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    ap = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    # Single-run shape (backwards-compat).  Still mutually exclusive with --run
    # below; required-ness is enforced after parsing so --run alone is accepted.
    ap.add_argument("--videos-dir", default=None,
                    help="Single-run input dir (backwards-compat).")
    g = ap.add_mutually_exclusive_group()
    g.add_argument("--prompts-file", default=None)
    g.add_argument("--prompts-dir", default=None)
    ap.add_argument("--refs-dir", default=None,
                    help="Directory of reference images. Bare ref_image_path "
                         "filenames in the prompts are resolved against it.")
    ap.add_argument("--output-root", default=None,
                    help="Single-run output dir (backwards-compat).")
    ap.add_argument("--max-entities", type=int, default=8)
    ap.add_argument("--max-dense-events", type=int, default=16)
    ap.add_argument("--max-entity-intervals", type=int, default=16)
    ap.add_argument("--max-ref-entities", type=int, default=4)
    ap.add_argument("--time", type=float, default=None)
    ap.add_argument("--percentiles", type=float, nargs="+", default=[0.2, 0.5, 0.8])
    ap.add_argument("--clip-threshold", type=float, default=0.1)
    ap.add_argument("--gd-box-threshold", type=float, default=0.25)
    ap.add_argument("--gd-text-threshold", type=float, default=0.20)
    ap.add_argument("--grounding-model-id", default="IDEA-Research/grounding-dino-base")
    ap.add_argument("--clip-model-name", default="ViT-B/32")
    ap.add_argument("--sam-variant", default="sam2", choices=["sam2", "sam3"])
    ap.add_argument("--sam-model-id", default=None)
    ap.add_argument("--device", default=None,
                    help="Override device. Default: cuda:LOCAL_RANK if available else cpu.")
    ap.add_argument("--limit", type=int, default=None)
    ap.add_argument("--start", type=int, default=0)
    ap.add_argument("--skip-existing", action="store_true",
                    help="Skip entities/videos whose per-entity sub-log or "
                         "{base}_grounding_log.json already exists.")
    ap.add_argument("--save_sam_masks", action="store_true",
                    help="Save SAM2 mask jpg(s) at each kept keyframe per interval.")
    ap.add_argument("--skip_mask_tracking", action="store_true",
                    help="Skip SAM2 propagation through the interval; do not "
                         "produce a per-entity mask video. Only effective with "
                         "--save_sam_masks if you want any SAM output at all.")
    ap.add_argument("--mask-crf", type=int, default=23,
                    help="libx264 CRF for the mask mp4. 23 is default x264; "
                         "raise to ~28 for smaller files at minor edge cost.")
    ap.add_argument("--mask-image-quality", type=int, default=90,
                    help="JPEG quality (1-100) for keyframe mask images.")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--shotwise", action="store_true",
                    help="Split each video into chunks at the midpoints of its "
                         "shot_transition events; do grounding/CLIP/SAM per "
                         "(chunk, visible-entity) within each chunk's non-"
                         "transition 'valid range'.  Entity intervals are "
                         "intersected with each chunk's valid range — entities "
                         "with no overlap in a chunk contribute nothing in "
                         "that chunk.  Chunks whose valid duration is < 0.5 s "
                         "are skipped.  Composes with --caption-compressed "
                         "(compression first, chunking on the compressed "
                         "shot_transition events).  The grounding log gains a "
                         "top-level 'chunks' block recording the (entity, "
                         "interval_index) → chunk_index mapping; downstream "
                         "compute_grounding uses this to do shotwise per-video "
                         "averaging.")
    ap.add_argument("--caption-compressed", action="store_true",
                    help="Compress dense-caption timings to fit the actual video "
                         "duration instead of dropping events that start past it. "
                         "After max-entities + max-dense-events caps, every "
                         "surviving event's interval is rescaled by "
                         "video_duration / orig_total (orig_total = max end across "
                         "the capped survivors).  Frame extraction, mask "
                         "propagation and downstream metric clipping then operate "
                         "in the compressed timeline.")
    ap.add_argument("--run", action="append", nargs=3,
                    metavar=("VIDEOS_DIR", "PROMPTS", "OUTPUT_ROOT"),
                    help="Add (videos_dir, prompts_file_or_dir, output_root) "
                         "triple to the runs list.  Repeat for more runs; "
                         "Grounding-DINO, CLIP and SAM2 are loaded once and "
                         "amortised across all runs.  PROMPTS is treated as a "
                         "directory if it exists as a dir, else as a JSON file.  "
                         "Mutually exclusive with --videos-dir/--prompts-file/"
                         "--prompts-dir/--output-root.")
    args = ap.parse_args()
    global REFS_DIR
    REFS_DIR = args.refs_dir

    # Resolve runs list (backward-compat: single (videos_dir, prompts, output_root)
    # collapses to a one-element list).  If --run is provided, the four single-
    # run flags must NOT be set.
    if args.run:
        for flag in ("videos_dir", "prompts_file", "prompts_dir", "output_root"):
            if getattr(args, flag) and flag != "videos_dir":
                ap.error(f"--run cannot be combined with --{flag.replace('_','-')}; pick one shape.")
        # videos_dir is required by old argparse setup; ignore it when --run is given.
        runs: list[tuple[str, str | None, str | None, str]] = []
        for vdir, prompts, outroot in args.run:
            if os.path.isdir(prompts):
                runs.append((vdir, None, prompts, outroot))         # prompts_dir
            else:
                runs.append((vdir, prompts, None, outroot))         # prompts_file
    else:
        if not args.videos_dir or not args.output_root or (not args.prompts_file and not args.prompts_dir):
            ap.error("Must supply either --run VIDEOS_DIR PROMPTS OUTPUT_ROOT (one or more) "
                     "or all of --videos-dir + --output-root + (--prompts-file | --prompts-dir).")
        runs = [(args.videos_dir, args.prompts_file, args.prompts_dir, args.output_root)]

    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from dist_utils import (
        init_workers, slice_for_rank, is_aggregator, log_dist, env_summary,
        reset_done_sentinels, mark_rank_done, mark_aggregator_done,
        wait_for_all_ranks, wait_for_aggregator,
    )

    rank, world_size, local_rank, default_device = init_workers()
    device = torch.device(args.device) if args.device else default_device
    log_dist("env:", env_summary(), "device:", device, "runs:", len(runs))

    sam_id = args.sam_model_id or (
        "facebook/sam2-hiera-large" if args.sam_variant == "sam2"
        else "facebook/sam3"
    )

    # Load the three big models ONCE up front — the whole point of the refactor.
    # We always load Grounding-DINO + CLIP; SAM is conditional on the run flags.
    log_dist(f"Loading Grounding DINO ({args.grounding_model_id})...")
    t0 = time.time()
    grounding_model, grounding_proc = load_grounding_dino(args.grounding_model_id, device)
    log_dist(f"  loaded in {time.time()-t0:.1f}s")
    log_dist(f"Loading CLIP ({args.clip_model_name})...")
    t0 = time.time()
    clip_model, clip_preprocess = load_clip(args.clip_model_name, device)
    log_dist(f"  loaded in {time.time()-t0:.1f}s")
    sam_needed_globally = (not args.skip_mask_tracking) or args.save_sam_masks
    if sam_needed_globally:
        log_dist(f"Loading SAM ({args.sam_variant} -> {sam_id})...")
        t0 = time.time()
        sam_model, sam_proc = load_sam(args.sam_variant, sam_id, device)
        log_dist(f"  loaded in {time.time()-t0:.1f}s")
    else:
        sam_model, sam_proc = None, None
        log_dist("Skipping SAM load (gdino-only mode).")
    log_dist("All models loaded.")

    failures: list[tuple[str, str]] = []
    for run_idx, (videos_dir, prompts_file, prompts_dir, output_root) in enumerate(runs):
        log_dist(f"=== run {run_idx + 1}/{len(runs)}: {videos_dir} -> {output_root} ===")
        try:
            os.makedirs(output_root, exist_ok=True)
            sentinel_dir = os.path.join(output_root, "_dist_sentinels")
            reset_done_sentinels(sentinel_dir)

            videos = list_videos(videos_dir)
            log_dist(f"[run] {videos_dir}: found {len(videos)} videos")
            sorted_dir_jsons = find_dir_jsons(prompts_dir) if prompts_dir else None
            prompts_data: list | None = None
            if prompts_file is not None:
                with open(prompts_file) as f:
                    prompts_data = json.load(f)

            work: list[tuple[str, str, str]] = []
            for idx, vp in videos:
                jp = resolve_json_for_index(idx, prompts_data, sorted_dir_jsons)
                if jp is None or not os.path.exists(jp):
                    log_dist(f"  no JSON for video idx {idx}; skipping")
                    continue
                base = f"{idx:05d}"
                work.append((base, vp, jp))
            log_dist(f"[run] matched {len(work)} (video, json) pairs")

            if args.start:
                work = work[args.start:]
            if args.limit is not None:
                work = work[: args.limit]
            log_dist(f"[run] after start/limit: {len(work)}")

            if args.skip_existing:
                n_before = len(work)
                work = [
                    (base, vp, jp) for (base, vp, jp) in work
                    if not is_video_complete(output_root, base, args)
                ]
                log_dist(f"[run] after --skip-existing: {len(work)} remaining (of {n_before})")

            work = slice_for_rank(work)
            log_dist(f"[run] rank gets {len(work)} videos")

            if args.dry_run:
                for base, vp, jp in work[:5]:
                    log_dist(f"  {base}: {vp} <- {jp}")
                if len(work) > 5:
                    log_dist(f"  ... and {len(work) - 5} more")
            elif work:
                run_name = re.sub(r"^intermediate(?:_shotwise)?(?:_caption_comp)?_", "",
                                  os.path.basename(os.path.normpath(output_root)))
                tqdm_desc = f"[extract_masks|{run_name}] rank{rank}"
                for base, vp, jp in tqdm(work, desc=tqdm_desc):
                    try:
                        process_video(
                            video_path=vp, json_path=jp,
                            out_root=output_root, base_name=base, args=args,
                            grounding_model=grounding_model, grounding_proc=grounding_proc,
                            clip_model=clip_model, clip_preprocess=clip_preprocess,
                            sam_model=sam_model, sam_proc=sam_proc, device=device,
                        )
                    except Exception as exc:
                        log_dist(f"!! ERROR processing {base}: {exc}")
                        import traceback
                        traceback.print_exc()
            else:
                log_dist("[run] nothing to do on this rank; waiting for aggregator")

            # Filesystem barrier per run — same semantics as the original
            # single-run script.  Every rank must hit this before any rank
            # advances to the next run.
            mark_rank_done(sentinel_dir)
            log_dist("[run] rank done; waiting for aggregator")
            if is_aggregator():
                wait_for_all_ranks(sentinel_dir, world_size)
                mark_aggregator_done(sentinel_dir)
                log_dist("[run] aggregator wrote _AGG.done")
            else:
                wait_for_aggregator(sentinel_dir)
                log_dist("[run] aggregator finished")
        except Exception as exc:
            import traceback
            log_dist(f"!! RUN-LEVEL ERROR on {videos_dir}: {exc}")
            traceback.print_exc()
            failures.append((videos_dir, str(exc)))

    if failures:
        log_dist(f"=== summary: {len(failures)} of {len(runs)} runs failed at the run level ===")
        for vd, err in failures:
            log_dist(f"  - {vd}: {err}")


if __name__ == "__main__":
    main()
