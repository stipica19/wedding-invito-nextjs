import type { InvitationTemplateProps, FieldDef } from "./types";

export const schema: FieldDef[] = [
  { key: "couple",       label: "Imena para",              type: "text",    required: true,  placeholder: "Maria & Michael" },
  { key: "month",        label: "Mjesec",                  type: "text",    placeholder: "AUGUST" },
  { key: "dayOfWeek",    label: "Dan u tjednu",             type: "text",    placeholder: "SUNDAY" },
  { key: "dayNumber",    label: "Dan (broj)",               type: "text",    placeholder: "19" },
  { key: "timeOfDay",    label: "Vrijeme",                  type: "text",    placeholder: "AT 2 PM" },
  { key: "year",         label: "Godina",                   type: "text",    placeholder: "2023" },
  { key: "address",      label: "Adresa",                   type: "text",    placeholder: "123 Anywhere St., Any City" },
  { key: "rsvpDeadline", label: "Rok za RSVP",              type: "text",    placeholder: "01. 08. 2023." },
  { key: "guestCount",   label: "Očekivani broj gostiju",   type: "counter", min: 10, max: 500, step: 10, defaultValue: 80, unit: "gostiju" },
  { key: "note",         label: "Poruka gostima",           type: "textarea", placeholder: "Veselimo se Vašem dolasku!", rows: 2 },
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
  return { name1: s || "Maria", name2: "Michael" };
}

function parseDateFromString(dateStr: string): { month: string; dayOfWeek: string; dayNumber: string; timeOfDay: string; year: string } | null {
  // Try to parse "19. kolovoza 2023." style dates
  const months: Record<string, string> = {
    "siječnja": "JANUARY", "veljače": "FEBRUARY", "ožujka": "MARCH",
    "travnja": "APRIL", "svibnja": "MAY", "lipnja": "JUNE",
    "srpnja": "JULY", "kolovoza": "AUGUST", "rujna": "SEPTEMBER",
    "listopada": "OCTOBER", "studenog": "NOVEMBER", "prosinca": "DECEMBER",
  };
  for (const [hr, en] of Object.entries(months)) {
    if (dateStr.toLowerCase().includes(hr)) {
      const dayMatch = dateStr.match(/(\d+)\./);
      const yearMatch = dateStr.match(/(\d{4})/);
      return {
        month: en,
        dayOfWeek: "",
        dayNumber: dayMatch ? dayMatch[1] : "",
        timeOfDay: "",
        year: yearMatch ? yearMatch[1] : "",
      };
    }
  }
  return null;
}

