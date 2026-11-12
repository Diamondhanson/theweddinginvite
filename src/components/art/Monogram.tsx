"use client";

import { motion, type Variants } from "framer-motion";
import { useId } from "react";

interface MonogramProps {
  className?: string;
  /** Draw the crest in stroke-by-stroke (opening animation) */
  animated?: boolean;
  /** Ring/letter colours adapt to the background it sits on */
  tone?: "gold" | "dark";
}

/**
 * Royal crest for "D & G • 2027": beaded double ring, circular legends,
 * a brilliant-cut diamond crowning the top and diamond finials at the compass points.
 * All colours come from the theme variables.
 */
export function Monogram({ className, animated = false, tone = "gold" }: MonogramProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const foil = `foil${uid}`;
  const topArc = `top${uid}`;
  const botArc = `bot${uid}`;
  const letterFill = tone === "gold" ? `url(#${foil})` : "var(--color-espresso)";

  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (i: number = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.6, delay: i * 0.25, ease: "easeInOut" },
    }),
  };
  const pop: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    show: (i: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, delay: 1.2 + i * 0.18, ease: "easeOut" },
    }),
  };

  const initial = animated ? "hidden" : false;
  const rotate = { transformBox: "fill-box", transformOrigin: "center" } as const;

  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      role="img"
      aria-label="Diamond and Golda monogram, 2027"
    >
      <defs>
        <linearGradient
          id={foil}
          gradientUnits="userSpaceOnUse"
          x1="20"
          y1="10"
          x2="280"
          y2="290"
        >
          <stop offset="0" stopColor="var(--color-caramel)" />
          <stop offset="0.28" stopColor="var(--color-gold)" />
          <stop offset="0.5" stopColor="var(--color-gold-light)" />
          <stop offset="0.72" stopColor="var(--color-gold)" />
          <stop offset="1" stopColor="var(--color-caramel)" />
        </linearGradient>
        <path id={topArc} d="M 50,150 a 100,100 0 1,1 200,0" />
        <path id={botArc} d="M 38,150 a 112,112 0 1,0 224,0" />
      </defs>

      {/* outer rings */}
      <motion.circle
        cx="150" cy="156" r="134" fill="none" stroke={`url(#${foil})`} strokeWidth="1.6"
        variants={draw} initial={initial} animate="show" custom={0}
      />
      <motion.circle
        cx="150" cy="156" r="127" fill="none" stroke={`url(#${foil})`} strokeWidth="3.2"
        strokeLinecap="round" strokeDasharray="0.1 7.2"
        variants={draw} initial={initial} animate="show" custom={1}
      />
      <motion.circle
        cx="150" cy="156" r="118" fill="none" stroke={`url(#${foil})`} strokeWidth="1"
        variants={draw} initial={initial} animate="show" custom={2}
      />
      <motion.circle
        cx="150" cy="156" r="88" fill="none" stroke={`url(#${foil})`} strokeWidth="1.2"
        variants={draw} initial={initial} animate="show" custom={3}
      />
      <motion.circle
        cx="150" cy="156" r="84" fill="none" stroke="var(--color-burnt)" strokeWidth="0.8"
        strokeOpacity="0.8"
        variants={draw} initial={initial} animate="show" custom={3.5}
      />

      {/* circular legends — shifted down to the ring centre (150,156) */}
      <motion.g
        transform="translate(0 6)"
        variants={pop} initial={initial} animate="show" custom={2}
      >
        <text
          fill={`url(#${foil})`}
          fontFamily="var(--font-sans)"
          fontSize="11.5"
          fontWeight="500"
          letterSpacing="5.2"
          textAnchor="middle"
        >
          <textPath href={`#${topArc}`} startOffset="50%">
            DIAMOND • GOLD
          </textPath>
        </text>
        <text
          fill={`url(#${foil})`}
          fontFamily="var(--font-sans)"
          fontSize="10"
          fontWeight="500"
          letterSpacing="4.2"
          textAnchor="middle"
        >
          <textPath href={`#${botArc}`} startOffset="50%">
            TRADITIONAL WEDDING
          </textPath>
        </text>
      </motion.g>

      {/* compass-point diamond finials */}
      {[
        [16, 156],
        [284, 156],
        [150, 290],
      ].map(([x, y], i) => (
        <motion.g key={i} variants={pop} initial={initial} animate="show" custom={3 + i * 0.3}>
          <path
            d={`M${x} ${y - 9} L${x + 7} ${y} L${x} ${y + 9} L${x - 7} ${y} Z`}
            fill={`url(#${foil})`}
          />
          <path
            d={`M${x} ${y - 4} L${x + 3} ${y} L${x} ${y + 4} L${x - 3} ${y} Z`}
            fill="var(--color-burnt)"
          />
        </motion.g>
      ))}

      {/* brilliant-cut diamond crowning the crest */}
      <motion.g variants={pop} initial={initial} animate="show" custom={4} style={rotate}>
        <g stroke={`url(#${foil})`} strokeWidth="0.8" strokeLinejoin="round">
          <path d="M128 16 L136 4 L144 16Z" fill="var(--color-gold)" fillOpacity="0.95" />
          <path d="M144 16 L136 4 L164 4 L156 16Z" fill="var(--color-gold-light)" fillOpacity="0.95" />
          <path d="M156 16 L164 4 L172 16Z" fill="var(--color-gold)" fillOpacity="0.95" />
          <path d="M128 16 L144 16 L150 40Z" fill="var(--color-caramel)" fillOpacity="0.95" />
          <path d="M144 16 L156 16 L150 40Z" fill="var(--color-gold)" fillOpacity="0.95" />
          <path d="M156 16 L172 16 L150 40Z" fill="var(--color-caramel)" fillOpacity="0.85" />
        </g>
      </motion.g>

      {/* filigree flourishes either side of the monogram */}
      <motion.g
        variants={draw} initial={initial} animate="show" custom={4}
        fill="none" stroke={`url(#${foil})`} strokeWidth="1.1" strokeLinecap="round"
      >
        <path d="M70 150 C58 138 64 124 78 128 C86 130 86 140 78 142" />
        <path d="M230 150 C242 138 236 124 222 128 C214 130 214 140 222 142" />
        <path d="M74 176 C64 184 66 196 78 194" />
        <path d="M226 176 C236 184 234 196 222 194" />
      </motion.g>

      {/* monogram */}
      <motion.g variants={pop} initial={initial} animate="show" custom={5}>
        <text
          x="104" y="176" textAnchor="middle" fill={letterFill}
          fontFamily="var(--font-display)" fontSize="82" fontWeight="600"
        >
          D
        </text>
        <text
          x="196" y="176" textAnchor="middle" fill={letterFill}
          fontFamily="var(--font-display)" fontSize="82" fontWeight="600"
        >
          G
        </text>
        <text
          x="150" y="168" textAnchor="middle" fill="var(--color-burnt)"
          fontFamily="var(--font-script)" fontSize="42"
        >
          &amp;
        </text>
      </motion.g>

      {/* year */}
      <motion.g variants={pop} initial={initial} animate="show" custom={6}>
        <path d="M102 212 L108 217 L102 222 L96 217Z" fill={`url(#${foil})`} />
        <path d="M198 212 L204 217 L198 222 L192 217Z" fill={`url(#${foil})`} />
        <text
          x="150" y="224" textAnchor="middle" fill={`url(#${foil})`}
          fontFamily="var(--font-display)" fontSize="26" fontWeight="600" letterSpacing="7"
        >
          2027
        </text>
      </motion.g>
    </svg>
  );
}
