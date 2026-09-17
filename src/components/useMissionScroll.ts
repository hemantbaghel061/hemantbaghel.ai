"use client";

import { useEffect, useRef } from "react";

/**
 * Polls the scroll position of a pinned section every animation frame and
 * reports normalized progress (0..1) through it. Runs on rAF rather than
 * the scroll event so it stays perfectly in sync with Lenis's eased
 * scroll updates instead of native (unsmoothed) scroll events.
 */
export function useMissionScroll(
  sectionRef: React.RefObject<HTMLElement | null>,
  onProgress: (p: number) => void
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
        cb.current(p);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sectionRef]);
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Fades in/out symmetrically AROUND each boundary (not entirely before/after
// it), so two adjacent chapters crossfade 50/50 exactly at the shared edge
// instead of both sitting at full opacity across the same boundary frame.
export function segmentOpacity(p: number, start: number, end: number, fadeRatio = 0.12) {
  const fade = (end - start) * fadeRatio;
  if (p <= start - fade || p >= end + fade) return 0;
  if (p < start + fade) return smoothstep(start - fade, start + fade, p);
  if (p > end - fade) return 1 - smoothstep(end - fade, end + fade, p);
  return 1;
}