export default function ClassicFloralTemplate({
  data,
  title = "Maria & Michael",
  date = "19. kolovoza 2023.",
  mode = "full",
}: InvitationTemplateProps) {
  const couple      = readString(data, "couple")    ?? readString(data, "title") ?? title;
  const names       = splitNames(couple);

  // Date fields — can come from individual keys or be parsed from a combined date string
  const fallback    = parseDateFromString(readString(data, "date") ?? date);
  const month       = readString(data, "month")      ?? fallback?.month      ?? "AUGUST";
  const dayOfWeek   = readString(data, "dayOfWeek")  ?? fallback?.dayOfWeek  ?? "SUNDAY";
  const dayNumber   = readString(data, "dayNumber")  ?? fallback?.dayNumber  ?? "19";
  const timeOfDay   = readString(data, "timeOfDay")  ?? fallback?.timeOfDay  ?? "AT 2 PM";
  const year        = readString(data, "year")       ?? fallback?.year       ?? "2023";
  const address     = readString(data, "address")    ?? readString(data, "venue") ?? "123 Anywhere St., Any City";
  const rsvpDeadline = readString(data, "rsvpDeadline") ?? "";
  const displayNote  = readString(data, "note") ?? "";

  const isCard = mode === "card";

  const nameSz     = isCard ? "2.4rem"  : "clamp(2.8rem, 9vw, 3.6rem)";
  const ampSz      = isCard ? "2rem"    : "clamp(2.2rem, 7vw, 3rem)";
  const labelSz    = isCard ? "0.55rem" : "0.65rem";
  const dateSz     = isCard ? "1.1rem"  : "1.5rem";
  const addrSz     = isCard ? "0.6rem"  : "0.7rem";
  const hPad       = isCard ? "1.6rem"  : "2.4rem";
  const vPad       = isCard ? "1.4rem"  : "2rem";
  const flowerSize = isCard ? 110       : 160;

  return (
    <div
      style={{
        background: "#f0ece6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isCard ? "0.5rem" : "1.5rem",
      }}
    >
      <div
        style={{
          background: "#faf8f5",
          width: "100%",
          maxWidth: 420,
          position: "relative",
          overflow: "hidden",
          boxShadow: isCard
            ? "0 4px 24px rgba(0,0,0,0.10)"
            : "0 20px 70px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        {/* ── TOP-RIGHT flower ── */}
        <img
          src="/flowers.png"
          alt=""
          style={{
            position: "absolute",
            top: isCard ? -20 : -30,
            right: isCard ? -30 : -45,
            width: flowerSize * 1.4,
            opacity: 0.92,
            pointerEvents: "none",
            transform: "rotate(0deg)",
            zIndex: 1,
          }}
        />

        {/* ── BOTTOM-LEFT flower ── */}
        <img
          src="/flowers.png"
          alt=""
          style={{
            position: "absolute",
            bottom: isCard ? -20 : -30,
            left: isCard ? -30 : -45,
            width: flowerSize * 1.4,
            opacity: 0.92,
            pointerEvents: "none",
            transform: "rotate(180deg)",
            zIndex: 1,
          }}
        />

        {/* ── CONTENT ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: `${vPad} ${hPad}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isCard ? "0.55rem" : "0.85rem",
          }}
        >
          {/* The Wedding of */}
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: labelSz,
              letterSpacing: "0.18em",
              color: "#2c2c2c",
              fontWeight: 600,
              textTransform: "uppercase",
              marginTop: isCard ? "0.3rem" : "0.5rem",
            }}
          >
            The Wedding of
          </p>

          {/* Names */}
          <div style={{ lineHeight: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: nameSz,
                color: "#1a1a1a",
                lineHeight: 1.1,
              }}
            >
              {names.name1}
            </div>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: ampSz,
                color: "#1a1a1a",
                lineHeight: 1.1,
              }}
            >
              &amp;
            </div>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: nameSz,
                color: "#1a1a1a",
                lineHeight: 1.1,
              }}
            >
              {names.name2}
            </div>
          </div>

          {/* Thin rule */}
          <div
            style={{
              width: isCard ? 100 : 130,
              height: "0.5px",
              background: "#aaa",
              margin: isCard ? "0.1rem 0" : "0.2rem 0",
            }}
          />

          {/* Date block */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: isCard ? "0.2rem" : "0.3rem" }}>
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: labelSz,
                letterSpacing: "0.28em",
                color: "#2c2c2c",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              {month}
            </p>

            {/* SUNDAY | 19 | AT 2 PM */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: isCard ? "0.5rem" : "0.7rem",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              {dayOfWeek && (
                <>
                  <span
                    style={{
                      fontSize: labelSz,
                      letterSpacing: "0.2em",
                      color: "#2c2c2c",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {dayOfWeek}
                  </span>
                  <span style={{ color: "#999", fontSize: dateSz, fontWeight: 300 }}>|</span>
                </>
              )}
              <span
                style={{
                  fontSize: dateSz,
                  color: "#1a1a1a",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {dayNumber}
              </span>
              {timeOfDay && (
                <>
                  <span style={{ color: "#999", fontSize: dateSz, fontWeight: 300 }}>|</span>
                  <span
                    style={{
                      fontSize: labelSz,
                      letterSpacing: "0.2em",
                      color: "#2c2c2c",
                      fontWeight: 600,
                      textTransform: "uppercase",
                    }}
                  >
                    {timeOfDay}
                  </span>
                </>
              )}
            </div>

            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: labelSz,
                letterSpacing: "0.28em",
                color: "#2c2c2c",
                fontWeight: 600,
              }}
            >
              {year}
            </p>
          </div>

          {/* Thin rule */}
          <div
            style={{
              width: isCard ? 100 : 130,
              height: "0.5px",
              background: "#aaa",
              margin: isCard ? "0.1rem 0" : "0.2rem 0",
            }}
          />

          {/* Address */}
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: addrSz,
              letterSpacing: "0.22em",
              color: "#2c2c2c",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: isCard ? "0.3rem" : "0.5rem",
            }}
          >
            {address}
          </p>

          {/* Note */}
          {displayNote && (
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: isCard ? "0.65rem" : "0.75rem",
                fontStyle: "italic",
                color: "#666",
                fontWeight: 400,
              }}
            >
              {displayNote}
            </p>
          )}

          {/* RSVP */}
          {rsvpDeadline && (
            <p
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: isCard ? "0.58rem" : "0.68rem",
                letterSpacing: "0.12em",
                color: "#888",
                fontWeight: 400,
                textTransform: "uppercase",
                marginBottom: isCard ? "0.3rem" : "0.5rem",
              }}
            >
              RSVP do {rsvpDeadline}
            </p>
          )}
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');`}</style>
    </div>
  );
}
