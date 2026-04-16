import Link from "next/link";
import { templateRegistry } from "./templates/registry";
import type { TemplateKey } from "./templates/registry";

type TemplateCardProps = {
  id: string;
  name: string;
  category: string;
  colorVariants?: string[];
  defaultData?: Record<string, unknown>;
};

function readString(
  data: Record<string, unknown> | undefined,
  key: string
): string | undefined {
  const value = data?.[key];
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function getTemplateKey(value: string | undefined): TemplateKey {
  if (value && value in templateRegistry) return value as TemplateKey;
  return "elegance";
}

const colorSwatches: Record<string, string> = {
  default: "#b8a06a",
  gold: "#d4af37",
  ivory: "#c8c0b0",
  rose: "#d08080",
};

const colorLabels: Record<string, string> = {
  default: "Topla",
  gold: "Zlatna",
  ivory: "Bjelokosna",
  rose: "Ružičasta",
};

// Width at which the template is rendered before scaling.
// Must match or exceed the template's maxWidth so it renders fully.
const RENDER_WIDTH = 440;
// Visual scale — template appears at RENDER_WIDTH * SCALE px wide in the card.
const SCALE = 0.68;
// Container height in px — controls how much of the template is revealed.
const PREVIEW_HEIGHT = 260;

export default function TemplateCard({
  id,
  name,
  category,
  colorVariants = [],
  defaultData,
}: TemplateCardProps) {
  const title =
    readString(defaultData, "couple") ??
    readString(defaultData, "title") ??
    name;
  const date = readString(defaultData, "date") ?? "Datum TBD";
  const layoutKey = getTemplateKey(readString(defaultData, "layout"));
  const TemplateComponent = templateRegistry[layoutKey];
  const variants = colorVariants.length ? colorVariants : ["default"];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl">

      {/* ── Real template preview (scaled) ── */}
      <div
        className="relative overflow-hidden border-b border-stone-200"
        style={{ height: PREVIEW_HEIGHT }}
      >
        {/* Scaled template */}
        <div
          style={{
            width: RENDER_WIDTH,
            position: "absolute",
            top: 0,
            left: "50%",
            transformOrigin: "top center",
            transform: `translateX(-50%) scale(${SCALE})`,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <TemplateComponent
            data={defaultData}
            title={title}
            date={date}
            mode="card"
          />
        </div>

        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/0 transition-all duration-300 group-hover:bg-black/30">
          <div className="flex translate-y-4 flex-col items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Link
              href={`/templates/${id}`}
              className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-stone-900 shadow-lg transition-colors hover:bg-stone-50"
            >
              Pregledaj pozivnicu
            </Link>
            <Link
              href={`/create/${id}`}
              className="rounded-xl bg-rose-700 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-rose-800"
            >
              Koristi ovaj templejt
            </Link>
          </div>
        </div>
      </div>

      {/* ── Card info ── */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-stone-900">{name}</h3>
            <p className="mt-0.5 text-xs text-stone-500">{category}</p>
          </div>
          <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-500">
            {layoutKey}
          </span>
        </div>

        {/* Color swatches */}
        <div className="mt-3">
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-widest text-stone-400">
            Boje
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => (
              <div
                key={`${id}-${variant}`}
                className="flex items-center gap-1.5"
                title={colorLabels[variant] ?? variant}
              >
                <span
                  className="block h-4 w-4 rounded-full border border-stone-200 shadow-sm"
                  style={{ backgroundColor: colorSwatches[variant] ?? "#aaa" }}
                />
                <span className="text-[11px] text-stone-500">
                  {colorLabels[variant] ?? variant}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/create/${id}`}
            className="block w-full rounded-xl bg-rose-700 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-rose-800"
          >
            Koristi ovaj templejt
          </Link>
          <Link
            href={`/templates/${id}`}
            className="block w-full rounded-xl border border-stone-200 py-2.5 text-center text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50"
          >
            Pregledaj
          </Link>
        </div>
      </div>
    </article>
  );
}
