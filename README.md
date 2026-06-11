# <img src="assets/cineorchestra.png" width="36" height="36" style="vertical-align:middle"> CineOrchestra: Unified Entity-Centric Conditioning for Cinematic Video Generation

<p align="center">
  <a href="#">📄 Paper (coming soon)</a> &nbsp;|&nbsp;
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

## Overview

CineOrchestra is a unified video diffusion model for cinematic video generation that jointly controls **subjects**, **events**, **camera**, and **shot transitions** in a single forward pass — the first framework to do so.

The core insight: every cinematic element — a character acting, a camera pan, a hard cut — is an entity acting over a temporal interval. We represent all of them with one shared primitive: `(start_time, end_time, prompt, [reference_image])`, attaching a special `{camera}` or `{transition}` tag where needed. This reduces the architectural problem to positional encoding, solved by two coordinated RoPEs:

- **Interval-sampled temporal RoPE** — consistent attention across events ranging from 0.1s cuts to 10s camera moves
- **2D entity-temporal cross-attention RoPE** — disambiguates per-entity conditions and routes each to its spatiotemporal target

For qualitative results and interactive demos, see the [project page](https://snap-research.github.io/CineOrchestra/).

<p align="center">
  <a href="https://snap-research.github.io/CineOrchestra/">
    <img src="assets/teaser_thumb.jpg" width="90%" alt="CineOrchestra teaser — click to watch on project page">
  </a>
</p>

## Updates

- **[Jun 2026]** Project page released.

## Release Plan

- [ ] **CineBenchSyn** benchmark data
- [ ] Benchmark evaluation code

## License

This repository is released under the [MIT License](LICENSE).
