import type { InvitationTemplateProps } from "./types";

function readString(data: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = data?.[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function splitCoupleNames(couple: string): { name1: string; name2: string } {
  const normalized = couple.replace(/\s+/g, " ").trim();
  for (const sep of [" & ", " i ", " and "]) {
    if (normalized.toLowerCase().includes(sep.trim().toLowerCase())) {
      const parts = normalized.split(new RegExp(sep, "i")).map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2) return { name1: parts[0], name2: parts[1] };
    }
  }
  const words = normalized.split(" ").filter(Boolean);
  if (words.length >= 2) return { name1: words[0], name2: words.slice(1).join(" ") };
  return { name1: normalized || "Ana", name2: "Marko" };
}

/** Rose cluster SVG for a corner — draws roses, buds and leaves */
function CornerRoses({
  flip = false,
  accent,
  petal1,
  petal2,
  leaf1,
  leaf2,
  size,
}: {
  flip?: boolean;
  accent: string;
  petal1: string;
  petal2: string;
  leaf1: string;
  leaf2: string;
  size: number;
}) {
  return (
    <svg
      viewBox="0 0 160 180"
      width={size}
      height={size * 1.125}
      fill="none"
      style={{ display: "block", transform: flip ? "scaleX(-1)" : undefined }}
    >
      {/* Main diagonal stem from top-left corner */}
      <path d="M 2 2 C 25 30 50 65 68 105 C 82 135 80 160 75 178" stroke={leaf1} strokeWidth="1.6" strokeLinecap="round" />
      {/* Branch to right */}
      <path d="M 38 55 C 60 45 85 38 108 32" stroke={leaf2} strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
      {/* Branch going down-right */}
      <path d="M 68 105 C 90 98 115 90 130 78" stroke={leaf1} strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />

      {/* Leaves */}
      <g transform="translate(28,42) rotate(35)">
        <path d="M 0 0 C -13 -9 -15 -26 0 -34 C 15 -26 13 -9 0 0" fill={leaf1} opacity="0.82" />
        <path d="M 0 0 L 0 -34" stroke={leaf2} strokeWidth="0.7" opacity="0.55" />
      </g>
      <g transform="translate(55,88) rotate(-20)">
        <path d="M 0 0 C -11 -8 -12 -21 0 -28 C 12 -21 11 -8 0 0" fill={leaf2} opacity="0.78" />
        <path d="M 0 0 L 0 -28" stroke={leaf1} strokeWidth="0.6" opacity="0.5" />
      </g>
      <g transform="translate(85,35) rotate(15)">
        <path d="M 0 0 C -9 -7 -10 -18 0 -24 C 10 -18 9 -7 0 0" fill={leaf1} opacity="0.75" />
      </g>
      <g transform="translate(120,80) rotate(-30)">
        <path d="M 0 0 C -8 -6 -9 -16 0 -21 C 9 -16 8 -6 0 0" fill={leaf2} opacity="0.7" />
      </g>
      <g transform="translate(70,148) rotate(10)">
        <path d="M 0 0 C -8 -5 -9 -14 0 -19 C 9 -14 8 -5 0 0" fill={leaf1} opacity="0.65" />
      </g>

      {/* Main rose at top-left corner (near 8,8) */}
      <g transform="translate(10,10)">
        <ellipse cx="0" cy="-17" rx="9" ry="13" fill={petal1} />
        <ellipse cx="0" cy="-17" rx="9" ry="13" fill={petal1} opacity="0.88" transform="rotate(72,0,0)" />
        <ellipse cx="0" cy="-17" rx="9" ry="13" fill={petal1} opacity="0.85" transform="rotate(144,0,0)" />
        <ellipse cx="0" cy="-17" rx="9" ry="13" fill={petal1} opacity="0.88" transform="rotate(216,0,0)" />
        <ellipse cx="0" cy="-17" rx="9" ry="13" fill={petal1} opacity="0.85" transform="rotate(288,0,0)" />
        <ellipse cx="0" cy="-9" rx="6" ry="8" fill={petal2} transform="rotate(36,0,0)" />
        <ellipse cx="0" cy="-9" rx="6" ry="8" fill={petal2} opacity="0.9" transform="rotate(108,0,0)" />
        <ellipse cx="0" cy="-9" rx="6" ry="8" fill={petal2} opacity="0.9" transform="rotate(180,0,0)" />
        <ellipse cx="0" cy="-9" rx="6" ry="8" fill={petal2} transform="rotate(252,0,0)" />
        <ellipse cx="0" cy="-9" rx="6" ry="8" fill={petal2} opacity="0.9" transform="rotate(324,0,0)" />
        <circle cx="0" cy="0" r="5" fill={accent} />
        <circle cx="0" cy="0" r="3" fill={petal1} />
        <circle cx="0" cy="-1.5" r="0.8" fill={petal2} opacity="0.9" />
        <circle cx="1.5" cy="1" r="0.8" fill={petal2} opacity="0.9" />
        <circle cx="-1.5" cy="1" r="0.8" fill={petal2} opacity="0.9" />
      </g>

      {/* Second rose along branch (108,32) */}
      <g transform="translate(108,32)">
        <ellipse cx="0" cy="-14" rx="8" ry="11" fill={petal1} opacity="0.9" />
        <ellipse cx="0" cy="-14" rx="8" ry="11" fill={petal1} opacity="0.8" transform="rotate(72,0,0)" />
        <ellipse cx="0" cy="-14" rx="8" ry="11" fill={petal1} opacity="0.85" transform="rotate(144,0,0)" />
        <ellipse cx="0" cy="-14" rx="8" ry="11" fill={petal1} opacity="0.8" transform="rotate(216,0,0)" />
        <ellipse cx="0" cy="-14" rx="8" ry="11" fill={petal1} opacity="0.85" transform="rotate(288,0,0)" />
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill={petal2} transform="rotate(36,0,0)" />
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill={petal2} opacity="0.9" transform="rotate(108,0,0)" />
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill={petal2} opacity="0.9" transform="rotate(180,0,0)" />
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill={petal2} transform="rotate(252,0,0)" />
        <ellipse cx="0" cy="-8" rx="5" ry="7" fill={petal2} opacity="0.9" transform="rotate(324,0,0)" />
        <circle cx="0" cy="0" r="4" fill={accent} />
        <circle cx="0" cy="0" r="2.2" fill={petal1} />
      </g>

      {/* Third smaller rose on lower branch (130,78) */}
      <g transform="translate(130,78)">
        <ellipse cx="0" cy="-12" rx="7" ry="10" fill={petal1} opacity="0.85" />
        <ellipse cx="0" cy="-12" rx="7" ry="10" fill={petal1} opacity="0.75" transform="rotate(72,0,0)" />
        <ellipse cx="0" cy="-12" rx="7" ry="10" fill={petal1} opacity="0.8" transform="rotate(144,0,0)" />
        <ellipse cx="0" cy="-12" rx="7" ry="10" fill={petal1} opacity="0.75" transform="rotate(216,0,0)" />
        <ellipse cx="0" cy="-12" rx="7" ry="10" fill={petal1} opacity="0.8" transform="rotate(288,0,0)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.85" transform="rotate(36,0,0)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.8" transform="rotate(108,0,0)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.85" transform="rotate(180,0,0)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.8" transform="rotate(252,0,0)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.85" transform="rotate(324,0,0)" />
        <circle cx="0" cy="0" r="3.5" fill={accent} opacity="0.9" />
      </g>

      {/* Bud on main stem (56,95) */}
      <g transform="translate(56,95)">
        <path d="M -4 6 C -7 2 -6 -9 0 -15 C 6 -9 7 2 4 6Z" fill={petal1} opacity="0.8" />
        <path d="M -5 6 C -9 4 -10 8 -5 6Z" fill={leaf1} opacity="0.9" />
        <path d="M 5 6 C 9 4 10 8 5 6Z" fill={leaf1} opacity="0.9" />
      </g>

      {/* Tiny 5-petal flower scattered */}
      <g transform="translate(42,72)">
        <circle cx="0" cy="-4" r="2.8" fill={petal2} opacity="0.5" />
        <circle cx="0" cy="-4" r="2.8" fill={petal2} opacity="0.45" transform="rotate(72,0,0)" />
        <circle cx="0" cy="-4" r="2.8" fill={petal2} opacity="0.5" transform="rotate(144,0,0)" />
        <circle cx="0" cy="-4" r="2.8" fill={petal2} opacity="0.45" transform="rotate(216,0,0)" />
        <circle cx="0" cy="-4" r="2.8" fill={petal2} opacity="0.5" transform="rotate(288,0,0)" />
        <circle cx="0" cy="0" r="1.4" fill={accent} opacity="0.65" />
      </g>

      {/* Berries */}
      <circle cx="95" cy="45" r="2.5" fill={petal1} opacity="0.5" />
      <circle cx="100" cy="40" r="2" fill={petal2} opacity="0.4" />
      <circle cx="90" cy="38" r="2" fill={petal1} opacity="0.4" />
    </svg>
  );
}

export default function ClassicTemplate({
  data,
  title = "Ana & Marko",
  date = "15. lipnja 2026",
  selectedColor = "gold",
  mode = "full",
}: InvitationTemplateProps) {
  const couple = readString(data, "couple") ?? readString(data, "title") ?? title;
  const names = splitCoupleNames(couple);
  const displayDate = readString(data, "date") ?? date;
  const displayTime = readString(data, "time") ?? "17:00";
  const displayVenue = readString(data, "venue") ?? readString(data, "location") ?? "Grand Ballroom, Zagreb";
  const displayAddress = readString(data, "address") ?? "";
  const displayHosts = readString(data, "hosts") ?? "";
  const displayDressCode = readString(data, "dressCode") ?? "";
  const rsvpDeadline = readString(data, "rsvpDeadline") ?? "";

  // Accent / petal palette
  const palettes = {
    gold:   { accent: "#b8905a", petal1: "#d4a080", petal2: "#e8b89a", leaf1: "#7a9060", leaf2: "#9ab878", gold: "#c4a06a" },
    ivory:  { accent: "#9a9080", petal1: "#c8b8a8", petal2: "#dcd0c0", leaf1: "#7a9060", leaf2: "#9ab878", gold: "#b0a080" },
    rose:   { accent: "#c06880", petal1: "#d4899b", petal2: "#e8a8ba", leaf1: "#6a9060", leaf2: "#8ab070", gold: "#c4a06a" },
    default:{ accent: "#b8905a", petal1: "#d4a080", petal2: "#e8b89a", leaf1: "#7a9060", leaf2: "#9ab878", gold: "#c4a06a" },
  };
  const pal = palettes[selectedColor as keyof typeof palettes] ?? palettes.default;

  const cornerSize = mode === "card" ? 90 : 130;
  const pad = mode === "card" ? "1.2rem" : "2.8rem";
  const nameFontSize = mode === "card" ? "2rem" : "clamp(2.8rem, 9vw, 4rem)";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: mode === "card" ? "0.5rem" : "1.5rem",
        background: "#f0ebe0",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: mode === "card" ? 360 : 460,
          background: "linear-gradient(160deg, #fefaf2 0%, #f8f0e0 100%)",
          borderRadius: 24,
          border: "1px solid #ddd0b0",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(100,75,30,0.13), 0 2px 10px rgba(100,75,30,0.07)",
        }}
      >
        {/* Top gold bar */}
        <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${pal.gold} 30%, ${pal.gold} 70%, transparent)` }} />

        {/* Corner roses — top-left */}
        <div style={{ position: "absolute", top: 2, left: 2, zIndex: 0, opacity: 0.28, pointerEvents: "none" }}>
          <CornerRoses
            accent={pal.accent} petal1={pal.petal1} petal2={pal.petal2}
            leaf1={pal.leaf1} leaf2={pal.leaf2} size={cornerSize}
          />
        </div>

        {/* Corner roses — top-right (flipped) */}
        <div style={{ position: "absolute", top: 2, right: 2, zIndex: 0, opacity: 0.28, pointerEvents: "none" }}>
          <CornerRoses
            flip accent={pal.accent} petal1={pal.petal1} petal2={pal.petal2}
            leaf1={pal.leaf1} leaf2={pal.leaf2} size={cornerSize}
          />
        </div>

        {/* Corner roses — bottom-left (rotated 180) */}
        <div style={{ position: "absolute", bottom: 2, left: 2, zIndex: 0, opacity: 0.22, pointerEvents: "none", transform: "rotate(180deg)" }}>
          <CornerRoses
            flip accent={pal.accent} petal1={pal.petal1} petal2={pal.petal2}
            leaf1={pal.leaf1} leaf2={pal.leaf2} size={Math.round(cornerSize * 0.75)}
          />
        </div>

        {/* Corner roses — bottom-right (rotated 180 + flipped) */}
        <div style={{ position: "absolute", bottom: 2, right: 2, zIndex: 0, opacity: 0.22, pointerEvents: "none", transform: "rotate(180deg) scaleX(-1)" }}>
          <CornerRoses
            accent={pal.accent} petal1={pal.petal1} petal2={pal.petal2}
            leaf1={pal.leaf1} leaf2={pal.leaf2} size={Math.round(cornerSize * 0.75)}
          />
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: `${pad} ${pad} ${mode === "card" ? "1.2rem" : "2rem"}`,
          }}
        >
          {/* Small top label */}
          <div
            style={{
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: pal.accent,
              marginBottom: "0.8rem",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            ✦ &nbsp; Vjenčanje &nbsp; ✦
          </div>

          {/* Lead text */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: mode === "card" ? "0.82rem" : "0.95rem",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#7a6840",
              lineHeight: 1.65,
              margin: "0 0 1.2rem",
            }}
          >
            S radošću Vas pozivamo da zajedno
            <br />
            proslavite vjenčanje
          </p>

          {/* Couple names */}
          <div>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: nameFontSize,
                color: "#7a6030",
                lineHeight: 1.15,
              }}
            >
              {names.name1}
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: mode === "card" ? "0.7rem" : "0.85rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: pal.accent,
                margin: "0.2rem 0",
              }}
            >
              &amp;
            </div>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: nameFontSize,
                color: "#7a6030",
                lineHeight: 1.15,
                marginBottom: mode === "card" ? "1.2rem" : "1.8rem",
              }}
            >
              {names.name2}
            </div>
          </div>

          {/* Gold dot divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: mode === "card" ? "1.2rem" : "1.8rem",
            }}
          >
            <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, transparent, ${pal.gold})` }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: pal.gold }} />
            <div style={{ width: 3, height: 3, borderRadius: "50%", border: `1px solid ${pal.gold}` }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: pal.gold }} />
            <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, ${pal.gold}, transparent)` }} />
          </div>

          {/* Date / Time / Venue */}
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: mode === "card" ? "0.78rem" : "0.88rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#5a4820",
              marginBottom: "0.45rem",
            }}
          >
            {displayDate}&nbsp; | &nbsp;{displayTime}
          </div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: mode === "card" ? "0.88rem" : "1rem",
              fontWeight: 300,
              color: "#7a6840",
              lineHeight: 1.55,
              marginBottom: mode === "card" ? "1rem" : "1.5rem",
            }}
          >
            {displayVenue}
            {displayAddress && (
              <>
                <br />
                <span style={{ fontSize: "0.88em", opacity: 0.8 }}>{displayAddress}</span>
              </>
            )}
            {displayHosts && (
              <>
                <br />
                <span style={{ fontSize: "0.85em", opacity: 0.75 }}>Domaćini: {displayHosts}</span>
              </>
            )}
          </div>

          {/* RSVP box */}
          <div
            style={{
              background: `rgba(196,168,106,0.07)`,
              border: `0.5px solid rgba(196,168,106,0.3)`,
              borderRadius: 14,
              padding: mode === "card" ? "0.75rem 1rem" : "1.1rem 1.5rem",
            }}
          >
            {rsvpDeadline && (
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: mode === "card" ? "0.78rem" : "0.88rem",
                  fontWeight: 500,
                  fontStyle: "italic",
                  color: "#5a4820",
                  marginBottom: "0.75rem",
                }}
              >
                Molimo potvrdu do {rsvpDeadline}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {["Dolazim s radošću", "Nažalost ne mogu doći"].map((label, i) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 13px",
                    borderRadius: 100,
                    border: `1px solid ${pal.gold}`,
                    fontSize: mode === "card" ? 11 : 12,
                    letterSpacing: "0.07em",
                    color: "#7a6840",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: i === 0 ? pal.accent : "transparent",
                      border: `1px solid ${pal.accent}`,
                      flexShrink: 0,
                    }}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {displayDressCode && (
            <p
              style={{
                marginTop: "0.9rem",
                fontSize: mode === "card" ? "0.75rem" : "0.82rem",
                color: "#9a8050",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Dress code: {displayDressCode}
            </p>
          )}
        </div>

        {/* Bottom gold bar */}
        <div style={{ height: 3, background: `linear-gradient(90deg, transparent, ${pal.gold} 30%, ${pal.gold} 70%, transparent)` }} />

        <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');`}</style>
      </div>
    </div>
  );
}
