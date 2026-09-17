"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time capability detection, safe post-mount
    setEnabled(isFinePointer);
    if (!isFinePointer) return;

    const dot = dotRef.current;
    if (!dot) return;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const raf = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      if (dot) dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(raf);
    };
    const id = requestAnimationFrame(raf);

    const setFromTarget = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      setLabel(target ? target.getAttribute("data-cursor") : null);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", setFromTarget);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", setFromTarget);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      aria-hidden="true"
    >
      <div
        className={`flex items-center justify-center rounded-full bg-bone transition-all duration-200 ease-out ${
          label ? "h-16 w-16" : "h-2.5 w-2.5"
        }`}
      >
        {label && (
          <span className="font-mono text-[10px] tracking-wide text-graphite">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
