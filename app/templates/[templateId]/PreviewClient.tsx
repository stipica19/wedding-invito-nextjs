"use client";

import Link from "next/link";
import { useState } from "react";
import { templateRegistry, type TemplateKey } from "@/components/templates/registry";

type TemplateItem = {
  id: string;
  name: string;
  category: string;
  colorVariants: string[];
  defaultData: Record<string, unknown>;
};

const colorLabels: Record<string, string> = {
  default: "Topla",
  gold: "Zlatna",
  ivory: "Bjelokosna",
  rose: "Ružičasta",
};

const colorSwatches: Record<string, string> = {
  default: "#b8a06a",
  gold: "#d4af37",
  ivory: "#c8c0b0",
  rose: "#d08080",
};

function getTemplateKey(layout: unknown): TemplateKey {
  if (typeof layout === "string" && layout in templateRegistry) return layout as TemplateKey;
  return "elegance";
}

export default function PreviewClient({ template }: { template: TemplateItem }) {
  const variants = template.colorVariants.length ? template.colorVariants : ["default"];
  const [activeColor, setActiveColor] = useState(variants[0]);

  const layoutKey = getTemplateKey(template.defaultData?.layout);
  const TemplateComponent = templateRegistry[layoutKey];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/templates"
          className="mb-3 inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700"
        >
          ← Nazad na templejte
        </Link>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-stone-900">
              {template.name}
            </h1>
            <p className="mt-0.5 text-sm text-stone-500">{template.category}</p>
          </div>
          <Link
            href={`/create/${template.id}`}
            className="inline-flex items-center justify-center rounded-xl bg-rose-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-800"
          >
            Koristi ovaj templejt →
          </Link>
        </div>
      </div>

      {/* Color picker */}
      {variants.length > 1 && (
        <div className="mb-5 flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Boja
          </span>
          <div className="flex gap-2">
            {variants.map((v) => (
              <button
                key={v}
                onClick={() => setActiveColor(v)}
                title={colorLabels[v] ?? v}
                className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all"
                style={{
                  borderColor: activeColor === v ? colorSwatches[v] ?? "#aaa" : "#e7e5e4",
                  background: activeColor === v ? (colorSwatches[v] ?? "#aaa") + "22" : "white",
                  color: activeColor === v ? "#292524" : "#78716c",
                }}
              >
                <span
                  className="block h-3 w-3 rounded-full"
                  style={{ background: colorSwatches[v] ?? "#aaa" }}
                />
                {colorLabels[v] ?? v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Template preview */}
      <div className="overflow-hidden rounded-2xl shadow-md">
        <TemplateComponent
          data={{ ...template.defaultData }}
          selectedColor={activeColor}
          mode="full"
        />
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm text-stone-600">
          Sviđa vam se ovaj dizajn? Kreirajte svoju pozivnicu za nekoliko minuta.
        </p>
        <Link
          href={`/create/${template.id}`}
          className="mt-4 inline-flex items-center justify-center rounded-xl bg-rose-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-800"
        >
          Kreiraj pozivnicu s ovim templejtem
        </Link>
      </div>
    </div>
  );
}
