/* CineOrchestra project site renderer.
 *
 * Reads window.MANIFEST (inlined by manifest.js) and builds a carousel of
 * result tiles. Each tile pairs a generated video with its entity-centric
 * timeline; hovering a bar reveals that event's caption, the playhead is
 * driven by the tile's video via requestAnimationFrame, and clicking a
 * timeline track seeks the video to that moment.
 */

// Camera and transition reserve their own colors (amber + hot-pink); the rest
// of the palette skips those hues so per-entity bars don't collide with them.
const TAB10 = [
  "#60a5fa", "#34d399", "#a78bfa", "#22d3ee", "#fb7185",
  "#f87171", "#facc15", "#94a3b8",
];
const COLOR_CAMERA = "#fbbf24";    // amber — visually warmer than the slate
                                   // it replaces; the camera entity is slightly
                                   // emphasized but never outranks {transition}.
const COLOR_TRANSITION = "#f472b6";

function entityColor(name, ordinal) {
  if (name === "{camera}") return COLOR_CAMERA;
  if (name === "{transition}") return COLOR_TRANSITION;
  return TAB10[ordinal % TAB10.length];
}

function prettyName(s) { return s.replace(/^\{|\}$/g, "").replace(/_/g, " "); }

// Order globals and assign a palette color. Used by both the timeline and the
// reference-image column so the two stay color-consistent.
function buildEntityColorMap(udJson) {
  const globals = udJson.global_entities || [];
  const byName = new Map(globals.map(g => [g.name, g]));
  const ordered = [];
  for (const sp of ["{camera}", "{transition}"]) {
    if (byName.has(sp)) ordered.push(byName.get(sp));
  }
  for (const g of globals) {
    if (g.name === "{camera}" || g.name === "{transition}") continue;
    ordered.push(g);
  }
  const colorMap = new Map();
  let palIdx = 0;
  for (const g of ordered) {
    if (g.name === "{camera}" || g.name === "{transition}") {
      colorMap.set(g.name, entityColor(g.name, 0));
    } else {
      colorMap.set(g.name, entityColor(g.name, palIdx++));
    }
  }
  return { ordered, colorMap };
}

// Short events get a ±0.5 s caption-visibility window so the playhead has
// time to surface the description as it crosses.
const SHORT_EVENT_MAX_S = 0.1;
const SHORT_EVENT_PAD_S = 0.5;
function visWindow(s, e) {
  if ((e - s) < SHORT_EVENT_MAX_S) {
    return [Math.max(0, s - SHORT_EVENT_PAD_S), e + SHORT_EVENT_PAD_S];
  }
  return [s, e];
}

function el(tag, props = {}, children = []) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k === "text") e.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") {
      e.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (k === "dataset" && typeof v === "object") {
      for (const [dk, dv] of Object.entries(v)) e.dataset[dk] = dv;
    } else if (v !== undefined && v !== null) {
      e.setAttribute(k, v);
    }
  }
  for (const c of children) {
    if (c == null) continue;
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return e;
}

// --------------------------------------------------------------------------
// Timeline (compact)
// --------------------------------------------------------------------------
function buildTimeline(udJson, durationSeconds, colorMapInput) {
  const dense = udJson.dense_entities || [];
  const { ordered, colorMap } = colorMapInput || buildEntityColorMap(udJson);

  const wrap = el("div", { class: "timeline" });
  const denseByEntity = new Map();
  for (const d of dense) {
    if (!denseByEntity.has(d.name)) denseByEntity.set(d.name, []);
    denseByEntity.get(d.name).push(d);
  }

  const items = [];      // {bar, caption, start, end, visStart, visEnd}
  const tracks = [];

  for (const g of ordered) {
    const events = denseByEntity.get(g.name) || [];
    if (events.length === 0 && (!g.time_intervals || g.time_intervals.length === 0)) continue;

    const row = el("div", { class: "timeline-row" });
    const label = el("div", {
      class: "row-label",
      text: prettyName(g.name),
      style: `color:${colorMap.get(g.name)};`,
    });
    const track = el("div", { class: "timeline-track", dataset: { duration: String(durationSeconds) } });

    for (const ev of events) {
      const [s, e] = ev.time_intervals;
      const left = (s / durationSeconds) * 100;
      const width = Math.max(0.6, ((e - s) / durationSeconds) * 100);
      const color = colorMap.get(g.name);
      const bar = el("div", {
        class: "timeline-bar",
        style:
          `left:${left}%;width:${width}%;background:${color};` +
          `background-image:repeating-linear-gradient(45deg, rgba(255,255,255,0.16) 0 4px, rgba(0,0,0,0) 4px 8px);` +
          `border-color:${color};`,
        title: `${prettyName(g.name)}: ${ev.description || ""}`,
        dataset: { entity: g.name, start: String(s), end: String(e) },
      });
      // Anchor caption from the right when it would otherwise be pushed off
      // the end of the track. This keeps captions for late events on-screen.
      const useRightAnchor = left > 60;
      const anchorStyle = useRightAnchor
        ? `right:${Math.max(0, 100 - left - width - 4)}%;`
        : `left:${Math.max(0, left - 4)}%;`;
      const caption = el("div", {
        class: "timeline-caption" + (useRightAnchor ? " anchor-right" : ""),
        style: anchorStyle,
        text: ev.description || "",
        title: ev.description || "",
        dataset: { entity: g.name, start: String(s), end: String(e) },
      });
      track.appendChild(bar);
      track.appendChild(caption);
      const [vs, ve] = visWindow(s, e);
      items.push({ bar, caption, start: s, end: e, visStart: vs, visEnd: ve });
    }

    // Fallback: entities with global intervals only (no dense events).
    if (events.length === 0) {
      for (const iv of g.time_intervals || []) {
        const [s, e] = iv;
        const left = (s / durationSeconds) * 100;
        const width = Math.max(0.6, ((e - s) / durationSeconds) * 100);
        const color = colorMap.get(g.name);
        const bar = el("div", {
          class: "timeline-bar",
          style: `left:${left}%;width:${width}%;background:${color};opacity:0.6;border-color:${color};`,
        });
        track.appendChild(bar);
        const [vs, ve] = visWindow(s, e);
        items.push({ bar, caption: null, start: s, end: e, visStart: vs, visEnd: ve });
      }
    }

    row.appendChild(label);
    row.appendChild(track);
    wrap.appendChild(row);
    tracks.push(track);
  }

  // Single shared playhead.
  const overlay = el("div", { class: "timeline-playhead-overlay" });
  const playhead = el("div", { class: "timeline-playhead", style: "left:0%;" });
  overlay.appendChild(playhead);
  wrap.appendChild(overlay);

  // Axis ticks — auto-spaced: 1 s for short clips, 5 s for long ones.
  const axis = el("div", { class: "timeline-axis" });
  const tickStep = durationSeconds > 15 ? 5 : 1;
  for (let t = 0; t <= durationSeconds + 0.001; t += tickStep) {
    const left = (t / durationSeconds) * 100;
    axis.appendChild(el("div", { class: "tick", style: `left:${left}%;` }));
    axis.appendChild(el("div", { class: "tick-label", style: `left:${left}%;`, text: `${t}s` }));
  }
  wrap.appendChild(axis);

  return { node: wrap, tracks, items, playhead };
}

