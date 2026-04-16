import type { InvitationTemplateProps, FieldDef } from "./types";

export const schema: FieldDef[] = [
  { key: "couple",       label: "Imena para",              type: "text",    required: true,  placeholder: "Mia & Tomislav" },
  { key: "date",         label: "Datum vjenčanja",          type: "text",    placeholder: "19. kolovoza 2023. godine" },
  { key: "time",         label: "Vrijeme ceremonije",       type: "text",    placeholder: "17:00" },
  { key: "venue",        label: "Lokacija ceremonije",      type: "text",    placeholder: "Crkva sv. Ante, Zadar" },
  { key: "address",      label: "Lokacija večere",          type: "text",    placeholder: "Restoran More" },
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
  return { name1: s || "Mia", name2: "Tomislav" };
}

function TimelineSection({
  title,
  lines,
  isCard,
  last = false,
}: {
  title: string;
  lines: string[];
  isCard: boolean;
  last?: boolean;
}) {
  return (
    <div style={{ marginBottom: last ? 0 : isCard ? "0.65rem" : "0.95rem" }}>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: isCard ? "0.58rem" : "0.64rem",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: "#1e1a10",
          borderBottom: "0.5px solid #cfc3a8",
          paddingBottom: "0.18rem",
          marginBottom: "0.28rem",
        }}
      >
        {title}
      </div>
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: isCard ? "0.68rem" : "0.76rem",
            color: "#4a4030",
            lineHeight: 1.6,
            fontWeight: 300,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

