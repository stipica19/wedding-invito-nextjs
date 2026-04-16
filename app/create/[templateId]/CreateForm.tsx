"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { templateRegistry } from "@/components/templates/registry";
import type { TemplateKey } from "@/components/templates/registry";
import type { FieldDef, CounterFieldDef, SelectFieldDef } from "@/components/templates/types";

// ─── Types ───────────────────────────────────────────────────────────────────

type FormValues = Record<string, string | number>;

type Props = {
  templateId: string;
  templateName: string;
  colorVariants: string[];
  defaultData: Record<string, unknown>;
  schema: FieldDef[];
  layoutKey: TemplateKey;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100";

const COLOR_OPTIONS = [
  { value: "default", label: "Topla zlatna", swatch: "#b8a06a" },
  { value: "gold",    label: "Zlatna",        swatch: "#d4af37" },
  { value: "ivory",   label: "Bjelokosna",    swatch: "#c8c0b0" },
  { value: "rose",    label: "Ružičasta",     swatch: "#d08080" },
];

// ─── Counter Input ────────────────────────────────────────────────────────────

function CounterInput({
  field,
  value,
  onChange,
}: {
  field: CounterFieldDef;
  value: number;
  onChange: (v: number) => void;
}) {
  const dec = useCallback(
    () => onChange(Math.max(field.min, value - field.step)),
    [value, field, onChange]
  );
  const inc = useCallback(
    () => onChange(Math.min(field.max, value + field.step)),
    [value, field, onChange]
  );

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={dec}
        disabled={value <= field.min}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-lg font-medium text-stone-600 transition hover:border-rose-300 hover:text-rose-700 disabled:opacity-30"
      >
        −
      </button>
      <div className="flex min-w-[6rem] flex-col items-center">
        <span className="text-xl font-semibold tabular-nums text-stone-900">
          {value}
        </span>
        {field.unit && (
          <span className="text-[10px] uppercase tracking-widest text-stone-400">
            {field.unit}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={inc}
        disabled={value >= field.max}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-lg font-medium text-stone-600 transition hover:border-rose-300 hover:text-rose-700 disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}

// ─── Dynamic field renderer ───────────────────────────────────────────────────

function DynamicField({
  field,
  register,
  error,
  counterValue,
  onCounterChange,
}: {
  field: FieldDef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  error?: string;
  counterValue?: number;
  onCounterChange?: (v: number) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-stone-700">
        {field.label}
        {field.type !== "counter" && (field as { required?: boolean }).required && (
          <span className="ml-1 text-rose-500">*</span>
        )}
      </label>

      {field.type === "text" && (
        <input
          className={inputClass}
          placeholder={field.placeholder}
          {...register(field.key, {
            required: field.required ? `${field.label} je obavezno` : false,
          })}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          className={inputClass}
          placeholder={field.placeholder}
          rows={field.rows ?? 3}
          {...register(field.key)}
        />
      )}

      {field.type === "select" && (
        <select className={inputClass} {...register(field.key)}>
          {(field as SelectFieldDef).options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {field.type === "counter" && counterValue !== undefined && onCounterChange && (
        <CounterInput
          field={field as CounterFieldDef}
          value={counterValue}
          onChange={onCounterChange}
        />
      )}

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ─── Live Preview ─────────────────────────────────────────────────────────────

const RENDER_W = 440;
const SCALE = 0.62;

function LivePreview({
  layoutKey,
  data,
  selectedColor,
}: {
  layoutKey: TemplateKey;
  data: Record<string, unknown>;
  selectedColor: string;
}) {
  const TemplateComponent = templateRegistry[layoutKey] ?? templateRegistry.elegance;
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg" style={{ width: Math.round(RENDER_W * SCALE) }}>
      <div
        style={{
          width: RENDER_W,
          transformOrigin: "top left",
          transform: `scale(${SCALE})`,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <TemplateComponent
          data={{ ...data, couple: data.couple ?? data.title }}
          title={String(data.couple ?? data.title ?? "")}
          date={String(data.date ?? "")}
          selectedColor={selectedColor}
          mode="full"
        />
      </div>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export default function CreateForm({
  templateId,
  templateName,
  colorVariants,
  defaultData,
  schema,
  layoutKey,
}: Props) {
  // Build initial counter values from schema defaults
  const initialCounters = Object.fromEntries(
    schema
      .filter((f) => f.type === "counter")
      .map((f) => [f.key, Number((defaultData[f.key] as number | undefined) ?? (f as CounterFieldDef).defaultValue)])
  );
  const [counters, setCounters] = useState<Record<string, number>>(initialCounters);

  // Build react-hook-form defaults from schema + defaultData
  const defaultValues = Object.fromEntries(
    schema
      .filter((f) => f.type !== "counter")
      .map((f) => {
        const dv = defaultData[f.key];
        if (typeof dv === "string" && dv.trim()) return [f.key, dv];
        if (f.type === "select") return [f.key, (f as SelectFieldDef).defaultValue ?? (f as SelectFieldDef).options[0]?.value ?? ""];
        return [f.key, ""];
      })
  );

  const [selectedColor, setSelectedColor] = useState<string>(
    String(defaultData.selectedColor ?? colorVariants[0] ?? "default")
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({ defaultValues });

  // Watch all form values for live preview
  const watchedValues = useWatch({ control });

  // Merge watched values + counters for preview
  const previewData: Record<string, unknown> = {
    ...defaultData,
    ...watchedValues,
    ...counters,
    layout: layoutKey,
  };

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const payload = {
      templateId,
      title: String(values.couple ?? values.title ?? templateName),
      selectedColor,
      data: {
        ...values,
        ...counters,
        couple: values.couple ?? values.title,
        layout: layoutKey,
      },
    };

    const res = await fetch("/api/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setServerError(json?.message ?? "Greška pri kreiranju pozivnice.");
      return;
    }
    const slug = json?.item?.slug as string | undefined;
    if (slug) setCreatedSlug(slug);
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (createdSlug) {
    return (
      <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-stone-900">Pozivnica kreirana!</h2>
          <p className="mt-2 text-sm text-stone-600">Vaša pozivnica je objavljena na:</p>
          <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 font-mono text-sm text-stone-700">
            /{createdSlug}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href={`/${createdSlug}`} target="_blank" className="rounded-xl bg-rose-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-rose-800 transition-colors">
              Otvori pozivnicu
            </Link>
            <Link href="/dashboard" className="rounded-xl border border-stone-200 px-6 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  const availableColors = colorVariants.length ? colorVariants : ["default"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <Link href="/templates" className="mb-3 inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700">
          ← Nazad na templejte
        </Link>
        <h1 className="text-3xl font-bold text-stone-900">Kreiraj pozivnicu</h1>
        <p className="mt-1 text-sm text-stone-500">
          Templejt: <span className="font-medium text-stone-700">{templateName}</span>
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
        {/* ── LEFT: Form ── */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* Color picker */}
          {availableColors.length > 1 && (
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-400">Boja teme</h2>
              <div className="flex flex-wrap gap-3">
                {availableColors.map((c) => {
                  const opt = COLOR_OPTIONS.find((o) => o.value === c) ?? { value: c, label: c, swatch: "#aaa" };
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition ${
                        selectedColor === c
                          ? "border-rose-400 bg-rose-50 font-medium text-rose-700"
                          : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: opt.swatch }}
                      />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dynamic schema fields */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-widest text-stone-400">Detalji pozivnice</h2>
            <div className="space-y-5">
              {schema.map((field) => (
                <DynamicField
                  key={field.key}
                  field={field}
                  register={register}
                  error={errors[field.key]?.message as string | undefined}
                  counterValue={field.type === "counter" ? counters[field.key] : undefined}
                  onCounterChange={
                    field.type === "counter"
                      ? (v) => setCounters((prev) => ({ ...prev, [field.key]: v }))
                      : undefined
                  }
                />
              ))}
            </div>
          </div>

          {serverError && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-rose-700 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-rose-800 disabled:opacity-60"
          >
            {isSubmitting ? "Kreiram pozivnicu..." : "Kreiraj i objavi pozivnicu →"}
          </button>
        </form>

        {/* ── RIGHT: Live preview ── */}
        <div className="hidden lg:block">
          <div className="sticky top-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
              Pregled uživo
            </p>
            <LivePreview
              layoutKey={layoutKey}
              data={previewData}
              selectedColor={selectedColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