// --------------------------------------------------------------------------
// Entry tile
// --------------------------------------------------------------------------
function buildEntryTile(entry, opts) {
  opts = opts || {};
  const duration = entry.duration || 10.2;
  const tile = el("div", { class: "entry-tile", dataset: { seq: entry.seq } });

  const head = el("div", { class: "entry-head" });
  if (entry.desc) head.appendChild(el("span", { class: "entry-desc", text: entry.desc }));
  const controls = el("div", { class: "entry-controls" });
  const playToggle = el("button", {
    type: "button", class: "play-toggle is-paused", "aria-label": "Play",
  });
  playToggle.innerHTML =
    '<svg class="icon icon-play" viewBox="0 0 16 16" aria-hidden="true">' +
      '<path d="M4 3 L4 13 L13 8 Z" fill="currentColor"/></svg>' +
    '<svg class="icon icon-pause" viewBox="0 0 16 16" aria-hidden="true">' +
      '<path d="M4 3 H7 V13 H4 Z M9 3 H12 V13 H9 Z" fill="currentColor"/></svg>' +
    '<span class="play-label">Play</span>';
  const reset = el("button", { type: "button", text: "Reset" });
  controls.appendChild(playToggle);
  controls.appendChild(reset);
  // Timeline toggle only shown in modal popup; carousel keeps timeline always open.
  let timelineTgl = null;
  if (opts.modal) {
    timelineTgl = el("button", {
      type: "button", class: "timeline-toggle is-open", "aria-label": "Hide timeline",
    });
    timelineTgl.innerHTML = '<i class="tl-arrow" aria-hidden="true">▸</i> Timeline';
    controls.appendChild(timelineTgl);
  }
  head.appendChild(controls);
  tile.appendChild(head);

  // Color map shared between the ref column and the timeline so a given
  // entity gets the same hue in both views.
  const cmap = buildEntityColorMap(entry.timeline);

  // Media row: reference-image column on the left, video on the right.
  // Refs render in a fixed 2x2 grid so the ref column has a consistent width
  // and cell size across every tile; missing refs render as empty placeholders.
  const mediaRow = el("div", { class: "media-row" });
  const refs = entry.refs || [];
  const colCount = 2;
  const slotCount = 4;
  const refColumn = el("div", { class: `ref-column cols-${colCount}` });
  for (let i = 0; i < slotCount; i++) {
    const ref = refs[i];
    if (ref) {
      const color = cmap.colorMap.get(ref.name) || "#94a3b8";
      const cell = el("div", {
        class: "ref-cell",
        style: `--ent-color:${color};`,
      });
      const imgWrap = el("div", { class: "ref-image-wrap" });
      imgWrap.appendChild(el("img", {
        class: "ref-image", src: ref.src, alt: prettyName(ref.name), loading: "lazy",
      }));
      cell.appendChild(imgWrap);
      cell.appendChild(el("div", {
        class: "ref-name", text: prettyName(ref.name), title: prettyName(ref.name),
      }));
      refColumn.appendChild(cell);
    } else {
      refColumn.appendChild(el("div", { class: "ref-cell is-empty" }));
    }
  }
  mediaRow.appendChild(refColumn);

  // First-slide videos are bumped to preload="auto" in main(); goTo() does
  // the same on navigation so the current+next slide is always pre-buffered.
  const video = el("video", {
    class: "tile-video",
    src: entry.video,
    controls: "",
    preload: "metadata",
    muted: "",
    playsinline: "",
  });
  mediaRow.appendChild(video);
  tile.appendChild(mediaRow);
  tile._video = video;  // exposed for "Play all"

  // Timeline — open by default for carousel; toggle button shows/hides it.
  const timelineHost = el("div", { class: "timeline-wrap is-open" });
  tile.appendChild(timelineHost);

  const tl = buildTimeline(entry.timeline, duration, cmap);
  timelineHost.appendChild(tl.node);

  if (timelineTgl) {
    timelineTgl.addEventListener("click", () => {
      const open = timelineHost.classList.toggle("is-open");
      timelineTgl.classList.toggle("is-open", open);
      timelineTgl.setAttribute("aria-label", open ? "Hide timeline" : "Show timeline");
      if (open) requestAnimationFrame(tick);
    });
  }

  // Click-to-seek. Listener attached to both .timeline-track and
  // .timeline-row so the click is caught whether it hits the bar directly
  // or the wrapped-caption padding below. play() runs only after
  // currentTime has been set.
  for (const track of tl.tracks) {
    const row = track.parentElement;
    const handler = (ev) => {
      if (ev._timelineSeekHandled) return;
      if (ev.target.closest(".row-label")) return;
      const rect = track.getBoundingClientRect();
      if (rect.width <= 0) return;
      if (ev.clientX < rect.left || ev.clientX > rect.right) return;
      ev._timelineSeekHandled = true;
      const pct = (ev.clientX - rect.left) / rect.width;
      const t = Math.max(0, Math.min(1, pct)) * duration;
      const seekAndPlay = () => {
        try {
          video.currentTime = Math.max(0, Math.min(t, video.duration || t));
        } catch (_) {}
        const p = video.play(); if (p && p.catch) p.catch(() => {});
      };
      if (video.readyState >= 1) {
        seekAndPlay();
      } else {
        video.addEventListener("loadedmetadata", seekAndPlay, { once: true });
        try { video.load(); } catch (_) {}
      }
    };
    track.addEventListener("click", handler);
    row.addEventListener("click", handler);
  }

  // Hover sync: highlight bar + caption for the hovered event only.
  let hoverItem = null;
  function applyHover(item) {
    if (hoverItem === item) return;
    if (hoverItem) {
      hoverItem.bar.classList.remove("is-active");
      if (hoverItem.caption) hoverItem.caption.classList.remove("is-active");
    }
    hoverItem = item;
    if (item) {
      item.bar.classList.add("is-active");
      if (item.caption) item.caption.classList.add("is-active");
    }
  }
  function itemFromTarget(t) {
    const node = t.closest(".timeline-bar, .timeline-caption");
    if (!node) return null;
    const s = parseFloat(node.dataset.start);
    const e = parseFloat(node.dataset.end);
    for (const it of tl.items) {
      if (Math.abs(it.start - s) < 1e-6 && Math.abs(it.end - e) < 1e-6) return it;
    }
    return null;
  }
  tl.node.addEventListener("mouseover", (ev) => {
    const it = itemFromTarget(ev.target); if (it) applyHover(it);
  });
  tl.node.addEventListener("mouseout", (ev) => {
    const next = ev.relatedTarget && ev.relatedTarget.closest && ev.relatedTarget.closest(".timeline-bar, .timeline-caption");
    if (!next) applyHover(null);
  });

  // Play/pause toggle + reset
  function setToggleState(playing) {
    playToggle.classList.toggle("is-playing", playing);
    playToggle.classList.toggle("is-paused", !playing);
    const lbl = playToggle.querySelector(".play-label");
    if (lbl) lbl.textContent = playing ? "Pause" : "Play";
    playToggle.setAttribute("aria-label", playing ? "Pause" : "Play");
  }
  playToggle.addEventListener("click", () => {
    const playing = playToggle.classList.contains("is-playing");
    if (playing) video.pause();
    else { const p = video.play(); if (p && p.catch) p.catch(() => {}); }
  });
  reset.addEventListener("click", () => {
    video.pause();
    try { video.currentTime = 0; } catch (_) {}
    setToggleState(false);
  });
  video.addEventListener("play", () => setToggleState(true));
  video.addEventListener("pause", () => setToggleState(false));
  video.addEventListener("ended", () => setToggleState(false));

  // Playhead loop. Browsers only fire timeupdate ~4× per second, so we
  // extrapolate between updates with the wall clock. CRUCIAL: extrapolation
  // only runs once playback has ACTUALLY started (the `playing` event has
  // fired). Before that — during cold-load when video.play() has been
  // called but the first frame isn't decoded yet — we report raw
  // currentTime (which stays at 0) so the playhead doesn't drift ahead of
  // the actual video.
  let baseV = 0;                    // video.currentTime at last resync
  let baseW = performance.now();    // wall clock at last resync
  let actuallyPlaying = false;      // toggles on `playing` / off on pause/seek/ended
  function resync() {
    baseV = video.currentTime || 0;
    baseW = performance.now();
  }
  function smoothTime() {
    if (video.paused || video.ended || !actuallyPlaying) {
      return video.currentTime || 0;
    }
    const elapsed = (performance.now() - baseW) / 1000;
    let t = baseV + elapsed * (video.playbackRate || 1);
    const real = video.currentTime || 0;
    if (real > t) { t = real; resync(); }
    else if (t > real + 0.6) t = real + 0.6;
    return t;
  }
  let rafId = 0;
  function tick() {
    rafId = 0;
    const t = smoothTime();
    const pct = Math.max(0, Math.min(1, t / duration)) * 100;
    tl.playhead.style.left = pct + "%";
    for (const it of tl.items) {
      const insideBar = (t >= it.start && t <= it.end);
      const insideCap = (t >= it.visStart && t <= it.visEnd);
      it.bar.classList.toggle("is-current", insideBar);
      if (it.caption) {
        if (insideCap && !it.caption.classList.contains("is-active")) {
          it.caption.classList.add("is-active");
          it.caption.dataset.byPlayhead = "1";
        } else if (!insideCap && it.caption.dataset.byPlayhead === "1") {
          it.caption.classList.remove("is-active");
          delete it.caption.dataset.byPlayhead;
        }
      }
    }
    if (!video.paused && !video.ended) rafId = requestAnimationFrame(tick);
  }
  function ensureLoop() { if (!rafId) rafId = requestAnimationFrame(tick); }
  video.addEventListener("play",     () => { resync(); ensureLoop(); });
  video.addEventListener("playing",  () => { actuallyPlaying = true; resync(); ensureLoop(); });
  video.addEventListener("pause",    () => { actuallyPlaying = false; });
  video.addEventListener("waiting",  () => { actuallyPlaying = false; });
  video.addEventListener("stalled",  () => { actuallyPlaying = false; });
  video.addEventListener("ended",    () => { actuallyPlaying = false; });
  video.addEventListener("seeking",  () => { actuallyPlaying = false; resync(); requestAnimationFrame(tick); });
  video.addEventListener("seeked",   () => { resync(); requestAnimationFrame(tick); });
  video.addEventListener("timeupdate", () => { resync(); ensureLoop(); });
  video.addEventListener("ratechange", resync);
  requestAnimationFrame(tick);

  return tile;
}

