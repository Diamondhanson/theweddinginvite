import { ImageResponse } from "next/og";
import { weddingConfig as c } from "@/data/wedding-config";

// Link-preview card shown when the invitation is shared (WhatsApp, iMessage, Facebook…)
export const alt = "Diamond & Gold 2027 — you are invited to the wedding of Diamond & Golda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#d9b677";
const GOLD_LIGHT = "#f1dfb4";
const BURNT = "#b04d24";
const NIGHT = "#24150f";
const ESPRESSO = "#3c2821";

async function loadFont(weight: number): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(
      `https://cdn.jsdelivr.net/fontsource/fonts/cormorant-garamond@latest/latin-${weight}-normal.woff`,
    );
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** Toghu-style triangle band */
function Band({ y }: { y: number }) {
  const tri = Array.from({ length: 38 });
  return (
    <svg width="1200" height="22" viewBox="0 0 1200 22" style={{ position: "absolute", left: 0, top: y }}>
      <rect width="1200" height="22" fill={ESPRESSO} />
      {tri.map((_, i) => (
        <path
          key={i}
          d={i % 2 === 0 ? `M${i * 32} 22 L${i * 32 + 16} 2 L${i * 32 + 32} 22Z` : `M${i * 32} 0 L${i * 32 + 16} 20 L${i * 32 + 32} 0Z`}
          fill={i % 2 === 0 ? GOLD : BURNT}
        />
      ))}
    </svg>
  );
}

export default async function Image() {
  const [semi, med] = await Promise.all([loadFont(600), loadFont(500)]);
  const fonts = [
    semi && { name: "Cormorant", data: semi, weight: 600 as const, style: "normal" as const },
    med && { name: "Cormorant", data: med, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 500 | 600; style: "normal" }[];
  const family = fonts.length ? "Cormorant" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: NIGHT,
          fontFamily: family,
        }}
      >
        {/* the two doors */}
        <div style={{ display: "flex", width: 600, height: 630, background: "#2a1912", borderRight: `2px solid ${GOLD}` }} />
        <div style={{ display: "flex", width: 600, height: 630, background: "#2a1912", borderLeft: `2px solid ${GOLD}` }} />
        {/* inner door panels */}
        <div style={{ display: "flex", position: "absolute", left: 46, top: 58, width: 508, height: 514, border: `1px solid rgba(217,182,119,0.35)` }} />
        <div style={{ display: "flex", position: "absolute", left: 646, top: 58, width: 508, height: 514, border: `1px solid rgba(217,182,119,0.35)` }} />

        <Band y={0} />
        <Band y={608} />

        {/* centre */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", color: GOLD, fontSize: 24, letterSpacing: 10, fontWeight: 600 }}>
            YOU ARE INVITED
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: 6, background: NIGHT, padding: "0 46px", borderRadius: 24 }}>
            <div style={{ display: "flex", color: GOLD, fontSize: 230, fontWeight: 500, lineHeight: 1 }}>D</div>
            <div style={{ display: "flex", color: GOLD_LIGHT, fontSize: 90, fontStyle: "italic", margin: "0 18px" }}>&amp;</div>
            <div style={{ display: "flex", color: GOLD, fontSize: 230, fontWeight: 500, lineHeight: 1 }}>G</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: 6 }}>
            <div style={{ display: "flex", width: 150, height: 2, background: GOLD }} />
            <div style={{ display: "flex", width: 16, height: 16, background: GOLD, transform: "rotate(45deg)", margin: "0 20px" }} />
            <div style={{ display: "flex", width: 150, height: 2, background: GOLD }} />
          </div>

          <div style={{ display: "flex", color: "#f8f0e4", fontSize: 50, letterSpacing: 9, marginTop: 22, fontWeight: 600 }}>
            DIAMOND &amp; GOLD 2027
          </div>
          <div style={{ display: "flex", color: GOLD_LIGHT, fontSize: 28, letterSpacing: 5, marginTop: 14, fontWeight: 500 }}>
            {`${c.event.dateDisplay.replace("Saturday, ", "")} · ${c.event.city}, ${c.event.country}`.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
