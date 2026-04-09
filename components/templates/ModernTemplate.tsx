import type { InvitationTemplateProps } from "./types";

function readString(data: Record<string, unknown> | undefined, key: string): string | undefined {
  const value = data?.[key];
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function palette(selectedColor: string | undefined) {
  if (selectedColor === "gold")
    return { bg: "#0f110e", bg2: "#181a14", accent: "#d4af37", text: "#f4f0e8", textDim: "#a09870", border: "#d4af3744" };
  if (selectedColor === "rose")
    return { bg: "#130e12", bg2: "#1e1420", accent: "#d86a8d", text: "#f6edf2", textDim: "#a07888", border: "#d86a8d44" };
  return { bg: "#0e1114", bg2: "#161a20", accent: "#8ba8c8", text: "#edf2f8", textDim: "#7090a8", border: "#8ba8c844" };
}

/** Thin-line botanical SVG for a corner (top-left) */
function BotanicalCorner({
  accent,
  size,
  flip = false,
}: {
  accent: string;
  size: number;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 130"
      width={size}
      height={Math.round(size * 1.08)}
      fill="none"
      style={{ display: "block", transform: flip ? "scaleX(-1)" : undefined }}
      opacity={0.38}
    >
      {/* Corner frame lines */}
      <path d="M 0 0 L 72 0" stroke={accent} strokeWidth="0.6" />
      <path d="M 0 0 L 0 72" stroke={accent} strokeWidth="0.6" />
      <path d="M 14 0 L 14 14 L 0 14" stroke={accent} strokeWidth="0.5" opacity="0.6" />

      {/* Diagonal botanical stem */}
      <path d="M 2 2 C 28 32 55 65 72 105 C 80 125 78 128 74 130" stroke={accent} strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />
      <path d="M 30 40 C 50 32 70 24 88 18" stroke={accent} strokeWidth="0.7" strokeLinecap="round" opacity="0.4" />
      <path d="M 55 72 C 72 62 90 52 105 42" stroke={accent} strokeWidth="0.7" strokeLinecap="round" opacity="0.35" />

      {/* Leaf outlines (no fill, just stroke) */}
      <path d="M 22 32 C 8 22 6 8 16 4 C 26 0 32 18 22 32Z" stroke={accent} strokeWidth="0.6" opacity="0.45" />
      <path d="M 22 32 L 16 18" stroke={accent} strokeWidth="0.4" opacity="0.3" />

      <path d="M 46 60 C 32 50 30 36 40 32 C 50 28 56 46 46 60Z" stroke={accent} strokeWidth="0.6" opacity="0.4" />
      <path d="M 46 60 L 40 46" stroke={accent} strokeWidth="0.4" opacity="0.3" />

      <path d="M 66 88 C 52 78 52 64 62 60 C 72 56 76 74 66 88Z" stroke={accent} strokeWidth="0.6" opacity="0.38" />

      {/* Right-branch leaves */}
      <path d="M 78 20 C 84 6 96 4 100 12 C 104 20 90 28 78 20Z" stroke={accent} strokeWidth="0.6" opacity="0.4" />
      <path d="M 78 20 L 90 16" stroke={accent} strokeWidth="0.4" opacity="0.3" />
      <path d="M 95 44 C 102 30 114 28 118 36 C 122 44 108 52 95 44Z" stroke={accent} strokeWidth="0.6" opacity="0.35" />

      {/* Rose outline at stem top-left (near 6,6) */}
      <g transform="translate(6,6)">
        {/* Outer petals */}
        <ellipse cx="0" cy="-14" rx="7" ry="10" stroke={accent} strokeWidth="0.6" opacity="0.55" />
        <ellipse cx="0" cy="-14" rx="7" ry="10" stroke={accent} strokeWidth="0.6" opacity="0.5" transform="rotate(72,0,0)" />
        <ellipse cx="0" cy="-14" rx="7" ry="10" stroke={accent} strokeWidth="0.6" opacity="0.55" transform="rotate(144,0,0)" />
        <ellipse cx="0" cy="-14" rx="7" ry="10" stroke={accent} strokeWidth="0.6" opacity="0.5" transform="rotate(216,0,0)" />
        <ellipse cx="0" cy="-14" rx="7" ry="10" stroke={accent} strokeWidth="0.6" opacity="0.55" transform="rotate(288,0,0)" />
        {/* Inner petals */}
        <ellipse cx="0" cy="-7" rx="4" ry="6" stroke={accent} strokeWidth="0.5" opacity="0.45" transform="rotate(36,0,0)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" stroke={accent} strokeWidth="0.5" opacity="0.4" transform="rotate(108,0,0)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" stroke={accent} strokeWidth="0.5" opacity="0.45" transform="rotate(180,0,0)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" stroke={accent} strokeWidth="0.5" opacity="0.4" transform="rotate(252,0,0)" />
        <ellipse cx="0" cy="-7" rx="4" ry="6" stroke={accent} strokeWidth="0.5" opacity="0.45" transform="rotate(324,0,0)" />
        {/* Center */}
        <circle cx="0" cy="0" r="3.5" stroke={accent} strokeWidth="0.5" opacity="0.5" />
        <circle cx="0" cy="0" r="1.5" stroke={accent} strokeWidth="0.4" opacity="0.45" />
      </g>

      {/* Small bud on branch (78,18) */}
      <g transform="translate(80,20)">
        <path d="M -3 4 C -5 0 -4 -7 0 -11 C 4 -7 5 0 3 4Z" stroke={accent} strokeWidth="0.5" opacity="0.4" />
        <path d="M -4 4 C -7 2 -8 5 -4 4Z" stroke={accent} strokeWidth="0.4" opacity="0.35" />
        <path d="M 4 4 C 7 2 8 5 4 4Z" stroke={accent} strokeWidth="0.4" opacity="0.35" />
      </g>

      {/* Small 5-petal flower near branch end */}
      <g transform="translate(88,18)">
        <ellipse cx="0" cy="-3.5" rx="2.5" ry="3.5" stroke={accent} strokeWidth="0.45" opacity="0.4" />
        <ellipse cx="0" cy="-3.5" rx="2.5" ry="3.5" stroke={accent} strokeWidth="0.45" opacity="0.38" transform="rotate(72,0,0)" />
        <ellipse cx="0" cy="-3.5" rx="2.5" ry="3.5" stroke={accent} strokeWidth="0.45" opacity="0.4" transform="rotate(144,0,0)" />
        <ellipse cx="0" cy="-3.5" rx="2.5" ry="3.5" stroke={accent} strokeWidth="0.45" opacity="0.38" transform="rotate(216,0,0)" />
        <ellipse cx="0" cy="-3.5" rx="2.5" ry="3.5" stroke={accent} strokeWidth="0.45" opacity="0.4" transform="rotate(288,0,0)" />
        <circle cx="0" cy="0" r="1.2" stroke={accent} strokeWidth="0.4" opacity="0.45" />
      </g>

      {/* Dot cluster (berries) */}
      <circle cx="38" cy="26" r="1.8" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      <circle cx="43" cy="22" r="1.5" stroke={accent} strokeWidth="0.5" opacity="0.35" />
      <circle cx="34" cy="22" r="1.5" stroke={accent} strokeWidth="0.5" opacity="0.35" />
    </svg>
  );
}

export default function ModernTemplate({
  data,
  title = "Lea & Ivan",
  date = "20 September 2026",
  selectedColor = "default",
  mode = "full",
}: InvitationTemplateProps) {
  const couple = readString(data, "couple") ?? readString(data, "title") ?? title;
  const subtitle = readString(data, "subtitle") ?? "Minimalno, elegantno, naše";
  const location = readString(data, "location") ?? "Art Hall, Zagreb";
  const time = readString(data, "time") ?? "16:00";
  const displayDate = readString(data, "date") ?? date;
  const hosts = readString(data, "hosts") ?? "";
  const dressCode = readString(data, "dressCode") ?? "";

  const colors = palette(selectedColor);
  const cornerSize = mode === "card" ? 72 : 108;

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: `linear-gradient(145deg, ${colors.bg} 0%, ${colors.bg2} 100%)`,
        color: colors.text,
        minHeight: mode === "card" ? 265 : 420,
        border: `1px solid ${colors.border}`,
      }}
    >
      {/* Top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />

      {/* Corner botanical art — top-left */}
      <div style={{ position: "absolute", top: 2, left: 2, zIndex: 0, pointerEvents: "none" }}>
        <BotanicalCorner accent={colors.accent} size={cornerSize} />
      </div>

      {/* Corner botanical art — bottom-right (mirrored) */}
      <div
        style={{
          position: "absolute",
          bottom: 2,
          right: 2,
          zIndex: 0,
          pointerEvents: "none",
          transform: "rotate(180deg)",
        }}
      >
        <BotanicalCorner accent={colors.accent} size={Math.round(cornerSize * 0.82)} />
      </div>

      {/* Main content grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: mode === "card" ? "1fr" : "1fr auto",
          minHeight: mode === "card" ? 250 : 400,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left / main section */}
        <div
          style={{
            padding: mode === "card" ? "1.4rem 1.4rem 0.8rem" : "2.8rem 2.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 9,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: colors.accent,
            }}
          >
            — Wedding Invitation —
          </p>

          <h2
            style={{
              margin: "0.85rem 0 0",
              fontSize: mode === "card" ? "1.8rem" : "2.8rem",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              fontWeight: 600,
              color: colors.text,
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            {couple}
          </h2>

          <p
            style={{
              margin: "0.65rem 0 0",
              color: colors.textDim,
              fontSize: mode === "card" ? "0.82rem" : "0.95rem",
              fontStyle: "italic",
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>

          {mode !== "card" && (
            <div
              style={{
                marginTop: "1.8rem",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ width: 32, height: 1, background: colors.accent, opacity: 0.55 }} />
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: colors.textDim,
                }}
              >
                Est. 2026
              </span>
            </div>
          )}
        </div>

        {/* Right section — date & details */}
        <div
          style={{
            padding: mode === "card" ? "0.8rem 1.4rem 1.2rem" : "2.8rem 2.2rem",
            borderTop: mode === "card" ? `1px solid ${colors.accent}30` : "none",
            borderLeft: mode === "card" ? "none" : `1px solid ${colors.accent}30`,
            minWidth: mode === "card" ? "auto" : 210,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: mode === "card" ? "0.75rem" : "1.1rem",
          }}
        >
          {/* Date */}
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 8,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: colors.accent,
              }}
            >
              Datum
            </p>
            <p
              style={{
                margin: "0.4rem 0 0",
                fontWeight: 700,
                fontSize: mode === "card" ? "1rem" : "1.15rem",
                color: colors.text,
                lineHeight: 1.2,
              }}
            >
              {displayDate}
            </p>
            <p
              style={{
                margin: "0.2rem 0 0",
                color: colors.textDim,
                fontSize: "0.85rem",
              }}
            >
              {time}
            </p>
          </div>

          {/* Location */}
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 8,
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: colors.accent,
              }}
            >
              Lokacija
            </p>
            <p
              style={{
                margin: "0.4rem 0 0",
                color: `${colors.text}dd`,
                fontSize: mode === "card" ? "0.82rem" : "0.9rem",
                lineHeight: 1.4,
              }}
            >
              {location}
            </p>
          </div>

          {/* Hosts */}
          {hosts && (
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: colors.accent,
                }}
              >
                Domaćini
              </p>
              <p
                style={{
                  margin: "0.4rem 0 0",
                  color: colors.textDim,
                  fontSize: "0.85rem",
                }}
              >
                {hosts}
              </p>
            </div>
          )}

          {/* Dress code */}
          {dressCode && (
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.25em",
                  color: colors.accent,
                }}
              >
                Dress code
              </p>
              <p
                style={{
                  margin: "0.4rem 0 0",
                  color: colors.textDim,
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                }}
              >
                {dressCode}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom RSVP bar */}
      <div
        style={{
          borderTop: `1px solid ${colors.accent}22`,
          padding: mode === "card" ? "0.65rem 1.4rem" : "0.85rem 2.5rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.accent }} />
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            border: `1px solid ${colors.accent}`,
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: 8,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: colors.textDim,
          }}
        >
          RSVP Open
        </p>

        {/* Right-side thin decorative line */}
        <div style={{ flex: 1, height: "0.5px", background: `linear-gradient(90deg, ${colors.accent}44, transparent)`, marginLeft: 8 }} />
      </div>

      {/* Bottom accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />
    </div>
  );
}
