import type { InvitationTemplateProps, FieldDef } from "./types";

export const schema: FieldDef[] = [
  { key: "couple",       label: "Imena para",              type: "text",    required: true,  placeholder: "Isabella & Alexander" },
  { key: "date",         label: "Datum vjenčanja",          type: "text",    placeholder: "Saturday, the Fourteenth of June" },
  { key: "year",         label: "Godina",                   type: "text",    placeholder: "Two Thousand and Twenty-Six" },
  { key: "time",         label: "Vrijeme",                  type: "text",    placeholder: "17:00" },
  { key: "venue",        label: "Naziv lokacije",           type: "text",    placeholder: "Grand Hotel Excelsior" },
  { key: "address",      label: "Adresa",                   type: "text",    placeholder: "Obala Kneza Domagoja 1, Split" },
  { key: "reception",    label: "Večera / prijem",          type: "text",    placeholder: "Reception to follow at the venue" },
  { key: "rsvpDeadline", label: "Rok za RSVP",              type: "text",    placeholder: "01. lipnja 2026." },
  { key: "rsvpContact",  label: "RSVP kontakt",             type: "text",    placeholder: "+385 91 234 5678" },
  { key: "guestCount",   label: "Očekivani broj gostiju",   type: "counter", min: 10, max: 600, step: 10, defaultValue: 120, unit: "gostiju" },
  { key: "note",         label: "Napomena za goste",        type: "textarea", placeholder: "Black tie preferred.", rows: 2 },
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
  return { name1: s || "Isabella", name2: "Alexander" };
}

/** Thin gold line with optional center ornament */
function Divider({ ornament = false, gold }: { ornament?: boolean; gold: string }) {
  if (!ornament) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 auto", width: "100%" }}>
        <div style={{ flex: 1, height: "0.5px", background: gold }} />
      </div>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 auto", width: "100%" }}>
      <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, transparent, ${gold})` }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 0 L8.5 5.5 L14 7 L8.5 8.5 L7 14 L5.5 8.5 L0 7 L5.5 5.5 Z" fill={gold} opacity="0.9" />
      </svg>
      <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, ${gold}, transparent)` }} />
    </div>
  );
}

