import Image from "next/image";
import { experience } from "@/data/experience";

const orgLogos: Record<string, string> = {
  ahomlama: "/images/logos/ahomlama-mark.webp",
  adrde: "/images/logos/drdo-logo.webp",
  "iit-jammu": "/images/logos/iit-jammu-logo.webp",
};

export default function Experience() {
  return (
    <section id="experience" className="border-t border-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="font-display text-4xl md:text-5xl">Experience</h2>

        <div className="mt-16 divide-y divide-line">
          {experience.map((e) => (
            <div
              key={e.id}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12"
            >
              <div className="flex items-start gap-4 md:col-span-3">
                {orgLogos[e.id] && (
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center border border-line bg-surface p-1.5">
                    <Image
                      src={orgLogos[e.id]}
                      alt={`${e.org} logo`}
                      width={40}
                      height={40}
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div>
                  <p className="font-mono text-xs text-mist">
                    {e.period} · {e.location}
                  </p>
                  <h3 className="mt-2 font-display text-2xl">{e.org}</h3>
                  <p className="mt-1 text-sm text-mist">{e.role}</p>
                  {e.field && (
                    <p className="mt-2 font-mono text-[11px] text-signal">
                      {e.field}
                    </p>
                  )}
                </div>
              </div>
              <ul className="space-y-2 md:col-span-9">
                {e.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 text-sm leading-relaxed text-mist"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
