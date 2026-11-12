/**
 * ─────────────────────────────────────────────────────────────
 *  DIAMOND & GOLD 2027 — single source of truth for ALL copy.
 *  Edit the values below; no need to touch any JSX.
 *  Everything marked [PLACEHOLDER] should be replaced.
 * ─────────────────────────────────────────────────────────────
 */

export interface ScheduleEvent {
  id: string;
  /** 24h "HH:mm" — used for display AND the calendar file */
  start: string;
  end: string;
  title: string;
  subtitle: string;
  description: string;
  venue: string;
  address: string;
  mapsUrl: string;
  icon: "families" | "door" | "blessing" | "feast";
}

export interface Swatch {
  name: string;
  /** CSS variable from globals.css so swatches always match the theme */
  cssVar: string;
  note: string;
}

export const weddingConfig = {
  // ── Brand ────────────────────────────────────────────────
  siteTitle: "Diamond & Golda — Diamond & Gold 2027",
  siteDescription:
    "You are warmly invited to the traditional wedding of Diamond & Golda. Kindly confirm your presence.",
  headline: "DIAMOND & GOLD 2027",
  hashtag: "#DiamondAndGold2027",
  tagline: "Two families. One crown. A celebration of heritage and love.",
  invitationLine: "Together with their families",

  // ── The couple ───────────────────────────────────────────
  couple: {
    groom: { firstName: "Diamond", fullName: "Diamond [Surname]" }, // [PLACEHOLDER]
    bride: { firstName: "Golda", fullName: "Golda [Surname]" }, // [PLACEHOLDER]
    storyLine:
      "From a name whispered with a smile to a vow spoken before our elders — we invite you to witness the union of Diamond and Golda.",
  },

  // ── Families ─────────────────────────────────────────────
  families: {
    groom: {
      name: "The [Groom Surname] Family", // [PLACEHOLDER]
      parents: "Mr. & Mrs. [Groom's Parents]",
      origin: "[Village / Division], Cameroon",
    },
    bride: {
      name: "The [Bride Surname] Family", // [PLACEHOLDER]
      parents: "Mr. & Mrs. [Bride's Parents]",
      origin: "[Village / Division], Cameroon",
    },
  },

  // ── Date & place ─────────────────────────────────────────
  event: {
    type: "Traditional Wedding",
    subtype: "Knocking of the Door & Traditional Marriage",
    /** ISO date, YYYY-MM-DD */
    date: "2027-04-17", // [PLACEHOLDER]
    dateDisplay: "Saturday, 17 April 2027", // [PLACEHOLDER]
    /** Cameroon is UTC+1 all year (WAT) */
    utcOffset: "+01:00",
    city: "Douala",
    country: "Cameroon",
    venueTeaser: "Douala · Cameroon", // shown in the hero
    calendarTitle: "Diamond & Golda — Traditional Wedding",
    calendarDescription:
      "Diamond & Gold 2027. The traditional wedding of Diamond & Golda. Dress in the colours of the day.",
  },

  // ── Schedule ─────────────────────────────────────────────
  schedule: [
    {
      id: "arrival",
      start: "10:00",
      end: "11:00",
      title: "Arrival of the Families",
      subtitle: "Welcome & Greetings",
      description:
        "Both families gather and greet one another with palm wine, kola nut and warm words of welcome.",
      venue: "[Bride's Family Compound]", // [PLACEHOLDER]
      address: "[Street / Quarter], Douala, Cameroon",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Douala+Cameroon",
      icon: "families",
    },
    {
      id: "door",
      start: "11:00",
      end: "13:00",
      title: "Knocking of the Door",
      subtitle: "Traditional Rites",
      description:
        "The groom's delegation arrives with song and gifts to knock at the door, state their purpose and be received.",
      venue: "[Bride's Family Compound]", // [PLACEHOLDER]
      address: "[Street / Quarter], Douala, Cameroon",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Douala+Cameroon",
      icon: "door",
    },
    {
      id: "dowry",
      start: "13:00",
      end: "15:00",
      title: "Dowry & Blessing",
      subtitle: "Traditional Marriage",
      description:
        "The dowry is presented, the elders pronounce their blessings and Diamond & Golda are joined before both families.",
      venue: "[Bride's Family Compound]", // [PLACEHOLDER]
      address: "[Street / Quarter], Douala, Cameroon",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Douala+Cameroon",
      icon: "blessing",
    },
    {
      id: "feast",
      start: "16:00",
      end: "22:00",
      title: "Reception & Feast",
      subtitle: "Dinner, Music & Dancing",
      description:
        "An evening of joy — a traditional feast, speeches, live music and dancing until the night is golden.",
      venue: "[Reception Hall Name]", // [PLACEHOLDER]
      address: "[Street / Quarter], Douala, Cameroon",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Douala+Cameroon",
      icon: "feast",
    },
  ] satisfies ScheduleEvent[],

  // ── Dress code ───────────────────────────────────────────
  dressCode: {
    title: "Dress in Diamond & Gold",
    intro:
      "Honour the day in the colours of Cameroonian royalty. Traditional attire is warmly encouraged — let your heritage shine.",
    swatches: [
      { name: "Espresso", cssVar: "--color-espresso", note: "Deep & regal" },
      { name: "Burnt Orange", cssVar: "--color-burnt", note: "Warm & festive" },
      { name: "Caramel Gold", cssVar: "--color-gold", note: "Radiant accents" },
      { name: "Ivory", cssVar: "--color-ivory", note: "Soft contrast" },
    ] satisfies Swatch[],
    ladies:
      "Kaba, wrapper & gele, or an elegant gown in the colours of the day. Beads and gold jewellery are most welcome.",
    gentlemen:
      "Toghu, ndop or boubou — or a tailored suit with a touch of gold, caramel or burnt orange.",
    avoid:
      "Kindly avoid all-white and all-black outfits so the couple's colours stand out.",
    note: "Our Toghu-wearing guests will be especially celebrated!",
  },

  // ── RSVP ─────────────────────────────────────────────────
  rsvp: {
    title: "Confirm Your Presence",
    deadlineDisplay: "1 March 2027", // [PLACEHOLDER]
    /** Max party size (incl. the guest) for people who RSVP without a personal link */
    openMaxGuests: 2,
    /** Max party size if a ?guest= name isn't on the guest list */
    unlistedMaxGuests: 2,
    personalGreeting: "We would be honored by your presence,",
    blessingPlaceholder: "A blessing, a memory or a wish for Diamond & Golda…",
    acceptedMessage:
      "Your seat is reserved. We cannot wait to celebrate with you!",
    declinedMessage:
      "You will be dearly missed. Thank you for your love and blessings.",
  },

  // ── Contact / footer ─────────────────────────────────────
  contact: {
    /** International format, digits only — [PLACEHOLDER] */
    whatsappNumber: "237600000000",
    whatsappLabel: "Questions? Chat with the family on WhatsApp",
  },
  footer: {
    closing: "With love & gratitude, the families of Diamond & Golda",
  },
} as const;

export type WeddingConfig = typeof weddingConfig;
