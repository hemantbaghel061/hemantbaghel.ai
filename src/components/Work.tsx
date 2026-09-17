"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectVisual from "./ProjectVisual";

const WorkScene = dynamic(() => import("./scenes/WorkScene"), { ssr: false });

const filters = ["ALL", "AI", "COMPUTER VISION", "WEB", "SYSTEMS"];

export default function Work() {
  const [active, setActive] = useState("ALL");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered =
    active === "ALL"
      ? projects
      : projects.filter((p) => p.filterTags.includes(active));

  return (
    <section id="work" className="border-t border-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Selected work</h2>
            <p className="mt-3 max-w-md text-mist">
              AI systems built for real-world problems.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`border px-3 py-1.5 font-mono text-[11px] transition-colors ${
                  active === f
                    ? "border-signal text-signal"
                    : "border-line text-mist hover:text-bone"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Floating 3D shelf — each project as an object, synced with list hover below */}
        <div className="mt-12 hidden h-56 border border-line bg-surface lg:block">
          <WorkScene activeId={hoveredId} />
        </div>
        <p className="mt-2 hidden font-mono text-[10px] text-mist lg:block">
          HOVER A PROJECT BELOW TO HIGHLIGHT IT ABOVE
        </p>

        <div className="mt-10 divide-y divide-line lg:mt-6">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              data-cursor="VIEW"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:items-center"
            >
              <span className="flex h-8 w-8 items-center justify-center border border-line font-mono text-xs text-mist transition-colors group-hover:border-signal group-hover:text-signal md:col-span-1">
                {project.index}
              </span>

              <div className="md:col-span-6">
                <h3 className="font-display text-2xl transition-colors group-hover:text-signal md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase text-mist">
                  {project.category}
                </p>
                <p className="mt-3 max-w-md text-sm text-mist">
                  {project.description}
                </p>
                <p className="mt-4 text-xs text-mist">{project.tech.join(" / ")}</p>
              </div>

              <div className="h-40 overflow-hidden border border-line bg-surface md:col-span-4">
                <ProjectVisual type={project.visual} />
              </div>

              <div className="flex items-center justify-between md:col-span-1 md:flex-col md:items-end md:gap-3">
                <span className="font-mono text-xs text-mist">{project.year}</span>
                <span className="font-mono text-xs text-mist transition-colors group-hover:text-signal">
                  View case study ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
