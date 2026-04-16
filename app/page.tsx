import Link from "next/link";
import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/Template";
import TemplateCard from "@/components/TemplateCard";

type TemplateItem = {
  id: string;
  name: string;
  category: string;
  colorVariants: string[];
  defaultData: Record<string, unknown>;
};

async function getFeaturedTemplates(): Promise<TemplateItem[]> {
  try {
    await connectToDatabase();
    const items = await Template.find()
      .sort({ createdAt: 1 })
      .limit(3)
      .select("_id name category colorVariants defaultData")
      .lean();
    return items.map((t) => ({
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

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    title: "Lijepi dizajni",
    description:
      "Biraje između klasičnog, vrtnog ili modernog stila. Svaki templejt prilagodite vašim bojama i ukusu.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    title: "Instant dijeljenje",
    description:
      "Dobijte jedinstveni link koji možete odmah podijeliti s gostima putem WhatsAppa, emaila ili SMS-a.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    title: "Praćenje RSVP-a",
    description:
      "Vidite u realnom vremenu ko dolazi, ko ne i koliko gostiju očekivati. Sve na jednom pregledu.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    title: "Export podataka",
    description:
      "Preuzmite kompletnu listu gostiju u CSV formatu za lakšu organizaciju sjedišnih mjesta.",
  },
];

const steps = [
  {
    number: "01",
    title: "Odaberite templejt",
    description:
      "Pregledajte naše dizajne i odaberite onaj koji odgovara vašem stilu i karakteru vjenčanja.",
  },
  {
    number: "02",
    title: "Personalizirajte",
    description:
      "Dodajte datum, lokaciju, boje i posebne poruke za vaše goste. Brzo i jednostavno.",
  },
  {
    number: "03",
    title: "Podijelite i pratite",
    description:
      "Podijelite link i pratite RSVP odgovore u realnom vremenu direktno iz dashboarda.",
  },
];

const testimonials = [
  {
    quote:
      "Savršeno rješenje! Naši gosti su bili oduševljeni digitalnom pozivnicom, a mi smo imali sve odgovore na jednom mjestu.",
    author: "Amina & Tarik",
    location: "Sarajevo, 2025",
  },
  {
    quote:
      "Toliko jednostavno i elegantno. Za 10 minuta smo imali objavljenu pozivnicu s jedinstvenim linkom.",
    author: "Ivana & Marko",
    location: "Zagreb, 2025",
  },
  {
    quote:
      "RSVP praćenje je spasilo naše vjenčanje. Znali smo točno koliko mjesta trebamo rezervirati.",
    author: "Sara & Nikola",
    location: "Split, 2025",
  },
];

export default async function Home() {
  const featuredTemplates = await getFeaturedTemplates();

  return (
    <div className="w-full">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-linear-to-br from-rose-50 via-stone-50 to-amber-50 px-6 py-24 text-center sm:py-36">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-rose-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-rose-200 bg-white px-4 py-1.5 text-xs font-medium text-rose-700 shadow-sm">
            ✦&nbsp; Digitalne Vjenčane Pozivnice
          </span>

          <h1 className="font-display mt-6 text-4xl font-bold leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Pozivnice koje će{" "}
            <span className="text-rose-700">ostaviti bez daha</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
            Kreirajte elegantne digitalne pozivnice za vaš poseban dan. Pratite
            RSVP odgovore i podijelite s gostima za nekoliko minuta.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/templates"
              className="rounded-xl bg-rose-700 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-rose-800"
            >
              Pregledaj templejte
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-stone-300 bg-white px-8 py-3.5 text-base font-semibold text-stone-700 shadow-sm transition-colors hover:bg-stone-50"
            >
              Besplatno počni
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-600">
              Kako funkcioniše
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
              Tri jednostavna koraka
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 top-7 hidden h-px w-full bg-stone-200 sm:block" />
                )}
                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-rose-200 bg-rose-50 text-sm font-bold text-rose-700">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-stone-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Template showcase ─────────────────────────────────── */}
      <section className="bg-stone-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-rose-600">
                Dizajni
              </span>
              <h2 className="font-display mt-2 text-3xl font-bold text-stone-900 sm:text-4xl">
                Naši templejti
              </h2>
            </div>
            <Link
              href="/templates"
              className="text-sm font-medium text-rose-700 underline underline-offset-4 hover:text-rose-800"
            >
              Svi templejti →
            </Link>
          </div>

          {featuredTemplates.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-3">
              {featuredTemplates.map((t) => (
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
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 p-12 text-center">
              <p className="text-sm text-stone-500">
                Templejti nisu učitani. Pokrenite{" "}
                <code className="rounded bg-stone-100 px-1 py-0.5 text-xs">/api/dev/seed-templates</code>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-600">
              Funkcionalnosti
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
              Sve što vam treba
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-stone-200 p-5 transition-all hover:border-rose-200 hover:shadow-sm"
              >
                <div className="mb-3 text-rose-600">{f.icon}</div>
                <h3 className="text-sm font-semibold text-stone-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-stone-600">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="bg-linear-to-br from-rose-50 to-amber-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-rose-600">
              Iskustva
            </span>
            <h2 className="font-display mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
              Što kažu parovi
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 font-serif text-3xl leading-none text-rose-300">
                  "
                </div>
                <p className="text-sm italic leading-relaxed text-stone-700">
                  {t.quote}
                </p>
                <div className="mt-4 border-t border-stone-100 pt-4">
                  <p className="text-sm font-semibold text-stone-900">
                    {t.author}
                  </p>
                  <p className="text-xs text-stone-500">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section className="bg-rose-700 px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Počnite danas — besplatno
          </h2>
          <p className="mt-4 text-lg text-rose-100">
            Kreirajte svoju prvu pozivnicu za nekoliko minuta.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-rose-700 shadow-sm transition-colors hover:bg-rose-50"
            >
              Registriraj se besplatno
            </Link>
            <Link
              href="/templates"
              className="rounded-xl border border-rose-400 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-rose-600"
            >
              Pregledaj templejte
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
