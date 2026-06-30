# <img src="assets/cineorchestra.png" width="36" height="36" style="vertical-align:middle"> CineOrchestra: Unified Entity-Centric Conditioning for Cinematic Video Generation

<p align="center">
  <a href="http://arxiv.org/abs/2606.13768">📄 Paper</a> &nbsp;|&nbsp;
  <a href="https://snap-research.github.io/CineOrchestra/">🌐 Project Page</a>
</p>

<p align="center">
  <a href="https://sharathgirish.com">Sharath Girish</a><sup>1*</sup>&nbsp;
  <a href="#">Tsai-Shien Chen</a><sup>1,2*</sup>&nbsp;
  <a href="#">Zhikang Dong</a><sup>1</sup>&nbsp;
  <a href="#">Mukesh Singhal</a><sup>2</sup>&nbsp;
  <a href="#">Hao Chen</a><sup>1</sup>&nbsp;
  <a href="#">Sergey Tulyakov</a><sup>1</sup>&nbsp;
  <a href="#">Aliaksandr Siarohin</a><sup>1</sup>
  <br>
  <sup>1</sup>Snap Inc. &nbsp; <sup>2</sup>UC Merced &nbsp; &nbsp; <sup>*</sup>Equal contribution
</p>

---

<p align="center">
  <a href="https://snap-research.github.io/CineOrchestra/">
    <img src="assets/teaser_thumb.jpg" width="90%" alt="CineOrchestra teaser — click to watch on project page">
  </a>
</p>

## Overview

CineOrchestra is a unified video diffusion model for cinematic video generation that jointly controls **subjects**, **events**, **camera**, and **shot transitions** in a single forward pass — the first framework to do so.

The core insight: every cinematic element — a character acting, a camera pan, a hard cut — is an entity acting over a temporal interval. We represent all of them with one shared primitive: `(start_time, end_time, prompt, [reference_image])`, attaching a special `{camera}` or `{transition}` tag where needed. This reduces the architectural problem to positional encoding, solved by two coordinated RoPEs:

- **Interval-sampled temporal RoPE** — consistent attention across events ranging from 0.1s cuts to 10s camera moves
- **2D entity-temporal cross-attention RoPE** — disambiguates per-entity conditions and routes each to its spatiotemporal target

For qualitative results and interactive demos, see the [project page](https://snap-research.github.io/CineOrchestra/).

## Updates

- **[Jun 2026]** CineBenchSyn benchmark data and evaluation code released.
- **[Jun 2026]** Project page released.

## Release Plan

- [x] **CineBenchSyn** benchmark data — [`sharathgirish/CineBenchSyn`](https://huggingface.co/datasets/sharathgirish/CineBenchSyn)
- [x] Benchmark evaluation code — see [Benchmark Evaluation](#benchmark-evaluation) (`eval/`)

## Benchmark Evaluation

The `eval/` directory contains a self-contained pipeline that scores generated videos against the
**CineBenchSyn** conditioning along three axes: subject identity, dense-caption following, and
shot-transition timing.

### 1. Environment

```bash
conda env create -f eval/environment.yml
conda activate cinebenchsyn
```

`ffmpeg` is included in the environment. All metric models — [Grounding DINO](https://huggingface.co/IDEA-Research/grounding-dino-base),
[SAM 2](https://huggingface.co/facebook/sam2-hiera-large), [DINOv2](https://huggingface.co/facebook/dinov2-base),
CLIP, [ViCLIP](https://huggingface.co/OpenGVLab/ViCLIP-B-16-hf), and
[Qwen2.5-VL](https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct) — download automatically from the
Hugging Face Hub on first use.

### 2. Get the benchmark data

```python
from huggingface_hub import snapshot_download
data = snapshot_download("sharathgirish/CineBenchSyn", repo_type="dataset")
# data/annotations/<id>_ultra_dense.json   — per-scenario conditioning
# data/reference_images/<id>_ref_image_NN_<entity>.png
```

### 3. Generate your videos

Generate one video per scenario with your model. The pipeline expects a directory of `<NNNNN>.mp4`
files, **1-indexed**, where video `<NNNNN>.mp4` corresponds to annotation index `<NNNNN − 1>` (so
`00001.mp4` ↔ `00000_ultra_dense.json`):

```
my_videos/
  00001.mp4
  00002.mp4
  ...
  00512.mp4
```

### 4. Run the metrics

```bash
bash eval/run_eval.sh \
  --videos-dir   my_videos \
  --prompts-dir  "$data/annotations" \
  --refs-dir     "$data/reference_images" \
  --output-dir   results_my_model \
  --name         MyModel \
  --stages       extract_masks,compute_grounding,compute_vlm,compute_viclip,aggregate
```

Stages run in the order below; select a subset with `--stages`:

| Stage | Metric |
|---|---|
| `extract_masks` | Grounds + segments each entity in every video (Grounding DINO + SAM 2) |
| `compute_grounding` | DINO subject identity, CLIP / masked-CLIP caption alignment |
| `compute_vlm` | Qwen2.5-VL shot-transition-timing recall |
| `compute_viclip` | ViCLIP dense-caption following (scene / camera / transition) |
| `aggregate` | Collects per-run scores into `aggregate_metrics.json` |

Final scores are written to `<output-dir>/aggregate_metrics.json`.

The pipeline runs on a single GPU (or CPU) by default. For multi-GPU, launch the per-stage scripts in
`eval/` with `torchrun --nproc_per_node=N` (work is split across ranks via a filesystem barrier; no
NCCL required). SAM 2 mask *propagation* is slow and is skipped by default (`--skip_mask_tracking`)
— enable it only if you need the masked-region metric variants.

## License

This repository is released under the [MIT License](LICENSE).
