import { templateRegistry, type TemplateKey } from "@/components/templates/registry";

type InvitationPreviewProps = {
  title?: string;
  date?: string;
  selectedColor?: string;
  data?: Record<string, unknown>;
};

const previewTheme: Record<string, string> = {
  default: "from-amber-50 to-rose-50 border-amber-200 text-amber-950",
  gold: "from-yellow-50 to-amber-100 border-yellow-300 text-yellow-950",
  ivory: "from-stone-50 to-zinc-100 border-stone-300 text-stone-900",
  rose: "from-rose-50 to-pink-100 border-rose-300 text-rose-950",
};

function readStringField(data: Record<string, unknown> | undefined, key: string): string | undefined {
  const raw = data?.[key];
  return typeof raw === "string" && raw.trim().length > 0 ? raw.trim() : undefined;
}

function getTemplateKey(data?: Record<string, unknown>): TemplateKey {
  const raw = data?.layout;
  if (raw === "classic" || raw === "garden" || raw === "modern") {
    return raw;
  }
  return "classic";
}

export default function InvitationPreview({
  title = "Sample Event",
  date = "June 12, 2026",
  selectedColor = "default",
  data,
}: InvitationPreviewProps) {
  const key = getTemplateKey(data);
  const TemplateComponent = templateRegistry[key];
  const theme = previewTheme[selectedColor] ?? previewTheme.default;
  const note =
    readStringField(data, "note") ??
    "Molimo vas da svoj dolazak potvrdite kroz RSVP formu ispod.";

  return (
    <section
      className={`overflow-hidden rounded-2xl border bg-linear-to-br p-0 shadow-sm ${theme}`}
    >
      <TemplateComponent
        title={title}
        date={date}
        selectedColor={selectedColor}
        data={data}
        mode="full"
      />

      <div className="border-t border-black/10 px-6 py-5">
        <p className="text-sm opacity-90">{note}</p>
      </div>
    </section>
  );
}
