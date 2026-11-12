"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { weddingConfig as c } from "@/data/wedding-config";
import type { ResolvedGuest } from "@/data/guests";
import { getSavedRsvp, submitRsvp, validateRsvp, type RsvpRecord } from "@/lib/rsvp";
import { BeadDivider } from "./art/Dividers";
import { GatePass } from "./GatePass";

export function RsvpForm({ guest }: { guest: ResolvedGuest | null }) {
  const uid = useId();
  // Mode A (personal, from URL) ↔ Mode B (open / manual)
  const [personal, setPersonal] = useState<boolean>(Boolean(guest));
  const [fullName, setFullName] = useState(guest?.name ?? "");
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState("");
  const [nameError, setNameError] = useState("");
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
    setGuestCount(1);
    setNameError("");
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateRsvp({ fullName });
    setNameError(found.fullName ?? "");
    if (found.fullName) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const saved = await submitRsvp({
        fullName: fullName.trim(),
        attendance: "accepts",
        guestCount: Math.min(guestCount, maxGuests),
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
                <p className="mt-1 text-sm text-espresso/60">Enter your name below to confirm.</p>
              </div>
            )}

            <div className="my-5"><BeadDivider /></div>

            <div className="grid gap-5">
              <div>
                <label
                  htmlFor={`${uid}-name`}
                  className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-espresso/70"
                >
                  Full name
                </label>
                <input
                  id={`${uid}-name`}
                  className="field"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Jean-Paul Mbarga"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-invalid={Boolean(nameError)}
                />
                {nameError && <p className="mt-1.5 text-sm text-burnt">{nameError}</p>}
              </div>

              {/* guest count */}
              <div>
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
              </div>

              {/* note */}
              <div>
                <label
                  htmlFor={`${uid}-note`}
                  className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-espresso/70"
                >
                  A blessing for the couple (optional)
                </label>
                <textarea
                  id={`${uid}-note`}
                  className="field min-h-28 resize-none"
                  maxLength={280}
                  placeholder={c.rsvp.blessingPlaceholder}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <p className="mt-1 text-right text-xs text-espresso/45">{note.length}/280</p>
              </div>
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
                "Confirm My Attendance"
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
              Kindly reply before {c.rsvp.deadlineDisplay}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
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
