import Image from "next/image";
import type { InvitationTemplateProps, FieldDef } from "./types";

export const schema: FieldDef[] = [
  { key: "couple",   label: "Imena para",            type: "text",     required: true, placeholder: "Olivia & Taylor" },
  { key: "datetime", label: "Datum i vrijeme",        type: "text",     placeholder: "AT 3PM, 30TH OCTOBER 2023" },
  { key: "venue",    label: "Naziv lokacije",         type: "text",     placeholder: "Anywhere Hotel" },
  { key: "address",  label: "Adresa lokacije",        type: "text",     placeholder: "123 Anywhere Street., Any City" },
  { key: "subtitle", label: "Uvodni tekst",           type: "textarea", rows: 2, placeholder: "REQUEST THE PLEASURE OF YOUR COMPANY\nAT THEIR WEDDING CELEBRATION" },
  { key: "note",     label: "Napomena (footer)",      type: "text",     placeholder: "Reception to Follow" },
];

function readString(data: Record<string, unknown> | undefined, key: string): string | undefined {
  const v = data?.[key];
  return typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;
}

function splitNames(couple: string): { name1: string; name2: string } {
  const s = couple.replace(/\s+/g, " ").trim();
  for (const sep of [" & ", " i ", " and ", " And "]) {
    if (s.toLowerCase().includes(sep.trim().toLowerCase())) {
      const parts = s.split(new RegExp(sep.trim(), "i")).map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2) return { name1: parts[0], name2: parts[1] };
    }
  }
  const words = s.split(" ").filter(Boolean);
  if (words.length >= 2) return { name1: words[0], name2: words.slice(1).join(" ") };
  return { name1: s || "Olivia", name2: "Taylor" };
}


function CornerBracket({
  position,
  size,
  color,
  thickness,
}: {
  position: "tl" | "br";
  size: number;
  color: string;
  thickness: number;
}) {
  const isTL = position === "tl";
  return (
    <svg
      width={size}
      height={size}
      style={{
        position: "absolute",
        top: isTL ? 0 : "auto",
        bottom: isTL ? "auto" : 0,
        left: isTL ? 0 : "auto",
        right: isTL ? "auto" : 0,
        display: "block",
      }}
      overflow="visible"
    >
      {isTL ? (
        <>
          <line x1={0} y1={size} x2={0} y2={0} stroke={color} strokeWidth={thickness} />
          <line x1={0} y1={0} x2={size} y2={0} stroke={color} strokeWidth={thickness} />
        </>
      ) : (
        <>
          <line x1={size} y1={0} x2={size} y2={size} stroke={color} strokeWidth={thickness} />
          <line x1={0} y1={size} x2={size} y2={size} stroke={color} strokeWidth={thickness} />
        </>
      )}
    </svg>
  );
}