// --------------------------------------------------------------------------
// Play-all hint — shimmer/glow the button when the carousel enters view.
// Returns a rehint() function the caller can invoke on slide navigation.
// --------------------------------------------------------------------------
function armPlayAllHint(carousel, playAll, getCurrentVideos) {
  if (!playAll || typeof IntersectionObserver === "undefined") return function() {};
  let done = false;
  function disarm() {
    if (done) return;
    done = true;
    obs.disconnect();
    playAll.classList.remove("is-hinting");
  }
  function hint() {
    if (done) return;
    const vs = getCurrentVideos();
    if (vs.length > 0 && vs.some(v => !v.paused)) return; // already playing
    playAll.classList.remove("is-hinting");
    void playAll.offsetWidth;   // force reflow so the animation restarts cleanly
    playAll.classList.add("is-hinting");
  }
  playAll.addEventListener("click", disarm);
  playAll.addEventListener("animationend", (ev) => {
    if (ev.animationName === "playall-glow") playAll.classList.remove("is-hinting");
  });
  const obs = new IntersectionObserver((entries) => {
    for (const en of entries) { if (en.isIntersecting) { hint(); break; } }
  }, { threshold: 0.4 });
  obs.observe(carousel);
  return hint;
}

// --------------------------------------------------------------------------
// Carousel
// --------------------------------------------------------------------------
// Wire an expand/collapse section ("More results", "More comparisons") with
// its own Play all / Reset all controls and background video prefetch.
function wireMoreSection(opts) {
  const section = document.getElementById(opts.sectionId);
  const toggle  = document.getElementById(opts.toggleId);
  const grid    = document.getElementById(opts.gridId);
  const playAll = document.getElementById(opts.playAllId);
  const resetAll = document.getElementById(opts.resetAllId);
  if (!section || !toggle) return;

  function gridVideos() {
    return grid ? Array.from(grid.querySelectorAll("video")) : [];
  }
  function setPlayAllState(playing) {
    if (!playAll) return;
    playAll.classList.toggle("is-playing", playing);
    playAll.classList.toggle("is-paused", !playing);
    const lbl = playAll.querySelector(".play-all-label");
    if (lbl) lbl.textContent = playing ? "Pause all" : "Play all";
  }

  toggle.addEventListener("click", () => {
    const wasHidden = section.hasAttribute("hidden");
    if (wasHidden) {
      section.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
      // Autoplay all grid videos on open.
      const vs = gridVideos();
      vs.forEach(v => {
        try { v.setAttribute("preload", "auto"); v.load(); } catch (_) {}
        const p = v.play(); if (p && p.catch) p.catch(() => {});
      });
      setPlayAllState(true);
    } else {
      section.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
      gridVideos().forEach(v => v.pause());
      setPlayAllState(false);
    }
  });

  if (playAll) {
    playAll.addEventListener("click", () => {
      const vs = gridVideos();
      const anyPlaying = vs.some(v => !v.paused);
      if (anyPlaying) {
        vs.forEach(v => v.pause());
        setPlayAllState(false);
      } else {
        vs.forEach(v => { const p = v.play(); if (p && p.catch) p.catch(() => {}); });
        setPlayAllState(true);
      }
    });
    if (grid) {
      grid.addEventListener("play", () => setPlayAllState(gridVideos().some(v => !v.paused)), true);
      grid.addEventListener("pause", () => setPlayAllState(gridVideos().some(v => !v.paused)), true);
    }
  }

  if (resetAll) {
    resetAll.addEventListener("click", () => {
      gridVideos().forEach(v => {
        v.pause();
        try { v.currentTime = 0; } catch (_) {}
      });
      setPlayAllState(false);
    });
  }

  // Background-prefetch the grid videos after window load + an idle callback,
  // so opening the section feels instant. Staggered so we don't blast a dozen
  // requests in parallel.
  let prefetched = false;
  function prefetchGridVideos() {
    if (prefetched) return;
    prefetched = true;
    const vs = gridVideos();
    vs.forEach((v, i) => {
      setTimeout(() => {
        try { v.setAttribute("preload", "auto"); v.load(); } catch (_) {}
      }, i * 80);
    });
  }
  function schedulePrefetch() {
    if (prefetched) return;
    if ("requestIdleCallback" in window) {
      requestIdleCallback(prefetchGridVideos, { timeout: 4000 });
    } else {
      setTimeout(prefetchGridVideos, 1500);
    }
  }
  if (document.readyState === "complete") {
    schedulePrefetch();
  } else {
    window.addEventListener("load", schedulePrefetch, { once: true });
  }
}

