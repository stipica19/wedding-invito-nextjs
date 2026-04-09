"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";

type CreateInvitationInput = {
  title: string;
  subtitle?: string;
  layout?: "classic" | "garden" | "modern";
  slug?: string;
  selectedColor?: string;
  eventDate?: string;
  eventTime?: string;
  location?: string;
  hosts?: string;
  dressCode?: string;
  note?: string;
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-stone-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100";

export default function CreateInvitationPage() {
  const params = useParams<{ templateId: string }>();
  const templateId = params?.templateId ?? "";

  const [serverError, setServerError] = useState<string | null>(null);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateInvitationInput>({
    defaultValues: {
      title: "",
      subtitle: "",
      layout: "classic",
      slug: "",
      selectedColor: "default",
      eventDate: "",
      eventTime: "17:00",
      location: "",
      hosts: "",
      dressCode: "Elegantno",
      note: "",
    },
  });

  async function onSubmit(values: CreateInvitationInput) {
    setServerError(null);
    setCreatedSlug(null);

    if (!templateId) {
      setServerError("Nedostaje templateId u URL-u.");
      return;
    }

    const payload = {
      templateId,
      title: values.title,
      slug: values.slug || undefined,
      selectedColor: values.selectedColor || "default",
      data: {
        couple: values.title,
        title: values.title,
        subtitle: values.subtitle || "",
        layout: values.layout || "classic",
        date: values.eventDate || "",
        time: values.eventTime || "",
        location: values.location || "",
        hosts: values.hosts || "",
        dressCode: values.dressCode || "",
        note: values.note || "",
      },
    };

    const res = await fetch("/api/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const details = data?.errors ? ` ${JSON.stringify(data.errors)}` : "";
      setServerError(
        (data?.message ?? "Greška pri kreiranju pozivnice.") + details
      );
      return;
    }

    const newSlug = data?.item?.slug as string | undefined;
    if (newSlug) setCreatedSlug(newSlug);
  }

  if (createdSlug) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-8 w-8 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900">
            Pozivnica kreirana!
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Vaša pozivnica je objavljena i dostupna na:
          </p>
          <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 font-mono text-sm text-stone-700">
            /{createdSlug}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${createdSlug}`}
              target="_blank"
              className="rounded-xl bg-rose-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-800 transition-colors"
            >
              Otvori javnu stranicu
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-stone-200 px-6 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Idi na dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/templates"
          className="mb-3 inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700"
        >
          ← Nazad na templejte
        </Link>
        <h1 className="font-display text-3xl font-bold text-stone-900">
          Kreiraj pozivnicu
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Unesite detalje vašeg vjenčanja
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
      >
        {/* Section: Osnovne informacije */}
        <div>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-400">
            Osnovne informacije
          </h2>
          <div className="space-y-4">
            <Field
              label="Naslov pozivnice *"
              error={errors.title?.message}
            >
              <input
                className={inputClass}
                placeholder="npr. Ana & Marko"
                {...register("title", { required: "Naslov je obavezan", minLength: { value: 2, message: "Minimalno 2 znaka" } })}
              />
            </Field>

            <Field label="Podnaslov">
              <input
                className={inputClass}
                placeholder="Radujemo se da zajedno proslavimo ljubav"
                {...register("subtitle")}
              />
            </Field>
          </div>
        </div>

        {/* Section: Dizajn */}
        <div className="border-t border-stone-100 pt-6">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-400">
            Dizajn
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Stil dizajna">
              <select className={inputClass} {...register("layout")}>
                <option value="classic">Klasičan</option>
                <option value="garden">Vrtni</option>
                <option value="modern">Moderni</option>
              </select>
            </Field>

            <Field label="Boja teme">
              <select className={inputClass} {...register("selectedColor")}>
                <option value="default">Topla (zadana)</option>
                <option value="gold">Zlatna</option>
                <option value="ivory">Bjelokosna</option>
                <option value="rose">Ružičasta</option>
              </select>
            </Field>
          </div>
        </div>

        {/* Section: Detalji dogadjaja */}
        <div className="border-t border-stone-100 pt-6">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-400">
            Detalji događaja
          </h2>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Datum">
                <input
                  className={inputClass}
                  placeholder="npr. 15. lipnja 2026"
                  {...register("eventDate")}
                />
              </Field>

              <Field label="Vrijeme">
                <input
                  className={inputClass}
                  placeholder="17:00"
                  {...register("eventTime")}
                />
              </Field>
            </div>

            <Field label="Lokacija">
              <input
                className={inputClass}
                placeholder="npr. Hotel Hills, Sarajevo"
                {...register("location")}
              />
            </Field>

            <Field label="Domaćini">
              <input
                className={inputClass}
                placeholder="npr. Porodice Horvat i Kovač"
                {...register("hosts")}
              />
            </Field>

            <Field label="Dress code">
              <input
                className={inputClass}
                placeholder="Elegantno"
                {...register("dressCode")}
              />
            </Field>

            <Field label="Napomena za goste">
              <textarea
                className={inputClass}
                placeholder="npr. Molimo potvrdu dolaska do 1. lipnja 2026."
                rows={3}
                {...register("note")}
              />
            </Field>
          </div>
        </div>

        {/* Section: URL */}
        <div className="border-t border-stone-100 pt-6">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-400">
            Prilagođeni URL (opcionalno)
          </h2>
          <Field label="Slug (ostavite prazno za automatski)">
            <div className="flex rounded-xl border border-stone-200 bg-stone-50 focus-within:border-rose-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-rose-100 transition">
              <span className="flex items-center pl-4 text-sm text-stone-400">
                invito.app/
              </span>
              <input
                className="flex-1 bg-transparent py-2.5 pr-4 text-sm text-stone-900 placeholder-stone-400 outline-none"
                placeholder="ana-marko-vjencanje"
                {...register("slug")}
              />
            </div>
          </Field>
        </div>

        {serverError && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-rose-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-800 disabled:opacity-60"
        >
          {isSubmitting ? "Kreiram pozivnicu..." : "Kreiraj i objavi pozivnicu"}
        </button>
      </form>
    </div>
  );
}
