#!/usr/bin/env python3
"""ViCLIP-based dense-caption metrics.

For every dense_event in the truncated source JSON (read from each
``{base}_grounding_log.json`` produced by ``run_grounding_sam_masking.py``),
extract the corresponding sub-clip of the generated video, sample 8 frames,
and compute ViCLIP cosine similarity between the video clip and the dense
event's description (with entity names expanded ``{girl_big}`` → ``girl big``).

Four entity-type categories are tracked separately:
  * ``camera``           — events where name == ``{camera}``
  * ``shot_transition``  — events where name == ``{shot_transition}``
  * ``scene``            — events where name starts with ``{scene_``
  * ``standard``         — everything else (people, objects, animals)

Two aggregation modes per category:
  * ``per_video_mean``   — mean within each video, then mean across videos
  * ``event_pooled_mean``— pool all events from all videos, then mean

8 metrics in total (4 categories × 2 modes), plus 2 additional masked
metrics for ``standard`` entities that have a per-entity SAM2 mask video:
  * ``standard_masked_per_video_mean``
  * ``standard_masked_event_pooled_mean``

Loading ViCLIP: transformers' ``from_pretrained`` is incompatible with the
ViCLIP-hf model code (it constructs the model under a meta-device context
which breaks ``torch.linspace().item()`` calls in ViCLIP's __init__). We
instantiate the dynamic-module ``ViCLIP`` class directly and load the
``model.safetensors`` from the snapshot. Set ``HF_HUB_CACHE=/path/to/cache``
before running so the model files are picked up from a known location.

Usage:
    python scripts/ultra_dense/compute_viclip_metrics.py \\
        --logs-dir /path/to/intermediate_dir \\
        --output    /path/to/viclip_metrics.json \\
        [--viclip-model OpenGVLab/ViCLIP-B-16-hf] \\
        [--n-frames 8] [--device cuda:0]
"""

from __future__ import annotations

import argparse
import glob
import importlib
import json
import os
import re
import subprocess
import sys
import tempfile
import warnings
from collections import defaultdict
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


def log(msg: str) -> None:
    tqdm.write(msg)
    sys.stdout.flush()


_REQUIRED_TOP_KEYS = frozenset({"video_path", "per_event"})
_REQUIRED_EVENT_KEYS = frozenset({"category", "sim"})


def is_video_complete(per_video_json_path: str) -> bool:
    """True iff the per-video ViCLIP JSON exists, parses, and every event
    record has the required keys (``category``, ``sim``).

    Counts the file as complete even when ``per_event`` is empty (legitimate
    case of a video whose dense_events list was empty after truncation).
    """
    if not os.path.exists(per_video_json_path):
        return False
    try:
        with open(per_video_json_path) as f:
            d = json.load(f)
    except (json.JSONDecodeError, OSError):
        return False
    if not isinstance(d, dict) or not _REQUIRED_TOP_KEYS.issubset(d.keys()):
        return False
    per_event = d.get("per_event") or []
    if not isinstance(per_event, list):
        return False
    for ev in per_event:
        if not isinstance(ev, dict) or not _REQUIRED_EVENT_KEYS.issubset(ev.keys()):
            return False
    return True


# ---------------------------------------------------------------------------
# Text helpers
# ---------------------------------------------------------------------------

def expand_entity_names(text: str) -> str:
    """``{girl_big}`` → ``girl big`` everywhere."""
    return re.sub(
        r"\{([a-zA-Z0-9_]+)\}",
        lambda m: m.group(1).replace("_", " "),
        text,
    )


def entity_type(name: str) -> str:
    if name == "{camera}":
        return "camera"
    if name == "{shot_transition}":
        return "shot_transition"
    if name.startswith("{scene_"):
        return "scene"
    return "standard"


# ---------------------------------------------------------------------------
# ViCLIP loading
# ---------------------------------------------------------------------------

VICLIP_REPO_OPTIONS = (
    "OpenGVLab/ViCLIP-B-16-hf",
    "OpenGVLab/ViCLIP-L-14-hf",
)


