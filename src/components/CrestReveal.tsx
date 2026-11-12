"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Monogram } from "./art/Monogram";
import { ToghuBand } from "./art/Dividers";

type Phase = "closed" | "opening" | "gone";

/**
 * Opening animation: the crest draws itself on two carved "doors"
 * (a nod to the Knocking of the Door). Tap to knock → the doors swing apart.
 */
export function CrestReveal() {
  const [phase, setPhase] = useState<Phase>("closed");

  // lock page scroll while the doors are closed
  useEffect(() => {
    if (phase === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  // gentle auto-open so nobody is ever stuck on the splash
  useEffect(() => {
    const t = setTimeout(() => setPhase((p) => (p === "closed" ? "opening" : p)), 7000);
    return () => clearTimeout(t);
  }, []);

  if (phase === "gone") return null;
  const opening = phase === "opening";
  const door = { duration: 1.3, ease: [0.76, 0, 0.24, 1] as const, delay: 0.25 };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-label="Opening invitation">
      {/* two door panels */}
      <motion.div
        className="bg-lattice-dark absolute inset-y-0 left-0 w-1/2 bg-night"
        animate={{ x: opening ? "-101%" : 0 }}
        transition={door}
      >
        <div className="absolute inset-y-0 right-0 w-px bg-gold/50" />
        <div className="absolute inset-x-0 bottom-0"><ToghuBand /></div>
        <div className="absolute inset-x-0 top-0"><ToghuBand /></div>
      </motion.div>
      <motion.div
        className="bg-lattice-dark absolute inset-y-0 right-0 w-1/2 bg-night"
        animate={{ x: opening ? "101%" : 0 }}
        transition={door}
        onAnimationComplete={() => opening && setPhase("gone")}
      >
        <div className="absolute inset-y-0 left-0 w-px bg-gold/50" />
        <div className="absolute inset-x-0 bottom-0"><ToghuBand /></div>
        <div className="absolute inset-x-0 top-0"><ToghuBand /></div>
      </motion.div>

      {/* crest + call to action */}
      <AnimatePresence>
        {!opening && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            exit={{ opacity: 0, scale: 1.12 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-gold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              You are invited
            </motion.p>

            <Monogram animated className="w-[min(78vw,320px)] drop-shadow-[0_0_40px_rgba(217,182,119,0.25)]" />

            <motion.button
              type="button"
              onClick={() => setPhase("opening")}
              className="btn-gold mt-10 rounded-full px-9 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.28em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.8 }}
              whileTap={{ scale: 0.96 }}
            >
              Knock to Enter
            </motion.button>
            <motion.p
              className="mt-4 text-xs tracking-[0.2em] text-ivory/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.8, duration: 1 }}
            >
              The traditional wedding of Diamond &amp; Golda
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
