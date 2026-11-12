import type { ReactNode } from "react";

interface IconProps {
  className?: string;
  size?: number;
}

function Svg({ children, className, size = 40 }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ── Attire icons ─────────────────────────────────────────── */

/** Toghu tunic with embroidered chest panel */
export function ToghuIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M17 6 L8 12 L5 26 L11 28 L13 20 L12 42 H36 L35 20 L37 28 L43 26 L40 12 L31 6" />
      <path d="M17 6 Q24 14 31 6" />
      <path d="M24 12 V40" strokeOpacity="0.4" />
      <path d="M24 17 l3 3 -3 3 -3 -3z M24 27 l3 3 -3 3 -3 -3z" fill="var(--color-gold)" stroke="none" />
      <path d="M12 38 H36" stroke="var(--color-burnt)" />
    </Svg>
  );
}

/** Gele — sculpted head-wrap */
export function GeleIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8 26 C4 14 14 6 22 10 C26 12 26 16 24 20 Z" />
      <path d="M40 26 C44 14 34 6 26 10 C22 12 22 16 24 20 Z" />
      <path d="M18 12 C20 4 28 4 30 12" />
      <path d="M10 28 C18 22 30 22 38 28 L36 33 C28 28 20 28 12 33 Z" fill="var(--color-gold)" fillOpacity="0.35" />
      <path d="M24 40 l3 3 -3 3 -3 -3z" transform="translate(0 -9)" fill="var(--color-burnt)" stroke="none" />
    </Svg>
  );
}

/** Kaba & wrapper */
export function WrapperIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M17 5 Q24 11 31 5 L33 20 L41 43 H7 L15 20 Z" />
      <path d="M15 20 Q24 25 33 20" />
      <path d="M11 36 H37" stroke="var(--color-burnt)" strokeDasharray="1 3.5" strokeWidth="2.4" />
      <path d="M24 26 V36" strokeOpacity="0.4" />
    </Svg>
  );
}

/** Coral bead collar */
export function BeadsIcon(p: IconProps) {
  const dots = [
    [8, 12], [11, 20], [16, 27], [24, 31], [32, 27], [37, 20], [40, 12],
  ];
  return (
    <Svg {...p}>
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="var(--color-burnt)" stroke="none" />
      ))}
      <path d="M24 34 l4 5 -4 5 -4 -5z" fill="var(--color-gold)" stroke="none" />
    </Svg>
  );
}

/** Grassfields cap with feather */
export function CapIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9 32 C8 16 36 16 35 32 C28 28 16 28 9 32 Z" />
      <path d="M10 33 C18 30 28 30 34 33 L34 37 C28 34 16 34 10 37 Z" fill="var(--color-gold)" fillOpacity="0.4" />
      <path d="M32 20 C38 16 42 10 41 4 C36 8 33 13 31 19" fill="var(--color-burnt)" fillOpacity="0.35" />
    </Svg>
  );
}

/* ── Schedule icons ───────────────────────────────────────── */

export function FamiliesIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="16" cy="13" r="5" />
      <circle cx="33" cy="15" r="4" />
      <path d="M6 40 C6 28 26 28 26 40" />
      <path d="M26 40 C26 31 40 31 40 40" />
      <path d="M22 8 l2 2 -2 2 -2 -2z" fill="var(--color-gold)" stroke="none" />
    </Svg>
  );
}

export function DoorIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 42 V20 C12 8 36 8 36 20 V42 Z" />
      <path d="M12 42 H36" />
      <circle cx="29" cy="30" r="2.2" fill="var(--color-gold)" />
      <path d="M24 12 l3 3 -3 3 -3 -3z" fill="var(--color-gold)" stroke="none" />
      <path d="M6 26 q-3 3 0 6 M42 26 q3 3 0 6" strokeOpacity="0.6" />
    </Svg>
  );
}

export function BlessingIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8 24 C8 14 18 12 24 22 C30 12 40 14 40 24 C40 32 30 38 24 42 C18 38 8 32 8 24 Z" />
      <path d="M24 16 l3 3 -3 3 -3 -3z" fill="var(--color-gold)" stroke="none" />
    </Svg>
  );
}

export function FeastIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M15 6 H33 L31 20 C30 26 18 26 17 20 Z" />
      <path d="M24 25 V38 M16 40 H32" />
      <path d="M17 12 H31" stroke="var(--color-burnt)" />
      <path d="M38 8 l1.5 3 3 1.5 -3 1.5 -1.5 3 -1.5 -3 -3 -1.5 3 -1.5z" fill="var(--color-gold)" stroke="none" />
    </Svg>
  );
}

export const eventIcons = {
  families: FamiliesIcon,
  door: DoorIcon,
  blessing: BlessingIcon,
  feast: FeastIcon,
} as const;