def load_viclip(model_id: str, device: torch.device):
    """Return the ViCLIP ``model``. Weights and the trust-remote-code module are
    auto-downloaded from the HuggingFace Hub via the standard dynamic-module
    loader, so the module's relative imports resolve. ViCLIP tokenizes text
    internally with a CLIP BPE vocab baked into its submodule."""
    import inspect
    import shutil
    from huggingface_hub import snapshot_download
    from transformers.dynamic_module_utils import get_class_from_dynamic_module

    snap_dir = snapshot_download(repo_id=model_id)
    Config = get_class_from_dynamic_module("configuration_viclip.Config", model_id)
    ViCLIP = get_class_from_dynamic_module("viclip.ViCLIP", model_id)

    # ViCLIP's tokenizer loads a CLIP BPE vocab next to its module file; provide
    # it from the snapshot or the installed openai-clip package if absent.
    mod_dir = os.path.dirname(inspect.getfile(ViCLIP))
    bpe = os.path.join(mod_dir, "bpe_simple_vocab_16e6.txt.gz")
    if not os.path.exists(bpe):
        clip_bpe = None
        try:
            import clip as _clip
            clip_bpe = os.path.join(os.path.dirname(_clip.__file__), "bpe_simple_vocab_16e6.txt.gz")
        except Exception:
            pass
        for src in (os.path.join(snap_dir, "bpe_simple_vocab_16e6.txt.gz"), clip_bpe):
            if src and os.path.exists(src):
                shutil.copy(src, bpe)
                break

    cwd = os.getcwd()
    os.chdir(mod_dir)
    try:
        cfg = Config.from_pretrained(snap_dir)
        model = ViCLIP(cfg)
    finally:
        os.chdir(cwd)

    from safetensors.torch import load_file
    sd = load_file(os.path.join(snap_dir, "model.safetensors"))
    res = model.load_state_dict(sd, strict=False)
    if res.missing_keys or res.unexpected_keys:
        log(f"  ViCLIP load warnings: missing={len(res.missing_keys)} "
            f"unexpected={len(res.unexpected_keys)}")
    model.eval().to(device)
    return model


# ---------------------------------------------------------------------------
# Video / mask reading
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


def load_video_frames_rgb(video_path: str) -> tuple[list[np.ndarray], float]:
    """Load all frames as (T, H, W, 3) uint8 RGB and return (frames, fps)."""
    with tempfile.TemporaryDirectory(prefix="viclip_") as tmp:
        extract_frames_to_dir(video_path, tmp)
        paths = list_frame_paths(tmp)
        # ffprobe for fps
        info = subprocess.run(
            ["ffprobe", "-v", "quiet", "-print_format", "json",
             "-show_streams", video_path],
            capture_output=True, text=True, check=True, stdin=subprocess.DEVNULL,
        )
        v = next(s for s in json.loads(info.stdout)["streams"] if s["codec_type"] == "video")
        num, den = (v.get("r_frame_rate", "30/1").split("/") + ["1"])[:2]
        fps = float(num) / max(1.0, float(den))
        frames = [np.array(Image.open(p).convert("RGB")) for p in paths]
        return frames, fps


def load_mask_video_as_array(mask_path: str) -> np.ndarray | None:
    if not mask_path or not os.path.exists(mask_path):
        return None
    with tempfile.TemporaryDirectory(prefix="viclip_mask_") as tmp:
        extract_frames_to_dir(mask_path, tmp)
        out = []
        for p in list_frame_paths(tmp):
            arr = np.array(Image.open(p).convert("L"), dtype=np.uint8)
            out.append((arr > 127).astype(np.uint8))
        return np.stack(out, axis=0) if out else None


# ---------------------------------------------------------------------------
# ViCLIP preprocessing & encoding
# ---------------------------------------------------------------------------

VICLIP_MEAN = np.array([0.485, 0.456, 0.406], dtype=np.float32).reshape(1, 1, 3)
VICLIP_STD = np.array([0.229, 0.224, 0.225], dtype=np.float32).reshape(1, 1, 3)
VICLIP_RES = 224


def _sample_frame_indices(total: int, n: int) -> list[int]:
    """Uniform sampling of ``n`` indices from ``[0, total)``."""
    if total <= 0 or n <= 0:
        return []
    if total <= n:
        return list(range(total))
    step = total / n
    return [int(round(step * i + step / 2 - 0.5)) for i in range(n)]


def _normalize_frame(frame_rgb_uint8: np.ndarray, res: int = VICLIP_RES) -> np.ndarray:
    """Resize to (res, res) and normalize to ImageNet mean/std → (3, res, res) float32."""
    img = cv2.resize(frame_rgb_uint8, (res, res), interpolation=cv2.INTER_AREA)
    img = img.astype(np.float32) / 255.0
    img = (img - VICLIP_MEAN) / VICLIP_STD
    return img.transpose(2, 0, 1)  # (3, H, W)