function buildCarousel(entries, opts) {
  opts = opts || {};
  const carouselId = opts.carouselId || "carousel";
  const trackId    = opts.trackId    || "slides-track";
  const dotsId     = opts.dotsId     || "carousel-dots";
  const playAllId  = opts.playAllId  || "play-all";
  const resetAllId = opts.resetAllId || (playAllId.replace(/play-all$/, "reset-all"));
  const carousel   = document.getElementById(carouselId);
  const track      = document.getElementById(trackId);
  const dotsHost   = document.getElementById(dotsId);
  const playAll    = document.getElementById(playAllId);
  const resetAll   = document.getElementById(resetAllId);
  if (!carousel || !track) return;
  const prev = carousel.querySelector(".nav-prev");
  const next = carousel.querySelector(".nav-next");

  // Slice into slides of 2 entries each.
  const slides = [];
  for (let i = 0; i < entries.length; i += 2) {
    slides.push(entries.slice(i, i + 2));
  }

  for (const slideEntries of slides) {
    const slide = el("div", { class: "slide" + (slideEntries.length === 1 ? " single" : "") });
    for (const e of slideEntries) slide.appendChild(buildEntryTile(e, {}));
    track.appendChild(slide);
  }

  function currentVideos() {
    const slide = track.children[current];
    if (!slide) return [];
    return Array.from(slide.querySelectorAll("video"));
  }
  function setPlayAllState(playing) {
    if (!playAll) return;
    playAll.classList.toggle("is-playing", playing);
    playAll.classList.toggle("is-paused", !playing);
    const lbl = playAll.querySelector(".play-all-label");
    if (lbl) lbl.textContent = playing ? "Pause all" : "Play all";
  }

  let rehintFn = null;
  let current = 0;
  function goTo(idx) {
    // Wrap-around: past the last slide goes back to the first, before-zero
    // goes to the last. Both prev and next are always enabled.
    const n = slides.length;
    current = ((idx % n) + n) % n;
    track.style.transform = `translateX(-${current * 100}%)`;
    // Pause every video that isn't on the current slide to save CPU.
    Array.from(track.children).forEach((slide, i) => {
      if (i !== current) {
        slide.querySelectorAll("video").forEach(v => v.pause());
      }
    });
    Array.from(dotsHost.children).forEach((d, i) =>
      d.classList.toggle("is-current", i === current));
    // Sync Play-All to the new slide's state.
    const vs = currentVideos();
    setPlayAllState(vs.some(v => !v.paused));
    // Re-hint the Play All button for the new slide's content.
    if (rehintFn) setTimeout(rehintFn, 250);
    // Prioritise video loading: bump preload to "auto" for the current and
    // next slide so navigating forward is buffer-free, while everything
    // further out stays at "none" to keep bandwidth focused on the visible
    // and about-to-be-visible content.
    Array.from(track.children).forEach((slide, i) => {
      const target = (i === current || i === (current + 1) % slides.length) ? "auto" : "metadata";
      slide.querySelectorAll("video").forEach(v => {
        if (v.getAttribute("preload") !== target) {
          v.setAttribute("preload", target);
          if (target === "auto") {
            try { v.load(); } catch (_) {}
          }
        }
      });
    });
  }

  for (let i = 0; i < slides.length; i++) {
    const dot = el("button", {
      type: "button",
      "aria-label": `Go to slide ${i + 1}`,
      role: "tab",
    });
    dot.addEventListener("click", () => goTo(i));
    dotsHost.appendChild(dot);
  }

  prev.addEventListener("click", () => goTo(current - 1));
  next.addEventListener("click", () => goTo(current + 1));

  if (playAll) {
    playAll.addEventListener("click", () => {
      const vs = currentVideos();
      const anyPlaying = vs.some(v => !v.paused);
      if (anyPlaying) {
        vs.forEach(v => v.pause());
        setPlayAllState(false);
      } else {
        vs.forEach(v => {
          const p = v.play(); if (p && p.catch) p.catch(() => {});
        });
        setPlayAllState(true);
      }
    });
    // Keep the Play-All label in sync with per-tile play/pause.
    track.addEventListener("play", () => {
      const vs = currentVideos();
      setPlayAllState(vs.some(v => !v.paused));
    }, true);
    track.addEventListener("pause", () => {
      const vs = currentVideos();
      setPlayAllState(vs.some(v => !v.paused));
    }, true);
  }

  if (resetAll) {
    resetAll.addEventListener("click", () => {
      currentVideos().forEach(v => {
        v.pause();
        try { v.currentTime = 0; } catch (_) {}
      });
      setPlayAllState(false);
    });
  }

  // Keyboard arrows when the carousel has focus.
  carousel.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowLeft") { ev.preventDefault(); goTo(current - 1); }
    else if (ev.key === "ArrowRight") { ev.preventDefault(); goTo(current + 1); }
  });

  goTo(0);

  rehintFn = armPlayAllHint(carousel, playAll, currentVideos);

  // Autoplay the first slide's two videos as soon as they're actually
  // ready to play — gated on `canplay` rather than a fixed timer, so the
  // progress bar can't start sliding before the first decoded frame
  // commits. If the slide isn't on-screen yet, wait until it is.
  // Pass autoplay:false in opts to suppress this for carousels like
  // long-form generation where autoplay is not desired.
  function armAutoplay() {
    if (opts.autoplay === false) return;
    const firstSlide = track.children[0];
    if (!firstSlide || typeof IntersectionObserver === "undefined") return;
    const videos = Array.from(firstSlide.querySelectorAll("video"));
    if (videos.length === 0) return;
    for (const v of videos) {
      v.muted = true; v.defaultMuted = true; v.playsInline = true;
    }
    let visible = false;
    let fired = false;
    function maybeFire() {
      if (fired || !visible) return;
      // All videos must be at HAVE_FUTURE_DATA (>=3) before we play, so the
      // playhead doesn't start sliding before the video has decoded.
      if (!videos.every(v => v.readyState >= 3)) return;
      fired = true;
      for (const v of videos) {
        const p = v.play(); if (p && p.catch) p.catch(() => {});
      }
    }
    for (const v of videos) {
      v.addEventListener("canplay", maybeFire);
      v.addEventListener("canplaythrough", maybeFire);
    }
    const obs = new IntersectionObserver((entries) => {
      for (const en of entries) {
        visible = en.isIntersecting;
        if (visible) maybeFire();
      }
    }, { threshold: 0.25 });
    obs.observe(firstSlide);
  }
  armAutoplay();
}

