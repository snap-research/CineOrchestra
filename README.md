# CineOrchestra: Unified Entity-Centric Conditioning for Cinematic Video Generation

**[NeurIPS 2026]** &nbsp;|&nbsp; [📄 Paper](#) &nbsp;|&nbsp; [🌐 Project Page](https://cineorchestra.github.io) &nbsp;|&nbsp; [📦 Data](#benchmark-release)

---

[Sharath Girish](https://sharathgirish.com)<sup>1*</sup>, [Tsai-Shien Chen](#)<sup>1,2*</sup>, [Zhikang Dong](#)<sup>1</sup>, [Mukesh Singhal](#)<sup>2</sup>, [Hao Chen](#)<sup>1</sup>, [Sergey Tulyakov](#)<sup>1</sup>, [Aliaksandr Siarohin](#)<sup>1</sup>

<sup>1</sup>Snap Inc. &nbsp; <sup>2</sup>UC Merced &nbsp; &nbsp; <sup>*</sup>Equal contribution

---

## Overview

Cinematic video depicts multiple subjects acting at specific moments, captured with deliberate camera movement, and stitched by shot transitions — a level of compositional control current text-to-video models can't deliver. Prior work addresses each axis in isolation: multi-reference personalization, temporal control, multi-shot synthesis, or camera control. No existing framework jointly handles all four.

**CineOrchestra** unifies these axes in a single video diffusion model. The core insight: subjects, events, cameras, and transitions all share the same structure — *an entity acting over a temporal interval*. We represent every cinematic element as a structured tuple `(start_time, end_time, prompt, [reference_image])` under a common entity-centric primitive.

This reduces the architectural challenge to a single positional encoding problem, solved by two coordinated RoPEs:
- **Interval-sampled temporal RoPE** — duration-invariant attention across events spanning 0.1s hard cuts to 10s camera moves
- **2D entity-temporal cross-attention RoPE** — disambiguates per-entity conditions and routes each to its target spatiotemporal region

On two new benchmarks (**CineBench** and **CineBenchSyn**), CineOrchestra outperforms six per-axis specialists on dense caption following and shot-transition timing.

## Benchmark Release

We introduce two benchmarks for cinematic video generation evaluation:

| Benchmark | Clips | Entities | Events | References | Source |
|-----------|-------|----------|--------|------------|--------|
| CineBench | 512 | 3.2k | 6.9k | 1.5k | Movie/TV clips |
| CineBenchSyn | 512 | 3.3k | 6.4k | 1.7k | LLM prompts + synthetic refs |

**CineBenchSyn** is fully synthetic (LLM-generated prompts, Qwen-Image-generated reference images) targeting under-represented edge cases, and is being released for the community.

### Evaluation Metrics

- **M-DINO** — Masked DINO similarity for subject identity consistency
- **M-CLIP** — Masked CLIP similarity for global caption following
- **ViCLIP** — Dense caption following across subject, scene, camera, and transition categories
- **Transition Recall** — Qwen2.5-VL-7B judge scoring shot-transition timing within a tolerance window

## Roadmap

- [ ] **CineBenchSyn dataset** — prompts, reference images, and entity-centric annotations
- [ ] **Benchmark evaluation code** — metric computation (M-DINO, M-CLIP, ViCLIP, transition recall)

## Citation

```bibtex
@inproceedings{girish2026cineorchestra,
  title     = {CineOrchestra: Unified Entity-Centric Conditioning for Cinematic Video Generation},
  author    = {Girish, Sharath and Chen, Tsai-Shien and Dong, Zhikang and Singhal, Mukesh and
               Chen, Hao and Tulyakov, Sergey and Siarohin, Aliaksandr},
  booktitle = {Advances in Neural Information Processing Systems},
  year      = {2026}
}
```

## License

See [LICENSE](LICENSE).
