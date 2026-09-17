"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMissionScroll, segmentOpacity } from "./useMissionScroll";
import OperatorFeed from "./OperatorFeed";

const MissionCanvas = dynamic(() => import("./scenes/MissionCanvas"), {
  ssr: false,
});

function detectLowPower() {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 768;
  return coarse && small;
}

const NAV_LABELS = ["OVERVIEW", "DETECTION", "EDGE SYNC", "DEPLOYMENT", "CONTACT"];

const CHAPTERS = [
  {
    tag: "Agra, India — open to AI / ML / Computer Vision roles",
    eyebrow: "",
    title: "Hemant Baghel",
    sub: "AI & Computer Vision Engineer",
    body: "I build and deploy real-time computer vision systems for defence technology applications — aircraft detection and classification, edge AI on NVIDIA Jetson, and camera-based measurement systems running fully offline.",
    telemetry: ["SYS.STATUS / ONLINE", "VISION.MODE / REALTIME", "ENV / LINUX · OFFLINE"],
    align: "left" as const,
  },
  {
    tag: "01 / DETECTION",
    eyebrow: "Two-stage pipeline",
    title: "Detection, in real time.",
    sub: "",
    body: "YOLO handles detection first, then a ConvNeXt classifier identifies the aircraft — with confidence scoring and out-of-distribution checks so the system flags uncertainty instead of guessing.",
    telemetry: ["MODEL / YOLO + CONVNEXT", "OBJECT DETECTED", "CONFIDENCE 98.7%"],
    align: "right" as const,
  },
  {
    tag: "02 / EDGE SYNC",
    eyebrow: "Systems, not scripts",
    title: "Built for distributed hardware.",
    sub: "",
    body: "Multiple camera feeds, PLC and TCP/IP integration, camera failover and obstruction handling — coordinated as one pipeline instead of isolated scripts running in parallel.",
    telemetry: ["LINK / TCP-IP ESTABLISHED", "FAILOVER / ARMED", "NODES / CAMERA · PLC · LOG"],
    align: "left" as const,
  },
  {
    tag: "03 / DEPLOYMENT",
    eyebrow: "From notebook to field",
    title: "Shipped to production hardware.",
    sub: "",
    body: "Deployed for testing across NVIDIA Jetson edge devices and workstations, running fully offline — day and night datasets, degrading safely instead of failing silently.",
    telemetry: ["HARDWARE / NVIDIA JETSON", "ENV / LINUX · OFFLINE", "STATUS / DEPLOYED — TESTING"],
    align: "right" as const,
  },
  {
    tag: "04 / CONTACT",
    eyebrow: "",
    title: "Ready to build something real?",
    sub: "",
    body: "A camera sees. A model interprets. A system decides. I build the system.",
    telemetry: ["LINK / OPEN TO ROLES", "RESPONSE / < 24H", "STATUS / AVAILABLE"],
    align: "center" as const,
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const chapterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const navLabelRef = useRef<HTMLSpanElement>(null);
  const navUnderlineRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  const [lowPower, setLowPower] = useState(false);
  const [reduced, setReduced] = useState(false);
  const lastLabel = useRef(-1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLowPower(detectLowPower());
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(prefersReduced);
  }, []);

  const handleProgress = useMemo(
    () => (p: number) => {
      progressRef.current = p;

      // chapters
      CHAPTERS.forEach((_, i) => {
        const start = i * 0.2;
        const end = start + 0.2;
        const o = segmentOpacity(p, start, end, 0.12);
        const el = chapterRefs.current[i];
        if (el) {
          el.style.opacity = String(o);
          el.style.transform = `translateY(${(1 - o) * 36}px)`;
          el.style.pointerEvents = o > 0.6 ? "auto" : "none";
        }
      });

      // top progress bar
      if (topBarRef.current) {
        topBarRef.current.style.transform = `scaleX(${p})`;
      }

      // nav label + underline position
      const idx = Math.min(CHAPTERS.length - 1, Math.floor(p * CHAPTERS.length));
      if (idx !== lastLabel.current) {
        lastLabel.current = idx;
        if (navLabelRef.current) navLabelRef.current.textContent = NAV_LABELS[idx];
        if (navUnderlineRef.current) {
          navUnderlineRef.current.style.transform = `translateX(${idx * 100}%)`;
        }
      }

      // scroll cue fades in on first movement, and fades back out once the
      // final chapter's own CTA is showing (redundant otherwise)
      if (scrollCueRef.current) {
        const in_ = 1 - segmentOpacity(p, 0, 0.06, 3);
        const out = 1 - segmentOpacity(p, 0.88, 1, 0.4);
        scrollCueRef.current.style.opacity = String(in_ * out);
      }


      // huge background wordmark fades up during the final chapter
      if (wordmarkRef.current) {
        const o = segmentOpacity(p, 0.78, 1, 0.4);
        wordmarkRef.current.style.opacity = String(o * 0.08);
      }
    },
    []
  );

  useMissionScroll(sectionRef, handleProgress);

  if (reduced) {
    return (
      <section id="top" className="tech-grid relative flex min-h-[100svh] flex-col justify-center px-6 pt-28 md:px-10">
        <p className="mb-6 font-mono text-xs text-signal">
          Agra, India — open to AI / ML / Computer Vision roles
        </p>
        <h1 className="max-w-4xl font-display text-[13vw] font-medium leading-[0.95] tracking-tight md:text-[6.4vw]">
          Hemant Baghel
        </h1>
        <p className="mt-4 max-w-xl font-display text-2xl text-mist md:text-3xl">
          AI &amp; Computer Vision Engineer
        </p>
        <p className="mt-6 max-w-md text-base leading-relaxed text-mist">
          I build and deploy real-time computer vision systems for defence
          technology applications — aircraft detection and classification,
          edge AI on NVIDIA Jetson, and camera-based measurement systems
          running fully offline.
        </p>
        <a href="#work" className="mt-10 font-mono text-xs text-mist hover:text-signal">
          Scroll to explore →
        </a>
      </section>
    );
  }

  return (
    <section id="top" ref={sectionRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#1b1f1c]">
        {/* top progress line */}
        <div className="absolute inset-x-0 top-0 z-30 h-[2px] bg-line/40">
          <div
            ref={topBarRef}
            className="h-full w-full origin-left bg-signal"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* chapter nav, top center */}
        <div className="pointer-events-none absolute inset-x-0 top-24 z-20 hidden justify-center md:flex">
          <div className="relative flex items-center gap-1 font-mono text-[10px] tracking-widest text-mist">
            <span ref={navLabelRef} className="min-w-[92px] text-signal">
              OVERVIEW
            </span>
            <div className="relative ml-2 h-[2px] w-[220px] overflow-hidden bg-line/50">
              <div
                ref={navUnderlineRef}
                className="h-full w-1/5 bg-signal transition-transform duration-150 ease-out"
              />
            </div>
          </div>
        </div>

        {/* huge fading wordmark for the final chapter */}
        <div
          ref={wordmarkRef}
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 select-none text-center font-display text-[18vw] font-bold leading-none tracking-tight text-bone opacity-0"
        >
          HEMANT
        </div>

        {/* 3D scene */}
        <div className="absolute inset-0 -z-0">
          {!lowPower && <MissionCanvas progressRef={progressRef} />}
        </div>

        {/* large landscape operator feed, live during the detection chapter */}
        <OperatorFeed progressRef={progressRef} start={0.24} end={0.36} />

        {/* chapter HTML overlays */}
        {CHAPTERS.map((c, i) => (
          <div
            key={i}
            ref={(el) => {
              chapterRefs.current[i] = el;
            }}
            className={`pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-10 ${
              c.align === "right"
                ? "items-end text-right"
                : c.align === "center"
                ? "items-center text-center"
                : "items-start text-left"
            }`}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="mx-auto w-full max-w-[1400px]">
              <div
                className={
                  c.align === "right"
                    ? "ml-auto max-w-xl"
                    : c.align === "center"
                    ? "mx-auto max-w-xl"
                    : "max-w-xl"
                }
              >
                {c.tag && (
                  <p className="mb-4 font-mono text-xs text-signal">{c.tag}</p>
                )}
                <h1
                  className="font-display text-[10vw] font-medium leading-[0.95] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.65)] md:text-[4.4vw]"
                >
                  {c.title}
                </h1>
                {c.sub && (
                  <p className="mt-3 font-display text-xl text-mist [text-shadow:0_2px_16px_rgba(0,0,0,0.7)] md:text-2xl">
                    {c.sub}
                  </p>
                )}
                <p className="mt-5 max-w-md text-base leading-relaxed text-mist [text-shadow:0_2px_16px_rgba(0,0,0,0.8)]">
                  {c.body}
                </p>
                {i === CHAPTERS.length - 1 && (
                  <a
                    href="#contact"
                    data-cursor="VIEW"
                    className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-mono text-xs text-bone transition-colors hover:border-signal hover:text-signal"
                  >
                    Get in touch →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* telemetry, bottom right */}
        <div className="pointer-events-none absolute bottom-24 right-6 z-10 hidden font-mono text-[11px] text-mist md:right-10 md:block">
          {CHAPTERS.map((c, i) => (
            <TelemetryBlock key={i} index={i} lines={c.telemetry} progressRef={progressRef} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 mx-auto flex w-full max-w-[1400px] items-end justify-between px-6 md:px-10">
          <p className="hidden max-w-xs font-mono text-[11px] leading-relaxed text-mist md:block" />
          <div ref={scrollCueRef} className="font-mono text-xs text-mist">
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}

function TelemetryBlock({
  index,
  lines,
  progressRef,
}: {
  index: number;
  lines: string[];
  progressRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const start = index * 0.2;
      const end = start + 0.2;
      const p = progressRef.current;
      const fade = 0.024;
      let o = 0;
      if (p >= start - fade && p <= end + fade) {
        o =
          p < start + fade
            ? Math.min(1, (p - (start - fade)) / (fade * 2))
            : p > end - fade
            ? Math.max(0, 1 - (p - (end - fade)) / (fade * 2))
            : 1;
      }
      if (ref.current) ref.current.style.opacity = String(o);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, progressRef]);

  return (
    <div ref={ref} className="absolute bottom-0 right-0 w-max text-right opacity-0">
      {lines.map((line, i) => (
        <p key={i} className={i === 0 ? "text-signal" : "opacity-60"}>
          {line}
        </p>
      ))}
    </div>
  );
}
