import Image from "next/image";
import { achievements } from "@/data/skills";

export default function About() {
  return (
    <section id="about" className="border-t border-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-surface">
              <Image
                src="/images/profile/hemant-portrait.webp"
                alt="Portrait of Hemant Baghel"
                fill
                className="object-cover object-top grayscale contrast-125"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-graphite/30 mix-blend-multiply" />
              <div className="absolute inset-0 bg-signal/10 mix-blend-color" />
              {/* scan-frame corners, matching the site's detection-frame motif */}
              <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l border-t border-signal/70" />
              <div className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r border-t border-signal/70" />
              <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b border-l border-signal/70" />
              <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b border-r border-signal/70" />
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-wide text-bone/80">
                SUBJECT / HEMANT BAGHEL
              </p>
            </div>
          </div>

          <div className="md:col-span-7">
            <h2 className="font-display text-4xl md:text-5xl">About Hemant</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-mist">
              I&apos;m a Computer Vision / AI-ML engineer with hands-on
              experience developing, testing and deploying real-time AI
              systems for defence technology applications — aircraft
              detection and classification, image processing, edge AI
              deployment, and camera-based measurement systems that run
              fully offline on Jetson hardware and Linux workstations.
            </p>
            <dl className="mt-10 space-y-3 font-mono text-xs">
              <div className="flex gap-3">
                <dt className="text-mist">Program</dt>
                <dd className="text-bone">
                  B.Tech, Computer Engineering — Lamrin Tech Skills
                  University, Punjab (2023–2027)
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-mist">CGPA</dt>
                <dd className="text-bone">8+ through 6th semester</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-mist">Focus</dt>
                <dd className="text-bone">AI / Computer Vision / Edge AI</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-mist">Based in</dt>
                <dd className="text-bone">Agra, Uttar Pradesh, India</dd>
              </div>
            </dl>

            <p className="mt-12 font-mono text-[11px] text-mist">Achievements</p>
            <div className="mt-4 divide-y divide-line">
              {achievements.map((a) => (
                <div key={a.title} className="flex items-start gap-3 py-5">
                  <span className="mt-1 font-mono text-[10px] text-signal">
                    ✓
                  </span>
                  <div>
                    <p className="font-display text-lg">{a.title}</p>
                    <p className="text-xs text-mist">{a.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
