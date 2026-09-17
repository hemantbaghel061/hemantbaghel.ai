import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { projects } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — Hemant Baghel`,
    description: project.description,
  };
}

const sections = [
  { num: "01", key: "overview", label: "Overview" },
  { num: "02", key: "problem", label: "Problem" },
  { num: "03", key: "approach", label: "Approach" },
  { num: "04", key: "system", label: "System" },
  { num: "05", key: "result", label: "Result" },
  { num: "06", key: "lessons", label: "Lessons" },
] as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1100px] px-6 pb-28 pt-32 md:px-10">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs text-mist hover:text-signal"
        >
          <ArrowLeft size={14} /> Back to work
        </Link>

        <div className="mt-8 flex items-center gap-4">
          <span className="font-mono text-sm text-signal">{project.index}</span>
          <p className="font-mono text-xs uppercase text-mist">
            {project.category}
          </p>
        </div>

        <h1 className="mt-4 font-display text-4xl md:text-6xl">
          {project.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <span className="font-mono text-xs text-mist">{project.year}</span>
          <span className="text-line">/</span>
          <span className="text-xs text-mist">{project.tech.join(" · ")}</span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="GITHUB"
              className="ml-auto inline-flex items-center gap-2 border border-line px-3 py-1.5 font-mono text-xs text-mist hover:border-signal hover:text-signal"
            >
              <GithubIcon size={14} /> Source
            </a>
          )}
        </div>

        <div className="mt-14 h-64 overflow-hidden border border-line bg-surface md:h-80">
          <ProjectVisual type={project.visual} />
        </div>

        <div className="mt-20 space-y-16">
          {sections.map((s) => (
            <div key={s.key} className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="md:col-span-3">
                <p className="font-mono text-xs text-mist">
                  <span className="text-signal">{s.num}</span> — {s.label}
                </p>
              </div>
              <div className="md:col-span-9">
                {s.key === "system" ? (
                  <div className="flex flex-wrap items-center gap-3">
                    {project.system.map((step, i) => (
                      <span key={step} className="flex items-center gap-3">
                        <span className="border border-line px-3 py-1.5 font-mono text-xs text-bone">
                          {step}
                        </span>
                        {i < project.system.length - 1 && (
                          <span className="text-mist">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="max-w-2xl text-lg leading-relaxed text-mist">
                    {project[s.key as "overview" | "problem" | "approach" | "result" | "lessons"]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex justify-between border-t border-line pt-8">
          <Link href="/#work" className="font-mono text-xs text-mist hover:text-signal">
            ← All work
          </Link>
          <Link href="/#contact" className="font-mono text-xs text-mist hover:text-signal">
            Get in touch →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
