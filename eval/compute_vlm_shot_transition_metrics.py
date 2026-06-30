#!/usr/bin/env python3
"""Shot-transition recall via Qwen2.5-VL.

For each ``{shot_transition}`` event in the truncated source JSON (read out of
``{base}_grounding_log.json`` produced by ``run_grounding_sam_masking.py``),
extract a sub-clip of the generated video padded outward from the event's
[start, end] interval. Per side:

    delta = max(0, min(1.0, distance_to_neighbor_boundary - 0.5))

so we don't pad past an adjacent shot transition (or the video ends) and
keep at least 0.5 s separation. Pass the clip to Qwen2.5-VL with the event's
description and ask whether the transition is present and matches the
description.

Two recall metrics per video:
    presence_recall  — fraction of events VLM marks as present
    match_recall     — fraction of events VLM marks as matching the description

Aggregation across videos: simple mean of per-video recalls.

Usage:
    python scripts/ultra_dense/compute_vlm_shot_transition_metrics.py \\
        --logs-dir /path/to/intermediate_dir \\
        --output    /path/to/vlm_st_metrics.json \\
        [--model-id Qwen/Qwen2.5-VL-7B-Instruct] [--fps 15.0]
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

import numpy as np
import torch
from tqdm import tqdm


def log(msg: str) -> None:
    tqdm.write(msg)
    sys.stdout.flush()


_REQUIRED_KEYS = frozenset({
    "video_path", "n_events", "n_present", "n_match",
    "presence_recall", "match_recall", "events",
})

# Per-event raw_response substrings that indicate a transient failure we want
# to retry. ``(too-short clip)`` is intentionally NOT in this set — it is a
# structural skip (clip span is < 0.1s) and re-running cannot fix it.
_RETRYABLE_MARKERS = ("(error:", "(ffmpeg failed)")


def is_video_complete(per_video_json_path: str) -> bool:
    """True iff the per-video VLM JSON exists, parses, has all required keys,
    AND no event has a retryable error in its ``raw_response``.

    Catches the user-observed case of a partial JSON written with VLM module
    errors (e.g., ``"(error: No module named 'qwen_vl_utils')"``) which the
    old existence-only check would have skipped past on a rerun.
    """
    if not os.path.exists(per_video_json_path):
        return False
    try:
        with open(per_video_json_path) as f:
            d = json.load(f)
    except (json.JSONDecodeError, OSError):
        return False
    if not isinstance(d, dict) or not _REQUIRED_KEYS.issubset(d.keys()):
        return False
    for ev in d.get("events", []) or []:
        raw = ev.get("raw_response") or ""
        if any(marker in raw for marker in _RETRYABLE_MARKERS):
            return False
    return True


def expand_entity_names(text: str) -> str:
    """``{girl_big}`` → ``girl big`` everywhere in the description."""
    return re.sub(
        r"\{([a-zA-Z0-9_]+)\}",
        lambda m: m.group(1).replace("_", " "),
        text,
    )


# ---------------------------------------------------------------------------
# Clip extraction
# ---------------------------------------------------------------------------

def extract_subclip(
    video_path: str, start: float, end: float, out_path: str, fps: float,
) -> bool:
    """Extract [start, end] from video, re-encode at ``fps``. Returns True on success."""
    duration = max(0.05, end - start)
    cmd = [
        "ffmpeg", "-y", "-nostdin",
        "-ss", f"{start:.3f}",
        "-i", video_path,
        "-t", f"{duration:.3f}",
        "-r", f"{fps:.2f}",
        "-c:v", "libx264", "-crf", "20",
        "-pix_fmt", "yuv420p",
        "-an", "-loglevel", "error",
        out_path,
    ]
    try:
        subprocess.run(cmd, check=True, capture_output=True, stdin=subprocess.DEVNULL)
        return os.path.exists(out_path) and os.path.getsize(out_path) > 0
    except subprocess.CalledProcessError as exc:
        log(f"  ffmpeg failed: {exc.stderr.decode()[-200:]}")
        return False


def compute_padding(
    s: float, e: float, prev_end: float, next_start: float,
    has_prev: bool, has_next: bool,
    max_pad: float = 1.0, buffer: float = 0.3,
) -> tuple[float, float]:
    """Per-side padding for a shot-transition event.

    The ``buffer`` is only applied against an *actual* adjacent shot transition
    (so we never pad into a neighbor cut). At the video boundaries (no
    neighbor on that side) we pad up to the video end, capped at ``max_pad``.
    This way short transitions near the start/end of the video still get
    meaningful padding on the boundary side.
    """
    left_buf = buffer if has_prev else 0.0
    right_buf = buffer if has_next else 0.0
    delta_left = max(0.0, min(max_pad, (s - prev_end) - left_buf))
    delta_right = max(0.0, min(max_pad, (next_start - e) - right_buf))
    return delta_left, delta_right


def shot_transition_events_with_neighbors(log_dict: dict) -> list[dict]:
    """Return a list of dicts {start, end, description, prev_end, next_start,
    has_prev, has_next} for each ``{shot_transition}`` dense event, sorted by
    start time."""
    events = sorted(
        [
            {"start": float(de["start"]), "end": float(de["end"]),
             "description": de.get("description", "")}
            for de in log_dict.get("dense_events", [])
            if de.get("name") == "{shot_transition}"
        ],
        key=lambda d: (d["start"], d["end"]),
    )
    n = len(events)
    duration = float(log_dict.get("eval_duration") or log_dict.get("video_duration") or 0.0)
    out: list[dict] = []
    for i, ev in enumerate(events):
        has_prev = i > 0
        has_next = i < n - 1
        prev_end = events[i - 1]["end"] if has_prev else 0.0
        next_start = events[i + 1]["start"] if has_next else duration
        out.append({**ev,
                    "prev_end": prev_end, "next_start": next_start,
                    "has_prev": has_prev, "has_next": has_next})
    return out


# ---------------------------------------------------------------------------
# Qwen2.5-VL
# ---------------------------------------------------------------------------

def load_qwen_vl(model_id: str, device: torch.device):
    from transformers import Qwen2_5_VLForConditionalGeneration, AutoProcessor
    dtype = torch.bfloat16 if device.type == "cuda" else torch.float32
    model = Qwen2_5_VLForConditionalGeneration.from_pretrained(
        model_id, torch_dtype=dtype,
    ).to(device)
    model.eval()
    processor = AutoProcessor.from_pretrained(model_id)
    return model, processor


PROMPT_TEMPLATE = (
    "You are watching a short video clip from a generated movie scene. "
    "The clip is supposed to contain a single shot transition described as:\n"
    "  '{description}'\n\n"
    "Answer two questions and respond with EXACTLY this format on two lines:\n"
    "PRESENT: YES or NO   (is any shot transition — cut, dissolve, fade, wipe, "
    "whip pan, etc. — visible in the clip?)\n"
    "MATCHES: YES or NO   (does the transition's type/style match the description above?)"
)


def _parse_yes_no(line: str) -> bool | None:
    line = line.strip().upper()
    if "YES" in line.split() or line.startswith("YES"):
        return True
    if "NO" in line.split() or line.startswith("NO"):
        return False
    return None


def parse_response(text: str) -> tuple[bool | None, bool | None, str]:
    """Extract PRESENT and MATCHES verdicts. Returns (present, matches, raw)."""
    present = matches = None
    for line in text.splitlines():
        line = line.strip()
        if line.upper().startswith("PRESENT"):
            present = _parse_yes_no(line.split(":", 1)[-1])
        elif line.upper().startswith("MATCHES"):
            matches = _parse_yes_no(line.split(":", 1)[-1])
    return present, matches, text


def query_vlm(
    model, processor, video_path: str, description: str,
    fps: float, device: torch.device,
) -> tuple[bool | None, bool | None, str]:
    from qwen_vl_utils import process_vision_info
    prompt = PROMPT_TEMPLATE.format(description=expand_entity_names(description))
    messages = [{
        "role": "user",
        "content": [
            {"type": "video", "video": f"file://{video_path}", "fps": fps},
            {"type": "text", "text": prompt},
        ],
    }]
    text = processor.apply_chat_template(
        messages, tokenize=False, add_generation_prompt=True,
    )
    image_inputs, video_inputs = process_vision_info(messages)
    inputs = processor(
        text=[text], images=image_inputs, videos=video_inputs,
        padding=True, return_tensors="pt",
    ).to(device)
    with torch.inference_mode():
        gen = model.generate(
            **inputs, max_new_tokens=64, do_sample=False,
        )
    # Trim the input prompt off
    trimmed = [out_ids[len(in_ids):] for in_ids, out_ids in zip(inputs.input_ids, gen)]
    response = processor.batch_decode(
        trimmed, skip_special_tokens=True, clean_up_tokenization_spaces=False,
    )[0]
    return parse_response(response)


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def process_one_log(
    log_dict: dict, model, processor, fps: float,
    device: torch.device, tmp_root: str,
) -> dict:
    video_path = log_dict["video_path"]
    if not os.path.exists(video_path):
        log(f"  WARN: video missing: {video_path}")
        return {
            "video_path": video_path,
            "n_events": 0, "n_present": 0, "n_match": 0,
            "presence_recall": None, "match_recall": None,
            "events": [],
        }
    eval_duration = float(log_dict.get("eval_duration") or log_dict.get("video_duration") or 0.0)
    events = shot_transition_events_with_neighbors(log_dict)

    per_event_logs: list[dict] = []
    n_present = n_match = 0
    for idx, ev in enumerate(events):
        s, e = ev["start"], ev["end"]
        delta_left, delta_right = compute_padding(
            s, e, ev["prev_end"], ev["next_start"],
            has_prev=ev["has_prev"], has_next=ev["has_next"],
        )
        clip_start = max(0.0, s - delta_left)
        clip_end = min(eval_duration, e + delta_right)
        if clip_end - clip_start < 0.1:
            # Can't extract anything meaningful — count as not present.
            per_event_logs.append({
                "interval": [s, e],
                "padded_interval": [clip_start, clip_end],
                "description": ev["description"],
                "present": False, "matches": False,
                "raw_response": "(too-short clip)",
            })
            continue
        with tempfile.NamedTemporaryFile(
            suffix=".mp4", dir=tmp_root, delete=False,
        ) as tf:
            clip_path = tf.name
        ok = extract_subclip(video_path, clip_start, clip_end, clip_path, fps)
        if not ok:
            per_event_logs.append({
                "interval": [s, e],
                "padded_interval": [clip_start, clip_end],
                "description": ev["description"],
                "present": False, "matches": False,
                "raw_response": "(ffmpeg failed)",
            })
            try: os.remove(clip_path)
            except FileNotFoundError: pass
            continue
        try:
            present, matches, raw = query_vlm(
                model, processor, clip_path, ev["description"], fps, device,
            )
        except Exception as exc:
            log(f"  VLM failed at event {idx}: {exc}")
            present = matches = None
            raw = f"(error: {exc})"
        try: os.remove(clip_path)
        except FileNotFoundError: pass

        present_bool = bool(present) if present is not None else False
        match_bool = bool(matches) if matches is not None else False
        if present_bool: n_present += 1
        if match_bool: n_match += 1
        per_event_logs.append({
            "interval": [s, e],
            "padded_interval": [clip_start, clip_end],
            "delta_left": delta_left, "delta_right": delta_right,
            "description": ev["description"],
            "present": present_bool,
            "matches": match_bool,
            "raw_response": raw,
        })

    n = len(events)
    return {
        "video_path": video_path,
        "log_path": log_dict.get("_log_path"),
        "n_events": n,
        "n_present": n_present,
        "n_match": n_match,
        "presence_recall": (n_present / n) if n else None,
        "match_recall": (n_match / n) if n else None,
        "events": per_event_logs,
    }


def _process_one_run_vlm(
    *, logs_dir: str, output: str,
    model, processor, device: torch.device,
    args, rank: int, world_size: int,
    log_dist, slice_for_rank, is_aggregator,
    reset_done_sentinels, mark_rank_done, mark_aggregator_done,
    wait_for_all_ranks, wait_for_aggregator,
) -> None:
    """Per-(logs_dir, output) work, identical semantics to the original main."""
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
        with tempfile.TemporaryDirectory(prefix="vlm_st_") as tmp_root:
            run_name = re.sub(r"^intermediate(?:_shotwise)?(?:_caption_comp)?_", "",
                              os.path.basename(os.path.normpath(logs_dir)))
            tqdm_desc = f"[compute_vlm|{run_name}] rank{rank}"
            for lp in tqdm(my_paths, desc=tqdm_desc):
                try:
                    with open(lp) as f:
                        log_dict = json.load(f)
                    log_dict["_log_path"] = lp
                    res = process_one_log(
                        log_dict, model, processor, args.fps, device, tmp_root,
                    )
                except Exception as exc:
                    log_dist(f"!! ERROR on {os.path.basename(lp)}: {exc}")
                    import traceback
                    traceback.print_exc()
                    continue
                tmp = per_video_path(lp) + ".tmp"
                with open(tmp, "w") as f:
                    json.dump(res, f, indent=2)
                os.replace(tmp, per_video_path(lp))

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

    total_events = sum(r["n_events"] for r in per_video)
    total_present = sum(r["n_present"] for r in per_video)
    total_match = sum(r["n_match"] for r in per_video)

    def _safe_mean(xs: list[float]) -> float | None:
        if not xs: return None
        return float(np.mean(xs))

    aggregate_per_video = {
        "presence_recall": _safe_mean([r["presence_recall"] for r in per_video if r["presence_recall"] is not None]),
        "match_recall": _safe_mean([r["match_recall"] for r in per_video if r["match_recall"] is not None]),
    }
    aggregate_global = {
        "total_events": total_events,
        "total_present": total_present,
        "total_match": total_match,
        "presence_recall": (total_present / total_events) if total_events else None,
        "match_recall": (total_match / total_events) if total_events else None,
    }

    out_blob = {
        "config": {
            "model_id": args.model_id,
            "fps": args.fps,
            "logs_dir": os.path.abspath(logs_dir),
        },
        "aggregate_per_video": aggregate_per_video,
        "aggregate_global": aggregate_global,
        "per_video": per_video,
    }
    os.makedirs(os.path.dirname(os.path.abspath(output)) or ".", exist_ok=True)
    with open(output, "w") as f:
        json.dump(out_blob, f, indent=2)
    log(f"\n[aggregator] wrote {output}")
    log(f"  per-video mean:  presence={aggregate_per_video['presence_recall']}  "
        f"match={aggregate_per_video['match_recall']}")
    log(f"  event-pooled:    presence={aggregate_global['presence_recall']}  "
        f"match={aggregate_global['match_recall']}")

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
                         "runs; the Qwen2.5-VL model is loaded once and amortised.  "
                         "Mutually exclusive with --logs-dir/--output.")
    ap.add_argument("--model-id", default="Qwen/Qwen2.5-VL-7B-Instruct")
    ap.add_argument("--fps", type=float, default=15.0,
                    help="Frame rate to feed to the VLM. Higher = fewer "
                         "transitions missed (esp. hard cuts).")
    ap.add_argument("--device", default=None,
                    help="Override device. Default: cuda:LOCAL_RANK if available else cpu.")
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

    # Load Qwen-VL ONCE up front.
    import time as _time
    log_dist(f"Loading Qwen2.5-VL ({args.model_id})...")
    t0 = _time.time()
    model, processor = load_qwen_vl(args.model_id, device)
    log_dist(f"  loaded in {_time.time()-t0:.1f}s")

    failures: list[tuple[str, str]] = []
    for run_idx, (logs_dir, output) in enumerate(runs):
        log_dist(f"=== run {run_idx + 1}/{len(runs)}: {logs_dir} -> {output} ===")
        try:
            _process_one_run_vlm(
                logs_dir=logs_dir, output=output,
                model=model, processor=processor, device=device,
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