def frames_to_viclip_tensor(
    frames: list[np.ndarray],
    n: int = 8,
    res: int = VICLIP_RES,
) -> torch.Tensor:
    """Sample ``n`` frames uniformly and return a (1, n, 3, res, res) float tensor."""
    if not frames:
        return torch.empty((1, 0, 3, res, res))
    idxs = _sample_frame_indices(len(frames), n)
    while len(idxs) < n:
        idxs.append(idxs[-1])
    arr = np.stack([_normalize_frame(frames[i], res) for i in idxs], axis=0)
    return torch.from_numpy(arr).unsqueeze(0)  # (1, n, 3, res, res)


@torch.inference_mode()
def viclip_video_features(model, frames_tensor: torch.Tensor) -> torch.Tensor:
    """Return L2-normalized (B, D) video embedding."""
    feats = model.get_vid_features(frames_tensor.to(next(model.parameters()).device))
    return feats  # already normalized inside get_vid_features


@torch.inference_mode()
def viclip_text_features(model, text: str) -> torch.Tensor:
    # ViCLIP's get_text_features expects a tokenizer arg but doesn't use it
    # (encode_text tokenizes via the text encoder's internal CLIP BPE tokenizer).
    feats = model.get_text_features(text, None, text_feature_dict={})
    return feats  # (1, D), L2-normalized


# ---------------------------------------------------------------------------
# Per-event scoring
# ---------------------------------------------------------------------------

MIN_CLIP_DURATION = 0.5  # seconds — pad short events (e.g. hard cuts) up to this


def event_clip_indices(
    s: float, e: float, fps: float, n_frames: int,
    min_duration: float = MIN_CLIP_DURATION,
) -> tuple[int, int]:
    """Inclusive frame range covering [s, e] padded to at least ``min_duration``."""
    if e <= s:
        e = s + 1.0 / fps
    duration = e - s
    if duration < min_duration:
        mid = 0.5 * (s + e)
        half = min_duration / 2.0
        s = max(0.0, mid - half)
        e = min((n_frames - 1) / fps, mid + half)
    s_f = max(0, int(round(s * fps)))
    e_f = min(n_frames - 1, int(round(e * fps)) - 1)
    if e_f < s_f:
        e_f = s_f
    return s_f, e_f


def apply_mask_to_frames(
    frames_rgb: list[np.ndarray], mask_arr: np.ndarray, s_f: int, e_f: int,
) -> list[np.ndarray]:
    """Multiply each frame by its corresponding mask. Skips frames without masks."""
    out = []
    for f in range(s_f, e_f + 1):
        if f >= len(frames_rgb):
            break
        img = frames_rgb[f]
        if 0 <= f < mask_arr.shape[0]:
            m = mask_arr[f]
            if m.shape != img.shape[:2]:
                m = cv2.resize(m, (img.shape[1], img.shape[0]),
                               interpolation=cv2.INTER_NEAREST)
            img = img * m[..., None]
        out.append(img.astype(np.uint8))
    return out


# ---------------------------------------------------------------------------
# Per-video processing
# ---------------------------------------------------------------------------

def process_one_video(
    log_dict: dict,
    model,
    n_frames: int,
    device: torch.device,
) -> dict:
    video_path = log_dict["video_path"]
    if not os.path.exists(video_path):
        log(f"  WARN: video missing: {video_path}")
        return {"per_event": [], "video_path": video_path}

    frames_rgb, fps = load_video_frames_rgb(video_path)
    n_total = len(frames_rgb)

    # Map entity_name → mask_video_path (only for surviving entities in entities[])
    name_to_mask_path: dict[str, str | None] = {}
    for ent in log_dict.get("entities", []):
        name_to_mask_path[ent["entity_name"]] = ent.get("mask_video_path")

    # Cache loaded mask arrays per entity
    mask_cache: dict[str, np.ndarray | None] = {}

    per_event_records: list[dict] = []
    for de in log_dict.get("dense_events", []):
        name = de["name"]
        s = float(de["start"]); e = float(de["end"])
        category = entity_type(name)
        s_f, e_f = event_clip_indices(s, e, fps, n_total)
        sub_frames = frames_rgb[s_f: e_f + 1]
        if not sub_frames:
            continue

        text = expand_entity_names(de.get("description", "")) or expand_entity_names(name)
        text_feat = viclip_text_features(model, text)  # (1, D)

        # Unmasked similarity
        vid_tensor = frames_to_viclip_tensor(sub_frames, n=n_frames)
        vid_feat = viclip_video_features(model, vid_tensor)  # (1, D)
        sim = float((vid_feat @ text_feat.T).squeeze().cpu().item())

        masked_sim: float | None = None
        if category == "standard":
            mask_path = name_to_mask_path.get(name)
            if mask_path and os.path.exists(mask_path):
                if name not in mask_cache:
                    mask_cache[name] = load_mask_video_as_array(mask_path)
                marr = mask_cache[name]
                if marr is not None:
                    masked_frames = apply_mask_to_frames(frames_rgb, marr, s_f, e_f)
                    if masked_frames:
                        m_tensor = frames_to_viclip_tensor(masked_frames, n=n_frames)
                        m_feat = viclip_video_features(model, m_tensor)
                        masked_sim = float((m_feat @ text_feat.T).squeeze().cpu().item())

        per_event_records.append({
            "name": name,
            "category": category,
            "start": s, "end": e,
            "start_frame": s_f, "end_frame": e_f,
            "text": text,
            "sim": sim,
            "masked_sim": masked_sim,
        })

    return {
        "video_path": video_path,
        "per_event": per_event_records,
        "log_path": log_dict.get("_log_path"),
    }


