import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/BrandIcons";

const orbs = [
  {
    href: "mailto:hemantbaghel061@gmail.com",
    label: "Email",
    icon: Mail,
    cursor: "CONTACT",
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/hemant-baghel-b37597357/",
    label: "LinkedIn",
    icon: LinkedinIcon,
    cursor: undefined,
    external: true,
  },
  {
    href: "https://github.com/hemantbaghel061",
    label: "GitHub",
    icon: GithubIcon,
    cursor: "GITHUB",
    external: true,
  },
  {
    href: "/resume/Hemant-Baghel-Resume.pdf",
    label: "Resume",
    icon: null,
    cursor: "RESUME",
    external: false,
    text: "PDF",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line px-6 py-32 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-display text-[9vw] leading-[1.02] tracking-tight md:text-6xl">
          Have a problem worth solving?
        </p>
        <p className="mt-4 font-display text-3xl text-signal md:text-4xl">
          Let&apos;s build it.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <a
              href="mailto:hemantbaghel061@gmail.com"
              data-cursor="CONTACT"
              className="group flex items-center gap-3 font-mono text-lg text-bone hover:text-signal md:text-2xl"
            >
              <Mail size={20} className="shrink-0" />
              hemantbaghel061@gmail.com
            </a>
            <p className="mt-4 font-mono text-sm text-mist">+91 6395610450</p>
            <p className="mt-1 font-mono text-sm text-mist">
              Agra, Uttar Pradesh, India
            </p>
          </div>

          {/* Floating contact orbs */}
          <div className="flex flex-wrap items-start justify-start gap-x-10 gap-y-8 md:col-span-6 md:justify-end">
            {orbs.map((orb, i) => (
              <a
                key={orb.label}
                href={orb.href}
                target={orb.external ? "_blank" : undefined}
                rel={orb.external ? "noreferrer" : undefined}
                data-cursor={orb.cursor}
                className="group flex flex-col items-center gap-2"
                style={{
                  animation: "float 5s ease-in-out infinite",
                  animationDelay: `${i * 0.6}s`,
                }}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line bg-surface text-mist transition-colors group-hover:border-signal group-hover:text-signal">
                  {orb.icon ? (
                    <orb.icon size={18} />
                  ) : (
                    <span className="font-mono text-[10px]">{orb.text}</span>
                  )}
                </span>
                <span className="font-mono text-[10px] text-mist transition-colors group-hover:text-signal">
                  {orb.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