// --------------------------------------------------------------------------
// Comparison section (per-entry: ref grid + 6-variant video grid + timeline)
// --------------------------------------------------------------------------
function buildComparisonTile(entry, kind, opts) {
  opts = opts || {};
  const tile = el("div", { class: "cmp-tile", dataset: { seq: entry.seq } });

  const cmap = buildEntityColorMap(entry.timeline);

  // Header — variant labels are intentionally small/dense; the tile is
  // intended to be read as a single composite.
  const head = el("div", { class: "cmp-head" });
  if (entry.desc) head.appendChild(el("span", { class: "cmp-label", text: entry.desc }));
  const headControls = el("div", { class: "entry-controls" });
  const playToggle = el("button", { type: "button", class: "play-toggle is-paused", "aria-label": "Play" });
  playToggle.innerHTML =
    '<svg class="icon icon-play" viewBox="0 0 16 16" aria-hidden="true">' +
      '<path d="M4 3 L4 13 L13 8 Z" fill="currentColor"/></svg>' +
    '<svg class="icon icon-pause" viewBox="0 0 16 16" aria-hidden="true">' +
      '<path d="M4 3 H7 V13 H4 Z M9 3 H12 V13 H9 Z" fill="currentColor"/></svg>' +
    '<span class="play-label">Play</span>';
  const reset = el("button", { type: "button", text: "Reset" });
  headControls.appendChild(playToggle);
  headControls.appendChild(reset);
  // Timeline toggle only shown in modal popup; carousel keeps timeline always open.
  let cmpTimelineTgl = null;
  if (opts.modal) {
    cmpTimelineTgl = el("button", {
      type: "button", class: "timeline-toggle is-open", "aria-label": "Hide timeline",
    });
    cmpTimelineTgl.innerHTML = '<i class="tl-arrow" aria-hidden="true">▸</i> Timeline';
    headControls.appendChild(cmpTimelineTgl);
  }
  head.appendChild(headControls);
  tile.appendChild(head);

  // Media row: ref grid (left) + 6-cell video grid (right). The ref grid
  // collapses to a single column when there are ≤ 2 refs so small entries
  // don't render a half-empty 2×2.
  const mediaRow = el("div", { class: "cmp-media-row" });

  const refs = entry.refs || [];
  // Fixed 2x2 grid so cell size is consistent across comparison tiles.
  const cmpColCount = 2;
  const cmpSlotCount = 4;
  const refColumn = el("div", { class: `cmp-ref-grid cols-${cmpColCount}` });
  for (let i = 0; i < cmpSlotCount; i++) {
    const ref = refs[i];
    if (ref) {
      const color = cmap.colorMap.get(ref.name) || "#94a3b8";
      const cell = el("div", { class: "ref-cell", style: `--ent-color:${color};` });
      const wrap = el("div", { class: "ref-image-wrap" });
      wrap.appendChild(el("img", {
        class: "ref-image", src: ref.src, alt: prettyName(ref.name), loading: "lazy",
      }));
      cell.appendChild(wrap);
      cell.appendChild(el("div", {
        class: "ref-name", text: prettyName(ref.name), title: prettyName(ref.name),
      }));
      refColumn.appendChild(cell);
    } else {
      refColumn.appendChild(el("div", { class: "ref-cell is-empty" }));
    }
  }
  mediaRow.appendChild(refColumn);

  // Video grid — 6 variants in a 3×2 grid.
  const videoGrid = el("div", { class: "cmp-video-grid" });
  const videos = [];
  for (const v of (entry.variants || [])) {
    const cell = el("div", {
      class: "cmp-video-cell" + (v.highlight ? " is-ours" : ""),
    });
    cell.appendChild(el("div", { class: "cmp-variant-label", text: v.label }));
    const video = el("video", {
      class: "cmp-video",
      src: v.video,
      controls: "",
      preload: "metadata",
      muted: "",
      playsinline: "",
    });
    cell.appendChild(video);
    videoGrid.appendChild(cell);
    videos.push(video);
  }
  mediaRow.appendChild(videoGrid);
  tile.appendChild(mediaRow);

  // Timeline — open by default; toggle button shows/hides it.
  const timelineHost = el("div", { class: "timeline-wrap is-open" });
  tile.appendChild(timelineHost);
  const tl = buildTimeline(entry.timeline, 10.2, cmap);
  timelineHost.appendChild(tl.node);

  if (cmpTimelineTgl) {
    cmpTimelineTgl.addEventListener("click", () => {
      const open = timelineHost.classList.toggle("is-open");
      cmpTimelineTgl.classList.toggle("is-open", open);
      cmpTimelineTgl.setAttribute("aria-label", open ? "Hide timeline" : "Show timeline");
    });
  }

  // Click-to-seek on the timeline row: applies to ALL videos in the entry so
  // the comparison stays synchronised. Same defensive double-attach pattern
  // as the main carousel — see the comment there for rationale.
  for (const track of tl.tracks) {
    const row = track.parentElement;
    const handler = (ev) => {
      if (ev._timelineSeekHandled) return;
      if (ev.target.closest(".row-label")) return;
      const rect = track.getBoundingClientRect();
      if (rect.width <= 0) return;
      if (ev.clientX < rect.left || ev.clientX > rect.right) return;
      ev._timelineSeekHandled = true;
      const pct = (ev.clientX - rect.left) / rect.width;
      const t = Math.max(0, Math.min(1, pct)) * 10.2;
      // Seek each video independently so a slow-to-load baseline doesn't
      // gate the others. Each video clamps to its own duration.
      const seekOne = (v) => {
        try { v.currentTime = Math.max(0, Math.min(t, v.duration || t)); } catch (_) {}
        const p = v.play(); if (p && p.catch) p.catch(() => {});
      };
      for (const v of videos) {
        if (v.readyState >= 1) {
          seekOne(v);
        } else {
          v.addEventListener("loadedmetadata", () => seekOne(v), { once: true });
          try { v.load(); } catch (_) {}
        }
      }
    };
    track.addEventListener("click", handler);
    row.addEventListener("click", handler);
  }

  // Hover sync — reuse the standard timeline hover behavior.
  let hoverItem = null;
  function applyHover(item) {
    if (hoverItem === item) return;
    if (hoverItem) {
      hoverItem.bar.classList.remove("is-active");
      if (hoverItem.caption) hoverItem.caption.classList.remove("is-active");
    }
    hoverItem = item;
    if (item) {
      item.bar.classList.add("is-active");
      if (item.caption) item.caption.classList.add("is-active");
    }
  }
  function itemFromTarget(t) {
    const node = t.closest(".timeline-bar, .timeline-caption");
    if (!node) return null;
    const s = parseFloat(node.dataset.start);
    const e = parseFloat(node.dataset.end);
    for (const it of tl.items) {
      if (Math.abs(it.start - s) < 1e-6 && Math.abs(it.end - e) < 1e-6) return it;
    }
    return null;
  }
  tl.node.addEventListener("mouseover", (ev) => {
    const it = itemFromTarget(ev.target); if (it) applyHover(it);
  });
  tl.node.addEventListener("mouseout", (ev) => {
    const next = ev.relatedTarget && ev.relatedTarget.closest
      && ev.relatedTarget.closest(".timeline-bar, .timeline-caption");
    if (!next) applyHover(null);
  });

  // Play/Pause-all + reset for the tile's own videos.
  function setToggleState(playing) {
    playToggle.classList.toggle("is-playing", playing);
    playToggle.classList.toggle("is-paused", !playing);
    const lbl = playToggle.querySelector(".play-label");
    if (lbl) lbl.textContent = playing ? "Pause" : "Play";
  }
  playToggle.addEventListener("click", () => {
    const anyPlaying = videos.some(v => !v.paused);
    if (anyPlaying) {
      videos.forEach(v => v.pause());
      setToggleState(false);
    } else {
      videos.forEach(v => { const p = v.play(); if (p && p.catch) p.catch(() => {}); });
      setToggleState(true);
    }
  });
  reset.addEventListener("click", () => {
    videos.forEach(v => { v.pause(); try { v.currentTime = 0; } catch (_) {} });
    setToggleState(false);
  });
  // Drive Ours's video as the canonical playhead source.
  const oursVideo = videos.find((_, i) => entry.variants[i].highlight) || videos[0];
  if (oursVideo) {
    oursVideo.addEventListener("play", () => setToggleState(true));
    oursVideo.addEventListener("pause", () => {
      if (videos.every(v => v.paused)) setToggleState(false);
    });
  }

  // Playhead loop driven by Ours, with wall-clock smoothing. Extrapolation
  // only runs once playback has actually started — same reasoning as the
  // main carousel tile.
  let baseV = 0, baseW = performance.now();
  let actuallyPlaying = false;
  function resync() {
    baseV = (oursVideo && oursVideo.currentTime) || 0;
    baseW = performance.now();
  }
  function smoothTime() {
    if (!oursVideo || oursVideo.paused || oursVideo.ended || !actuallyPlaying) {
      return (oursVideo && oursVideo.currentTime) || 0;
    }
    const elapsed = (performance.now() - baseW) / 1000;
    let t = baseV + elapsed * (oursVideo.playbackRate || 1);
    const real = oursVideo.currentTime || 0;
    if (real > t) { t = real; resync(); }
    else if (t > real + 0.6) t = real + 0.6;
    return t;
  }
  let rafId = 0;
  function tick() {
    rafId = 0;
    const t = smoothTime();
    const pct = Math.max(0, Math.min(1, t / 10.2)) * 100;
    tl.playhead.style.left = pct + "%";
    for (const it of tl.items) {
      it.bar.classList.toggle("is-current", t >= it.start && t <= it.end);
      if (it.caption) {
        if (t >= it.visStart && t <= it.visEnd && !it.caption.classList.contains("is-active")) {
          it.caption.classList.add("is-active");
          it.caption.dataset.byPlayhead = "1";
        } else if (!(t >= it.visStart && t <= it.visEnd) && it.caption.dataset.byPlayhead === "1") {
          it.caption.classList.remove("is-active");
          delete it.caption.dataset.byPlayhead;
        }
      }
    }
    if (oursVideo && !oursVideo.paused && !oursVideo.ended) {
      rafId = requestAnimationFrame(tick);
    }
  }
  function ensureLoop() { if (!rafId) rafId = requestAnimationFrame(tick); }
  if (oursVideo) {
    oursVideo.addEventListener("play",     () => { resync(); ensureLoop(); });
    oursVideo.addEventListener("playing",  () => { actuallyPlaying = true; resync(); ensureLoop(); });
    oursVideo.addEventListener("pause",    () => { actuallyPlaying = false; });
    oursVideo.addEventListener("waiting",  () => { actuallyPlaying = false; });
    oursVideo.addEventListener("stalled",  () => { actuallyPlaying = false; });
    oursVideo.addEventListener("ended",    () => { actuallyPlaying = false; });
    oursVideo.addEventListener("seeking",  () => { actuallyPlaying = false; resync(); requestAnimationFrame(tick); });
    oursVideo.addEventListener("seeked",   () => { resync(); requestAnimationFrame(tick); });
    oursVideo.addEventListener("timeupdate", () => { resync(); ensureLoop(); });
    oursVideo.addEventListener("ratechange", resync);
  }
  requestAnimationFrame(tick);

  return tile;
}