# ---------------------------------------------------------------------------
# Aggregation
# ---------------------------------------------------------------------------

CATEGORIES = ("camera", "shot_transition", "scene", "standard")


def aggregate(per_video: list[dict]) -> dict:
    """Per-category metrics: per-video-mean and event-pooled-mean.
    Plus standard masked metrics."""
    # Per-video means by category
    per_vid_by_cat: dict[str, list[float]] = {c: [] for c in CATEGORIES}
    pooled_by_cat: dict[str, list[float]] = {c: [] for c in CATEGORIES}
    per_vid_masked_std: list[float] = []
    pooled_masked_std: list[float] = []

    for v in per_video:
        events = v.get("per_event", [])
        # Group this video's events by category
        sims_by_cat: dict[str, list[float]] = {c: [] for c in CATEGORIES}
        masked_std: list[float] = []
        for ev in events:
            sims_by_cat[ev["category"]].append(ev["sim"])
            pooled_by_cat[ev["category"]].append(ev["sim"])
            if ev["category"] == "standard" and ev["masked_sim"] is not None:
                masked_std.append(ev["masked_sim"])
                pooled_masked_std.append(ev["masked_sim"])
        for c in CATEGORIES:
            if sims_by_cat[c]:
                per_vid_by_cat[c].append(float(np.mean(sims_by_cat[c])))
        if masked_std:
            per_vid_masked_std.append(float(np.mean(masked_std)))

    def _mean(xs):
        if not xs:
            return None
        return float(np.mean(xs))

    out = {
        "n_videos": len(per_video),
        "n_events_total": sum(len(v.get("per_event", [])) for v in per_video),
    }
    for c in CATEGORIES:
        out[f"{c}_per_video_mean"] = _mean(per_vid_by_cat[c])
        out[f"{c}_event_pooled_mean"] = _mean(pooled_by_cat[c])
        out[f"{c}_n_videos_with_events"] = sum(1 for v in per_vid_by_cat[c] if v == v)  # placeholder
        out[f"{c}_n_events"] = len(pooled_by_cat[c])
    out["standard_masked_per_video_mean"] = _mean(per_vid_masked_std)
    out["standard_masked_event_pooled_mean"] = _mean(pooled_masked_std)
    out["standard_masked_n_events"] = len(pooled_masked_std)
    return out


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def _process_one_run_viclip(
    *, logs_dir: str, output: str,
    model, device: torch.device,
    args, rank: int, world_size: int,
    log_dist, slice_for_rank, is_aggregator,
    reset_done_sentinels, mark_rank_done, mark_aggregator_done,
    wait_for_all_ranks, wait_for_aggregator,
) -> None:
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
        tqdm_desc = f"[compute_viclip|{run_name}] rank{rank}"
        for lp in tqdm(my_paths, desc=tqdm_desc):
            try:
                with open(lp) as f:
                    d = json.load(f)
                d["_log_path"] = lp
                res = process_one_video(d, model, args.n_frames, device)
                cats = defaultdict(list)
                for ev in res["per_event"]:
                    cats[ev["category"]].append(ev["sim"])
                cat_str = "  ".join(
                    f"{c}={float(np.mean(cats[c])):.3f}({len(cats[c])})"
                    for c in CATEGORIES if cats[c]
                )
                log_dist(f"  {os.path.basename(lp)}: {cat_str}")
                tmp = per_video_path(lp) + ".tmp"
                with open(tmp, "w") as f:
                    json.dump(res, f, indent=2)
                os.replace(tmp, per_video_path(lp))
            except Exception as exc:
                log_dist(f"!! ERROR on {os.path.basename(lp)}: {exc}")
                import traceback; traceback.print_exc()

    mark_rank_done(partial_dir)
    log_dist("[run] rank done; waiting for aggregator")

    if not is_aggregator():
        wait_for_aggregator(partial_dir)
        log_dist("[run] aggregator finished")
        return

    wait_for_all_ranks(partial_dir, world_size)
    log_dist("[run] all ranks done; merging")

    per_video: list[dict] = []
    for lp in log_paths_all:
        pvp = per_video_path(lp)
        if not os.path.exists(pvp):
            continue
        with open(pvp) as f:
            per_video.append(json.load(f))
    log(f"\n[aggregator|{logs_dir}] loaded {len(per_video)} per-video files")

    agg = aggregate(per_video)
    out_blob = {
        "config": {
            "logs_dir": os.path.abspath(logs_dir),
            "viclip_model": args.viclip_model,
            "n_frames": args.n_frames,
        },
        "aggregate": agg,
        "per_video": per_video,
    }
    os.makedirs(os.path.dirname(os.path.abspath(output)) or ".", exist_ok=True)
    with open(output, "w") as f:
        json.dump(out_blob, f, indent=2)

    def _fmt(x):
        return f"{x:.4f}" if x is not None else "n/a"
    log(f"\n[aggregator] wrote {output}")
    log(f"=== Per-video mean ===")
    for c in CATEGORIES:
        log(f"  {c:<16} = {_fmt(agg[f'{c}_per_video_mean'])}  "
            f"(n_events_total={agg[f'{c}_n_events']})")
    log(f"  standard_masked = {_fmt(agg['standard_masked_per_video_mean'])}  "
        f"(n_events={agg['standard_masked_n_events']})")
    log(f"=== Event-pooled mean ===")
    for c in CATEGORIES:
        log(f"  {c:<16} = {_fmt(agg[f'{c}_event_pooled_mean'])}")
    log(f"  standard_masked = {_fmt(agg['standard_masked_event_pooled_mean'])}")

    mark_aggregator_done(partial_dir)
    log_dist("[run] aggregator wrote _AGG.done")


