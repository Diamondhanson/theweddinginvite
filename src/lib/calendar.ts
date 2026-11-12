import { weddingConfig } from "@/data/wedding-config";

const { event, schedule } = weddingConfig;

/** "2027-04-17" + "10:00" (+01:00) → Date */
function toDate(date: string, time: string): Date {
  return new Date(`${date}T${time}:00${event.utcOffset}`);
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Date → 20270417T090000Z (UTC) */
function toIcsUtc(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

function span() {
  const first = schedule[0];
  const last = schedule[schedule.length - 1];
  return { start: toDate(event.date, first.start), end: toDate(event.date, last.end) };
}

const escapeIcs = (s: string) =>
  s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

export function googleCalendarUrl(): string {
  const { start, end } = span();
  const first = schedule[0];
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.calendarTitle,
    dates: `${toIcsUtc(start)}/${toIcsUtc(end)}`,
    details: event.calendarDescription,
    location: `${first.venue}, ${first.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcs(): string {
  const { start, end } = span();
  const first = schedule[0];
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Diamond & Gold 2027//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:dg2027-${event.date}@diamond-and-gold`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${escapeIcs(event.calendarTitle)}`,
    `DESCRIPTION:${escapeIcs(event.calendarDescription)}`,
    `LOCATION:${escapeIcs(`${first.venue}, ${first.address}`)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Diamond & Gold 2027 is tomorrow!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs(filename = "diamond-and-gold-2027.ics") {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** "13:30" → "1:30 PM" */
export function formatClock(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${pad(m)} ${suffix}`;
}