export default function EleganceTemplate({
  data,
  title = "Mia & Tomislav",
  date = "19. kolovoza 2023. godine",
  mode = "full",
}: InvitationTemplateProps) {
  const couple = readString(data, "couple") ?? readString(data, "title") ?? title;
  const names = splitNames(couple);
  const displayDate = readString(data, "date") ?? date;
  const displayTime = readString(data, "time") ?? "17:00";
  const displayVenue = readString(data, "venue") ?? readString(data, "location") ?? "Crkva sv. Ante, Zadar";
  const displayAddress = readString(data, "address") ?? "Restoran More";
  const rsvpDeadline = readString(data, "rsvpDeadline") ?? "";
  const displayNote = readString(data, "note") ?? "";
  const displayHosts = readString(data, "hosts") ?? "";

  const isCard = mode === "card";

  // dekor_01.png has two botanical arrangements stacked vertically.
  // Natural aspect ratio ≈ 1:2.25 (portrait).
  // Top arrangement lives in top ~46% | Bottom arrangement in bottom ~46%.
  const imgW = isCard ? 88 : 128;
  const clipH = Math.round(imgW * 2.25 * 0.46);

  const hPad = isCard ? "1.4rem" : "2.2rem";

  return (
    <div
      style={{
        background: "#ede8e0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isCard ? "0.5rem" : "1.5rem",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          width: "100%",
          maxWidth: 440,
          position: "relative",
          boxShadow: "0 32px 96px rgba(30,20,0,0.12), 0 6px 24px rgba(30,20,0,0.07)",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        {/* ── TOP: Names left + Top flower right ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            paddingTop: isCard ? "1.4rem" : "2.2rem",
            paddingLeft: hPad,
            paddingBottom: isCard ? "1rem" : "1.4rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: isCard ? "2.6rem" : "3.8rem",
                color: "#0f0d08",
                lineHeight: 1.05,
              }}
            >
              {names.name1}
            </div>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: isCard ? "0.85rem" : "0.95rem",
                color: "#8a8070",
                lineHeight: 1,
                margin: "0.15rem 0 0.1rem 0.15rem",
              }}
            >
              &amp;
            </div>
            <div
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: isCard ? "2.6rem" : "3.8rem",
                color: "#0f0d08",
                lineHeight: 1.05,
              }}
            >
              {names.name2}
            </div>
          </div>

          {/* Top arrangement — clip lower portion of dekor_01.png */}
          <div
            style={{
              width: imgW,
              height: clipH,
              overflow: "hidden",
              flexShrink: 0,
              marginTop: isCard ? "-0.4rem" : "-0.6rem",
            }}
          >
            <img
              src="/dekor_01.png"
              alt=""
              style={{ width: "100%", display: "block" }}
            />
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          style={{
            height: "0.5px",
            background: "linear-gradient(90deg, transparent, #cfc3a8 20%, #cfc3a8 80%, transparent)",
            margin: `0 ${hPad}`,
          }}
        />

        {/* ── MIDDLE: Tagline + Date ── */}
        <div
          style={{
            textAlign: "center",
            padding: isCard ? "0.9rem 1.4rem 0.85rem" : "1.3rem 2.2rem 1.2rem",
          }}
        >
          <div
            style={{
              fontSize: isCard ? "0.59rem" : "0.67rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#6a5c3a",
              marginBottom: "0.5rem",
              fontWeight: 500,
            }}
          >
            Svoju ljubav okrunit će brakom
          </div>
          <div
            style={{
              fontStyle: "italic",
              fontSize: isCard ? "1rem" : "1.13rem",
              color: "#1e1a10",
              letterSpacing: "0.02em",
              fontWeight: 300,
            }}
          >
            {displayDate}
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          style={{
            height: "0.5px",
            background: "linear-gradient(90deg, transparent, #cfc3a8 20%, #cfc3a8 80%, transparent)",
            margin: `0 ${hPad}`,
          }}
        />

        {/* ── LOWER: Bottom flower left + Timeline right ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            paddingBottom: isCard ? "0.8rem" : "1.2rem",
          }}
        >
          {/* Bottom arrangement — clip top portion, mirror horizontally */}
          <div
            style={{
              width: imgW,
              height: clipH,
              overflow: "hidden",
              flexShrink: 0,
              transform: "scaleX(-1)",
              position: "relative",
              marginTop: isCard ? "0.2rem" : "0.3rem",
            }}
          >
            <img
              src="/dekor_01.png"
              alt=""
              style={{
                width: "100%",
                display: "block",
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
            />
          </div>

          {/* Event timeline */}
          <div
            style={{
              flex: 1,
              paddingLeft: isCard ? "0.6rem" : "0.9rem",
              paddingRight: isCard ? "1.2rem" : "1.8rem",
              paddingTop: isCard ? "0.9rem" : "1.3rem",
            }}
          >
            <TimelineSection
              title="Okupljanje"
              lines={
                displayHosts
                  ? [`Kod ${displayHosts} - 13:00 sati`, "Kod mlade - 14:30 sati"]
                  : ["Kod mladoženje - 13:00 sati", "Kod mlade - 14:30 sati"]
              }
              isCard={isCard}
            />
            <TimelineSection
              title="Vjenčanje"
              lines={[displayVenue, `${displayTime} sati`]}
              isCard={isCard}
            />
            <TimelineSection
              title="Večera"
              lines={[displayAddress, "20:00 sati"]}
              isCard={isCard}
              last
            />
          </div>
        </div>

        {/* ── DIVIDER ── */}
        <div
          style={{
            height: "0.5px",
            background: "linear-gradient(90deg, transparent, #cfc3a8 20%, #cfc3a8 80%, transparent)",
            margin: `0 ${hPad}`,
          }}
        />

        {/* ── FOOTER ── */}
        <div
          style={{
            textAlign: "center",
            padding: isCard ? "0.75rem 1.4rem 1.3rem" : "1.1rem 2.2rem 1.8rem",
          }}
        >
          <div
            style={{
              fontStyle: "italic",
              fontSize: isCard ? "0.8rem" : "0.9rem",
              color: "#2a2212",
              marginBottom: rsvpDeadline ? "0.35rem" : 0,
              fontWeight: 300,
            }}
          >
            {displayNote || "Veselimo se Vašem dolasku!"}
          </div>
          {rsvpDeadline && (
            <div
              style={{
                fontSize: isCard ? "0.68rem" : "0.76rem",
                color: "#6a5c3a",
                letterSpacing: "0.01em",
                fontWeight: 400,
              }}
            >
              Molimo potvrditi dolazak do {rsvpDeadline}.
            </div>
          )}
        </div>

        <style>{`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');`}</style>
      </div>
    </div>
  );
}
