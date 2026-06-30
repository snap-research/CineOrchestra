"""Aggregate ultra-dense metric outputs across multiple `intermediate_<name>`
directories, write a combined JSON, and print a stdout-friendly summary.

Reads (any subset that exists per dir):
  - grounding_metrics.json           (compute_grounding_metrics.py)
  - vlm_shot_transition_metrics.json (compute_vlm_shot_transition_metrics.py)
  - viclip_metrics.json              (compute_viclip_metrics.py)
"""

import argparse
import json
import os
import sys
from typing import Any


GROUNDING_KEYS = [
    "dino",
    "clip_text",
    "clip_text_trim",
    "masked_clip_text",
    "masked_clip_text_trim",
    "masked_dino",
    "masked_video_clip_text",
    "masked_video_clip_text_trim",
    "masked_video_dino",
]
VICLIP_CATEGORIES = ["camera", "shot_transition", "scene", "standard"]


def load_json(path: str) -> dict | None:
    if not os.path.exists(path):
        return None
    try:
        with open(path) as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError) as e:
        print(f"[WARN] failed to read {path}: {e}", file=sys.stderr)
        return None


def extract_grounding(d: dict | None) -> dict[str, Any]:
    if d is None:
        return {}
    agg = d.get("aggregate", {})
    out = {k: agg.get(k) for k in GROUNDING_KEYS}
    out["n_videos"] = len(d.get("per_video", []))
    return out


def extract_vlm(d: dict | None) -> dict[str, Any]:
    if d is None:
        return {}
    pv = d.get("aggregate_per_video", {}) or {}
    pe = d.get("aggregate_global", {}) or {}
    return {
        "per_video_presence_recall": pv.get("presence_recall"),
        "per_video_match_recall": pv.get("match_recall"),
        "event_presence_recall": pe.get("presence_recall"),
        "event_match_recall": pe.get("match_recall"),
        "n_videos": len(d.get("per_video", [])),
    }


def extract_viclip(d: dict | None) -> dict[str, Any]:
    if d is None:
        return {}
    agg = d.get("aggregate", {}) or {}
    out: dict[str, Any] = {
        "n_videos": agg.get("n_videos"),
        "n_events_total": agg.get("n_events_total"),
    }
    for c in VICLIP_CATEGORIES:
        out[f"{c}_per_video_mean"] = agg.get(f"{c}_per_video_mean")
        out[f"{c}_event_pooled_mean"] = agg.get(f"{c}_event_pooled_mean")
    out["standard_masked_per_video_mean"] = agg.get("standard_masked_per_video_mean")
    out["standard_masked_event_pooled_mean"] = agg.get("standard_masked_event_pooled_mean")
    return out


def aggregate_one(intermediate_dir: str) -> dict[str, Any]:
    grounding = load_json(os.path.join(intermediate_dir, "grounding_metrics.json"))
    vlm = load_json(os.path.join(intermediate_dir, "vlm_shot_transition_metrics.json"))
    viclip = load_json(os.path.join(intermediate_dir, "viclip_metrics.json"))
    return {
        "intermediate_dir": intermediate_dir,
        "grounding": extract_grounding(grounding),
        "vlm": extract_vlm(vlm),
        "viclip": extract_viclip(viclip),
    }


def fmt_num(v: Any, w: int = 7) -> str:
    if v is None:
        return f"{'-':>{w}}"
    if isinstance(v, (int,)) and not isinstance(v, bool):
        return f"{v:>{w}d}"
    if isinstance(v, float):
        return f"{v:>{w}.4f}"
    return f"{str(v):>{w}}"


