"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Manifesto() {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !lineRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const words = lineRef.current.querySelectorAll(".word-inner");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 75%",
          },
        }
      );
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 75%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const words = "From pixels to perception.".split(" ");

  return (
    <section className="border-t border-line px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p
          ref={lineRef}
          className="flex flex-wrap font-display text-[9vw] font-medium leading-[1.02] tracking-tight md:max-w-4xl md:text-6xl"
        >
          {words.map((word, i) => (
            <span key={i} className="mr-[0.28em] inline-block overflow-hidden">
              <span className="word-inner inline-block">{word}</span>
            </span>
          ))}
        </p>
        <p
          ref={subRef}
          className="mt-10 max-w-lg text-lg leading-relaxed text-mist"
        >
          I work at the intersection of artificial intelligence, computer
          vision and real-world systems — turning raw camera input into
          measurements, detections and decisions that hold up outside a
          notebook.
        </p>
      </div>
    </section>
  );
}
