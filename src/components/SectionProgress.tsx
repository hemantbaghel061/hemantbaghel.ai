"use client";

import { useEffect, useState } from "react";

const stages = [
  { id: "top", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "lab", label: "Lab" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function SectionProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = stages
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stages.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));

    const heroEl = document.getElementById("top");
    const onScroll = () => {
      if (heroEl) {
        const releasePoint = heroEl.offsetTop + heroEl.offsetHeight - window.innerHeight;
        setVisible(window.scrollY > releasePoint - 80);
      } else {
        setVisible(window.scrollY > window.innerHeight * 0.5);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-500 lg:flex ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="mb-1 font-mono text-[10px] text-mist">
        {String(activeIndex + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
      </span>
      {stages.map((s, i) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="pointer-events-auto group flex items-center gap-2"
          aria-label={`Jump to ${s.label}`}
        >
          <span
            className={`font-mono text-[10px] uppercase tracking-wide opacity-0 transition-opacity group-hover:opacity-100 ${
              i === activeIndex ? "text-signal" : "text-mist"
            }`}
          >
            {s.label}
          </span>
          <span
            className={`h-[2px] transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-signal" : "w-3 bg-line group-hover:bg-mist"
            }`}
          />
        </a>
      ))}
    </div>
  );
}
