"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { weddingConfig as c } from "@/data/wedding-config";
import type { ResolvedGuest } from "@/data/guests";
import {
  getSavedRsvp,
  submitRsvp,
  validateRsvp,
  type Attendance,
  type RsvpRecord,
} from "@/lib/rsvp";
import { BeadDivider } from "./art/Dividers";
import { GatePass } from "./GatePass";

type Errors = Partial<Record<"fullName" | "phone" | "attendance", string>>;

export function RsvpForm({ guest }: { guest: ResolvedGuest | null }) {
  const uid = useId();
  // Mode A (personal, from URL) ↔ Mode B (open / manual)
  const [personal, setPersonal] = useState<boolean>(Boolean(guest));
  const [fullName, setFullName] = useState(guest?.name ?? "");
  const [phone, setPhone] = useState(guest?.phone ?? "");
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [record, setRecord] = useState<RsvpRecord | null>(null);
  const [editing, setEditing] = useState(false);

  const maxGuests = personal && guest ? guest.maxGuests : c.rsvp.openMaxGuests;

  // returning guests see their existing gate pass
  useEffect(() => {
    let alive = true;
    getSavedRsvp().then((saved) => {
      if (!alive || !saved) return;
      setRecord(saved);
      setFullName(saved.fullName);
      setPhone(saved.phone);
      setAttendance(saved.attendance);
      setGuestCount(Math.max(1, saved.guestCount));
      setNote(saved.note);
    });
    return () => {
      alive = false;
    };
  }, []);

  const switchToOpen = () => {
    setPersonal(false);
    setFullName("");
    setPhone("");
    setGuestCount(1);
    setErrors({});
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateRsvp({ fullName, phone, attendance: attendance as Attendance });
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const saved = await submitRsvp({
        fullName: fullName.trim(),
        phone: phone.trim(),
        attendance: attendance as Attendance,
        guestCount: attendance === "accepts" ? Math.min(guestCount, maxGuests) : 0,
        note: note.trim(),
        guestCode: personal ? guest?.code : undefined,
      });
      setRecord(saved);
      setEditing(false);
      document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setSubmitError("Something went wrong sending your reply. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const showPass = record && !editing;

  return (
    <div className="mx-auto w-full max-w-[380px]">
      <AnimatePresence mode="wait">
        {showPass ? (
          <GatePass key="pass" record={record} onEdit={() => setEditing(true)} />
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="rounded-[1.75rem] border border-caramel/40 bg-ivory p-6 shadow-[0_24px_50px_-30px_rgba(60,40,33,0.6)]"
          >
            {/* greeting — Mode A */}
            {personal && guest ? (
              <div className="text-center">
                <p className="font-display text-lg italic text-espresso/75">{c.rsvp.personalGreeting}</p>
                <p className="text-gold-foil-deep mt-1 font-script text-[2.6rem] leading-tight">{guest.name}</p>
                <button
                  type="button"
                  onClick={switchToOpen}
                  className="mt-1 text-sm text-espresso/60 underline decoration-caramel/60 underline-offset-4 hover:text-burnt"
                >
                  Not you? Enter your name
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="font-display text-lg italic text-espresso/75">
                  We can&apos;t wait to celebrate with you.
                </p>
                <p className="mt-1 text-sm text-espresso/60">Fill in your details below to reply.</p>
              </div>
            )}

            <div className="my-5"><BeadDivider /></div>

            <div className="grid gap-5">
              {/* name */}
              <Field label="Full name" id={`${uid}-name`} error={errors.fullName}>
                <input
                  id={`${uid}-name`}
                  className="field"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Jean-Paul Mbarga"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                />
              </Field>

              {/* phone */}
              <Field label="Phone / WhatsApp" id={`${uid}-phone`} error={errors.phone}>
                <input
                  id={`${uid}-phone`}
                  className="field"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+237 6 00 00 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                />
              </Field>

              {/* attendance */}
              <fieldset>
                <legend className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-espresso/70">
                  Will you attend?
                </legend>
                <div className="grid gap-3">
                  <Choice
                    selected={attendance === "accepts"}
                    onSelect={() => setAttendance("accepts")}
                    title="Joyfully Accepts"
                    hint="I will be there to celebrate"
                  />
                  <Choice
                    selected={attendance === "declines"}
                    onSelect={() => setAttendance("declines")}
                    title="Regretfully Declines"
                    hint="I'll be there in spirit"
                  />
                </div>
                {errors.attendance && <p className="mt-2 text-sm text-burnt">{errors.attendance}</p>}
              </fieldset>

              {/* guest count */}
              <AnimatePresence initial={false}>
                {attendance === "accepts" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-espresso/70">
                      Number of guests
                    </p>
                    {maxGuests > 1 ? (
                      <div className="flex items-center justify-between rounded-2xl border border-caramel/45 bg-white/55 px-4 py-2.5">
                        <div>
                          <p className="font-display text-lg font-semibold text-espresso">
                            {guestCount} {guestCount === 1 ? "guest" : "guests"}
                          </p>
                          <p className="text-xs text-espresso/60">Including yourself · up to {maxGuests}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Stepper
                            label="Fewer guests"
                            disabled={guestCount <= 1}
                            onClick={() => setGuestCount((n) => Math.max(1, n - 1))}
                          >
                            −
                          </Stepper>
                          <Stepper
                            label="More guests"
                            disabled={guestCount >= maxGuests}
                            onClick={() => setGuestCount((n) => Math.min(maxGuests, n + 1))}
                          >
                            +
                          </Stepper>
                        </div>
                      </div>
                    ) : (
                      <p className="rounded-2xl border border-caramel/30 bg-white/40 px-4 py-3 text-sm text-espresso/70">
                        This invitation is reserved for one guest.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* note */}
              <Field label="A blessing for the couple (optional)" id={`${uid}-note`}>
                <textarea
                  id={`${uid}-note`}
                  className="field min-h-28 resize-none"
                  maxLength={280}
                  placeholder={c.rsvp.blessingPlaceholder}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <p className="mt-1 text-right text-xs text-espresso/45">{note.length}/280</p>
              </Field>
            </div>

            {submitError && (
              <p role="alert" className="mt-4 rounded-xl bg-burnt/10 px-4 py-3 text-sm text-burnt">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold mt-6 flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.25em] disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-espresso/30 border-t-espresso" />
                  Sending…
                </>
              ) : editing ? (
                "Update My Reply"
              ) : (
                "Send My Reply"
              )}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="mx-auto mt-4 block text-sm text-espresso/60 underline underline-offset-4"
              >
                Cancel
              </button>
            )}
            <p className="mt-4 text-center text-xs text-espresso/50">
              Kindly reply by {c.rsvp.deadlineDisplay}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-espresso/70">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-burnt">{error}</p>}
    </div>
  );
}

function Choice({
  selected,
  onSelect,
  title,
  hint,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all ${
        selected
          ? "border-espresso bg-espresso text-ivory shadow-lg"
          : "border-caramel/45 bg-white/55 text-espresso hover:border-caramel"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rotate-45 rounded-[5px] border ${
          selected ? "border-gold bg-gold" : "border-caramel/70"
        }`}
      >
        {selected && (
          <svg className="-rotate-45" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-espresso)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        )}
      </span>
      <span>
        <span className="block font-display text-[1.15rem] font-semibold leading-tight">{title}</span>
        <span className={`block text-xs ${selected ? "text-ivory/70" : "text-espresso/55"}`}>{hint}</span>
      </span>
    </button>
  );
}

function Stepper({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-caramel text-xl text-espresso transition-colors hover:bg-espresso hover:text-gold-light disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-espresso"
    >
      {children}
    </button>
  );
}
