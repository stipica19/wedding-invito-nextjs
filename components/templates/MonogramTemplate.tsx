import Image from "next/image";
import type { InvitationTemplateProps, FieldDef } from "./types";

export const schema: FieldDef[] = [
  { key: "couple",      label: "Imena para",       type: "text", required: true, placeholder: "Harumi & Morgan" },
  { key: "dayOfWeek",   label: "Dan u sedmici",     type: "text", placeholder: "FRIDAY" },
  { key: "month",       label: "Mjesec",             type: "text", placeholder: "JUNE" },
  { key: "day",         label: "Dan (broj)",         type: "text", placeholder: "29" },
  { key: "year",        label: "Godina",             type: "text", placeholder: "2023" },
  { key: "time",        label: "Vrijeme",            type: "text", placeholder: "AT 5 PM" },
  { key: "venue",       label: "Naziv lokacije",     type: "text", placeholder: "AT SALFORD PARK" },
  { key: "address",     label: "Adresa",             type: "text", placeholder: "123 Anywhere St., Any City, ST 12345" },
  { key: "rsvpDate",    label: "RSVP rok",           type: "text", placeholder: "May 29 2023" },
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
  return { name1: s || "Harumi", name2: "Morgan" };
}

export default function MonogramTemplate({
  data,
  title = "Harumi & Morgan",
  date = "29",
  mode = "full",
}: InvitationTemplateProps) {
  const isCard = mode === "card";

  const couple   = readString(data, "couple")    ?? readString(data, "title") ?? title;
  const { name1, name2 } = splitNames(couple);
  const initial1 = name1.charAt(0).toUpperCase();
  const initial2 = name2.charAt(0).toUpperCase();

  const dayOfWeek = readString(data, "dayOfWeek") ?? "FRIDAY";
  const month     = readString(data, "month")     ?? "JUNE";
  const day       = readString(data, "day")       ?? readString(data, "date") ?? date ?? "29";
  const year      = readString(data, "year")      ?? "2023";
  const time      = readString(data, "time")      ?? "AT 5 PM";
  const venue     = readString(data, "venue")     ?? "AT SALFORD PARK";
  const address   = readString(data, "address")   ?? "123 Anywhere St., Any City, ST 12345";
  const rsvpDate  = readString(data, "rsvpDate")  ?? "May 29 2023";

  const BG        = "#efefed";
  const TEXT      = "#1c1c1c";
  const TEXT_LIGHT = "#555";
  const LINE      = "#1c1c1c";

  const pad       = isCard ? "1.4rem 1.2rem" : "2.8rem 2.2rem";
  const headerSz  = isCard ? "0.48rem" : "0.6rem";
  const initialSz = isCard ? "4.2rem" : "7.2rem";
  const nameSz    = isCard ? "0.55rem" : "0.78rem";
  const imgSize   = isCard ? 52 : 90;
  const dateDaySz = isCard ? "2.2rem" : "3.8rem";
  const dateSmSz  = isCard ? "0.48rem" : "0.62rem";
  const venueSz   = isCard ? "0.62rem" : "0.82rem";
  const addrSz    = isCard ? "0.52rem" : "0.66rem";
  const rsvpSz    = isCard ? "0.44rem" : "0.58rem";
  const dividerH  = isCard ? "56px" : "90px";

  return (
    <div
      style={{
        background: BG,
        width: "100%",
        boxSizing: "border-box",
        padding: pad,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: isCard ? "0.7rem" : "1.4rem",
      }}
    >
      {/* THE WEDDING CEREMONY OF */}
      <div
        style={{
          fontSize: headerSz,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: TEXT_LIGHT,
          fontWeight: 500,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        The Wedding Ceremony Of
      </div>

      {/* MONOGRAM ROW: H  [dekor]  M */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isCard ? "0.3rem" : "0.6rem",
          lineHeight: 1,
        }}
      >
        <span
          style={{
            fontSize: initialSz,
            fontWeight: 700,
            color: TEXT,
            fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {initial1}
        </span>

        <div
          style={{
            width: imgSize,
            height: imgSize,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/dekor_01.png"
            alt="botanical decoration"
            width={imgSize}
            height={imgSize}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        <span
          style={{
            fontSize: initialSz,
            fontWeight: 700,
            color: TEXT,
            fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {initial2}
        </span>
      </div>

      {/* HARUMI AND MORGAN */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isCard ? "0.5rem" : "0.9rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontSize: nameSz,
          color: TEXT,
          fontWeight: 600,
        }}
      >
        <span>{name1}</span>
        <span style={{ fontWeight: 400, letterSpacing: "0.15em", color: TEXT_LIGHT }}>and</span>
        <span>{name2}</span>
      </div>

      {/* DIVIDER */}
      <div style={{ width: "100%", height: "1px", background: LINE, opacity: 0.2 }} />

      {/* DATE ROW: FRIDAY | JUNE 29 2023 | AT 5 PM */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          gap: 0,
          width: "100%",
        }}
      >
        {/* FRIDAY */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: isCard ? "0.6rem" : "1rem",
            borderRight: `1px solid ${LINE}`,
          }}
        >
          <span
            style={{
              fontSize: dateSmSz,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: TEXT,
              fontWeight: 500,
              border: `1px solid ${LINE}`,
              padding: isCard ? "0.25rem 0.5rem" : "0.35rem 0.8rem",
            }}
          >
            {dayOfWeek}
          </span>
        </div>

        {/* CENTER: JUNE / 29 / 2023 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isCard ? "0 0.8rem" : "0 1.4rem",
            gap: "0.05rem",
            height: dividerH,
          }}
        >
          <span
            style={{
              fontSize: dateSmSz,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: TEXT,
              fontWeight: 500,
            }}
          >
            {month}
          </span>
          <span
            style={{
              fontSize: dateDaySz,
              fontWeight: 700,
              color: TEXT,
              lineHeight: 1,
              fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
            }}
          >
            {day}
          </span>
          <span
            style={{
              fontSize: dateSmSz,
              letterSpacing: "0.2em",
              color: TEXT,
              fontWeight: 400,
            }}
          >
            {year}
          </span>
        </div>

        {/* AT 5 PM */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: isCard ? "0.6rem" : "1rem",
            borderLeft: `1px solid ${LINE}`,
          }}
        >
          <span
            style={{
              fontSize: dateSmSz,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: TEXT,
              fontWeight: 500,
            }}
          >
            {time}
          </span>
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ width: "100%", height: "1px", background: LINE, opacity: 0.2 }} />

      {/* VENUE */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: isCard ? "0.2rem" : "0.35rem" }}>
        <div
          style={{
            fontSize: venueSz,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: TEXT,
          }}
        >
          {venue}
        </div>
        <div
          style={{
            fontSize: addrSz,
            letterSpacing: "0.06em",
            color: TEXT_LIGHT,
            fontWeight: 400,
          }}
        >
          {address}
        </div>
      </div>

      {/* RSVP */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.1rem",
          marginTop: isCard ? "0.1rem" : "0.3rem",
        }}
      >
        <div
          style={{
            fontSize: rsvpSz,
            fontStyle: "italic",
            color: TEXT_LIGHT,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          Your Reply Requested By
        </div>
        <div
          style={{
            fontSize: rsvpSz,
            fontStyle: "italic",
            fontWeight: 600,
            color: TEXT,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}
        >
          {rsvpDate}
        </div>
      </div>
    </div>
  );
}
