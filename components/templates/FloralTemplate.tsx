import type { InvitationTemplateProps, FieldDef } from "./types";

export const schema: FieldDef[] = [
  { key: "couple",       label: "Imena para",              type: "text",    required: true,  placeholder: "Emma & Oliver" },
  { key: "intro",        label: "Uvodni tekst",             type: "text",    placeholder: "joyfully invite you to celebrate" },
  { key: "date",         label: "Datum vjenčanja",          type: "text",    placeholder: "14. lipnja 2026." },
  { key: "time",         label: "Vrijeme ceremonije",       type: "text",    placeholder: "17:00" },
  { key: "venue",        label: "Naziv lokacije",           type: "text",    placeholder: "Botanički vrt, Zagreb" },
  { key: "address",      label: "Adresa",                   type: "text",    placeholder: "Ilica 10, Zagreb" },
  { key: "reception",    label: "Prijem / večera",          type: "text",    placeholder: "Dinner & dancing to follow" },
  { key: "rsvpDeadline", label: "Rok za RSVP",              type: "text",    placeholder: "01. lipnja 2026." },
  { key: "guestCount",   label: "Očekivani broj gostiju",   type: "counter", min: 10, max: 500, step: 10, defaultValue: 80, unit: "gostiju" },
  { key: "note",         label: "Napomena za goste",        type: "textarea", placeholder: "Garden attire encouraged.", rows: 2 },
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
  return { name1: s || "Emma", name2: "Oliver" };
}

/** Sprig-like SVG divider in rose/blush tones */
function FloralDivider({ isCard }: { isCard: boolean }) {
  const w = isCard ? 140 : 180;
  return (
    <svg width={w} height={isCard ? 18 : 22} viewBox="0 0 180 22" fill="none">
      {/* Centre dot */}
      <circle cx="90" cy="11" r="2.5" fill="#c9827a" opacity="0.7" />
      {/* Left stem */}
      <path d="M88 11 Q70 8 52 11 Q38 13 20 10" stroke="#c9827a" strokeWidth="0.7" strokeLinecap="round" opacity="0.55" fill="none" />
      {/* Right stem */}
      <path d="M92 11 Q110 8 128 11 Q142 13 160 10" stroke="#c9827a" strokeWidth="0.7" strokeLinecap="round" opacity="0.55" fill="none" />
      {/* Left leaf */}
      <path d="M60 11 C56 6 58 2 62 4 C66 6 64 10 60 11Z" fill="#8aaa78" opacity="0.5" />
      {/* Right leaf */}
      <path d="M120 11 C124 6 122 2 118 4 C114 6 116 10 120 11Z" fill="#8aaa78" opacity="0.5" />
      {/* Left small blossom */}
      <circle cx="34" cy="10" r="3.5" fill="#f0a8b0" opacity="0.45" />
      <circle cx="34" cy="10" r="2" fill="#e88898" opacity="0.5" />
      {/* Right small blossom */}
      <circle cx="146" cy="10" r="3.5" fill="#f0a8b0" opacity="0.45" />
      <circle cx="146" cy="10" r="2" fill="#e88898" opacity="0.5" />
    </svg>
  );
}

