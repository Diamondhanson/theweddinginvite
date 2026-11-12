/**
 * ─────────────────────────────────────────────────────────────
 *  DIAMOND & GOLD 2027 — single source of truth for ALL copy.
 *  Edit the values below; no need to touch any JSX.
 * ─────────────────────────────────────────────────────────────
 */

export interface ScheduleEvent {
  id: string;
  /** 24h "HH:mm" — used for display AND the calendar file */
  start: string;
  /** Optional. Only needed on the last event (used as the calendar end time). */
  end?: string;
  title: string;
  subtitle?: string;
  description?: string;
  venue: string;
  address: string;
  mapsUrl: string;
  icon: "families" | "door" | "blessing" | "feast";
}

export interface Swatch {
  name: string;
  /** CSS variable from globals.css so swatches always match the theme */
  cssVar: string;
  hex: string;
}

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Dallas+Multipurpose+Hall+Hospital+Roundabout+Bamenda+Cameroon";
const VENUE = "Dallas Multipurpose Hall";
const ADDRESS = "Hospital Roundabout, Bamenda, Cameroon";

export const weddingConfig = {
  // ── Brand ────────────────────────────────────────────────
  siteTitle: "Diamond & Golda — Diamond & Gold 2027",
  siteDescription:
    "You are warmly invited to the traditional wedding of Diamond & Golda on 20 February 2027 in Bamenda, Cameroon.",
  headline: "Diamond & Gold",
  year: "2027",
  hashtag: "#DiamondAndGold2027",
  tagline: "Two families. One crown. A celebration of heritage and love.",
  invitationLine: "Together with their families",
  inviteLine: "invites you to join them, celebrate their union",

  // ── The couple ───────────────────────────────────────────
  couple: {
    groom: { firstName: "Diamond", displayName: "Bambot Hanson (Diamond)" },
    bride: { firstName: "Golda", displayName: "Akwa Gabriella Golda" },
  },

  // ── Date & place ─────────────────────────────────────────
  event: {
    type: "Traditional Wedding",
    subtype: "Knocking of the Door & Traditional Marriage",
    /** ISO date, YYYY-MM-DD */
    date: "2027-02-20",
    dateDisplay: "Saturday, 20 February 2027",
    /** Cameroon is UTC+1 all year (WAT) */
    utcOffset: "+01:00",
    city: "Bamenda",
    country: "Cameroon",
    venueTeaser: "Bamenda · Cameroon", // shown in the hero
    venue: VENUE,
    address: ADDRESS,
    calendarTitle: "Diamond & Golda — Traditional Wedding",
    calendarDescription:
      "Diamond & Gold 2027. The traditional wedding of Diamond & Golda. Dress in the colours of the day.",
  },

  // ── Schedule (edit freely) ───────────────────────────────
  schedule: [
    {
      id: "arrival",
      start: "11:00",
      title: "Arrival of Guests",
      subtitle: "Welcome & Seating",
      venue: VENUE,
      address: ADDRESS,
      mapsUrl: MAPS_URL,
      icon: "families",
    },
    {
      id: "rites",
      start: "13:00",
      title: "Traditional Rites Begin",
      subtitle: "Knocking of the Door",
      venue: VENUE,
      address: ADDRESS,
      mapsUrl: MAPS_URL,
      icon: "door",
    },
    {
      id: "blessing",
      start: "14:30",
      title: "Word from the Spiritual Leader",
      subtitle: "Blessing",
      venue: VENUE,
      address: ADDRESS,
      mapsUrl: MAPS_URL,
      icon: "blessing",
    },
    {
      id: "feast",
      start: "15:30",
      /** Calendar end time for the whole day */
      end: "20:00",
      title: "Reception & Feast",
      subtitle: "Food, Music & Dancing",
      venue: VENUE,
      address: ADDRESS,
      mapsUrl: MAPS_URL,
      icon: "feast",
    },
  ] as ScheduleEvent[],

  // ── Dress code: colours only ─────────────────────────────
  dressCode: {
    title: "Colours of the Day",
    intro: "Kindly join us in any of these colours.",
    swatches: [
      { name: "Espresso", cssVar: "--color-espresso", hex: "#3C2821" },
      { name: "Chestnut Brown", cssVar: "--color-chestnut", hex: "#67331E" },
      { name: "Burnt Orange", cssVar: "--color-burnt", hex: "#B04D24" },
      { name: "Caramel", cssVar: "--color-caramel", hex: "#A86A3B" },
      { name: "Warm Taupe", cssVar: "--color-taupe", hex: "#8E6E5F" },
    ] satisfies Swatch[],
  },

  // ── RSVP ─────────────────────────────────────────────────
  rsvp: {
    title: "Confirm Your Presence",
    /** Shown as "Kindly reply before …" */
    deadlineDisplay: "5 February 2027",
    /** Max party size (incl. the guest) for people who RSVP without a personal link */
    openMaxGuests: 2,
    /** Max party size if a ?guest= name isn't on the guest list */
    unlistedMaxGuests: 2,
    personalGreeting: "We would be honored by your presence,",
    blessingPlaceholder: "A blessing, a memory or a wish for Diamond & Golda…",
    acceptedMessage:
      "Your seat is reserved. We cannot wait to celebrate with you!",
  },

  // ── Contact / footer ─────────────────────────────────────
  contact: {
    /** International format (Cameroon +237), digits only */
    whatsappNumber: "237670151973",
    whatsappDisplay: "670 151 973",
    whatsappLabel:
      "For any form of support, clarification and questions, chat with us on WhatsApp.",
  },
  footer: {
    closing: "With love & gratitude, the families of Diamond & Golda",
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
