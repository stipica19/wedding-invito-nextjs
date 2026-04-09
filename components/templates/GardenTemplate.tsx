import type { InvitationTemplateProps } from "./types";

function readString(data: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = data?.[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

const palettes = {
  default: {
    bg: "linear-gradient(145deg, #fff5f8 0%, #f5fdf0 100%)",
    border: "#d4899b44",
    petal1: "#d4899b", petal2: "#eaaec0", petal3: "#f5c8d6",
    leaf1: "#5a8a50", leaf2: "#7aaa68", leaf3: "#9acb80",
    accent: "#b86080", text: "#2a1820", textMid: "#5a3848",
    cardBg: "rgba(255,255,255,0.75)",
  },
  rose: {
    bg: "linear-gradient(145deg, #fff3f6 0%, #fdf8f0 100%)",
    border: "#c4607844",
    petal1: "#c86078", petal2: "#e08098", petal3: "#f0a8b8",
    leaf1: "#5a8a50", leaf2: "#7aaa68", leaf3: "#9acb80",
    accent: "#a85068", text: "#2a1418", textMid: "#5a303a",
    cardBg: "rgba(255,255,255,0.75)",
  },
  gold: {
    bg: "linear-gradient(145deg, #fffdf0 0%, #f8f5e0 100%)",
    border: "#c49030 44",
    petal1: "#c49030", petal2: "#e0b050", petal3: "#f0cc80",
    leaf1: "#5a8050", leaf2: "#7aa068", leaf3: "#9abc80",
    accent: "#a87820", text: "#241c08", textMid: "#5a4020",
    cardBg: "rgba(255,255,255,0.75)",
  },
  ivory: {
    bg: "linear-gradient(145deg, #fdfaf5 0%, #f5f2e8 100%)",
    border: "#a8906844",
    petal1: "#c4a870", petal2: "#dcbf90", petal3: "#ecd8b0",
    leaf1: "#6a9060", leaf2: "#8aaa78", leaf3: "#a0c090",
    accent: "#9a8050", text: "#241e10", textMid: "#5a4e38",
    cardBg: "rgba(255,255,255,0.75)",
  },
};

export default function GardenTemplate({
  data,
  title = "Miro & Slava",
  date = "05 August 2026",
  selectedColor = "default",
  mode = "full",
}: InvitationTemplateProps) {
  const couple = readString(data, "couple") ?? readString(data, "title") ?? title;
  const subtitle = readString(data, "subtitle") ?? "Večer ljubavi pod zvijezdama";
  const location = readString(data, "location") ?? "Vrt Villa Green, Mostar";
  const time = readString(data, "time") ?? "18:30";
  const displayDate = readString(data, "date") ?? date;
  const hosts = readString(data, "hosts") ?? "";
  const dressCode = readString(data, "dressCode") ?? "";

  const pal = palettes[selectedColor as keyof typeof palettes] ?? palettes.default;
  const { petal1, petal2, petal3, leaf1, leaf2, leaf3, accent } = pal;

  const bouquetW = mode === "card" ? 130 : 195;
  const bouquetH = mode === "card" ? 145 : 220;
  const smallW = mode === "card" ? 80 : 120;
  const smallH = mode === "card" ? 90 : 135;

  return (
    <div
      style={{
        position: "relative",
        background: pal.bg,
        borderRadius: 22,
        overflow: "hidden",
        minHeight: mode === "card" ? 285 : 480,
        border: `1px solid ${pal.border}`,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* ── Top-right corner bouquet ───────────────────────── */}
      <div style={{ position: "absolute", top: -6, right: -6, zIndex: 0, opacity: 0.88 }}>
        <svg viewBox="0 0 200 225" width={bouquetW} height={bouquetH} fill="none">
          {/* Stems: from top-right downward/leftward */}
          <path d="M 196 4 C 168 28 132 62 100 98 C 70 132 42 170 22 215" stroke={leaf1} strokeWidth="1.7" strokeLinecap="round" />
          <path d="M 185 2 C 158 26 122 58 92 94" stroke={leaf2} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
          <path d="M 196 4 C 180 38 156 58 134 64" stroke={leaf1} strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
          <path d="M 100 98 C 118 78 136 62 154 48" stroke={leaf2} strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />

          {/* Leaves */}
          <g transform="translate(158,42) rotate(32)">
            <path d="M 0 0 C -14 -10 -16 -26 0 -35 C 16 -26 14 -10 0 0" fill={leaf1} opacity="0.82" />
            <path d="M 0 0 L 0 -35" stroke={leaf3} strokeWidth="0.7" opacity="0.5" />
          </g>
          <g transform="translate(126,62) rotate(-18)">
            <path d="M 0 0 C -11 -8 -13 -21 0 -28 C 13 -21 11 -8 0 0" fill={leaf2} opacity="0.78" />
            <path d="M 0 0 L 0 -28" stroke={leaf1} strokeWidth="0.6" opacity="0.45" />
          </g>
          <g transform="translate(96,98) rotate(12)">
            <path d="M 0 0 C -12 -8 -13 -22 0 -29 C 13 -22 12 -8 0 0" fill={leaf1} opacity="0.78" />
          </g>
          <g transform="translate(60,148) rotate(-14)">
            <path d="M 0 0 C -10 -7 -11 -19 0 -25 C 11 -19 10 -7 0 0" fill={leaf2} opacity="0.72" />
          </g>
          <g transform="translate(36,180) rotate(22)">
            <path d="M 0 0 C -8 -6 -10 -16 0 -22 C 10 -16 8 -6 0 0" fill={leaf3} opacity="0.7" />
          </g>
          <g transform="translate(110,70) rotate(-5)">
            <path d="M 0 0 C -9 -6 -10 -18 0 -23 C 10 -18 9 -6 0 0" fill={leaf1} opacity="0.68" />
          </g>

          {/* Main rose (top-right, ~185,18) */}
          <g transform="translate(185,20)">
            <ellipse cx="0" cy="-18" rx="10" ry="14" fill={petal1} />
            <ellipse cx="0" cy="-18" rx="10" ry="14" fill={petal1} opacity="0.88" transform="rotate(72,0,0)" />
            <ellipse cx="0" cy="-18" rx="10" ry="14" fill={petal1} opacity="0.85" transform="rotate(144,0,0)" />
            <ellipse cx="0" cy="-18" rx="10" ry="14" fill={petal1} opacity="0.88" transform="rotate(216,0,0)" />
            <ellipse cx="0" cy="-18" rx="10" ry="14" fill={petal1} opacity="0.85" transform="rotate(288,0,0)" />
            <ellipse cx="0" cy="-10" rx="6" ry="9" fill={petal2} transform="rotate(36,0,0)" />
            <ellipse cx="0" cy="-10" rx="6" ry="9" fill={petal2} opacity="0.9" transform="rotate(108,0,0)" />
            <ellipse cx="0" cy="-10" rx="6" ry="9" fill={petal2} opacity="0.9" transform="rotate(180,0,0)" />
            <ellipse cx="0" cy="-10" rx="6" ry="9" fill={petal2} transform="rotate(252,0,0)" />
            <ellipse cx="0" cy="-10" rx="6" ry="9" fill={petal2} opacity="0.9" transform="rotate(324,0,0)" />
            <ellipse cx="0" cy="-5" rx="3.5" ry="5" fill={petal3} transform="rotate(20,0,0)" />
            <ellipse cx="0" cy="-5" rx="3.5" ry="5" fill={petal3} opacity="0.85" transform="rotate(92,0,0)" />
            <ellipse cx="0" cy="-5" rx="3.5" ry="5" fill={petal3} opacity="0.85" transform="rotate(164,0,0)" />
            <circle cx="0" cy="0" r="5.5" fill={accent} />
            <circle cx="0" cy="0" r="3" fill={petal1} />
            <circle cx="0" cy="-1.5" r="0.9" fill={petal3} opacity="0.85" />
            <circle cx="1.5" cy="1" r="0.9" fill={petal3} opacity="0.85" />
            <circle cx="-1.5" cy="1" r="0.9" fill={petal3} opacity="0.85" />
          </g>

          {/* Second rose (~152,48) */}
          <g transform="translate(152,50)">
            <ellipse cx="0" cy="-15" rx="8" ry="12" fill={petal1} opacity="0.9" />
            <ellipse cx="0" cy="-15" rx="8" ry="12" fill={petal1} opacity="0.8" transform="rotate(72,0,0)" />
            <ellipse cx="0" cy="-15" rx="8" ry="12" fill={petal1} opacity="0.85" transform="rotate(144,0,0)" />
            <ellipse cx="0" cy="-15" rx="8" ry="12" fill={petal1} opacity="0.8" transform="rotate(216,0,0)" />
            <ellipse cx="0" cy="-15" rx="8" ry="12" fill={petal1} opacity="0.85" transform="rotate(288,0,0)" />
            <ellipse cx="0" cy="-9" rx="5" ry="7" fill={petal2} transform="rotate(36,0,0)" />
            <ellipse cx="0" cy="-9" rx="5" ry="7" fill={petal2} opacity="0.9" transform="rotate(108,0,0)" />
            <ellipse cx="0" cy="-9" rx="5" ry="7" fill={petal2} opacity="0.9" transform="rotate(180,0,0)" />
            <ellipse cx="0" cy="-9" rx="5" ry="7" fill={petal2} transform="rotate(252,0,0)" />
            <ellipse cx="0" cy="-9" rx="5" ry="7" fill={petal2} opacity="0.9" transform="rotate(324,0,0)" />
            <circle cx="0" cy="0" r="4.5" fill={accent} />
            <circle cx="0" cy="0" r="2.5" fill={petal2} />
          </g>

          {/* Third rose (~100,96) */}
          <g transform="translate(100,96)">
            <ellipse cx="0" cy="-13" rx="7" ry="10" fill={petal1} opacity="0.85" />
            <ellipse cx="0" cy="-13" rx="7" ry="10" fill={petal1} opacity="0.78" transform="rotate(72,0,0)" />
            <ellipse cx="0" cy="-13" rx="7" ry="10" fill={petal1} opacity="0.82" transform="rotate(144,0,0)" />
            <ellipse cx="0" cy="-13" rx="7" ry="10" fill={petal1} opacity="0.78" transform="rotate(216,0,0)" />
            <ellipse cx="0" cy="-13" rx="7" ry="10" fill={petal1} opacity="0.82" transform="rotate(288,0,0)" />
            <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.85" transform="rotate(36,0,0)" />
            <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.8" transform="rotate(108,0,0)" />
            <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.85" transform="rotate(180,0,0)" />
            <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.8" transform="rotate(252,0,0)" />
            <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.85" transform="rotate(324,0,0)" />
            <circle cx="0" cy="0" r="4" fill={accent} opacity="0.9" />
          </g>

          {/* Buds */}
          <g transform="translate(82,95)">
            <path d="M -4 6 C -7 1 -6 -9 0 -15 C 6 -9 7 1 4 6Z" fill={petal1} opacity="0.8" />
            <path d="M -5 6 C -9 4 -10 8 -5 6Z" fill={leaf1} />
            <path d="M 5 6 C 9 4 10 8 5 6Z" fill={leaf1} />
          </g>
          <g transform="translate(58,148)">
            <path d="M -3 5 C -5 1 -5 -7 0 -12 C 5 -7 5 1 3 5Z" fill={petal2} opacity="0.75" />
            <path d="M -4 5 C -7 3 -8 7 -4 5Z" fill={leaf2} />
            <path d="M 4 5 C 7 3 8 7 4 5Z" fill={leaf2} />
          </g>

          {/* Small 5-petal blossoms */}
          <g transform="translate(72,118)">
            <ellipse cx="0" cy="-4" rx="3" ry="4.5" fill={petal3} opacity="0.6" />
            <ellipse cx="0" cy="-4" rx="3" ry="4.5" fill={petal3} opacity="0.55" transform="rotate(72,0,0)" />
            <ellipse cx="0" cy="-4" rx="3" ry="4.5" fill={petal3} opacity="0.6" transform="rotate(144,0,0)" />
            <ellipse cx="0" cy="-4" rx="3" ry="4.5" fill={petal3} opacity="0.55" transform="rotate(216,0,0)" />
            <ellipse cx="0" cy="-4" rx="3" ry="4.5" fill={petal3} opacity="0.6" transform="rotate(288,0,0)" />
            <circle cx="0" cy="0" r="1.5" fill={accent} opacity="0.7" />
          </g>
          <g transform="translate(38,178)">
            <ellipse cx="0" cy="-3.5" rx="2.5" ry="4" fill={petal2} opacity="0.5" />
            <ellipse cx="0" cy="-3.5" rx="2.5" ry="4" fill={petal2} opacity="0.45" transform="rotate(72,0,0)" />
            <ellipse cx="0" cy="-3.5" rx="2.5" ry="4" fill={petal2} opacity="0.5" transform="rotate(144,0,0)" />
            <ellipse cx="0" cy="-3.5" rx="2.5" ry="4" fill={petal2} opacity="0.45" transform="rotate(216,0,0)" />
            <ellipse cx="0" cy="-3.5" rx="2.5" ry="4" fill={petal2} opacity="0.5" transform="rotate(288,0,0)" />
            <circle cx="0" cy="0" r="1.2" fill={accent} opacity="0.6" />
          </g>

          {/* Berries */}
          <circle cx="130" cy="67" r="3" fill={petal1} opacity="0.45" />
          <circle cx="138" cy="60" r="2.5" fill={petal2} opacity="0.4" />
          <circle cx="122" cy="62" r="2.5" fill={petal3} opacity="0.5" />
          <circle cx="118" cy="70" r="2" fill={petal1} opacity="0.35" />
        </svg>
      </div>

      {/* ── Bottom-left small spray (rotated 180°) ────────── */}
      <div style={{ position: "absolute", bottom: -4, left: -4, zIndex: 0, opacity: 0.72, transform: "rotate(180deg)" }}>
        <svg viewBox="0 0 140 160" width={smallW} height={smallH} fill="none">
          <path d="M 136 4 C 110 28 80 62 58 98 C 38 132 18 155 6 158" stroke={leaf1} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 136 4 C 118 35 95 55 72 62" stroke={leaf2} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
          <g transform="translate(92,60) rotate(25)">
            <path d="M 0 0 C -10 -7 -12 -20 0 -27 C 12 -20 10 -7 0 0" fill={leaf1} opacity="0.78" />
          </g>
          <g transform="translate(55,100) rotate(-12)">
            <path d="M 0 0 C -9 -6 -10 -17 0 -22 C 10 -17 9 -6 0 0" fill={leaf2} opacity="0.72" />
          </g>
          <g transform="translate(30,138) rotate(20)">
            <path d="M 0 0 C -7 -5 -8 -14 0 -18 C 8 -14 7 -5 0 0" fill={leaf3} opacity="0.65" />
          </g>
          {/* Small rose */}
          <g transform="translate(130,14)">
            <ellipse cx="0" cy="-13" rx="7" ry="10" fill={petal1} opacity="0.8" />
            <ellipse cx="0" cy="-13" rx="7" ry="10" fill={petal1} opacity="0.72" transform="rotate(72,0,0)" />
            <ellipse cx="0" cy="-13" rx="7" ry="10" fill={petal1} opacity="0.76" transform="rotate(144,0,0)" />
            <ellipse cx="0" cy="-13" rx="7" ry="10" fill={petal1} opacity="0.72" transform="rotate(216,0,0)" />
            <ellipse cx="0" cy="-13" rx="7" ry="10" fill={petal1} opacity="0.76" transform="rotate(288,0,0)" />
            <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.8" transform="rotate(36,0,0)" />
            <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.75" transform="rotate(108,0,0)" />
            <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.8" transform="rotate(180,0,0)" />
            <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.75" transform="rotate(252,0,0)" />
            <ellipse cx="0" cy="-7" rx="4" ry="6" fill={petal2} opacity="0.8" transform="rotate(324,0,0)" />
            <circle cx="0" cy="0" r="3.5" fill={accent} opacity="0.85" />
          </g>
          {/* Bud */}
          <g transform="translate(70,62)">
            <path d="M -3 5 C -5 1 -5 -6 0 -10 C 5 -6 5 1 3 5Z" fill={petal1} opacity="0.7" />
            <path d="M -4 5 C -7 3 -8 6 -4 5Z" fill={leaf1} opacity="0.85" />
            <path d="M 4 5 C 7 3 8 6 4 5Z" fill={leaf1} opacity="0.85" />
          </g>
          {/* Small blossom */}
          <g transform="translate(40,108)">
            <ellipse cx="0" cy="-3" rx="2.5" ry="3.5" fill={petal3} opacity="0.5" />
            <ellipse cx="0" cy="-3" rx="2.5" ry="3.5" fill={petal3} opacity="0.45" transform="rotate(72,0,0)" />
            <ellipse cx="0" cy="-3" rx="2.5" ry="3.5" fill={petal3} opacity="0.5" transform="rotate(144,0,0)" />
            <ellipse cx="0" cy="-3" rx="2.5" ry="3.5" fill={petal3} opacity="0.45" transform="rotate(216,0,0)" />
            <ellipse cx="0" cy="-3" rx="2.5" ry="3.5" fill={petal3} opacity="0.5" transform="rotate(288,0,0)" />
            <circle cx="0" cy="0" r="1.2" fill={accent} opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* ── Invitation content ────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: mode === "card" ? "2rem 1.6rem 1.6rem" : "3.2rem 2.8rem 2.5rem",
          minHeight: mode === "card" ? 285 : 480,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Category label */}
        <p
          style={{
            margin: "0 0 0.6rem",
            fontSize: 9,
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: accent,
          }}
        >
          ✿ &nbsp; Garden Ceremony &nbsp; ✿
        </p>

        {/* Couple names */}
        <h2
          style={{
            margin: "0 0 0.35rem",
            fontFamily: "'Great Vibes', cursive, Georgia, serif",
            fontSize: mode === "card" ? "2rem" : "3.4rem",
            fontWeight: 400,
            lineHeight: 1.2,
            color: pal.text,
            letterSpacing: "0.01em",
          }}
        >
          {couple}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            margin: "0 0 1.3rem",
            fontStyle: "italic",
            fontSize: mode === "card" ? "0.84rem" : "1rem",
            color: pal.textMid,
            letterSpacing: "0.02em",
          }}
        >
          {subtitle}
        </p>

        {/* Floral divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            width: "100%",
            maxWidth: 200,
            marginBottom: "1.3rem",
          }}
        >
          <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, transparent, ${accent}88)` }} />
          <span style={{ color: accent, fontSize: 13, lineHeight: 1 }}>✿</span>
          <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, ${accent}88, transparent)` }} />
        </div>

        {/* Date & Location frosted cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: mode === "card" ? "1fr" : "1fr 1fr",
            gap: "0.75rem",
            width: "100%",
            maxWidth: mode === "card" ? "100%" : 440,
          }}
        >
          {/* Date card */}
          <div
            style={{
              background: pal.cardBg,
              borderRadius: 14,
              border: `1px solid ${accent}20`,
              padding: mode === "card" ? "0.85rem" : "1.1rem",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <p style={{ margin: 0, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: accent }}>
              Datum &amp; Vrijeme
            </p>
            <p style={{ margin: "0.35rem 0 0", fontWeight: 600, color: pal.text, fontSize: mode === "card" ? "0.85rem" : "0.95rem" }}>
              {displayDate}
            </p>
            <p style={{ margin: "0.15rem 0 0", color: pal.textMid, fontSize: "0.85rem" }}>
              {time}
            </p>
          </div>

          {/* Location card */}
          <div
            style={{
              background: pal.cardBg,
              borderRadius: 14,
              border: `1px solid ${accent}20`,
              padding: mode === "card" ? "0.85rem" : "1.1rem",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <p style={{ margin: 0, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: accent }}>
              Lokacija
            </p>
            <p style={{ margin: "0.35rem 0 0", fontWeight: 600, color: pal.text, fontSize: mode === "card" ? "0.85rem" : "0.95rem" }}>
              {location}
            </p>
            {hosts && (
              <p style={{ margin: "0.15rem 0 0", color: pal.textMid, fontSize: "0.82rem" }}>
                {hosts}
              </p>
            )}
          </div>
        </div>

        {dressCode && (
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.82rem",
              color: pal.textMid,
              fontStyle: "italic",
            }}
          >
            Dress code: <strong style={{ fontStyle: "normal" }}>{dressCode}</strong>
          </p>
        )}
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');`}</style>
    </div>
  );
}