def print_summary_table(entries: list[dict[str, Any]], names: list[str]) -> None:
    """Print a multi-section table to stdout."""
    print()
    print("=" * 110)
    print("METRIC SUMMARY")
    print("=" * 110)

    # Section: grounding (DINO/CLIP) — full description + first-sentence-trim variants
    print("\n[grounding]  DINO / CLIP(full) / CLIP-Trim / Masked variants")
    print(
        f"  {'name':<40s}  {'DINO':>7s}  {'CLIP':>7s}  {'CLIP-T':>7s}  "
        f"{'M-CLIP':>7s}  {'MC-T':>7s}  {'M-DINO':>7s}  "
        f"{'MV-CLIP':>7s}  {'MVC-T':>7s}  {'MV-DINO':>7s}  {'#vid':>5s}"
    )
    print("  " + "-" * 130)
    for name, e in zip(names, entries):
        g = e["grounding"]
        print(
            f"  {name:<40s}  "
            f"{fmt_num(g.get('dino'))}  "
            f"{fmt_num(g.get('clip_text'))}  "
            f"{fmt_num(g.get('clip_text_trim'))}  "
            f"{fmt_num(g.get('masked_clip_text'))}  "
            f"{fmt_num(g.get('masked_clip_text_trim'))}  "
            f"{fmt_num(g.get('masked_dino'))}  "
            f"{fmt_num(g.get('masked_video_clip_text'))}  "
            f"{fmt_num(g.get('masked_video_clip_text_trim'))}  "
            f"{fmt_num(g.get('masked_video_dino'))}  "
            f"{fmt_num(g.get('n_videos'), 5)}"
        )

    # Section: vlm
    print("\n[vlm shot-transition]  per-video / event-pooled  recall")
    print(f"  {'name':<40s}  {'pv-pres':>8s}  {'pv-match':>8s}  {'ev-pres':>8s}  {'ev-match':>8s}  {'#vid':>5s}")
    print("  " + "-" * 96)
    for name, e in zip(names, entries):
        v = e["vlm"]
        print(
            f"  {name:<40s}  "
            f"{fmt_num(v.get('per_video_presence_recall'), 8)}  "
            f"{fmt_num(v.get('per_video_match_recall'), 8)}  "
            f"{fmt_num(v.get('event_presence_recall'), 8)}  "
            f"{fmt_num(v.get('event_match_recall'), 8)}  "
            f"{fmt_num(v.get('n_videos'), 5)}"
        )

    # Section: viclip categories
    print("\n[viclip]  per-video means by category")
    cats = VICLIP_CATEGORIES + ["standard_masked"]
    header = "  " + f"{'name':<40s}  " + "  ".join(f"{c[:8]:>8s}" for c in cats)
    print(header)
    print("  " + "-" * (len(header) - 2))
    for name, e in zip(names, entries):
        vc = e["viclip"]
        cells = []
        for c in VICLIP_CATEGORIES:
            cells.append(fmt_num(vc.get(f"{c}_per_video_mean"), 8))
        cells.append(fmt_num(vc.get("standard_masked_per_video_mean"), 8))
        print(f"  {name:<40s}  " + "  ".join(cells))

    print("\n" + "=" * 110)


def main() -> None:
    ap = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    ap.add_argument(
        "--intermediate-dir",
        action="append",
        default=[],
        help="Path to an intermediate_<name> directory. Repeat to aggregate multiple.",
    )
    ap.add_argument(
        "--name",
        action="append",
        default=[],
        help="Display name for the matching --intermediate-dir. "
        "If omitted, the basename of the directory is used.",
    )
    ap.add_argument(
        "--output",
        default=None,
        help="Optional path for a combined-across-runs JSON. If omitted, "
             "only per-intermediate-dir aggregate_metrics.json files are written.",
    )
    ap.add_argument(
        "--print-json",
        action="store_true",
        help="Also dump the aggregated JSON to stdout (after the table).",
    )
    args = ap.parse_args()

    if not args.intermediate_dir:
        ap.error("at least one --intermediate-dir is required")

    if args.name and len(args.name) != len(args.intermediate_dir):
        ap.error(
            f"got {len(args.name)} --name(s) for {len(args.intermediate_dir)} "
            "--intermediate-dir(s); pass one --name per --intermediate-dir or none."
        )

    names: list[str] = []
    entries: list[dict[str, Any]] = []
    for i, d in enumerate(args.intermediate_dir):
        name = args.name[i] if args.name else os.path.basename(os.path.normpath(d))
        names.append(name)
        entries.append(aggregate_one(d))

    # Always write a per-intermediate-dir aggregate JSON containing only that
    # dir's entry — that way each run is self-contained and you don't need to
    # consult an external "combined" file to see its metrics.
    print()
    for name, d, entry in zip(names, args.intermediate_dir, entries):
        per_dir_path = os.path.join(d, "aggregate_metrics.json")
        per_dir_output = {"generations": [{"name": name, **entry}]}
        try:
            with open(per_dir_path, "w") as f:
                json.dump(per_dir_output, f, indent=2)
            print(f"Wrote per-run aggregate: {per_dir_path}")
        except OSError as e:
            print(f"WARN: failed to write {per_dir_path}: {e}", file=sys.stderr)

    # Combined-across-runs structure (written with --output and/or printed with --print-json).
    output: dict[str, Any] = {
        "generations": [
            {"name": name, **entry} for name, entry in zip(names, entries)
        ],
    }

    # Optional combined-across-runs JSON for users who need a single file.
    if args.output:
        out_abs = os.path.abspath(args.output)
        os.makedirs(os.path.dirname(out_abs) or ".", exist_ok=True)
        # Skip writing if --output happens to be one of the per-dir files we
        # already wrote (would just duplicate that single-entry copy).
        per_dir_paths = {
            os.path.abspath(os.path.join(d, "aggregate_metrics.json"))
            for d in args.intermediate_dir
        }
        if out_abs in per_dir_paths:
            print(f"--output points at a per-run aggregate path; not duplicating.")
        else:
            with open(out_abs, "w") as f:
                json.dump(output, f, indent=2)
            print(f"Wrote combined aggregate: {out_abs}")

    print_summary_table(entries, names)

    if args.print_json:
        print("\nAggregated JSON:")
        print(json.dumps(output, indent=2))


if __name__ == "__main__":
    main()
