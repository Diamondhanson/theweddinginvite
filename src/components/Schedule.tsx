import { weddingConfig as c } from "@/data/wedding-config";
import { formatClock } from "@/lib/calendar";
import { BeadDivider, Gem } from "./art/Dividers";
import { eventIcons } from "./art/Icons";
import { Reveal, SectionHeading } from "./Reveal";

export function Schedule() {
  return (
    <section id="schedule" className="bg-ivory px-6 py-20">
      <SectionHeading
        eyebrow="The Celebration"
        title="Order of the Day"
        subtitle={c.event.subtype}
      />
      <div className="mt-4">
        <BeadDivider />
      </div>

      <ol className="relative mx-auto mt-10 max-w-[380px]">
        {/* spine */}
        <div className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-gold via-caramel/60 to-gold" />

        {c.schedule.map((e, i) => {
          const Icon = eventIcons[e.icon];
          return (
            <li key={e.id} className="relative pb-10 pl-14 last:pb-0">
              <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-ivory shadow-[0_0_0_5px_var(--color-ivory)]">
                <Gem size={16} />
              </span>
              <Reveal delay={i * 0.05}>
                <article className="relative overflow-hidden rounded-2xl border border-caramel/30 bg-white/60 p-5 shadow-[0_18px_40px_-28px_rgba(60,40,33,0.5)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-burnt">
                        {formatClock(e.start)} – {formatClock(e.end)}
                      </p>
                      <h3 className="mt-1.5 font-display text-[1.5rem] font-semibold leading-tight text-espresso">
                        {e.title}
                      </h3>
                      <p className="font-display text-base italic text-caramel">{e.subtitle}</p>
                    </div>
                    <Icon size={40} className="mt-1 shrink-0 text-espresso" />
                  </div>

                  <p className="mt-3 text-[0.92rem] leading-relaxed text-espresso/75">{e.description}</p>

                  <div className="mt-4 flex items-start gap-2.5 border-t border-dashed border-caramel/40 pt-4 text-sm text-espresso/80">
                    <svg className="mt-0.5 shrink-0 text-burnt" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                    <div>
                      <p className="font-medium text-espresso">{e.venue}</p>
                      <p className="text-espresso/65">{e.address}</p>
                    </div>
                  </div>

                  <a
                    href={e.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em]"
                  >
                    View on Google Maps
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
