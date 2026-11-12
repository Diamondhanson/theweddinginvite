"use client";

import { motion } from "framer-motion";
import { weddingConfig as c } from "@/data/wedding-config";
import { CoupleIllustration } from "./art/CoupleIllustration";
import { BeadDivider, ToghuBand } from "./art/Dividers";

export function Hero() {
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <header className="bg-lattice-dark relative overflow-hidden bg-espresso text-ivory">
      <ToghuBand />
      <div className="px-6 pb-16 pt-10 text-center">
        <motion.p {...rise(0)} className="text-[0.68rem] font-medium uppercase tracking-[0.38em] text-gold">
          {c.invitationLine}
        </motion.p>
        <motion.p {...rise(0.1)} className="mt-2 font-display text-lg italic leading-snug text-ivory/80">
          {c.families.groom.name}
          <span className="block text-gold">&amp;</span>
          {c.families.bride.name}
        </motion.p>

        <motion.div {...rise(0.2)} className="mx-auto mt-7 w-[78%] max-w-[330px]">
          <div className="animate-float">
            <CoupleIllustration className="h-auto w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]" />
          </div>
        </motion.div>

        <motion.p {...rise(0.1)} className="mt-9 text-[0.72rem] font-medium uppercase tracking-[0.4em] text-ivory/70">
          Celebrate the union of
        </motion.p>
        <motion.h1
          {...rise(0.2)}
          className="text-gold-foil animate-shimmer mt-2 whitespace-nowrap font-script text-[clamp(2.4rem,11vw,3.4rem)] leading-[1.15]"
        >
          {c.couple.groom.firstName} &amp; {c.couple.bride.firstName}
        </motion.h1>

        <motion.div {...rise(0.3)} className="mt-4">
          <BeadDivider tone="dark" />
          <p className="mt-4 font-display text-[1.65rem] font-semibold tracking-[0.18em] text-ivory">
            {c.headline}
          </p>
          <p className="mx-auto mt-3 max-w-[30ch] font-display text-lg italic leading-snug text-ivory/75">
            {c.tagline}
          </p>
        </motion.div>

        <motion.div {...rise(0.4)} className="mx-auto mt-9 max-w-[300px] rounded-2xl border border-gold/35 px-5 py-5">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">{c.event.type}</p>
          <p className="mt-2 font-display text-2xl font-semibold">{c.event.dateDisplay}</p>
          <p className="mt-1 text-sm tracking-[0.2em] text-ivory/75">{c.event.venueTeaser}</p>
        </motion.div>

        <motion.div {...rise(0.5)} className="mt-10">
          <a
            href="#rsvp"
            className="btn-gold inline-flex items-center gap-3 rounded-full px-9 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.25em]"
          >
            Confirm Your Presence
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </a>
          <p className="mt-4 text-xs tracking-[0.15em] text-ivory/55">
            Kindly reply by {c.rsvp.deadlineDisplay}
          </p>
        </motion.div>
      </div>
      <ToghuBand />
    </header>
  );
}
