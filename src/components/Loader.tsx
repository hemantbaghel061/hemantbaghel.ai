"use client";

import { useEffect, useRef, useState } from "react";

const checks = ["CAMERA", "AI ENGINE", "3D ENGINE", "SYSTEM"];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedRef.current) {
      setProgress(100);
      setReady(true);
      return;
    }

    let raf: number;
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / duration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        setReady(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onDone, 500);
  };

  const passedCount = Math.floor((progress / 100) * checks.length);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-graphite transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Site loading gate"
    >
      <div className="tech-grid absolute inset-0 opacity-40" />

      <div className="relative w-72">
        <p className="mb-5 font-mono text-xs tracking-tight text-bone">
          INITIALIZING VISION SYSTEM
        </p>
        <ul className="mb-6 space-y-2 font-mono text-xs">
          {checks.map((c, i) => (
            <li key={c} className="flex items-center justify-between">
              <span className="text-mist">{c}</span>
              <span
                className={
                  i < passedCount ? "text-signal" : "text-mist opacity-30"
                }
              >
                {i < passedCount ? "OK" : "···"}
              </span>
            </li>
          ))}
        </ul>

        <div className="mb-6 h-[2px] w-full bg-line">
          <div
            className="h-[2px] bg-signal transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={handleEnter}
          disabled={!ready}
          className={`w-full border py-3 font-mono text-xs tracking-wide transition-colors ${
            ready
              ? "border-signal text-signal hover:bg-signal hover:text-graphite"
              : "cursor-not-allowed border-line text-mist opacity-40"
          }`}
        >
          {ready ? "ENTER SYSTEM" : `LOADING ${progress}%`}
        </button>
      </div>
    </div>
  );
}
