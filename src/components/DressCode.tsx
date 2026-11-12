import { weddingConfig as c } from "@/data/wedding-config";
import { BeadDivider, Corner } from "./art/Dividers";
import { BeadsIcon, CapIcon, GeleIcon, ToghuIcon, WrapperIcon } from "./art/Icons";
import { Reveal, SectionHeading } from "./Reveal";

export function DressCode() {
  const d = c.dressCode;
  return (
    <section id="dress-code" className="bg-lattice-light bg-sand px-6 py-20">
      <SectionHeading eyebrow="Attire Guide" title={d.title} subtitle={d.intro} />

      <Reveal className="mx-auto mt-10 max-w-[380px]">
        <div className="relative rounded-[1.75rem] border border-caramel/40 bg-ivory p-6 shadow-[0_24px_50px_-30px_rgba(60,40,33,0.6)]">
          <Corner className="absolute left-2 top-2 h-9 w-9" />
          <Corner className="absolute right-2 top-2 h-9 w-9 rotate-90" />
          <Corner className="absolute bottom-2 right-2 h-9 w-9 rotate-180" />
          <Corner className="absolute bottom-2 left-2 h-9 w-9 -rotate-90" />

          <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-burnt">
            Colours of the Day
          </p>
          <ul className="mt-5 grid grid-cols-4 gap-3">
            {d.swatches.map((s) => (
              <li key={s.name} className="text-center">
                <span
                  className="mx-auto block h-14 w-14 rotate-45 rounded-[0.6rem] border border-espresso/15 shadow-inner"
                  style={{ background: `var(${s.cssVar})` }}
                />
                <p className="mt-3.5 text-[0.7rem] font-semibold leading-tight text-espresso">{s.name}</p>
                <p className="mt-0.5 text-[0.62rem] leading-tight text-espresso/55">{s.note}</p>
              </li>
            ))}
          </ul>

          <div className="mt-7">
            <BeadDivider />
          </div>

          <div className="mt-6 grid gap-6">
            <div className="flex gap-4">
              <div className="flex shrink-0 gap-1 text-espresso">
                <GeleIcon size={38} />
                <WrapperIcon size={38} />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-espresso">For the Ladies</h3>
                <p className="mt-1 text-[0.9rem] leading-relaxed text-espresso/75">{d.ladies}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex shrink-0 gap-1 text-espresso">
                <CapIcon size={38} />
                <ToghuIcon size={38} />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-espresso">For the Gentlemen</h3>
                <p className="mt-1 text-[0.9rem] leading-relaxed text-espresso/75">{d.gentlemen}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl bg-espresso px-4 py-4 text-ivory">
            <BeadsIcon size={34} className="shrink-0 text-gold" />
            <div className="text-[0.85rem] leading-relaxed">
              <p className="text-ivory/90">{d.avoid}</p>
              <p className="mt-1 font-display text-base italic text-gold">{d.note}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
