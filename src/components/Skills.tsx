import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <section className="border-t border-line px-6 py-28 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="font-display text-4xl md:text-5xl">Skills</h2>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-[11px] text-signal">{group.label}</p>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-mist">
                    {item}
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
