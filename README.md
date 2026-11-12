# Diamond & Gold 2027 — Wedding Invitation

Mobile-first digital invitation + RSVP for the traditional wedding of Diamond & Golda.
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion. No photos — all artwork is hand-built SVG.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
```

## Customise

| What | Where |
| --- | --- |
| All copy: names, dates, schedule, venues, maps links, dress code, RSVP text | `src/data/wedding-config.ts` |
| Colour tokens (Espresso / Burnt Orange / Caramel / Gold / Ivory) | `src/app/globals.css` (`@theme`) |
| Guest list → URL slugs | `src/data/guests.ts` |
| RSVP backend (mocked with localStorage) | `src/lib/rsvp.ts` — see `TODO: Connect Supabase client here` |
| Calendar (.ics + Google link) | `src/lib/calendar.ts` |

## Personal invite links

- `/?code=jean-paul-mbarga` — matched against `guests.ts` (sets the party-size limit)
- `/?guest=Jean-Paul+Mbarga` — greets by name; matched to the list if possible
- `/` — open form; anyone can type their name
