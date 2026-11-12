import { weddingConfig } from "./wedding-config";

/**
 * Sample guest list — shows how pre-populated invitees map to URL slugs.
 *
 *   /?code=jean-paul-mbarga          → matches `slug`
 *   /?guest=Jean-Paul+Mbarga         → slugified, then matched
 *   /?guest=Someone+Not+Listed       → greets them by name, uses `unlistedMaxGuests`
 *   /                                → open form (no personalisation)
 *
 * TODO: Replace this file with a Supabase `guests` table query when the backend is ready.
 */
export interface Guest {
  /** URL-safe id: lowercase, hyphenated. Use it as the personal-invite `?code=` */
  slug: string;
  name: string;
  /** Max party size INCLUDING the guest. 1 = no plus-one. */
  maxGuests: number;
  /** Optional — prefilled into the RSVP form */
  phone?: string;
  side?: "groom" | "bride" | "both";
}

export const guests: Guest[] = [
  { slug: "jean-paul-mbarga", name: "Jean-Paul Mbarga", maxGuests: 2, side: "groom" },
  { slug: "aunty-rose-fonkou", name: "Aunty Rose Fonkou", maxGuests: 3, side: "bride" },
  { slug: "dr-esther-ndongo", name: "Dr. Esther Ndongo", maxGuests: 1, side: "both" },
  { slug: "the-tabi-family", name: "The Tabi Family", maxGuests: 5, side: "groom" },
  { slug: "chief-amadou-njoya", name: "Chief Amadou Njoya", maxGuests: 2, side: "bride" },
];

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findGuestBySlug(slug: string): Guest | undefined {
  const s = slugify(slug);
  return guests.find((g) => g.slug === s);
}

export interface ResolvedGuest {
  name: string;
  /** slug when matched against the list */
  code?: string;
  maxGuests: number;
  phone?: string;
  /** true when matched on the guest list */
  listed: boolean;
}

type Params = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

/**
 * Turns URL search params into a personalised guest, or `null` (→ open form).
 * `?code=` must match the list. `?guest=` matches the list if it can,
 * otherwise falls back to greeting the typed name.
 */
export function resolveGuest(params: Params): ResolvedGuest | null {
  const code = first(params.code);
  const guestParam = first(params.guest);

  if (code) {
    const g = findGuestBySlug(code);
    if (g) {
      return { name: g.name, code: g.slug, maxGuests: g.maxGuests, phone: g.phone, listed: true };
    }
  }

  if (guestParam) {
    const name = guestParam.replace(/\s+/g, " ").slice(0, 80);
    const g = findGuestBySlug(name);
    if (g) {
      return { name: g.name, code: g.slug, maxGuests: g.maxGuests, phone: g.phone, listed: true };
    }
    return {
      name,
      maxGuests: weddingConfig.rsvp.unlistedMaxGuests,
      listed: false,
    };
  }

  return null;
}
