"""Shared multi-node / multi-GPU helpers for the ultra-dense metric scripts.

Designed to work with ``torchrun --nnodes N --nproc_per_node K``. Each rank
gets a stride slice of the work list (``items[rank::world_size]``). Aggregation
runs only on rank-0 of a worker-0 host (or always in single-process mode).

Cross-rank synchronization is done via **filesystem sentinels**, not NCCL
collectives, so:

  * No NCCL process group is created — sidesteps NCCL watchdog timeouts when
    one rank takes much longer than others (load-imbalance-tolerant).
  * Every rank's ``torchrun`` only exits after the aggregator has finished,
    so bash-level stage progression stays in lockstep across nodes.

Sentinel files (all in a caller-supplied ``partial_dir``):
  * ``_rank{R}.done``  — rank R finished its slice
  * ``_AGG.done``      — aggregator finished merging

At the start of every run, each rank deletes its own ``_rank{R}.done`` and
the global ``_AGG.done`` so a previous run's sentinels can never leak into a
restart. Per-video partial JSONs in the same directory are KEPT — those are
reused via ``--skip-existing``.
"""

from __future__ import annotations

import os
import socket
import time

import torch


def get_dist_info() -> tuple[int, int, int]:
    """Returns (rank, world_size, local_rank), defaulting to (0, 1, 0)."""
    rank = int(os.environ.get("RANK", "0"))
    world_size = int(os.environ.get("WORLD_SIZE", "1"))
    local_rank = int(os.environ.get("LOCAL_RANK", "0"))
    return rank, world_size, local_rank


def quiet_hf() -> None:
    """Silence HuggingFace transformers / hub model-loading chatter.

    Affects only transformers/hub-internal progress bars and verbose info logs
    ("Loading weights: ...", "Materializing param=...", "You are sending
    unauthenticated requests..."). The metric scripts' own per-rank tqdm bars
    (which use ``from tqdm import tqdm``) are NOT affected.

    Idempotent. Env-var setters at the top of each script handle the early
    cases where transformers is imported at module-load time; this function
    handles the post-import programmatic API as a belt-and-suspenders.
    """
    os.environ.setdefault("HF_HUB_DISABLE_PROGRESS_BARS", "1")
    os.environ.setdefault("HF_HUB_DISABLE_TELEMETRY", "1")
    os.environ.setdefault("TRANSFORMERS_VERBOSITY", "error")
    os.environ.setdefault("TRANSFORMERS_NO_ADVISORY_WARNINGS", "1")
    try:
        import transformers
        transformers.logging.set_verbosity_error()
        try:
            transformers.utils.logging.disable_progress_bar()
        except (AttributeError, Exception):
            pass
    except ImportError:
        pass
    try:
        import huggingface_hub.utils as _hf_utils
        _hf_utils.disable_progress_bars()
    except (ImportError, AttributeError):
        pass


def init_workers() -> tuple[int, int, int, torch.device]:
    """Lightweight init for torchrun-launched scripts.

    Reads ``RANK`` / ``WORLD_SIZE`` / ``LOCAL_RANK`` from the environment and
    binds this process to ``cuda:LOCAL_RANK`` (no-op if no GPU). NO NCCL
    process group is created; cross-rank coordination is handled via
    filesystem sentinels (see ``mark_rank_done`` / ``wait_for_aggregator``).
    Also silences HF model-load chatter via ``quiet_hf()``.

    Returns:
        (rank, world_size, local_rank, device)
    """
    quiet_hf()
    rank, world_size, local_rank = get_dist_info()
    if torch.cuda.is_available():
        torch.cuda.set_device(local_rank)
        device = torch.device(f"cuda:{local_rank}")
    else:
        device = torch.device("cpu")
    return rank, world_size, local_rank, device


def is_worker_zero_node() -> bool:
    """True if this host's name ends with ``worker-0`` (multi-node convention).

    Single-process runs (``WORLD_SIZE <= 1``) always return True so aggregation
    still happens.
    """
    _, world_size, _ = get_dist_info()
    if world_size <= 1:
        return True
    return socket.gethostname().endswith("worker-0")


def is_aggregator() -> bool:
    """rank-0 on a worker-0 host (or any single-process run)."""
    rank, _, _ = get_dist_info()
    if rank != 0:
        return False
    return is_worker_zero_node()