export default function BotanicTemplate({
  data,
  title = "Olivia & Taylor",
  date = "AT 3PM, 30TH OCTOBER 2023",
  mode = "full",
}: InvitationTemplateProps) {
  const isCard = mode === "card";

  const couple    = readString(data, "couple") ?? readString(data, "title") ?? title;
  const { name1, name2 } = splitNames(couple);
  const datetime  = readString(data, "datetime") ?? readString(data, "date") ?? date;
  const venue     = readString(data, "venue") ?? readString(data, "location") ?? "Anywhere Hotel";
  const address   = readString(data, "address") ?? "123 Anywhere Street., Any City";
  const subtitleRaw = readString(data, "subtitle") ??
    "REQUEST THE PLEASURE OF YOUR COMPANY\nAT THEIR WEDDING CELEBRATION";
  const note      = readString(data, "note") ?? "Reception to Follow";

  const BG           = "#f5ede2";
  const TEXT_DARK    = "#2c2826";
  const TEXT_MID     = "#5a5654";
  const BRACKET_CLR  = "#a09895";
  const BRACKET_SZ   = isCard ? 22 : 34;
  const BRACKET_T    = isCard ? 0.8 : 1.1;
  const SVG_SIZE     = isCard ? 82 : 130;
  const PAD_H        = isCard ? "1.2rem" : "2rem";
  const PAD_V        = isCard ? "1.2rem" : "2rem";

  const subtitleLines = subtitleRaw.split(/\n|\\n/).map((l) => l.trim()).filter(Boolean);

  return (
    <div
      style={{
        background: BG,
        position: "relative",
        width: "100%",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        paddingTop: PAD_V,
        paddingBottom: isCard ? "1.4rem" : "2.2rem",
        paddingLeft: PAD_H,
        paddingRight: PAD_H,
        boxSizing: "border-box",
      }}
    >
      {/* Corner brackets */}
      <CornerBracket position="tl" size={BRACKET_SZ} color={BRACKET_CLR} thickness={BRACKET_T} />
      <CornerBracket position="br" size={BRACKET_SZ} color={BRACKET_CLR} thickness={BRACKET_T} />

      {/* ── TOP ROW: Names left + Illustration right ── */}
      <div style={{ display: "flex", alignItems: "flex-start", marginBottom: isCard ? "0.8rem" : "1.3rem" }}>
        {/* Names */}
        <div style={{ flex: 1, paddingRight: "0.5rem" }}>
          <div
            style={{
              fontSize: isCard ? "2.05rem" : "3.3rem",
              fontWeight: 300,
              color: TEXT_DARK,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              lineHeight: 1.1,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            {name1}
          </div>
          <div
            style={{
              fontSize: isCard ? "1.25rem" : "2rem",
              fontStyle: "italic",
              color: TEXT_DARK,
              lineHeight: 1.2,
              margin: isCard ? "0.05rem 0 0.05rem 0.1rem" : "0.05rem 0 0.05rem 0.15rem",
              fontFamily: "'Great Vibes', cursive",
              letterSpacing: "0.04em",
            }}
          >
            and
          </div>
          <div
            style={{
              fontSize: isCard ? "2.05rem" : "3.3rem",
              fontWeight: 300,
              color: TEXT_DARK,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              lineHeight: 1.1,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            {name2}
          </div>
        </div>

        {/* Botanical illustration */}
        <div
          style={{
            width: SVG_SIZE,
            height: Math.round(SVG_SIZE * 1.52),
            flexShrink: 0,
            marginTop: isCard ? "-0.5rem" : "-0.8rem",
            marginRight: isCard ? "-0.2rem" : "-0.4rem",
          }}
        >
          <Image src="/cvijet.png" alt="botanical illustration" width={250} height={Math.round(250 * 1.52)} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
        </div>
      </div>

      {/* ── SUBTITLE ── */}
      {!isCard && (
        <div style={{ marginBottom: "1.4rem" }}>
          {subtitleLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: TEXT_MID,
                lineHeight: 1.9,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 500,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      )}

      {/* ── DATE / TIME ── */}
      <div
        style={{
          fontSize: isCard ? "0.62rem" : "0.85rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: TEXT_DARK,
          marginBottom: isCard ? "0.45rem" : "0.7rem",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        {datetime}
      </div>

      {/* ── VENUE / ADDRESS ── */}
      {!isCard && (
        <>
          <div
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: TEXT_MID,
              lineHeight: 1.8,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400,
            }}
          >
            {venue}
          </div>
          <div
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: TEXT_MID,
              lineHeight: 1.8,
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400,
              marginBottom: "1.6rem",
            }}
          >
            {address}
          </div>
        </>
      )}

      {/* ── FOOTER NOTE ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isCard ? "0.4rem" : "0.6rem",
          marginTop: isCard ? "0.2rem" : "0",
        }}
      >
        <div
          style={{
            fontSize: isCard ? "0.95rem" : "1.35rem",
            fontStyle: "italic",
            color: TEXT_DARK,
            fontFamily: "'Great Vibes', cursive",
            letterSpacing: "0.03em",
            whiteSpace: "nowrap",
          }}
        >
          {note}
        </div>
        {!isCard && (
          <div
            style={{
              flex: 1,
              height: "0.5px",
              background: BRACKET_CLR,
              marginBottom: "0.1rem",
            }}
          />
        )}
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');`}</style>
    </div>
  );
}