export default function LuxeTemplate({
  data,
  title = "Isabella & Alexander",
  date = "Saturday, the Fourteenth of June",
  mode = "full",
}: InvitationTemplateProps) {
  const couple       = readString(data, "couple")       ?? readString(data, "title") ?? title;
  const names        = splitNames(couple);
  const displayDate  = readString(data, "date")         ?? date;
  const displayYear  = readString(data, "year")         ?? "Two Thousand and Twenty-Six";
  const displayTime  = readString(data, "time")         ?? "17:00";
  const displayVenue = readString(data, "venue")        ?? readString(data, "location") ?? "Grand Hotel Excelsior";
  const displayAddr  = readString(data, "address")      ?? "";
  const displayRecep = readString(data, "reception")    ?? "Reception to follow at the venue";
  const rsvpDeadline = readString(data, "rsvpDeadline") ?? "";
  const rsvpContact  = readString(data, "rsvpContact")  ?? "";
  const displayNote  = readString(data, "note")         ?? "";

  const isCard = mode === "card";

  // Palette
  const gold   = "#c9a84c";
  const gold2  = "#d4af37";
  const black  = "#0f0f0f";
  const dark   = "#1c1c1c";
  const mid    = "#4a4a4a";

  const pad    = isCard ? "1.8rem 1.6rem" : "3rem 2.8rem";
  const nameSz = isCard ? "2.2rem" : "clamp(2.6rem, 8vw, 3.6rem)";
  const smSz   = isCard ? "0.6rem" : "0.68rem";
  const mdSz   = isCard ? "0.75rem" : "0.84rem";
  const lgSz   = isCard ? "0.82rem" : "0.92rem";
  const gap    = isCard ? "0.9rem" : "1.3rem";

  return (
    <div
      style={{
        background: "#f5f0e8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isCard ? "0.5rem" : "1.5rem",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* Outer card */}
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: 440,
          position: "relative",
          boxShadow: isCard
            ? "0 8px 32px rgba(0,0,0,0.10)"
            : "0 24px 80px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)",
        }}
      >
        {/* Double gold border */}
        <div
          style={{
            position: "absolute",
            inset: isCard ? 6 : 10,
            border: `0.5px solid ${gold}`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: isCard ? 10 : 16,
            border: `0.5px solid ${gold}`,
            opacity: 0.45,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: pad,
            display: "flex",
            flexDirection: "column",
            gap: gap,
          }}
        >

          {/* ── Top ornament ── */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <svg width={isCard ? 40 : 52} height={isCard ? 20 : 26} viewBox="0 0 52 26" fill="none">
              <path d="M26 2 L30 10 L26 18 L22 10 Z" stroke={gold} strokeWidth="0.6" fill="none" />
              <path d="M26 0 L26 26" stroke={gold} strokeWidth="0.4" opacity="0.4" />
              <path d="M0 13 L20 13" stroke={gold} strokeWidth="0.4" opacity="0.4" />
              <path d="M32 13 L52 13" stroke={gold} strokeWidth="0.4" opacity="0.4" />
              <circle cx="26" cy="13" r="1.8" fill={gold} opacity="0.7" />
            </svg>
          </div>

          {/* ── Together with their families ── */}
          <div>
            <Divider gold={gold} />
            <p
              style={{
                fontSize: smSz,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: mid,
                margin: `${isCard ? "0.55rem" : "0.8rem"} 0`,
                fontWeight: 400,
              }}
            >
              Together with their families
            </p>
            <Divider gold={gold} />
          </div>

          {/* ── Names ── */}
          <div style={{ lineHeight: 1 }}>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: nameSz,
                color: black,
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
              }}
            >
              {names.name1}
            </div>
            <div
              style={{
                fontSize: smSz,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: gold2,
                margin: isCard ? "0.3rem 0" : "0.5rem 0",
                fontWeight: 400,
              }}
            >
              and
            </div>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: nameSz,
                color: black,
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
              }}
            >
              {names.name2}
            </div>
          </div>

          {/* ── Request line ── */}
          <div>
            <Divider ornament gold={gold} />
            <p
              style={{
                fontSize: smSz,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: mid,
                margin: `${isCard ? "0.6rem" : "0.85rem"} 0`,
                lineHeight: 1.7,
                fontWeight: 400,
              }}
            >
              request the pleasure of your company
              <br />
              at the celebration of their marriage
            </p>
            <Divider ornament gold={gold} />
          </div>

          {/* ── Date & Year ── */}
          <div>
            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: isCard ? "1.4rem" : "1.85rem",
                color: dark,
                lineHeight: 1.1,
                marginBottom: isCard ? "0.2rem" : "0.3rem",
              }}
            >
              {displayDate}
            </p>
            <p
              style={{
                fontSize: smSz,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: mid,
                fontWeight: 400,
              }}
            >
              {displayYear}
            </p>
          </div>

          {/* ── Divider ── */}
          <Divider ornament gold={gold} />

          {/* ── Time & Venue ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: isCard ? "0.2rem" : "0.3rem" }}>
            <p
              style={{
                fontSize: smSz,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: gold2,
                fontWeight: 500,
              }}
            >
              {displayTime}
            </p>
            <p
              style={{
                fontSize: lgSz,
                color: dark,
                letterSpacing: "0.06em",
                fontWeight: 500,
                fontStyle: "italic",
              }}
            >
              {displayVenue}
            </p>
            {displayAddr && (
              <p
                style={{
                  fontSize: mdSz,
                  color: mid,
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                }}
              >
                {displayAddr}
              </p>
            )}
          </div>

          {/* ── Divider ── */}
          <Divider gold={gold} />

          {/* ── Reception ── */}
          <p
            style={{
              fontSize: smSz,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: mid,
              fontWeight: 400,
            }}
          >
            {displayRecep}
          </p>

          {/* ── Note (dress code etc.) ── */}
          {displayNote && (
            <>
              <Divider gold={gold} />
              <p
                style={{
                  fontSize: mdSz,
                  color: mid,
                  fontStyle: "italic",
                  letterSpacing: "0.03em",
                  fontWeight: 300,
                }}
              >
                {displayNote}
              </p>
            </>
          )}

          {/* ── RSVP ── */}
          {(rsvpDeadline || rsvpContact) && (
            <>
              <Divider ornament gold={gold} />
              <div style={{ display: "flex", flexDirection: "column", gap: isCard ? "0.15rem" : "0.2rem" }}>
                <p
                  style={{
                    fontSize: smSz,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: gold2,
                    fontWeight: 500,
                  }}
                >
                  R.S.V.P.
                </p>
                {rsvpDeadline && (
                  <p style={{ fontSize: mdSz, color: mid, fontWeight: 300 }}>
                    Kindly reply by {rsvpDeadline}
                  </p>
                )}
                {rsvpContact && (
                  <p style={{ fontSize: mdSz, color: dark, fontWeight: 400, letterSpacing: "0.04em" }}>
                    {rsvpContact}
                  </p>
                )}
              </div>
            </>
          )}

          {/* ── Bottom ornament ── */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: isCard ? "0.2rem" : "0.4rem" }}>
            <svg width={isCard ? 32 : 42} height={isCard ? 12 : 16} viewBox="0 0 42 16" fill="none">
              <path d="M0 8 L18 8" stroke={gold} strokeWidth="0.5" opacity="0.5" />
              <path d="M24 8 L42 8" stroke={gold} strokeWidth="0.5" opacity="0.5" />
              <circle cx="21" cy="8" r="2.5" fill={gold} opacity="0.6" />
              <circle cx="14" cy="8" r="1.2" fill={gold} opacity="0.35" />
              <circle cx="28" cy="8" r="1.2" fill={gold} opacity="0.35" />
            </svg>
          </div>

        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');`}</style>
    </div>
  );
}
