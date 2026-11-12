import { weddingConfig as c } from "@/data/wedding-config";
import { Corner } from "./art/Dividers";
import { Reveal, SectionHeading } from "./Reveal";

export function DressCode() {
  const d = c.dressCode;
  return (
    <section id="dress-code" className="bg-lattice-light bg-sand px-6 py-20">
      <SectionHeading eyebrow="Dress Code" title={d.title} subtitle={d.intro} />

      <Reveal className="mx-auto mt-10 max-w-[380px]">
        <div className="relative rounded-[1.75rem] border border-caramel/40 bg-ivory px-4 pb-8 pt-10 shadow-[0_24px_50px_-30px_rgba(60,40,33,0.6)]">
          <Corner className="absolute left-2 top-2 h-9 w-9" />
          <Corner className="absolute right-2 top-2 h-9 w-9 rotate-90" />
          <Corner className="absolute bottom-2 right-2 h-9 w-9 rotate-180" />
          <Corner className="absolute bottom-2 left-2 h-9 w-9 -rotate-90" />

          <ul className="grid grid-cols-5 gap-1">
            {d.swatches.map((s) => (
              <li key={s.name} className="text-center">
                <span
                  className="mx-auto block h-9 w-9 rotate-45 rounded-[0.45rem] border border-espresso/15 shadow-inner"
                  style={{ background: `var(${s.cssVar})` }}
                />
                <p className="mt-5 text-[0.66rem] font-semibold leading-tight text-espresso">{s.name}</p>
                <p className="mt-0.5 text-[0.58rem] uppercase tracking-wider text-espresso/50">{s.hex}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
