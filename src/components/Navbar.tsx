"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#work", label: "Work", num: "01" },
  { href: "#experience", label: "Experience", num: "02" },
  { href: "#research", label: "Research", num: "03" },
  { href: "#lab", label: "Lab", num: "04" },
  { href: "#about", label: "About", num: "05" },
  { href: "#contact", label: "Contact", num: "06" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-graphite/85 backdrop-blur-md border-line" : "border-transparent"
        } border-b`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#top"
            data-cursor="TOP"
            className="font-display text-sm font-medium tracking-tight"
          >
            Hemant Baghel
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group flex items-center gap-2 font-mono text-[11px] text-mist transition-colors hover:text-bone"
                >
                  <span className="text-signal">{l.num}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/resume/Hemant-Baghel-Resume.pdf"
            data-cursor="RESUME"
            className="hidden rounded-none border border-line px-4 py-2 font-mono text-[11px] text-bone transition-colors hover:border-signal hover:text-signal md:block"
          >
            Resume
          </a>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="text-bone md:hidden"
          >
            <Menu size={22} />
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-graphite p-8 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm">Hemant Baghel</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <ul className="mt-16 flex flex-1 flex-col justify-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 font-display text-3xl"
                >
                  <span className="font-mono text-sm text-signal">{l.num}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/resume/Hemant-Baghel-Resume.pdf"
            className="border border-line py-3 text-center font-mono text-xs"
          >
            Download resume
          </a>
        </div>
      )}
    </>
  );
}
