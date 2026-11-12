"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Fade-up on scroll. Used to wrap sections & cards. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Reveal className="text-center">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-burnt">{eyebrow}</p>
      <h2
        className={`mt-3 font-display text-[2.4rem] font-semibold leading-[1.05] ${
          dark ? "text-ivory" : "text-espresso"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-[32ch] text-[0.95rem] leading-relaxed ${dark ? "text-ivory/75" : "text-espresso/70"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
