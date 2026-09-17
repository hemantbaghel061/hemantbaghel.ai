"use client";

import { useEffect, useRef } from "react";

type Props = {
  progressRef: React.MutableRefObject<number>;
  /** scroll range over which this panel is live */
  start?: number;
  end?: number;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function pad(n: number, len = 2) {
  return String(Math.floor(n)).padStart(len, "0");
}

export default function OperatorFeed({
  progressRef,
  start = 0.2,
  end = 0.4,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const latRef = useRef<HTMLSpanElement>(null);
  const confRef = useRef<HTMLSpanElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();

    const tick = () => {
      const p = progressRef.current;
      const fade = (end - start) * 0.14;
      // symmetric crossfade, same curve the chapters use
      let o = 0;
      if (p > start - fade && p < end + fade) {
        o =
          p < start + fade
            ? smoothstep(start - fade, start + fade, p)
            : p > end - fade
            ? 1 - smoothstep(end - fade, end + fade, p)
            : 1;
      }

      const el = wrapRef.current;
      if (el) {
        el.style.opacity = String(o);
        el.style.visibility = o > 0.005 ? "visible" : "hidden";
        // rises + settles as it comes in
        el.style.transform = `translateY(${(1 - o) * 28}px)`;
      }

      const inner = innerRef.current;
      if (inner) {
        // slow parallax drift across the chapter for a "live rig" feel
        const local = clamp01((p - start) / (end - start));
        inner.style.transform = `scale(${0.985 + o * 0.015}) translateY(${
          (local - 0.5) * -14
        }px)`;
      }

      // pause the video when the panel isn't visible (saves decode work)
      const v = videoRef.current;
      if (v) {
        if (o > 0.05 && v.paused) v.play().catch(() => {});
        else if (o <= 0.05 && !v.paused) v.pause();
      }

      // live readouts
      const elapsed = (performance.now() - t0) / 1000;
      if (tcRef.current) {
        const f = Math.floor((elapsed * 30) % 30);
        tcRef.current.textContent = `00:${pad((elapsed / 60) % 60)}:${pad(
          elapsed % 60
        )}:${pad(f)}`;
      }
      if (latRef.current) {
        const jitter = 11 + Math.sin(elapsed * 2.3) * 2 + Math.sin(elapsed * 7.1);
        latRef.current.textContent = `${jitter.toFixed(1)}ms`;
      }
      if (confRef.current) {
        const c = 98.2 + Math.sin(elapsed * 1.7) * 0.6;
        confRef.current.textContent = `${c.toFixed(1)}%`;
      }
      if (sweepRef.current) {
        const y = (elapsed * 26) % 140 - 20;
        sweepRef.current.style.top = `${y}%`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef, start, end]);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 px-4 py-10 md:px-10"
    >
      {/* corner brackets */}
      <Corner className="-left-px -top-px border-l-2 border-t-2" />
      <Corner className="-right-px -top-px border-r-2 border-t-2" />
      <Corner className="-bottom-px -left-px border-b-2 border-l-2" />
      <Corner className="-bottom-px -right-px border-b-2 border-r-2" />

      <div
        ref={innerRef}
        className="relative w-auto max-w-[95vw] overflow-hidden border border-line bg-graphite shadow-[0_24px_80px_-12px_rgba(0,0,0,0.85)]"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-line bg-surface/80 px-3 py-1.5 font-mono text-[10px] tracking-wide text-mist backdrop-blur-sm">
          <span className="flex items-center gap-2 text-bone">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            OPERATOR.FEED
            <span className="text-mist">/ CAM-01</span>
          </span>
          <span ref={tcRef} className="tabular-nums text-signal">
            00:00:00:00
          </span>
        </div>

        {/* video + overlays */}
        <div className="relative aspect-[9/16] h-[68vh] max-h-[820px] w-auto bg-black sm:h-[74vh] md:h-[82vh]">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/feed-landscape.jpg"
          >
            <source src="/video/feed-landscape.mp4" type="video/mp4" />
          </video>

          {/* center reticle */}
          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 opacity-50">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-bone/50" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-bone/50" />
          </div>

          {/* scan sweep */}
          <div
            ref={sweepRef}
            className="absolute left-0 h-[18%] w-full bg-gradient-to-b from-transparent via-signal/12 to-transparent"
          />

          {/* CRT scanlines */}
          <div
            className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 3px)",
            }}
          />
          {/* vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {/* edge measurement ticks */}
          <div className="absolute inset-x-0 top-0 flex justify-between px-2 pt-1 opacity-40">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className={`w-px bg-bone ${i % 3 === 0 ? "h-2" : "h-1"}`}
              />
            ))}
          </div>

          {/* corner status text */}
          <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-wide text-bone/70">
            TRACK.LOCK
          </span>
          <span className="absolute bottom-2 right-2 font-mono text-[9px] tracking-wide text-bone/70">
            IR / RGB
          </span>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between gap-3 border-t border-line bg-surface/80 px-3 py-1.5 font-mono text-[10px] tracking-wide text-mist backdrop-blur-sm">
          <span>
            YOLO → CONVNEXT · <span ref={confRef} className="tabular-nums text-signal">98.7%</span>
          </span>
          <span className="hidden sm:inline">9:16 · 24FPS</span>
          <span>
            LATENCY <span ref={latRef} className="tabular-nums text-signal">12.0ms</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      className={`absolute z-10 h-4 w-4 border-signal ${className}`}
      aria-hidden
    />
  );
}