function buildComparisonCarousel(carouselId, trackId, dotsId, playAllId, entries) {
  const track = document.getElementById(trackId);
  const dotsHost = document.getElementById(dotsId);
  const playAll = document.getElementById(playAllId);
  const resetAll = document.getElementById(playAllId.replace(/play-all$/, "reset-all"));
  const carousel = document.getElementById(carouselId);
  if (!track || !carousel || !entries || entries.length === 0) return;
  const prev = carousel.querySelector(".nav-prev");
  const next = carousel.querySelector(".nav-next");

  for (const entry of entries) {
    const slide = el("div", { class: "slide single" });
    slide.appendChild(buildComparisonTile(entry, "cmp"));
    track.appendChild(slide);
  }

  let cmpRehintFn = null;
  let current = 0;
  function currentVideos() {
    const slide = track.children[current];
    return slide ? Array.from(slide.querySelectorAll("video")) : [];
  }
  function setPlayAllState(playing) {
    if (!playAll) return;
    playAll.classList.toggle("is-playing", playing);
    playAll.classList.toggle("is-paused", !playing);
    const lbl = playAll.querySelector(".play-all-label");
    if (lbl) lbl.textContent = playing ? "Pause all" : "Play all";
  }
  function goTo(idx) {
    const n = entries.length;
    current = ((idx % n) + n) % n;
    track.style.transform = `translateX(-${current * 100}%)`;
    Array.from(track.children).forEach((s, i) => {
      if (i !== current) s.querySelectorAll("video").forEach(v => v.pause());
    });
    Array.from(dotsHost.children).forEach((d, i) =>
      d.classList.toggle("is-current", i === current));
    // Bump preload for the current + next slide; rest stay dormant.
    Array.from(track.children).forEach((s, i) => {
      const target = (i === current || i === (current + 1) % n) ? "auto" : "metadata";
      s.querySelectorAll("video").forEach(v => {
        if (v.getAttribute("preload") !== target) {
          v.setAttribute("preload", target);
          if (target === "auto") {
            try { v.load(); } catch (_) {}
          }
        }
      });
    });
    const vs = currentVideos();
    setPlayAllState(vs.some(v => !v.paused));
    if (cmpRehintFn) setTimeout(cmpRehintFn, 250);
  }

  for (let i = 0; i < entries.length; i++) {
    const dot = el("button", {
      type: "button",
      "aria-label": `Go to comparison ${i + 1}`,
      role: "tab",
    });
    dot.addEventListener("click", () => goTo(i));
    dotsHost.appendChild(dot);
  }
  if (prev) prev.addEventListener("click", () => goTo(current - 1));
  if (next) next.addEventListener("click", () => goTo(current + 1));

  if (playAll) {
    playAll.addEventListener("click", () => {
      const vs = currentVideos();
      const anyPlaying = vs.some(v => !v.paused);
      if (anyPlaying) { vs.forEach(v => v.pause()); setPlayAllState(false); }
      else { vs.forEach(v => { const p = v.play(); if (p && p.catch) p.catch(() => {}); }); setPlayAllState(true); }
    });
    track.addEventListener("play", () => {
      const vs = currentVideos(); setPlayAllState(vs.some(v => !v.paused));
    }, true);
    track.addEventListener("pause", () => {
      const vs = currentVideos(); setPlayAllState(vs.some(v => !v.paused));
    }, true);
  }

  if (resetAll) {
    resetAll.addEventListener("click", () => {
      const vs = currentVideos();
      vs.forEach(v => {
        v.pause();
        try { v.currentTime = 0; } catch (_) {}
      });
      setPlayAllState(false);
    });
  }

  carousel.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowLeft")  { ev.preventDefault(); goTo(current - 1); }
    else if (ev.key === "ArrowRight") { ev.preventDefault(); goTo(current + 1); }
  });

  goTo(0);
  cmpRehintFn = armPlayAllHint(carousel, playAll, currentVideos);
}

