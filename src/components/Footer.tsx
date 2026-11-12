import { weddingConfig as c } from "@/data/wedding-config";
import { Monogram } from "./art/Monogram";
import { ToghuBand } from "./art/Dividers";

export function Footer() {
  return (
    <footer className="bg-lattice-dark bg-espresso text-center text-ivory">
      <ToghuBand />
      <div className="px-6 pb-12 pt-12">
        <Monogram className="mx-auto w-36" />
        <p className="mx-auto mt-6 max-w-[28ch] font-display text-[1.7rem] italic leading-snug text-ivory">
          {c.footer.closing}
        </p>
        <p className="mt-5 text-[0.85rem] font-semibold uppercase tracking-[0.3em] text-gold-light">{c.hashtag}</p>

        <a
          href={`https://wa.me/${c.contact.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 rounded-2xl border border-gold/50 px-6 py-4 text-left text-[0.95rem] leading-relaxed tracking-[0.03em] text-gold-light transition-colors hover:bg-gold hover:text-espresso"
        >
          <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 19L4 20Z" />
            <path d="M9 9.5c.5 2.2 2.3 4 4.5 4.6l1.2-1.1 2 .9c-.4 1.3-1.6 1.8-2.8 1.5-3-.7-5.2-3-5.9-6-.2-1.2.4-2.2 1.6-2.6l.9 2Z" fill="currentColor" stroke="none" />
          </svg>
          <span>
            {c.contact.whatsappLabel}
            <span className="mt-1 block text-xl font-semibold tracking-[0.15em] text-ivory">{c.contact.whatsappDisplay}</span>
          </span>
        </a>
      </div>
      <ToghuBand />
    </footer>
  );
}
