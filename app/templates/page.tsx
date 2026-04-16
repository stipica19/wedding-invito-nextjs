import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/Template";
import TemplateCard from "@/components/TemplateCard";

type TemplateItem = {
  id: string;
  name: string;
  category: string;
  colorVariants?: string[];
  defaultData?: Record<string, unknown>;
};

async function getTemplates(): Promise<TemplateItem[]> {
  try {
    await connectToDatabase();
    const templates = await Template.find()
      .select("_id name category colorVariants defaultData")
      .lean();
    return templates.map((t) => ({
      id: String(t._id),
      name: t.name,
      category: t.category,
      colorVariants: t.colorVariants ?? [],
      defaultData: (t.defaultData as Record<string, unknown>) ?? {},
    }));
  } catch {
    return [];
  }
}

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <div className="w-full">
      {/* Page header */}
      <section className="border-b border-stone-200 bg-linear-to-br from-rose-50 via-stone-50 to-amber-50 px-6 py-16 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-rose-600">
          Kolekcija
        </span>
        <h1 className="font-display mt-3 text-4xl font-bold text-stone-900 sm:text-5xl">
          Odaberite templejt
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-stone-600">
          Svaki dizajn možete prilagoditi bojama, datumom i sadržajem. Izaberite
          stil koji vas opisuje.
        </p>
      </section>

      {/* Template grid */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        {templates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center">
            <p className="text-sm text-stone-500">
              Nema templejta. Posjetite{" "}
              <code className="rounded bg-stone-100 px-1 py-0.5 text-xs">
                /api/dev/seed-templates
              </code>{" "}
              da ubacite 3 osnovna.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <TemplateCard
                key={t.id}
                id={t.id}
                name={t.name}
                category={t.category}
                colorVariants={t.colorVariants}
                defaultData={t.defaultData}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
