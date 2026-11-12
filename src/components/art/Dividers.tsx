import { useId } from "react";

/** Repeating Toghu-inspired band: gold & burnt-orange triangles with bead dots. */
export function ToghuBand({ className = "", height = 16 }: { className?: string; height?: number }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg
      className={`block w-full ${className}`}
      height={height}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={id} width="32" height="16" patternUnits="userSpaceOnUse">
          <rect width="32" height="16" fill="var(--color-espresso)" />
          <path d="M0 16 L8 3 L16 16Z" fill="var(--color-gold)" />
          <path d="M16 0 L24 13 L32 0Z" fill="var(--color-burnt)" />
          <path d="M8 16 L16 3 L24 16Z" fill="none" stroke="var(--color-caramel)" strokeWidth="0.8" />
          <circle cx="8" cy="9" r="1.5" fill="var(--color-espresso)" />
          <circle cx="24" cy="5" r="1.4" fill="var(--color-gold-light)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Centre-diamond divider flanked by bead strings and fine lines. */
export function BeadDivider({
  className = "",
  tone = "light",
}: {
  className?: string;
  /** light = on ivory background, dark = on espresso background */
  tone?: "light" | "dark";
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const line = tone === "light" ? "var(--color-caramel)" : "var(--color-gold)";
  return (
    <svg
      viewBox="0 0 260 28"
      className={`mx-auto block h-7 w-64 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" x2="1">
          <stop offset="0" stopColor={line} stopOpacity="0" />
          <stop offset="1" stopColor={line} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="1" x2="0">
          <stop offset="0" stopColor={line} stopOpacity="0" />
          <stop offset="1" stopColor={line} stopOpacity="1" />
        </linearGradient>
      </defs>
      <line x1="6" y1="14" x2="86" y2="14" stroke={`url(#${id})`} strokeWidth="1" />
      <line x1="174" y1="14" x2="254" y2="14" stroke={`url(#${id}r)`} strokeWidth="1" />
      {/* beads */}
      {[96, 106, 116].map((x, i) => (
        <circle key={`l${x}`} cx={x} cy="14" r={1.6 + i * 0.4} fill="var(--color-burnt)" />
      ))}
      {[144, 154, 164].map((x, i) => (
        <circle key={`r${x}`} cx={x} cy="14" r={2.8 - i * 0.4} fill="var(--color-burnt)" />
      ))}
      {/* centre diamond */}
      <path d="M130 2 L142 14 L130 26 L118 14Z" fill="none" stroke="var(--color-gold)" strokeWidth="1.2" />
      <path d="M130 7 L137 14 L130 21 L123 14Z" fill="var(--color-gold)" />
      <path d="M130 11 L133 14 L130 17 L127 14Z" fill="var(--color-burnt)" />
    </svg>
  );
}

/** Small faceted gem used as a bullet / node. */
export function Gem({ className = "", size = 14 }: { className?: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <path d="M12 1 L23 12 L12 23 L1 12Z" fill="var(--color-gold)" />
      <path d="M12 1 L23 12 L12 12Z" fill="var(--color-gold-light)" />
      <path d="M12 12 L23 12 L12 23Z" fill="var(--color-caramel)" />
      <path d="M12 6 L18 12 L12 18 L6 12Z" fill="none" stroke="var(--color-espresso)" strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  );
}

/** Corner filigree for cards. Rotate with CSS for the other corners. */
export function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path d="M2 46 V10 Q2 2 10 2 H46" stroke="var(--color-gold)" strokeWidth="1.2" />
      <path d="M8 46 V16 Q8 8 16 8 H46" stroke="var(--color-caramel)" strokeWidth="0.7" strokeOpacity="0.7" />
      <path d="M14 14 L19 19 L14 24 L9 19Z" fill="var(--color-gold)" />
      <circle cx="30" cy="5" r="1.6" fill="var(--color-burnt)" />
      <circle cx="5" cy="30" r="1.6" fill="var(--color-burnt)" />
    </svg>
  );
}
