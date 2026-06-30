#!/usr/bin/env bash
# Run the CineBenchSyn metric pipeline on a directory of generated videos.
#
# Generated videos must be named <NNNNN>.mp4, 1-indexed, where video <NNNNN>
# corresponds to annotation index <NNNNN-1> (e.g. 00001.mp4 -> 00000_ultra_dense.json).
#
# Stages (comma-separated subset of, run in this order):
#   extract_masks      ground + segment each entity in every generated video
#   compute_grounding  DINO / CLIP subject-identity and caption metrics
#   compute_vlm        Qwen2.5-VL shot-transition timing recall
#   compute_viclip     ViCLIP dense-caption-following metrics
#   aggregate          collect per-run scores into aggregate_metrics.json
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

VIDEOS_DIR=""; PROMPTS_DIR=""; REFS_DIR=""; OUTPUT_DIR=""
STAGES="extract_masks,compute_grounding,compute_vlm,compute_viclip,aggregate"
NAME="generated"; DEVICE=""; LIMIT=""

usage() { sed -n '2,20p' "${BASH_SOURCE[0]}"; exit 0; }
while [[ $# -gt 0 ]]; do
  case "$1" in
    --videos-dir)  VIDEOS_DIR="$2"; shift 2;;
    --prompts-dir) PROMPTS_DIR="$2"; shift 2;;
    --refs-dir)    REFS_DIR="$2"; shift 2;;
    --output-dir)  OUTPUT_DIR="$2"; shift 2;;
    --stages)      STAGES="$2"; shift 2;;
    --name)        NAME="$2"; shift 2;;
    --device)      DEVICE="$2"; shift 2;;
    --limit)       LIMIT="$2"; shift 2;;
    -h|--help)     usage;;
    *) echo "Unknown argument: $1" >&2; exit 1;;
  esac
done

[[ -n "$VIDEOS_DIR" && -n "$PROMPTS_DIR" && -n "$OUTPUT_DIR" ]] || {
  echo "Required: --videos-dir, --prompts-dir, --output-dir" >&2; exit 1; }
mkdir -p "$OUTPUT_DIR"

DEV_FLAG=(); [[ -n "$DEVICE" ]] && DEV_FLAG=(--device "$DEVICE")
LIMIT_FLAG=(); [[ -n "$LIMIT" ]] && LIMIT_FLAG=(--limit "$LIMIT")
REFS_FLAG=(); [[ -n "$REFS_DIR" ]] && REFS_FLAG=(--refs-dir "$REFS_DIR")

has_stage() { [[ ",$STAGES," == *",$1,"* ]]; }

if has_stage extract_masks; then
  echo "== extract_masks =="
  python "$HERE/run_grounding_sam_masking.py" \
    --videos-dir "$VIDEOS_DIR" --prompts-dir "$PROMPTS_DIR" "${REFS_FLAG[@]}" \
    --output-root "$OUTPUT_DIR" --save_sam_masks --skip_mask_tracking \
    "${LIMIT_FLAG[@]}" "${DEV_FLAG[@]}"
fi

if has_stage compute_grounding; then
  echo "== compute_grounding =="
  python "$HERE/compute_grounding_metrics.py" \
    --logs-dir "$OUTPUT_DIR" --output "$OUTPUT_DIR/grounding_metrics.json" \
    "${LIMIT_FLAG[@]}" "${DEV_FLAG[@]}"
fi

if has_stage compute_vlm; then
  echo "== compute_vlm =="
  python "$HERE/compute_vlm_shot_transition_metrics.py" \
    --logs-dir "$OUTPUT_DIR" --output "$OUTPUT_DIR/vlm_shot_transition_metrics.json" \
    "${LIMIT_FLAG[@]}" "${DEV_FLAG[@]}"
fi

if has_stage compute_viclip; then
  echo "== compute_viclip =="
  python "$HERE/compute_viclip_metrics.py" \
    --logs-dir "$OUTPUT_DIR" --output "$OUTPUT_DIR/viclip_metrics.json" \
    "${LIMIT_FLAG[@]}" "${DEV_FLAG[@]}"
fi

if has_stage aggregate; then
  echo "== aggregate =="
  python "$HERE/aggregate_metrics.py" --intermediate-dir "$OUTPUT_DIR" --name "$NAME" --print-json
fi

echo "Done. Metrics in: $OUTPUT_DIR/aggregate_metrics.json"
