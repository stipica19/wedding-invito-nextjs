"use client";

import type { InvitationTemplateProps, FieldDef } from "./types";

export const schema: FieldDef[] = [
  { key: "name1",      label: "Ime i prezime 1",          type: "text",    required: true, placeholder: "Daniel Olivia" },
  { key: "name2",      label: "Ime i prezime 2",          type: "text",    required: true, placeholder: "Marceline Wilson" },
  { key: "inviteTitle",label: "Naslov pozivnice",         type: "text",    placeholder: "You Are Invited To" },
  { key: "inviteSub",  label: "Podnaslov",                type: "text",    placeholder: "The Wedding Of" },
  { key: "month",      label: "Mjesec",                   type: "text",    placeholder: "DECEMBER" },
  { key: "dayOfWeek",  label: "Dan u tjednu",              type: "text",    placeholder: "SATURDAY" },
  { key: "dayNumber",  label: "Dan (broj)",                type: "text",    placeholder: "14" },
  { key: "time",       label: "Vrijeme",                   type: "text",    placeholder: "AT 07:00 PM" },
  { key: "year",       label: "Godina",                    type: "text",    placeholder: "2030" },
  { key: "address",    label: "Adresa",                    type: "text",    placeholder: "123 Anywhere St., Any City, ST 12345" },
  { key: "reception",  label: "Reception tekst",           type: "text",    placeholder: "Reception to follow" },
  { key: "guestCount", label: "Očekivani broj gostiju",   type: "counter", min: 10, max: 500, step: 10, defaultValue: 80, unit: "gostiju" },
];

function readString(data: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = data?.[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function parseFallback(dateStr: string): { month: string; dayNumber: string; year: string } {
  const monthMap: Record<string, string> = {
    "siječnja":"JANUARY","veljače":"FEBRUARY","ožujka":"MARCH",
    "travnja":"APRIL","svibnja":"MAY","lipnja":"JUNE",
    "srpnja":"JULY","kolovoza":"AUGUST","rujna":"SEPTEMBER",
    "listopada":"OCTOBER","studenog":"NOVEMBER","prosinca":"DECEMBER",
  };
  let month = "DECEMBER";
  for (const [hr, en] of Object.entries(monthMap)) {
    if (dateStr.toLowerCase().includes(hr)) { month = en; break; }
  }
  const dayMatch  = dateStr.match(/(\d+)\./);
  const yearMatch = dateStr.match(/(\d{4})/);
  return { month, dayNumber: dayMatch?.[1] ?? "14", year: yearMatch?.[1] ?? "2030" };
}

/** SVG tiled diamond-floral pattern background */
function PatternBg({ isCard }: { isCard: boolean }) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity: isCard ? 0.14 : 0.18 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dpat" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M22 4 L40 22 L22 40 L4 22 Z" fill="none" stroke="#a89070" strokeWidth="0.6" />
          <path d="M22 10 Q26 16 22 22 Q18 16 22 10Z" fill="none" stroke="#a89070" strokeWidth="0.5" />
          <path d="M22 34 Q26 28 22 22 Q18 28 22 34Z" fill="none" stroke="#a89070" strokeWidth="0.5" />
          <path d="M10 22 Q16 18 22 22 Q16 26 10 22Z" fill="none" stroke="#a89070" strokeWidth="0.5" />
          <path d="M34 22 Q28 18 22 22 Q28 26 34 22Z" fill="none" stroke="#a89070" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dpat)" />
    </svg>
  );
}

