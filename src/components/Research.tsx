import Image from "next/image";

const methods = [
  {
    name: "DFME",
    full: "Data-Free Model Extraction",
    note: "Reconstructing a functional surrogate of a target model without access to its original training data.",
  },
  {
    name: "Knockoff Nets",
    full: "Query-based extraction",
    note: "Training a copy model purely from a target model's input/output behavior.",
  },
  {
    name: "JBDA",
    full: "Jacobian-Based Dataset Augmentation",
    note: "Growing a small labeled set along a target model's decision boundary to improve extraction.",
  },
];

export default function Research() {
  return (
    <section id="research" className="border-t border-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h2 className="font-display text-4xl md:text-5xl">Research</h2>
            <p className="mt-4 max-w-sm text-mist">
              At IIT Jammu, I spent a summer studying adversarial robustness
              and AI security — how models can be probed, copied and fooled,
              and what that means for defending them.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <Image
                src="/images/logos/india-flag.webp"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4 object-contain"
                aria-hidden="true"
              />
              <p className="font-mono text-xs text-signal">
                Adversarial Robustness &amp; AI Security — IIT Jammu, 2026
              </p>
            </div>
          </div>

          <div className="divide-y divide-line md:col-span-8">
            {methods.map((m) => (
              <div key={m.name} className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <p className="font-display text-xl">{m.name}</p>
                  <p className="text-xs text-mist">{m.full}</p>
                </div>
                <p className="text-sm leading-relaxed text-mist sm:col-span-9">
                  {m.note}
                </p>
              </div>
            ))}
            <figure className="pt-6">
              <div className="relative overflow-hidden border border-line bg-surface">
                <Image
                  src="/images/research/adversarial-grid.webp"
                  alt="Grid comparing clean CIFAR-10 images with their adversarially perturbed counterparts and the corresponding perturbation maps"
                  width={709}
                  height={535}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <span className="absolute left-2 top-2 bg-graphite/80 px-2 py-1 font-mono text-[10px] tracking-wide text-signal backdrop-blur-sm">
                  FIG.01 / PERTURBATION STUDY
                </span>
              </div>
              <figcaption className="mt-3 font-mono text-xs leading-relaxed text-mist">
                Clean inputs (top) against adversarially perturbed versions and
                their perturbation maps — the visual signature of an attack that
                shifts a classifier&apos;s prediction while leaving the image
                recognizable to a person.
              </figcaption>
            </figure>

            <p className="pt-6 text-sm leading-relaxed text-mist">
              All experiments were run in a controlled research setting for
              the purpose of understanding and documenting robustness
              behavior — not for operational use.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