// --------------------------------------------------------------------------
// More Results grid — compact video cards, no timeline, lazy load
// --------------------------------------------------------------------------
function buildMoreResultsGrid(entries, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid || !entries || entries.length === 0) return;

  for (const entry of entries) {
    const card = el("div", { class: "mr-card" });

    const video = el("video", {
      class: "mr-card-video",
      src: entry.video,
      preload: "none",
      muted: "",
      playsinline: "",
      loop: "",
    });
    card.appendChild(video);

    const footer = el("div", { class: "mr-card-footer" });
    if (entry.desc) footer.appendChild(el("span", { class: "mr-card-desc", text: entry.desc }));

    const footerActions = el("div", { class: "mr-card-actions" });

    const playBtn = el("button", { type: "button", class: "mr-card-play is-paused", "aria-label": "Play" });
    playBtn.innerHTML =
      '<svg class="icon icon-play" viewBox="0 0 16 16" aria-hidden="true">' +
        '<path d="M4 3 L4 13 L13 8 Z" fill="currentColor"/></svg>' +
      '<svg class="icon icon-pause" viewBox="0 0 16 16" aria-hidden="true">' +
        '<path d="M4 3 H7 V13 H4 Z M9 3 H12 V13 H9 Z" fill="currentColor"/></svg>';
    footerActions.appendChild(playBtn);

    const tlBtn = el("button", { type: "button", class: "mr-card-tl-btn", "aria-label": "Show timeline" });
    tlBtn.innerHTML = '<span class="mr-tl-icon" aria-hidden="true">▸</span> Timeline';
    footerActions.appendChild(tlBtn);

    footer.appendChild(footerActions);
    card.appendChild(footer);

    playBtn.addEventListener("click", () => {
      if (video.paused) {
        video.setAttribute("loop", "");       // play button → loops
        video.setAttribute("preload", "auto");
        const p = video.play(); if (p && p.catch) p.catch(() => {});
      } else {
        video.pause();
      }
    });
    video.addEventListener("click", () => {
      if (!video.paused) { video.pause(); return; }
      video.setAttribute("loop", "");         // direct click → loops
      video.setAttribute("preload", "auto");
      const p = video.play(); if (p && p.catch) p.catch(() => {});
    });
    video.addEventListener("play",  () => { playBtn.classList.replace("is-paused", "is-playing"); });
    video.addEventListener("pause", () => { playBtn.classList.replace("is-playing", "is-paused"); });
    video.addEventListener("ended", () => { playBtn.classList.replace("is-playing", "is-paused"); });

    tlBtn.addEventListener("click", () => openMrModal(entry));

    // Lazy load via IntersectionObserver — swap preload when card nears viewport.
    if (typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            video.setAttribute("preload", "metadata");
            obs.disconnect();
          }
        }
      }, { rootMargin: "200px" });
      obs.observe(card);
    }

    grid.appendChild(card);
  }
}

// --------------------------------------------------------------------------
// More-results detail modal  (shared by entry tiles and comparison tiles)
// --------------------------------------------------------------------------
function _openModal(buildFn, entry) {
  const modal   = document.getElementById("mr-modal");
  const content = document.getElementById("mr-modal-content");
  if (!modal || !content) return;

  // Pause and clear any previous tile.
  modal.querySelectorAll("video").forEach(v => { try { v.pause(); } catch (_) {} });
  content.innerHTML = "";

  content.appendChild(buildFn(entry));

  modal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
  const box = modal.querySelector(".mr-modal-box");
  if (box) box.focus();
}

function openMrModal(entry) {
  const modal = document.getElementById("mr-modal");
  if (modal) modal.classList.remove("mr-modal--cmp");
  _openModal((e) => buildEntryTile(e, { modal: true }), entry);
}

function openCmpModal(entry) {
  const modal = document.getElementById("mr-modal");
  if (modal) modal.classList.add("mr-modal--cmp");
  _openModal((e) => buildComparisonTile(e, "cmp", { modal: true }), entry);
}

