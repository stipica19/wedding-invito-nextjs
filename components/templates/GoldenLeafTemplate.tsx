"use client";

import type { InvitationTemplateProps, FieldDef } from "./types";

export const schema: FieldDef[] = [
  { key: "couple",       label: "Imena para",              type: "text",     required: true,  placeholder: "Olivia & Daniel" },
  { key: "subtitle",     label: "Podnaslov",                type: "text",     placeholder: "with full hearts, joyfully invite you to their wedding" },
  { key: "month",        label: "Mjesec",                   type: "text",     placeholder: "AUGUST" },
  { key: "dayOfWeek",    label: "Dan u tjednu",              type: "text",     placeholder: "SATURDAY" },
  { key: "dayNumber",    label: "Dan (broj)",                type: "text",     placeholder: "30" },
  { key: "time",         label: "Vrijeme",                   type: "text",     placeholder: "8:30PM" },
  { key: "year",         label: "Godina",                    type: "text",     placeholder: "2032" },
  { key: "address",      label: "Adresa",                    type: "text",     placeholder: "123 Anywhere St., Any City" },
  { key: "reception",    label: "Reception tekst",           type: "text",     placeholder: "reception to follow" },
  { key: "rsvpDeadline", label: "Rok za RSVP",               type: "text",     placeholder: "01. 08. 2032." },
  { key: "guestCount",   label: "Očekivani broj gostiju",    type: "counter",  min: 10, max: 500, step: 10, defaultValue: 80, unit: "gostiju" },
];