export default function FloralTemplate({
  data,
  title = "Emma & Oliver",
  date = "14. lipnja 2026.",
  mode = "full",
}: InvitationTemplateProps) {
  const couple       = readString(data, "couple")       ?? readString(data, "title") ?? title;
  const names        = splitNames(couple);
  const intro        = readString(data, "intro")        ?? "joyfully invite you to celebrate";
  const displayDate  = readString(data, "date")         ?? date;
  const displayTime  = readString(data, "time")         ?? "17:00";
  const displayVenue = readString(data, "venue")        ?? readString(data, "location") ?? "Botanički vrt, Zagreb";
  const displayAddr  = readString(data, "address")      ?? "";
  const displayRecep = readString(data, "reception")    ?? "Dinner & dancing to follow";
  const rsvpDeadline = readString(data, "rsvpDeadline") ?? "";
  const displayNote  = readString(data, "note")         ?? "";

  const isCard = mode === "card";

  const nameSz = isCard ? "2.1rem"  : "clamp(2.5rem, 8vw, 3.3rem)";
  const smSz   = isCard ? "0.58rem" : "0.66rem";
  const mdSz   = isCard ? "0.72rem" : "0.82rem";
  const lgSz   = isCard ? "0.8rem"  : "0.9rem";
  const hPad   = isCard ? "1.4rem"  : "2rem";

  // Height of the top floral banner
  const bannerH = isCard ? 110 : 160;

  return (
    <div
      style={{
        background: "#f2ece4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isCard ? "0.5rem" : "1.5rem",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      <div
        style={{
          background: "#fffdf9",
          width: "100%",
          maxWidth: 440,
          position: "relative",
          boxShadow: isCard
            ? "0 8px 32px rgba(60,20,20,0.10)"
            : "0 28px 90px rgba(60,20,20,0.15), 0 4px 18px rgba(60,20,20,0.07)",
        }}
      >

        {/* ── TOP: Floral banner using dekor_02.png ── */}
        <div
          style={{
            width: "100%",
            height: bannerH,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src="/dekor_02.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
              pointerEvents: "none",
            }}
          />
          {/* Soft fade to white at bottom of banner */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: isCard ? 40 : 56,
              background: "linear-gradient(to bottom, transparent, #fffdf9)",
            }}
          />
        </div>

        {/* ── CONTENT ── */}
        <div
          style={{
            textAlign: "center",
            padding: `0 ${hPad} ${isCard ? "1.4rem" : "2rem"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: isCard ? "0.6rem" : "0.9rem",
          }}
        >
          {/* Intro line */}
          <p
            style={{
              fontSize: smSz,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#9a6a60",
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            {intro}
          </p>

          {/* ── Names ── */}
          <div style={{ lineHeight: 1 }}>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: nameSz,
                color: "#2a1410",
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
                color: "#c9827a",
                margin: isCard ? "0.2rem 0" : "0.35rem 0",
                fontWeight: 400,
              }}
            >
              &amp;
            </div>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: nameSz,
                color: "#2a1410",
                lineHeight: 1.05,
              }}
            >
              {names.name2}
            </div>
          </div>

          {/* Floral divider */}
          <FloralDivider isCard={isCard} />

          {/* Date + time */}
          <div style={{ display: "flex", flexDirection: "column", gap: isCard ? "0.1rem" : "0.15rem" }}>
            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: isCard ? "1.2rem" : "1.6rem",
                color: "#2a1410",
                lineHeight: 1.1,
              }}
            >
              {displayDate}
            </p>
            <p
              style={{
                fontSize: smSz,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#c9827a",
                fontWeight: 500,
              }}
            >
              {displayTime}
            </p>
          </div>

          {/* Venue */}
          <div style={{ display: "flex", flexDirection: "column", gap: isCard ? "0.1rem" : "0.12rem" }}>
            <p
              style={{
                fontSize: lgSz,
                fontStyle: "italic",
                color: "#2a1410",
                fontWeight: 400,
                letterSpacing: "0.04em",
              }}
            >
              {displayVenue}
            </p>
            {displayAddr && (
              <p
                style={{
                  fontSize: mdSz,
                  color: "#9a6a60",
                  fontWeight: 300,
                  letterSpacing: "0.03em",
                }}
              >
                {displayAddr}
              </p>
            )}
          </div>

          {/* Floral divider */}
          <FloralDivider isCard={isCard} />

          {/* Reception */}
          <p
            style={{
              fontSize: smSz,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9a6a60",
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
                color: "#b08880",
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
              <FloralDivider isCard={isCard} />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.12rem" }}>
                <p
                  style={{
                    fontSize: smSz,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#c9827a",
                    fontWeight: 500,
                  }}
                >
                  R.S.V.P.
                </p>
                <p style={{ fontSize: mdSz, color: "#9a6a60", fontWeight: 300 }}>
                  Kindly reply by {rsvpDeadline}
                </p>
              </div>
            </>
          )}

          {/* ── Bottom floral footer ── */}
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              height: isCard ? 50 : 72,
              position: "relative",
              marginTop: isCard ? "0.2rem" : "0.4rem",
            }}
          >
            {/* Fade from white at top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                background: "linear-gradient(to bottom, #fffdf9, transparent)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <img
              src="/dekor_02.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center bottom",
                display: "block",
                transform: "scaleX(-1)",
                pointerEvents: "none",
              }}
            />
          </div>

        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');`}</style>
    </div>
  );
}