function closeMrModal() {
  const modal = document.getElementById("mr-modal");
  if (!modal || modal.hasAttribute("hidden")) return;
  modal.querySelectorAll("video").forEach(v => { try { v.pause(); } catch (_) {} });
  modal.classList.remove("mr-modal--cmp");
  modal.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

// --------------------------------------------------------------------------
// More comparisons grid — compact cards, "View comparison" opens modal
// --------------------------------------------------------------------------
function buildMoreComparisonsGrid(entries, containerId) {
  const grid = document.getElementById(containerId);
  if (!grid || !entries || entries.length === 0) return;

  for (const entry of entries) {
    const card = el("div", { class: "mr-card" });

    // Use the highlighted ("Ours") variant video; fall back to first.
    const oursVariant = (entry.variants || []).find(v => v.highlight) || (entry.variants || [])[0];
    const videoSrc = oursVariant ? oursVariant.video : "";

    const video = el("video", {
      class: "mr-card-video",
      src: videoSrc,
      preload: "none",
      muted: "",
      playsinline: "",
      loop: "",
    });
    card.appendChild(video);

    const footer = el("div", { class: "mr-card-footer" });
    if (entry.desc) footer.appendChild(el("span", { class: "mr-card-desc", text: entry.desc }));

    const footerActions = el("div", { class: "mr-card-actions" });

    const playBtn = el("button", { type: "button", class: "mr-card-play is-paused", "aria-label": "Play" });
    playBtn.innerHTML =
      '<svg class="icon icon-play" viewBox="0 0 16 16" aria-hidden="true">' +
        '<path d="M4 3 L4 13 L13 8 Z" fill="currentColor"/></svg>' +
      '<svg class="icon icon-pause" viewBox="0 0 16 16" aria-hidden="true">' +
        '<path d="M4 3 H7 V13 H4 Z M9 3 H12 V13 H9 Z" fill="currentColor"/></svg>';
    footerActions.appendChild(playBtn);

    const viewBtn = el("button", { type: "button", class: "mr-card-tl-btn", "aria-label": "View full comparison" });
    viewBtn.innerHTML = '<span class="mr-tl-icon" aria-hidden="true">⚖</span> All variants';
    footerActions.appendChild(viewBtn);

    footer.appendChild(footerActions);
    card.appendChild(footer);

    playBtn.addEventListener("click", () => {
      if (video.paused) {
        video.setAttribute("loop", "");       // play button → loops
        video.setAttribute("preload", "auto");
        const p = video.play(); if (p && p.catch) p.catch(() => {});
      } else {
        video.pause();
      }
    });
    video.addEventListener("click", () => {
      if (!video.paused) { video.pause(); return; }
      video.setAttribute("loop", "");         // direct click → loops
      video.setAttribute("preload", "auto");
      const p = video.play(); if (p && p.catch) p.catch(() => {});
    });
    video.addEventListener("play",  () => { playBtn.classList.replace("is-paused", "is-playing"); });
    video.addEventListener("pause", () => { playBtn.classList.replace("is-playing", "is-paused"); });
    video.addEventListener("ended", () => { playBtn.classList.replace("is-playing", "is-paused"); });

    viewBtn.addEventListener("click", () => openCmpModal(entry));

    if (typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (en.isIntersecting) { video.setAttribute("preload", "metadata"); obs.disconnect(); }
        }
      }, { rootMargin: "200px" });
      obs.observe(card);
    }

    grid.appendChild(card);
  }
}

// --------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------
// Theme — toggle between dark (default) and light. Persists in localStorage.
function setupTheme() {
  const root = document.documentElement;
  const stored = (function () {
    try { return localStorage.getItem("cineo-theme"); } catch (_) { return null; }
  })();
  if (stored === "light" || stored === "dark") root.setAttribute("data-theme", stored);
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    const cur = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = cur === "light" ? "dark" : "light";
    if (next === "dark") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "light");
    try { localStorage.setItem("cineo-theme", next); } catch (_) {}
  });
}

function main() {
  const manifest = window.MANIFEST;
  if (!manifest) {
    document.body.innerHTML = '<p style="color:#f87171;padding:24px;">manifest.js failed to load.</p>';
    return;
  }
  setupTheme();
  document.title = manifest.title.split(":")[0];

  const CAROUSEL_LIMIT = 8;
  const allEntries = manifest.entries || [];
  buildCarousel(allEntries.slice(0, CAROUSEL_LIMIT));

  // Prioritise the first slide's videos.
  const firstSlide = document.querySelector("#slides-track > .slide");
  if (firstSlide) {
    firstSlide.querySelectorAll("video").forEach((v) => {
      v.setAttribute("preload", "auto");
      v.setAttribute("fetchpriority", "high");
      try { v.load(); } catch (_) {}
    });
  }

  // Populate "More results" grid from the remaining entries.
  buildMoreResultsGrid(allEntries.slice(CAROUSEL_LIMIT), "more-results-grid");

  wireMoreSection({
    sectionId: "more-results-section",
    toggleId:  "more-results-toggle",
    gridId:    "more-results-grid",
    playAllId: "more-play-all",
    resetAllId:"more-reset-all",
  });

  buildCarousel(manifest.long_videos || [], {
    carouselId: "long-carousel",
    trackId: "long-slides-track",
    dotsId: "long-dots",
    playAllId: "long-play-all",
    autoplay: false,
  });
  const CMP_LIMIT = 4;
  const allComparisons = manifest.comparisons || [];
  buildComparisonCarousel(
    "cmp-carousel", "cmp-slides-track", "cmp-dots", "cmp-play-all",
    allComparisons.slice(0, CMP_LIMIT),
  );

  // Populate "More comparisons" grid from remaining comparison entries.
  buildMoreComparisonsGrid(allComparisons.slice(CMP_LIMIT), "more-cmp-grid");

  wireMoreSection({
    sectionId: "more-cmp-section",
    toggleId:  "more-cmp-toggle",
    gridId:    "more-cmp-grid",
    playAllId: "more-cmp-play-all",
    resetAllId:"more-cmp-reset-all",
  });

  // One-time per-session hint pulse on "More results / More comparisons" buttons.
  // Pulses every 4 s while the carousel is in view; restarts each time it
  // scrolls back in. A click permanently disarms it.
  function armMoreHint(btnId, observedId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const target = (observedId && document.getElementById(observedId)) || btn;
    let done = false;
    let timerId = null;
    function disarm() {
      done = true;
      btn.classList.remove("is-hinting");
      if (timerId) { clearInterval(timerId); timerId = null; }
    }
    function hint() {
      if (done) return;
      btn.classList.remove("is-hinting");
      void btn.offsetWidth;  // force reflow so animation restarts cleanly
      btn.classList.add("is-hinting");
    }
    btn.addEventListener("click", disarm, { once: true });
    btn.addEventListener("animationend", (ev) => {
      if (ev.animationName === "mr-btn-hint") btn.classList.remove("is-hinting");
    });
    if (typeof IntersectionObserver !== "undefined") {
      const obs = new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            hint();
            if (!timerId) timerId = setInterval(hint, 4000);
          } else {
            if (timerId) { clearInterval(timerId); timerId = null; }
          }
        }
      }, { threshold: 0.4 });
      obs.observe(target);
    } else {
      setTimeout(hint, 1500);
    }
  }
  armMoreHint("more-results-toggle", "carousel");
  armMoreHint("more-cmp-toggle", "cmp-carousel");

  // Wire shared modal close: button, backdrop click, Escape key.
  const mrModal = document.getElementById("mr-modal");
  const mrClose = document.getElementById("mr-modal-close");
  if (mrModal) {
    if (mrClose) mrClose.addEventListener("click", closeMrModal);
    const backdrop = mrModal.querySelector(".mr-modal-backdrop");
    if (backdrop) backdrop.addEventListener("click", closeMrModal);
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") closeMrModal();
    });
  }
}

main();