def slice_for_rank(items: list, rank: int | None = None,
                   world_size: int | None = None) -> list:
    """Stride-slice ``items`` for the given rank/world_size.

    Default uses values from environment. ``items[rank::world_size]`` may
    leave some ranks slightly under-loaded; the filesystem barrier tolerates
    arbitrary skew.
    """
    if rank is None or world_size is None:
        rank, world_size, _ = get_dist_info()
    if world_size <= 1:
        return items
    return items[rank::world_size]


def log_dist(*args, **kwargs) -> None:
    """tqdm-friendly print prefixed with ``[rank R/W host]``."""
    rank, world_size, _ = get_dist_info()
    host = socket.gethostname()
    msg = " ".join(str(a) for a in args)
    print(f"[rank {rank}/{world_size} {host}] {msg}", flush=True, **kwargs)


def env_summary() -> str:
    rank, world_size, local_rank = get_dist_info()
    return (
        f"rank={rank} world_size={world_size} local_rank={local_rank} "
        f"host={socket.gethostname()} aggregator={is_aggregator()}"
    )


# ---------------------------------------------------------------------------
# Filesystem barrier (replaces NCCL barrier)
# ---------------------------------------------------------------------------

_AGG_SENTINEL = "_AGG.done"


def _rank_sentinel_path(partial_dir: str, rank: int) -> str:
    return os.path.join(partial_dir, f"_rank{rank}.done")


def _agg_sentinel_path(partial_dir: str) -> str:
    return os.path.join(partial_dir, _AGG_SENTINEL)


def reset_done_sentinels(partial_dir: str) -> None:
    """Clear stale done-sentinels at the start of a run.

    Every rank removes its own ``_rank{R}.done`` AND the global ``_AGG.done``.
    Multiple ranks racing on the same ``unlink`` is safe (one wins, the rest
    get FileNotFoundError, which we swallow). Per-video partial JSONs in the
    same directory are KEPT — those are reused via ``--skip-existing``.

    Calling this on every rank (not just the aggregator) is what makes a
    restart-after-crash safe: any rank that happens to reach
    ``wait_for_aggregator`` quickly will already have deleted the stale
    ``_AGG.done`` itself, so it cannot trick itself into thinking the new
    run is already done.
    """
    rank, _, _ = get_dist_info()
    os.makedirs(partial_dir, exist_ok=True)
    for path in (_rank_sentinel_path(partial_dir, rank),
                 _agg_sentinel_path(partial_dir)):
        try:
            os.remove(path)
        except FileNotFoundError:
            pass


def mark_rank_done(partial_dir: str) -> None:
    """Each rank touches ``_rank{R}.done`` after finishing its slice."""
    rank, _, _ = get_dist_info()
    path = _rank_sentinel_path(partial_dir, rank)
    open(path, "w").close()


def mark_aggregator_done(partial_dir: str) -> None:
    """Aggregator-only: write ``_AGG.done`` to release waiting ranks."""
    open(_agg_sentinel_path(partial_dir), "w").close()


def wait_for_all_ranks(partial_dir: str, world_size: int,
                       timeout_hours: float = 12.0,
                       poll_seconds: float = 5.0) -> None:
    """Aggregator-only: block until every rank has written ``_rank{R}.done``."""
    if world_size <= 1:
        return
    deadline = time.monotonic() + timeout_hours * 3600
    while True:
        missing = [r for r in range(world_size)
                   if not os.path.exists(_rank_sentinel_path(partial_dir, r))]
        if not missing:
            return
        if time.monotonic() > deadline:
            raise TimeoutError(
                f"Timed out after {timeout_hours}h waiting for ranks to finish. "
                f"Missing sentinels for ranks: {missing}. Some rank likely crashed."
            )
        time.sleep(poll_seconds)


def wait_for_aggregator(partial_dir: str, timeout_hours: float = 12.0,
                        poll_seconds: float = 5.0) -> None:
    """Every non-aggregator rank: block until ``_AGG.done`` exists.

    This is the cross-node end-of-stage barrier: every torchrun process exits
    only after the aggregator has finished merging, so bash advances to the
    next stage in lockstep on every node.
    """
    _, world_size, _ = get_dist_info()
    if world_size <= 1:
        return
    agg = _agg_sentinel_path(partial_dir)
    deadline = time.monotonic() + timeout_hours * 3600
    while not os.path.exists(agg):
        if time.monotonic() > deadline:
            raise TimeoutError(
                f"Timed out after {timeout_hours}h waiting for aggregator "
                f"sentinel: {agg}. Aggregator likely crashed; check logs."
            )
        time.sleep(poll_seconds)
