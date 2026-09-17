"use client";

import { useEffect, useState } from "react";

export default function SystemMode() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key.toLowerCase() === "h") setOpen((v) => !v);
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-[90] w-64 border border-signal bg-graphite/95 p-4 font-mono text-[11px] text-mist shadow-[0_0_0_1px_rgba(78,124,255,0.15)]"
      role="status"
    >
      <p className="text-signal">&gt; hemant.init()</p>
      <p className="mt-2">AI ENGINE ........ ONLINE</p>
      <p>VISION ........... ONLINE</p>
      <p>RESEARCH ......... ACTIVE</p>
      <p className="mt-3 opacity-50">press esc or H to close</p>
    </div>
  );
}