function readString(data: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = data?.[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function splitNames(couple: string): { name1: string; name2: string } {
  const s = couple.replace(/\s+/g, " ").trim();
  for (const sep of [" & ", " i ", " and "]) {
    if (s.toLowerCase().includes(sep.trim().toLowerCase())) {
      const parts = s.split(new RegExp(sep, "i")).map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2) return { name1: parts[0], name2: parts[1] };
    }
  }
  const words = s.split(" ").filter(Boolean);
  if (words.length >= 2) return { name1: words[0], name2: words.slice(1).join(" ") };
  return { name1: s || "Olivia", name2: "Daniel" };
}

function parseFallback(dateStr: string): { month: string; dayNumber: string; year: string } {
  const monthMap: Record<string, string> = {
    "siječnja": "JANUARY", "veljače": "FEBRUARY", "ožujka": "MARCH",
    "travnja": "APRIL", "svibnja": "MAY", "lipnja": "JUNE",
    "srpnja": "JULY", "kolovoza": "AUGUST", "rujna": "SEPTEMBER",
    "listopada": "OCTOBER", "studenog": "NOVEMBER", "prosinca": "DECEMBER",
  };
  let month = "AUGUST";
  for (const [hr, en] of Object.entries(monthMap)) {
    if (dateStr.toLowerCase().includes(hr)) { month = en; break; }
  }
  const dayMatch  = dateStr.match(/(\d+)\./);
  const yearMatch = dateStr.match(/(\d{4})/);
  return {
    month,
    dayNumber: dayMatch  ? dayMatch[1]  : "30",
    year:      yearMatch ? yearMatch[1] : "2032",
  };
}

/** Lightweight SVG leaf — used when /dekor_leaf.png is not available */
function LeafSVG({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <g fill="none" stroke="#d4b483" strokeWidth="1.2" opacity="0.55">
        <path d="M100 180 Q60 120 30 60 Q80 40 130 80 Q160 120 100 180Z" />
        <path d="M100 180 Q100 130 100 60" strokeWidth="0.8" />
        <path d="M100 150 Q80 140 60 120" strokeWidth="0.6" />
        <path d="M100 130 Q80 120 65 100" strokeWidth="0.6" />
        <path d="M100 110 Q85 100 75 82" strokeWidth="0.6" />
        <path d="M100 150 Q120 140 135 125" strokeWidth="0.6" />
        <path d="M100 130 Q118 118 128 100" strokeWidth="0.6" />
        <path d="M100 110 Q115 100 122 84" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

export default function GoldenLeafTemplate({
  data,
  title = "Olivia & Daniel",
  date  = "30. kolovoza 2032.",
  mode  = "full",
}: InvitationTemplateProps) {
  const couple     = readString(data, "couple")     ?? readString(data, "title") ?? title;
  const names      = splitNames(couple);
  const fb         = parseFallback(readString(data, "date") ?? date);

  const subtitle   = readString(data, "subtitle")   ?? "with full hearts, joyfully invite you to their wedding";
  const month      = readString(data, "month")      ?? fb.month;
  const dayOfWeek  = readString(data, "dayOfWeek")  ?? "SATURDAY";
  const dayNumber  = readString(data, "dayNumber")  ?? fb.dayNumber;
  const displayTime = readString(data, "time")      ?? "8:30PM";
  const year       = readString(data, "year")       ?? fb.year;
  const address    = readString(data, "address")    ?? readString(data, "venue") ?? "123 Anywhere St., Any City";
  const reception  = readString(data, "reception")  ?? "reception to follow";

  const isCard = mode === "card";

  const nameSz  = isCard ? "2.2rem"  : "clamp(2.8rem, 9vw, 3.8rem)";
  const ampSz   = isCard ? "1.8rem"  : "clamp(2.2rem, 7vw, 3rem)";
  const labelSz = isCard ? "0.52rem" : "0.68rem";
  const daySz   = isCard ? "1.6rem"  : "clamp(2.2rem, 8vw, 3rem)";
  const recSz   = isCard ? "1.2rem"  : "clamp(1.4rem, 5vw, 1.8rem)";
  const hPad    = isCard ? "1.6rem"  : "2.4rem";
  const vPad    = isCard ? "1.8rem"  : "3rem";
  const leafW   = isCard ? 160       : 220;

  const leafStyle: React.CSSProperties = {
    position:      "absolute",
    pointerEvents: "none",
    zIndex:        1,
  };

  return (
    <div
      style={{
        background: "#ede8e1",
        display:    "flex",
        justifyContent: "center",
        alignItems: "center",
        padding:    isCard ? "0.5rem" : "1.5rem",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      <div
        style={{
          background:  "#ffffff",
          width:       "100%",
          maxWidth:    440,
          position:    "relative",
          overflow:    "hidden",
          boxShadow:   isCard
            ? "0 4px 24px rgba(0,0,0,0.09)"
            : "0 24px 80px rgba(0,0,0,0.13), 0 4px 18px rgba(0,0,0,0.07)",
        }}
      >
        {/* ── Leaf: top-left ── */}
        <img
          src="/dekor_leaf.png"
          alt=""
          style={{ ...leafStyle, top: isCard ? -20 : -30, left: isCard ? -45 : -60, width: leafW, opacity: 0.55, transform: "rotate(130deg) scaleX(-1)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* ── Leaf: top-right ── */}
        <img
          src="/dekor_leaf.png"
          alt=""
          style={{ ...leafStyle, top: isCard ? -15 : -20, right: isCard ? -40 : -55, width: isCard ? 140 : leafW, opacity: 0.55, transform: "rotate(-30deg)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* ── Leaf: bottom-left ── */}
        <img
          src="/dekor_leaf.png"
          alt=""
          style={{ ...leafStyle, bottom: isCard ? -20 : -30, left: isCard ? -35 : -45, width: isCard ? 140 : leafW, opacity: 0.48, transform: "rotate(60deg)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        {/* ── Leaf: bottom-right ── */}
        <img
          src="/dekor_leaf.png"
          alt=""
          style={{ ...leafStyle, bottom: isCard ? -25 : -35, right: isCard ? -45 : -60, width: isCard ? 140 : leafW, opacity: 0.4, transform: "rotate(-60deg) scaleX(-1)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />

        {/* ── CONTENT ── */}
        <div
          style={{
            position:       "relative",
            zIndex:         2,
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            textAlign:      "center",
            padding:        `${vPad} ${hPad} calc(${vPad} * 0.85)`,
            gap:            "0",
          }}
        >
          {/* Name 1 */}
          <div
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize:   nameSz,
              color:      "#b8860b",
              lineHeight: 1.1,
              marginBottom: "0.1rem",
            }}
          >
            {names.name1}
          </div>

          {/* AND */}
          <div
            style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontSize:      labelSz,
              letterSpacing: "0.42em",
              color:         "#2c2c2c",
              fontWeight:    500,
              textTransform: "uppercase",
              margin:        isCard ? "0.4rem 0" : "0.6rem 0",
            }}
          >
            AND
          </div>

          {/* Name 2 */}
          <div
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize:   nameSz,
              color:      "#b8860b",
              lineHeight: 1.1,
              marginBottom: isCard ? "1rem" : "1.4rem",
            }}
          >
            {names.name2}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily:  "'Cormorant Garamond', serif",
              fontStyle:   "italic",
              fontSize:    isCard ? "0.72rem" : "0.92rem",
              color:       "#666",
              fontWeight:  300,
              lineHeight:  1.65,
              marginBottom: isCard ? "1rem" : "1.5rem",
              maxWidth:    300,
            }}
          >
            {subtitle}
          </div>

          {/* Month */}
          <div
            style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontSize:      labelSz,
              letterSpacing: "0.42em",
              color:         "#2c2c2c",
              fontWeight:    500,
              textTransform: "uppercase",
              marginBottom:  isCard ? "0.5rem" : "0.7rem",
            }}
          >
            {month}
          </div>

          {/* Date row */}
          <div
            style={{
              display:       "flex",
              alignItems:    "center",
              width:         "100%",
              maxWidth:      340,
              marginBottom:  isCard ? "0.5rem" : "0.7rem",
            }}
          >
            {/* Day of week */}
            <div style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  fontFamily:    "'Cormorant Garamond', serif",
                  fontSize:      isCard ? "0.5rem" : labelSz,
                  letterSpacing: "0.25em",
                  color:         "#2c2c2c",
                  fontWeight:    500,
                  textTransform: "uppercase",
                  borderBottom:  "0.5px solid #c8b89a",
                  paddingBottom: "0.3rem",
                }}
              >
                {dayOfWeek}
              </div>
            </div>

            {/* Day number */}
            <div
              style={{
                fontFamily:  "'Cormorant Garamond', serif",
                fontSize:    daySz,
                color:       "#2c2c2c",
                fontWeight:  400,
                lineHeight:  1,
                padding:     isCard ? "0 0.7rem" : "0 1rem",
                flexShrink:  0,
              }}
            >
              {dayNumber}
            </div>

            {/* Time */}
            <div style={{ flex: 1, textAlign: "center" }}>
              <div
                style={{
                  fontFamily:    "'Cormorant Garamond', serif",
                  fontSize:      isCard ? "0.5rem" : labelSz,
                  letterSpacing: "0.25em",
                  color:         "#2c2c2c",
                  fontWeight:    500,
                  textTransform: "uppercase",
                  borderBottom:  "0.5px solid #c8b89a",
                  paddingBottom: "0.3rem",
                }}
              >
                {displayTime}
              </div>
            </div>
          </div>

          {/* Year */}
          <div
            style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontSize:      labelSz,
              letterSpacing: "0.55em",
              color:         "#2c2c2c",
              fontWeight:    500,
              marginBottom:  isCard ? "1rem" : "1.4rem",
            }}
          >
            {year}
          </div>

          {/* Address */}
          <div
            style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontSize:      isCard ? "0.5rem" : "0.7rem",
              letterSpacing: "0.25em",
              color:         "#2c2c2c",
              fontWeight:    500,
              textTransform: "uppercase",
              lineHeight:    1.9,
              marginBottom:  isCard ? "0.9rem" : "1.4rem",
            }}
          >
            {address.split(",").map((part, i, arr) => (
              <div key={i}>{part.trim()}{i < arr.length - 1 ? "," : ""}</div>
            ))}
          </div>

          {/* Reception */}
          <div
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize:   recSz,
              color:      "#b8860b",
              lineHeight: 1.2,
            }}
          >
            {reception}
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');`}</style>
    </div>
  );
}