export default function WhiteFloralTemplate({
  data,
  title = "Daniel Olivia & Marceline Wilson",
  date  = "14. prosinca 2030.",
  mode  = "full",
}: InvitationTemplateProps) {
  const fb = parseFallback(readString(data, "date") ?? date);

  const name1       = readString(data, "name1")       ?? (title.split("&")[0]?.trim() ?? "Daniel Olivia");
  const name2       = readString(data, "name2")       ?? (title.split("&")[1]?.trim() ?? "Marceline Wilson");
  const inviteTitle = readString(data, "inviteTitle") ?? "You Are Invited To";
  const inviteSub   = readString(data, "inviteSub")   ?? "The Wedding Of";
  const month       = readString(data, "month")       ?? fb.month;
  const dayOfWeek   = readString(data, "dayOfWeek")   ?? "SATURDAY";
  const dayNumber   = readString(data, "dayNumber")   ?? fb.dayNumber;
  const displayTime = readString(data, "time")        ?? "AT 07:00 PM";
  const year        = readString(data, "year")        ?? fb.year;
  const address     = readString(data, "address")     ?? readString(data, "venue") ?? "123 Anywhere St., Any City, ST 12345";
  const reception   = readString(data, "reception")   ?? "Reception to follow";

  const isCard = mode === "card";

  const nameSz   = isCard ? "2.1rem"  : "clamp(2.6rem, 9vw, 3.6rem)";
  const labelSz  = isCard ? "0.5rem"  : "0.72rem";
  const daySz    = isCard ? "1.5rem"  : "clamp(2rem, 8vw, 2.8rem)";
  const recSz    = isCard ? "1.1rem"  : "clamp(1.3rem, 5vw, 1.7rem)";
  const hPad     = isCard ? "1.4rem"  : "2.2rem";
  const vPad     = isCard ? "1.6rem"  : "3rem";
  const flowerW  = isCard ? 150       : 220;

  const leafBase: React.CSSProperties = { position: "absolute", pointerEvents: "none", zIndex: 2 };

  return (
    <div
      style={{
        background:     "#d8d3cb",
        display:        "flex",
        justifyContent: "center",
        alignItems:     "center",
        padding:        isCard ? "0.5rem" : "1.5rem",
      }}
    >
      <div
        style={{
          background: "#ede8df",
          width:      "100%",
          maxWidth:   440,
          position:   "relative",
          overflow:   "hidden",
          boxShadow:  isCard
            ? "0 4px 24px rgba(0,0,0,0.10)"
            : "0 24px 80px rgba(0,0,0,0.14), 0 4px 18px rgba(0,0,0,0.07)",
        }}
      >
        <PatternBg isCard={isCard} />

        {/* Flower: top-right */}
        <img
          src="/dekor_white_flower.png"
          alt=""
          style={{ ...leafBase, top: isCard ? -25 : -40, right: isCard ? -35 : -50, width: flowerW, transform: "rotate(-15deg)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />

        {/* Flower: bottom-left */}
        <img
          src="/dekor_white_flower.png"
          alt=""
          style={{ ...leafBase, bottom: isCard ? -30 : -50, left: isCard ? -35 : -50, width: flowerW, transform: "rotate(165deg)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />

        {/* ── CONTENT ── */}
        <div
          style={{
            position:      "relative",
            zIndex:        3,
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            textAlign:     "center",
            padding:       `${vPad} ${hPad} calc(${vPad} * 0.8)`,
            gap:           "0",
            fontFamily:    "'Cormorant Garamond', Georgia, serif",
          }}
        >
          {/* Invite title */}
          <div style={{ fontSize: isCard ? "0.65rem" : "0.88rem", color: "#2d3d2d", fontWeight: 400, lineHeight: 1.7, marginBottom: isCard ? "0.4rem" : "0.6rem" }}>
            <div>{inviteTitle}</div>
            <div>{inviteSub}</div>
          </div>

          {/* Name 1 */}
          <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: nameSz, color: "#1a2a1a", lineHeight: 1.05, marginBottom: "0.1rem" }}>
            {name1}
          </div>

          {/* & */}
          <div style={{ fontSize: isCard ? "1.1rem" : "1.6rem", color: "#2d3d2d", fontWeight: 300, lineHeight: 1, margin: isCard ? "0.2rem 0" : "0.3rem 0" }}>
            &amp;
          </div>

          {/* Name 2 */}
          <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: nameSz, color: "#1a2a1a", lineHeight: 1.05, marginBottom: isCard ? "1rem" : "1.5rem" }}>
            {name2}
          </div>

          {/* Month */}
          <div style={{ fontSize: labelSz, letterSpacing: "0.38em", color: "#2d3d2d", fontWeight: 600, textTransform: "uppercase", marginBottom: isCard ? "0.4rem" : "0.6rem" }}>
            {month}
          </div>

          {/* Date row */}
          <div style={{ display: "flex", alignItems: "center", width: "100%", maxWidth: 340, marginBottom: isCard ? "0.4rem" : "0.6rem" }}>
            <div style={{ flex: 1, textAlign: "center", fontSize: isCard ? "0.48rem" : labelSz, letterSpacing: "0.2em", color: "#2d3d2d", fontWeight: 600, textTransform: "uppercase" }}>
              {dayOfWeek}
            </div>
            <div style={{ width: "1px", height: isCard ? 36 : 50, background: "#3a5a3a", margin: isCard ? "0 0.5rem" : "0 0.7rem", flexShrink: 0 }} />
            <div style={{ fontSize: daySz, color: "#1a2a1a", fontWeight: 400, lineHeight: 1, flexShrink: 0, minWidth: "2ch", textAlign: "center" }}>
              {dayNumber}
            </div>
            <div style={{ width: "1px", height: isCard ? 36 : 50, background: "#3a5a3a", margin: isCard ? "0 0.5rem" : "0 0.7rem", flexShrink: 0 }} />
            <div style={{ flex: 1, textAlign: "center", fontSize: isCard ? "0.48rem" : labelSz, letterSpacing: "0.2em", color: "#2d3d2d", fontWeight: 600, textTransform: "uppercase" }}>
              {displayTime}
            </div>
          </div>

          {/* Year */}
          <div style={{ fontSize: labelSz, letterSpacing: "0.5em", color: "#2d3d2d", fontWeight: 600, marginBottom: isCard ? "0.9rem" : "1.3rem" }}>
            {year}
          </div>

          {/* Address */}
          <div style={{ fontSize: isCard ? "0.6rem" : "0.82rem", color: "#2d3d2d", fontWeight: 400, lineHeight: 1.75, marginBottom: isCard ? "0.9rem" : "1.3rem" }}>
            {address.split(",").reduce<string[]>((acc, part, i, arr) => {
              if (i === 0) return [part.trim()];
              if (i === 1) return [acc[0] + ",", arr.slice(1).join(",").trim()];
              return acc;
            }, []).map((line, i) => <div key={i}>{line}</div>)}
          </div>

          {/* Reception */}
          <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: recSz, color: "#1a2a1a", lineHeight: 1.2 }}>
            {reception}
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');`}</style>
    </div>
  );
}
