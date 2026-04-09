import Link from "next/link";

type TemplateCardProps = {
  id: string;
  name: string;
  category: string;
  colorVariants?: string[];
  defaultData?: Record<string, unknown>;
};

type TemplateLayout = "classic" | "garden" | "modern";

function readString(
  data: Record<string, unknown> | undefined,
  key: string
): string | undefined {
  const value = data?.[key];
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function normalizeLayout(value: string | undefined): TemplateLayout {
  if (value === "garden" || value === "modern") return value;
  return "classic";
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

function ClassicPreview({
  title,
  subtitle,
  date,
  location,
}: {
  title: string;
  subtitle: string;
  date: string;
  location: string;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-amber-50 to-rose-50 p-6 text-center">
      <p className="text-[10px] uppercase tracking-[0.2em] text-amber-700">
        — vjenčanje —
      </p>
      <p
        className="mt-2 text-lg font-semibold leading-tight text-stone-800"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {title}
      </p>
      <p className="mt-1 text-[11px] italic text-stone-500">{subtitle}</p>
      <div className="my-3 h-px w-12 bg-amber-300" />
      <p className="text-[11px] text-stone-600">{date}</p>
      <p className="text-[11px] text-stone-500">{location}</p>
    </div>
  );
}

function GardenPreview({
  title,
  subtitle,
  date,
  location,
}: {
  title: string;
  subtitle: string;
  date: string;
  location: string;
}) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-emerald-50 to-teal-50 p-6 text-center">
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/30" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-emerald-100/60" />
      <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-700">
        Garden Wedding
      </p>
      <p
        className="mt-2 text-lg font-semibold italic leading-tight text-stone-800"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {title}
      </p>
      <p className="mt-1 text-[11px] text-stone-500">{subtitle}</p>
      <p className="mt-3 text-[11px] text-stone-600">{date}</p>
      <p className="text-[11px] text-stone-500">{location}</p>
    </div>
  );
}

function ModernPreview({
  title,
  subtitle,
  date,
  location,
}: {
  title: string;
  subtitle: string;
  date: string;
  location: string;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-linear-to-br from-stone-800 to-stone-900 p-6 text-center">
      <p className="text-[9px] uppercase tracking-[0.25em] text-amber-400">
        — marriage ceremony —
      </p>
      <p
        className="mt-2 text-lg font-semibold leading-tight text-white"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {title}
      </p>
      <p className="mt-1 text-[11px] text-stone-400">{subtitle}</p>
      <div className="my-3 h-px w-8 bg-amber-500" />
      <p className="text-[11px] text-stone-300">{date}</p>
      <p className="text-[11px] text-stone-500">{location}</p>
    </div>
  );
}

export default function TemplateCard({
  id,
  name,
  category,
  colorVariants = [],
  defaultData,
}: TemplateCardProps) {
  const title = readString(defaultData, "title") ?? name;
  const subtitle =
    readString(defaultData, "subtitle") ?? "Vjenčana pozivnica";
  const date = readString(defaultData, "date") ?? "Datum TBD";
  const location = readString(defaultData, "location") ?? "Lokacija TBD";
  const layout = normalizeLayout(readString(defaultData, "layout"));
  const variants = colorVariants.length ? colorVariants : ["default"];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:border-rose-200 hover:shadow-md">
      {/* Template visual preview */}
      <div className="h-52 border-b border-stone-200">
        {layout === "garden" ? (
          <GardenPreview
            title={title}
            subtitle={subtitle}
            date={date}
            location={location}
          />
        ) : layout === "modern" ? (
          <ModernPreview
            title={title}
            subtitle={subtitle}
            date={date}
            location={location}
          />
        ) : (
          <ClassicPreview
            title={title}
            subtitle={subtitle}
            date={date}
            location={location}
          />
        )}
      </div>

      {/* Card info */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-stone-900">{name}</h3>
            <p className="mt-0.5 text-xs text-stone-500">{category}</p>
          </div>
          <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-500">
            {layout}
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
        <div className="mt-4">
          <Link
            href={`/create/${id}`}
            className="block w-full rounded-xl bg-rose-700 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-rose-800"
          >
            Koristi ovaj templejt
          </Link>
        </div>
      </div>
    </article>
  );
}
