"use client";

import { motion } from "framer-motion";
import { weddingConfig as c } from "@/data/wedding-config";
import { downloadIcs, formatClock, googleCalendarUrl } from "@/lib/calendar";
import type { RsvpRecord } from "@/lib/rsvp";
import { Monogram } from "./art/Monogram";
import { ToghuBand } from "./art/Dividers";

export function GatePass({ record, onEdit }: { record: RsvpRecord; onEdit: () => void }) {
  const accepted = record.attendance === "accepts";
  const first = c.schedule[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-[380px]"
      role="status"
      aria-live="polite"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] bg-espresso text-ivory shadow-[0_30px_60px_-24px_rgba(36,21,15,0.8)]">
        <ToghuBand />

        <div className="bg-lattice-dark relative px-6 pb-7 pt-8 text-center">
          {accepted && <GemBurst />}
          <Monogram tone="gold" className="mx-auto w-28" />
          <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-gold">
            {accepted ? "Digital Gate Pass" : "With Gratitude"}
          </p>
          <h3 className="mt-3 font-display text-[1.7rem] font-semibold leading-tight">
            {accepted ? "You're on the list!" : "You will be missed"}
          </h3>
          <p className="mx-auto mt-2 max-w-[28ch] text-sm leading-relaxed text-ivory/75">
            {accepted ? c.rsvp.acceptedMessage : c.rsvp.declinedMessage}
          </p>
        </div>

        {/* ticket tear line */}
        <div className="relative h-6">
          <span className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-ivory" />
          <span className="absolute -right-3 top-0 h-6 w-6 rounded-full bg-ivory" />
          <div className="absolute inset-x-6 top-1/2 border-t border-dashed border-gold/50" />
        </div>

        <div className="px-6 pb-7 pt-3">
          <p className="text-[0.62rem] uppercase tracking-[0.3em] text-gold">Admit</p>
          <p className="text-gold-foil mt-1 font-script text-[2.4rem] leading-tight">{record.fullName}</p>

          {accepted ? (
            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 text-left">
              <Item label="Party of" value={`${record.guestCount} ${record.guestCount === 1 ? "guest" : "guests"}`} />
              <Item label="Pass code" value={record.passCode} mono />
              <Item label="Date" value={c.event.dateDisplay} span />
              <Item label="Doors open" value={formatClock(first.start)} />
              <Item label="Venue" value={first.venue} />
              <Item label="City" value={`${c.event.city}, ${c.event.country}`} span />
            </dl>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-ivory/70">
              Your response has been recorded. If your plans change, you can update it any time before{" "}
              {c.rsvp.deadlineDisplay}.
            </p>
          )}

          {record.note && (
            <blockquote className="mt-5 rounded-xl border border-gold/30 bg-white/5 px-4 py-3 text-left font-display text-[1.05rem] italic leading-snug text-ivory/85">
              “{record.note}”
            </blockquote>
          )}
        </div>

        {accepted && (
          <div className="grid gap-3 border-t border-gold/20 bg-night/40 px-6 py-6">
            <button
              type="button"
              onClick={() => downloadIcs()}
              className="btn-gold inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.22em]"
            >
              <CalendarIcon /> Add to Calendar (.ics)
            </button>
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-gold/60 px-6 py-3.5 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:bg-gold hover:text-espresso"
            >
              <CalendarIcon /> Google Calendar
            </a>
          </div>
        )}
        <ToghuBand />
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="mx-auto mt-6 block text-sm text-espresso/70 underline decoration-caramel/60 underline-offset-4 hover:text-burnt"
      >
        Need to change your response?
      </button>
    </motion.div>
  );
}

/** A one-off burst of falling gold diamonds to celebrate an accepted RSVP. */
function GemBurst() {
  const gems = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2;
    const dist = 90 + (i % 4) * 28;
    return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist * 0.8 + 40, s: 6 + (i % 3) * 3, r: i * 40 };
  });
  return (
    <div className="pointer-events-none absolute left-1/2 top-24 h-0 w-0" aria-hidden="true">
      {gems.map((g, i) => (
        <motion.span
          key={i}
          className="absolute block bg-gold"
          style={{ width: g.s, height: g.s, left: -g.s / 2, top: -g.s / 2, rotate: 45 }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
          animate={{ opacity: [1, 1, 0], x: g.x, y: g.y, scale: [0, 1.2, 0.8], rotate: g.r }}
          transition={{ duration: 1.8, delay: 0.3 + (i % 5) * 0.04, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function Item({ label, value, mono, span }: { label: string; value: string; mono?: boolean; span?: boolean }) {
  return (
    <div className={span ? "col-span-2" : ""}>
      <dt className="text-[0.6rem] uppercase tracking-[0.28em] text-gold">{label}</dt>
      <dd className={`mt-0.5 text-[0.95rem] text-ivory ${mono ? "font-mono tracking-widest" : ""}`}>{value}</dd>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M12 13.5l1.6 1.6-1.6 1.6-1.6-1.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}
