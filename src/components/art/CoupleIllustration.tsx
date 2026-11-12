import { useId } from "react";

/**
 * Stylised, faceless editorial illustration of a Cameroonian bride & groom
 * in ceremonial dress, framed by a gold arch.
 *  – Groom: Grassfields feathered cap, embroidered Toghu tunic, bead necklace.
 *  – Bride: sculpted gold gele, coral bead collar, Toghu-embroidered bodice, wrapper.
 * Pure vector, coloured only through theme variables.
 */
export function CoupleIllustration({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const foil = `foil${uid}`;
  const arch = `arch${uid}`;
  const lattice = `lat${uid}`;
  const band = `band${uid}`;
  const embroid = `emb${uid}`;

  // stacked embroidered diamonds on the groom's chest panel
  const chestDiamonds = [190, 212, 234, 256, 278];

  return (
    <svg
      viewBox="0 0 360 470"
      className={className}
      role="img"
      aria-label="Illustration of a Cameroonian traditional bride and groom in ceremonial attire"
    >
      <defs>
        <linearGradient id={foil} gradientUnits="userSpaceOnUse" x1="40" y1="20" x2="320" y2="450">
          <stop offset="0" stopColor="var(--color-caramel)" />
          <stop offset="0.3" stopColor="var(--color-gold)" />
          <stop offset="0.5" stopColor="var(--color-gold-light)" />
          <stop offset="0.7" stopColor="var(--color-gold)" />
          <stop offset="1" stopColor="var(--color-caramel)" />
        </linearGradient>

        <clipPath id={arch}>
          <path d="M36 452 V192 C36 82 104 36 180 36 C256 36 324 82 324 192 V452Z" />
        </clipPath>

        <pattern id={lattice} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M16 2 30 16 16 30 2 16Z" fill="none" stroke="var(--color-caramel)" strokeOpacity="0.28" strokeWidth="1" />
          <path d="M16 12 20 16 16 20 12 16Z" fill="var(--color-caramel)" fillOpacity="0.22" />
        </pattern>

        <pattern id={band} width="24" height="22" patternUnits="userSpaceOnUse">
          <rect width="24" height="22" fill="var(--color-burnt)" />
          <path d="M0 22 L6 6 L12 22Z" fill="var(--color-gold)" />
          <path d="M12 0 L18 16 L24 0Z" fill="var(--color-espresso)" />
          <circle cx="6" cy="14" r="1.6" fill="var(--color-espresso)" />
          <circle cx="18" cy="6" r="1.6" fill="var(--color-gold-light)" />
        </pattern>

        <pattern id={embroid} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="var(--color-espresso)" />
          <path d="M8 1 15 8 8 15 1 8Z" fill="none" stroke="var(--color-gold)" strokeWidth="0.9" />
          <path d="M8 6 10 8 8 10 6 8Z" fill="var(--color-burnt)" />
        </pattern>
      </defs>

      {/* ── Arch frame ─────────────────────────────────────── */}
      <path
        d="M24 458 V192 C24 70 96 22 180 22 C264 22 336 70 336 192 V458Z"
        fill="var(--color-ivory)"
        stroke={`url(#${foil})`}
        strokeWidth="2.4"
      />
      <path
        d="M36 452 V192 C36 82 104 36 180 36 C256 36 324 82 324 192 V452Z"
        fill="var(--color-sand)"
        fillOpacity="0.45"
        stroke={`url(#${foil})`}
        strokeWidth="1"
      />

      <g clipPath={`url(#${arch})`}>
        <rect x="30" y="30" width="300" height="430" fill={`url(#${lattice})`} />
        {/* soft halo behind the couple */}
        <circle cx="180" cy="190" r="132" fill="var(--color-ivory)" fillOpacity="0.8" />
        <circle cx="180" cy="190" r="132" fill="none" stroke={`url(#${foil})`} strokeWidth="1" strokeDasharray="0.1 8" strokeLinecap="round" />
        <path d="M180 56 L304 190 L180 324 L56 190Z" fill="none" stroke={`url(#${foil})`} strokeWidth="0.8" strokeOpacity="0.7" />

        {/* ── Floor: Toghu band ── */}
        <rect x="30" y="430" width="300" height="28" fill={`url(#${band})`} />
        <rect x="30" y="428" width="300" height="3" fill={`url(#${foil})`} />

        {/* both figures scaled slightly toward the floor so headwear clears the arch */}
        <g transform="translate(180 430) scale(0.9) translate(-180 -430)">
        {/* ══════════ GROOM ══════════ */}
        <g>
          {/* robe */}
          <path
            d="M78 158 Q125 140 172 158 L188 300 L194 430 L56 430 L62 300Z"
            fill="var(--color-espresso)"
          />
          {/* sleeves */}
          <path d="M78 158 L52 298 L84 308 L102 200Z" fill="var(--color-espresso)" stroke="var(--color-gold)" strokeWidth="0.9" strokeLinejoin="round" />
          <path d="M172 158 L198 298 L166 308 L148 200Z" fill="var(--color-espresso)" stroke="var(--color-gold)" strokeWidth="0.9" strokeLinejoin="round" />
          <path d="M52 298 L84 308" stroke="var(--color-gold)" strokeWidth="5" strokeLinecap="round" />
          <path d="M198 298 L166 308" stroke="var(--color-gold)" strokeWidth="5" strokeLinecap="round" />
          {/* embroidered chest panel */}
          <path d="M106 152 L144 152 L148 304 L102 304Z" fill="var(--color-burnt)" stroke="var(--color-gold)" strokeWidth="1.2" />
          {chestDiamonds.map((y) => (
            <g key={y}>
              <path d={`M125 ${y - 10} L135 ${y} L125 ${y + 10} L115 ${y}Z`} fill="var(--color-gold)" />
              <path d={`M125 ${y - 4} L129 ${y} L125 ${y + 4} L121 ${y}Z`} fill="var(--color-espresso)" />
            </g>
          ))}
          {/* V neck */}
          <path d="M108 152 L125 186 L142 152Z" fill="var(--color-skin)" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinejoin="round" />
          {/* neck + head */}
          <rect x="116" y="126" width="18" height="30" rx="6" fill="var(--color-skin)" />
          <ellipse cx="125" cy="104" rx="23" ry="28" fill="var(--color-skin)" />
          <circle cx="102" cy="107" r="4.5" fill="var(--color-skin)" />
          <circle cx="148" cy="107" r="4.5" fill="var(--color-skin)" />
          {/* cap */}
          <path d="M98 90 C94 56 156 56 152 90 C138 83 112 83 98 90Z" fill="var(--color-burnt)" />
          <path d="M98 90 C112 83 138 83 152 90 L152 97 C138 91 112 91 98 97Z" fill={`url(#${foil})`} />
          <path d="M108 74 Q125 62 142 74" fill="none" stroke="var(--color-gold)" strokeWidth="1" strokeDasharray="0.1 5" strokeLinecap="round" />
          {/* feather */}
          <path d="M146 68 C160 62 172 44 170 24 C158 36 148 50 143 66Z" fill={`url(#${foil})`} />
          <path d="M144 66 C152 52 160 40 168 28" fill="none" stroke="var(--color-espresso)" strokeWidth="0.8" strokeOpacity="0.6" />
          {/* bead necklaces */}
          <path d="M103 150 Q125 196 147 150" fill="none" stroke="var(--color-gold-light)" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 7.5" />
          <path d="M107 152 Q125 184 143 152" fill="none" stroke="var(--color-burnt)" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="0.1 6" />
          {/* hem */}
          <rect x="56" y="408" width="138" height="22" fill={`url(#${band})`} />
          <rect x="56" y="406" width="138" height="3" fill={`url(#${foil})`} />
          {/* hand */}
          <circle cx="68" cy="308" r="9" fill="var(--color-skin)" />
        </g>

        {/* ══════════ BRIDE ══════════ */}
        <g>
          {/* wrapper skirt */}
          <path
            d="M204 166 Q240 150 276 166 L270 262 L318 430 L164 430 L210 262Z"
            fill="var(--color-burnt)"
          />
          <path d="M240 266 L240 408" stroke="var(--color-gold)" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0.1 7" />
          <path d="M222 270 L204 408 M258 270 L276 408" stroke="var(--color-espresso)" strokeOpacity="0.28" strokeWidth="1.2" />
          {/* arms (skin) */}
          <path d="M206 176 Q192 240 194 300" fill="none" stroke="var(--color-skin)" strokeWidth="13" strokeLinecap="round" />
          <path d="M274 176 Q290 240 286 306" fill="none" stroke="var(--color-skin)" strokeWidth="13" strokeLinecap="round" />
          {/* bangles */}
          <path d="M188 292 L200 294 M280 298 L292 300" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
          {/* embroidered bodice */}
          <path d="M206 166 Q240 152 274 166 L268 262 Q240 274 212 262Z" fill={`url(#${embroid})`} stroke="var(--color-gold)" strokeWidth="1.2" />
          <path d="M212 262 Q240 274 268 262 L270 270 Q240 282 210 270Z" fill={`url(#${foil})`} />
          {/* puff sleeves */}
          <ellipse cx="208" cy="172" rx="11" ry="13" fill="var(--color-burnt)" stroke="var(--color-gold)" strokeWidth="0.9" />
          <ellipse cx="272" cy="172" rx="11" ry="13" fill="var(--color-burnt)" stroke="var(--color-gold)" strokeWidth="0.9" />
          {/* neck + head */}
          <rect x="231" y="128" width="18" height="34" rx="7" fill="var(--color-skin)" />
          <ellipse cx="240" cy="108" rx="21" ry="26" fill="var(--color-skin)" />
          {/* earrings */}
          <circle cx="218" cy="116" r="2.6" fill="var(--color-gold)" />
          <path d="M218 119 L218 128" stroke="var(--color-gold)" strokeWidth="1.4" />
          <path d="M218 128 l3 4 -3 4 -3 -4z" fill="var(--color-gold)" />
          <circle cx="262" cy="116" r="2.6" fill="var(--color-gold)" />
          <path d="M262 119 L262 128" stroke="var(--color-gold)" strokeWidth="1.4" />
          <path d="M262 128 l3 4 -3 4 -3 -4z" fill="var(--color-gold)" />
          {/* layered coral-bead collar */}
          <path d="M219 152 Q240 188 261 152" fill="none" stroke="var(--color-burnt)" strokeWidth="5" strokeLinecap="round" strokeDasharray="0.1 7" />
          <path d="M214 156 Q240 200 266 156" fill="none" stroke="var(--color-gold-light)" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 6.5" />
          <path d="M210 162 Q240 214 270 162" fill="none" stroke="var(--color-gold)" strokeWidth="4.4" strokeLinecap="round" strokeDasharray="0.1 8" />
          <path d="M240 207 l5 7 -5 7 -5 -7z" fill={`url(#${foil})`} stroke="var(--color-espresso)" strokeOpacity="0.4" strokeWidth="0.6" />
          {/* gele — sculpted head-wrap */}
          <path d="M206 88 C184 70 194 30 226 36 C242 40 246 58 242 74Z" fill={`url(#${foil})`} />
          <path d="M274 88 C296 70 286 30 254 36 C238 40 234 58 238 74Z" fill={`url(#${foil})`} />
          <path d="M222 48 C224 16 256 16 258 48 C250 40 230 40 222 48Z" fill={`url(#${foil})`} stroke="var(--color-burnt)" strokeWidth="0.7" />
          <path d="M206 92 C224 76 256 76 274 92 L272 102 C256 88 224 88 208 102Z" fill="var(--color-burnt)" />
          <path d="M208 92 C224 78 256 78 272 92" fill="none" stroke="var(--color-gold-light)" strokeWidth="1.4" />
          <g fill="none" stroke="var(--color-caramel)" strokeWidth="1.2" strokeLinecap="round">
            <path d="M200 74 C206 52 220 46 234 62" />
            <path d="M280 74 C274 52 260 46 246 62" />
            <path d="M212 80 C216 62 226 56 236 70" />
            <path d="M268 80 C264 62 254 56 244 70" />
            <path d="M232 44 C238 30 242 30 248 44" />
          </g>
          <path d="M240 78 l6 7 -6 7 -6 -7z" fill="var(--color-ivory)" stroke="var(--color-gold)" strokeWidth="1" />
          {/* hem */}
          <rect x="164" y="408" width="154" height="22" fill={`url(#${band})`} />
          <rect x="164" y="406" width="154" height="3" fill={`url(#${foil})`} />
        </g>

        {/* clasped hands */}
        <circle cx="192" cy="304" r="8.5" fill="var(--color-skin)" />
        <circle cx="200" cy="302" r="7.5" fill="var(--color-skin)" stroke="var(--color-ivory)" strokeWidth="0.8" />
        <circle cx="288" cy="312" r="8.5" fill="var(--color-skin)" />
        </g>
      </g>

      {/* crowning diamond & sparkles */}
      <g>
        <path d="M180 4 L194 20 L180 36 L166 20Z" fill={`url(#${foil})`} stroke="var(--color-espresso)" strokeOpacity="0.35" strokeWidth="0.6" />
        <path d="M180 4 L194 20 L180 20Z" fill="var(--color-gold-light)" />
        <path d="M180 20 L194 20 L180 36Z" fill="var(--color-caramel)" />
      </g>
      {[
        [64, 120, 7],
        [298, 104, 9],
        [58, 250, 6],
        [306, 236, 7],
        [96, 52, 5],
      ].map(([x, y, s], i) => (
        <path
          key={i}
          className="animate-twinkle"
          style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${i * 0.7}s` }}
          d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z`}
          fill="var(--color-gold)"
        />
      ))}
    </svg>
  );
}
