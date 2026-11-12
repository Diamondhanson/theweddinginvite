"use client";

import { motion, type Variants } from "framer-motion";
import { useId } from "react";

interface MonogramProps {
  className?: string;
  /** Animate the letters in (opening reveal) */
  animated?: boolean;
  /** gold = on dark backgrounds, dark = on light backgrounds */
  tone?: "gold" | "dark";
}

/**
 * Letter monogram for "D & G • 2027": large serif D and G with a script
 * ampersand between them, a fine gold rule with a diamond, and the year.
 */
export function Monogram({ className, animated = false, tone = "gold" }: MonogramProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const foil = `foil${uid}`;
  const letterFill = tone === "gold" ? `url(#${foil})` : "var(--color-espresso)";

  const letter: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.94 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.1, delay: 0.2 + i * 0.35, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { duration: 1.4, delay: 1.2, ease: "easeInOut" } },
  };
  const fade: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.9, delay: 1.8 } },
  };
  const initial = animated ? "hidden" : false;
  const box = { transformBox: "fill-box", transformOrigin: "center" } as const;

  return (
    <svg
      viewBox="0 0 300 210"
      className={className}
      role="img"
      aria-label="Diamond and Golda monogram, 2027"
    >
      <defs>
        <linearGradient id={foil} gradientUnits="userSpaceOnUse" x1="30" y1="10" x2="270" y2="200">
          <stop offset="0" stopColor="var(--color-caramel)" />
          <stop offset="0.3" stopColor="var(--color-gold)" />
          <stop offset="0.5" stopColor="var(--color-gold-light)" />
          <stop offset="0.72" stopColor="var(--color-gold)" />
          <stop offset="1" stopColor="var(--color-caramel)" />
        </linearGradient>
      </defs>

      <motion.text
        x="86" y="142" textAnchor="middle" fill={letterFill}
        fontFamily="var(--font-display)" fontSize="150" fontWeight="500"
        variants={letter} initial={initial} animate="show" custom={0} style={box}
      >
        D
      </motion.text>
      <motion.text
        x="214" y="142" textAnchor="middle" fill={letterFill}
        fontFamily="var(--font-display)" fontSize="150" fontWeight="500"
        variants={letter} initial={initial} animate="show" custom={1} style={box}
      >
        G
      </motion.text>
      <motion.text
        x="150" y="138" textAnchor="middle"
        fill={tone === "gold" ? "var(--color-gold-light)" : "var(--color-burnt)"}
        fontFamily="var(--font-script)" fontSize="78"
        variants={letter} initial={initial} animate="show" custom={2} style={box}
      >
        &amp;
      </motion.text>

      {/* rule with centre diamond */}
      <motion.g variants={draw} initial={initial} animate="show" fill="none" stroke={`url(#${foil})`} strokeWidth="1.2" strokeLinecap="round">
        <path d="M40 176 H134" />
        <path d="M166 176 H260" />
      </motion.g>
      <motion.g variants={fade} initial={initial} animate="show">
        <path d="M150 168 L158 176 L150 184 L142 176Z" fill={`url(#${foil})`} />
        <path d="M150 173 L153 176 L150 179 L147 176Z" fill="var(--color-burnt)" />
      </motion.g>

      <motion.text
        x="150" y="204" textAnchor="middle" fill={`url(#${foil})`}
        fontFamily="var(--font-display)" fontSize="20" fontWeight="600" letterSpacing="9"
        variants={fade} initial={initial} animate="show"
      >
        2027
      </motion.text>
    </svg>
  );
}
