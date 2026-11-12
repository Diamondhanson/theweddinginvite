/**
 * RSVP service — currently MOCKED (browser localStorage).
 * Every function below is the single place to swap in Supabase later;
 * the UI only ever talks to this file.
 */

export type Attendance = "accepts" | "declines";

export interface RsvpPayload {
  fullName: string;
  phone: string;
  attendance: Attendance;
  /** Total party size including the guest. 0 when declining. */
  guestCount: number;
  /** Blessing / note for the couple */
  note: string;
  /** Slug from the guest list, when the guest came through a personal link */
  guestCode?: string;
}

export interface RsvpRecord extends RsvpPayload {
  id: string;
  /** Short human-friendly code shown on the digital gate pass */
  passCode: string;
  submittedAt: string; // ISO
}

const STORAGE_KEY = "dg2027:rsvp:v1";
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function makePassCode(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no look-alikes
  let out = "";
  for (let i = 0; i < 5; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `DG27-${out}`;
}

/**
 * Submit (or update) an RSVP.
 *
 * TODO: Connect Supabase client here
 *   const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
 *   const { data, error } = await supabase
 *     .from("rsvps")
 *     .upsert({ ...payload, guest_code: payload.guestCode }, { onConflict: "guest_code" }) // or phone
 *     .select()
 *     .single();
 *   if (error) throw error;
 *   return mapRowToRecord(data);
 */
export async function submitRsvp(payload: RsvpPayload): Promise<RsvpRecord> {
  await delay(1100); // feels like a real network round-trip

  const existing = await getSavedRsvp();
  const record: RsvpRecord = {
    ...payload,
    id: existing?.id ?? crypto.randomUUID(),
    passCode: existing?.passCode ?? makePassCode(),
    submittedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    /* private mode / blocked storage — the in-memory record is still returned */
  }
  return record;
}

/**
 * Look up a previously submitted RSVP so returning guests see their gate pass.
 *
 * TODO: Connect Supabase client here
 *   .from("rsvps").select("*").eq("guest_code", guestCode).maybeSingle()
 */
export async function getSavedRsvp(): Promise<RsvpRecord | null> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RsvpRecord) : null;
  } catch {
    return null;
  }
}

/** TODO: Connect Supabase client here (delete or flag the row if you allow retractions) */
export async function clearSavedRsvp(): Promise<void> {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}

/** Lightweight client-side validation shared by the form. */
export function validateRsvp(
  v: Pick<RsvpPayload, "fullName" | "phone" | "attendance">,
): Partial<Record<"fullName" | "phone" | "attendance", string>> {
  const errors: Partial<Record<"fullName" | "phone" | "attendance", string>> = {};
  if (v.fullName.trim().length < 2) errors.fullName = "Please enter your full name.";
  if (v.phone.replace(/\D/g, "").length < 8)
    errors.phone = "Please enter a valid phone / WhatsApp number.";
  if (!v.attendance) errors.attendance = "Please let us know if you can make it.";
  return errors;
}
