import type { InvitationTemplateProps, FieldDef } from "./types";

export const schema: FieldDef[] = [
  { key: "couple",       label: "Imena para",              type: "text",    required: true,  placeholder: "Sophia & William" },
  { key: "tagline",      label: "Uvodni tekst",             type: "text",    placeholder: "Together with their families" },
  { key: "date",         label: "Datum vjenčanja",          type: "text",    placeholder: "Saturday, June 14th, 2026" },
  { key: "time",         label: "Vrijeme ceremonije",       type: "text",    placeholder: "17:00" },
  { key: "venue",        label: "Naziv lokacije",           type: "text",    placeholder: "Villa Rosmarino, Dubrovnik" },
  { key: "address",      label: "Adresa",                   type: "text",    placeholder: "Lapadska obala 35, Dubrovnik" },
  { key: "reception",    label: "Prijem / večera",          type: "text",    placeholder: "Dinner & dancing to follow" },
  { key: "rsvpDeadline", label: "Rok za RSVP",              type: "text",    placeholder: "01. lipnja 2026." },
  { key: "guestCount",   label: "Očekivani broj gostiju",   type: "counter", min: 10, max: 500, step: 10, defaultValue: 80, unit: "gostiju" },
  { key: "note",         label: "Napomena za goste",        type: "textarea", placeholder: "Semi-formal attire requested.", rows: 2 },
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
  return { name1: s || "Sophia", name2: "William" };
}

function GoldDivider({ wide = false }: { wide?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
      <div style={{ height: "0.5px", background: "linear-gradient(90deg,transparent,#c9a050)", width: wide ? 60 : 36 }} />
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8Z" fill="#c9a050" opacity="0.8" />
      </svg>
      <div style={{ height: "0.5px", background: "linear-gradient(90deg,#c9a050,transparent)", width: wide ? 60 : 36 }} />
    </div>
  );
}

export default function WatercolorTemplate({
  data,
  title = "Sophia & William",
  date = "Saturday, June 14th, 2026",
  mode = "full",
}: InvitationTemplateProps) {
  const couple       = readString(data, "couple")       ?? readString(data, "title") ?? title;
  const names        = splitNames(couple);
  const tagline      = readString(data, "tagline")      ?? "Together with their families";
  const displayDate  = readString(data, "date")         ?? date;
  const displayTime  = readString(data, "time")         ?? "17:00";
  const displayVenue = readString(data, "venue")        ?? readString(data, "location") ?? "Villa Rosmarino, Dubrovnik";
  const displayAddr  = readString(data, "address")      ?? "";
  const displayRecep = readString(data, "reception")    ?? "Dinner & dancing to follow";
  const rsvpDeadline = readString(data, "rsvpDeadline") ?? "";
  const displayNote  = readString(data, "note")         ?? "";

  const isCard = mode === "card";

  const nameSz  = isCard ? "2rem"   : "clamp(2.4rem, 8vw, 3.2rem)";
  const smSz    = isCard ? "0.58rem" : "0.66rem";
  const mdSz    = isCard ? "0.72rem" : "0.82rem";
  const lgSz    = isCard ? "0.8rem"  : "0.9rem";

  return (
    <div
      style={{
        background: "#f0ebe3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isCard ? "0.5rem" : "1.5rem",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* Card — image sets natural height */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          boxShadow: isCard
            ? "0 8px 32px rgba(0,0,0,0.12)"
            : "0 28px 90px rgba(60,30,20,0.16), 0 4px 18px rgba(60,30,20,0.08)",
          background: "#ffffff",
        }}
      >
        {/* ── Watercolor background image ── */}
        <img
          src="/dekor_03.png"
          alt=""
          style={{
            display: "block",
            width: "100%",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        {/* ── Content overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            // Push content out of flower corners:
            // dekor_03 has flowers top-left + small bottom-right
            padding: isCard
              ? "38% 12% 12% 12%"
              : "40% 14% 10% 14%",
            gap: isCard ? "0.5rem" : "0.75rem",
          }}
        >
          {/* Tagline */}
          <p
            style={{
              fontSize: smSz,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#7a5a48",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </p>

          {/* Names */}
          <div style={{ lineHeight: 1, marginTop: isCard ? "0.1rem" : "0.2rem" }}>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: nameSz,
                color: "#2a1a14",
                lineHeight: 1.05,
              }}
            >
              {names.name1}
            </div>
            <div
              style={{
                fontSize: smSz,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#c9a050",
                margin: isCard ? "0.2rem 0" : "0.35rem 0",
                fontWeight: 400,
              }}
            >
              and
            </div>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: nameSz,
                color: "#2a1a14",
                lineHeight: 1.05,
              }}
            >
              {names.name2}
            </div>
          </div>

          {/* Divider */}
          <GoldDivider wide />

          {/* Request line */}
          <p
            style={{
              fontSize: smSz,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#7a5a48",
              lineHeight: 1.65,
              fontWeight: 400,
            }}
          >
            request the pleasure of your company
            <br />
            at the celebration of their marriage
          </p>

          {/* Divider */}
          <GoldDivider />

          {/* Date */}
          <div>
            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: isCard ? "1.15rem" : "1.5rem",
                color: "#2a1a14",
                lineHeight: 1.1,
                marginBottom: isCard ? "0.1rem" : "0.15rem",
              }}
            >
              {displayDate}
            </p>
            <p
              style={{
                fontSize: smSz,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#c9a050",
                fontWeight: 500,
              }}
            >
              {displayTime}
            </p>
          </div>

          {/* Venue */}
          <div>
            <p
              style={{
                fontSize: lgSz,
                fontStyle: "italic",
                color: "#2a1a14",
                fontWeight: 400,
                letterSpacing: "0.04em",
                lineHeight: 1.35,
              }}
            >
              {displayVenue}
            </p>
            {displayAddr && (
              <p
                style={{
                  fontSize: mdSz,
                  color: "#7a5a48",
                  fontWeight: 300,
                  marginTop: "0.12rem",
                  letterSpacing: "0.03em",
                }}
              >
                {displayAddr}
              </p>
            )}
          </div>

          {/* Divider */}
          <GoldDivider />

          {/* Reception */}
          <p
            style={{
              fontSize: smSz,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7a5a48",
              fontWeight: 400,
            }}
          >
            {displayRecep}
          </p>

          {/* Note */}
          {displayNote && (
            <p
              style={{
                fontSize: mdSz,
                color: "#9a7a68",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              {displayNote}
            </p>
          )}

          {/* RSVP */}
          {rsvpDeadline && (
            <>
              <GoldDivider />
              <div>
                <p
                  style={{
                    fontSize: smSz,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#c9a050",
                    fontWeight: 500,
                    marginBottom: "0.15rem",
                  }}
                >
                  R.S.V.P.
                </p>
                <p style={{ fontSize: mdSz, color: "#7a5a48", fontWeight: 300 }}>
                  Kindly reply by {rsvpDeadline}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');`}</style>
    </div>
  );
}