def main() -> None:
    ap = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    ap.add_argument("--logs-dir",
                    help="Dir containing {base}_grounding_log.json files (single-run / backward-compat).")
    ap.add_argument("--output",
                    help="Where to write the per-video + aggregate metrics JSON (single-run).")
    ap.add_argument("--run", action="append", nargs=2, metavar=("LOGS_DIR", "OUTPUT"),
                    help="Add (logs_dir, output) pair to the runs list.  Repeat for more "
                         "runs; the ViCLIP model is loaded once and amortised.  "
                         "Mutually exclusive with --logs-dir/--output.")
    ap.add_argument("--viclip-model", default="OpenGVLab/ViCLIP-B-16-hf",
                    choices=list(VICLIP_REPO_OPTIONS) + [""])
    ap.add_argument("--device", default=None,
                    help="Override device. Default: cuda:LOCAL_RANK if available else cpu.")
    ap.add_argument("--n-frames", type=int, default=8)
    ap.add_argument("--limit", type=int, default=None)
    ap.add_argument("--start", type=int, default=0)
    ap.add_argument("--skip-existing", action="store_true",
                    help="Skip videos whose per-video metric JSON already exists in <output>.partial/.")
    args = ap.parse_args()

    if args.run:
        if args.logs_dir or args.output:
            ap.error("--run cannot be combined with --logs-dir / --output; pick one shape.")
        runs = [(li, oi) for li, oi in args.run]
    else:
        if not (args.logs_dir and args.output):
            ap.error("Must supply either --run LOGS_DIR OUTPUT (one or more) "
                     "or both --logs-dir and --output.")
        runs = [(args.logs_dir, args.output)]

    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from dist_utils import (
        init_workers, slice_for_rank, is_aggregator, log_dist, env_summary,
        reset_done_sentinels, mark_rank_done, mark_aggregator_done,
        wait_for_all_ranks, wait_for_aggregator,
    )
    rank, world_size, local_rank, default_device = init_workers()
    device = torch.device(args.device) if args.device else default_device
    log_dist("env:", env_summary(), "device:", device, "runs:", len(runs))

    # Load ViCLIP ONCE up front.
    import time as _time
    log_dist(f"Loading ViCLIP ({args.viclip_model})...")
    t0 = _time.time()
    model = load_viclip(args.viclip_model, device)
    log_dist(f"  ViCLIP loaded in {_time.time()-t0:.1f}s")

    failures: list[tuple[str, str]] = []
    for run_idx, (logs_dir, output) in enumerate(runs):
        log_dist(f"=== run {run_idx + 1}/{len(runs)}: {logs_dir} -> {output} ===")
        try:
            _process_one_run_viclip(
                logs_dir=logs_dir, output=output,
                model=model, device=device,
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
