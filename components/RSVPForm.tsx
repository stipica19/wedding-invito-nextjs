"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { rsvpSchema } from "@/schemas/rsvp.schema";

type RSVPFormProps = {
  slug: string;
};

type RSVPInput = z.input<typeof rsvpSchema>;
type RSVPSubmitPayload = z.output<typeof rsvpSchema>;

type ValidationErrorResponse = {
  message?: string;
  errors?: {
    fieldErrors?: Record<string, string[] | undefined>;
  };
};

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100";

export default function RSVPForm({ slug }: RSVPFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RSVPInput>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      attending: "yes",
      guestsCount: 1,
      message: "",
    },
  });

  const attending = useWatch({ control, name: "attending" });

  useEffect(() => {
    if (attending === "yes") {
      setValue("guestsCount", 1, { shouldValidate: true });
    } else if (attending === "no") {
      setValue("guestsCount", 0, { shouldValidate: true });
    }
  }, [attending, setValue]);

  async function onSubmit(values: RSVPInput) {
    setServerError(null);
    setSuccess(null);

    const res = await fetch(`/api/public/invitations/${slug}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values as RSVPSubmitPayload),
    });

    const data = (await res.json().catch(() => ({}))) as ValidationErrorResponse;

    if (!res.ok) {
      const fieldErrors = data.errors?.fieldErrors ?? {};
      for (const [field, messages] of Object.entries(fieldErrors)) {
        if (!messages?.length) continue;
        const firstMessage = messages[0];
        if (!firstMessage) continue;
        if (field === "name" || field === "attending" || field === "guestsCount" || field === "message") {
          setError(field, { type: "server", message: firstMessage });
        }
      }
      setServerError(data?.message ?? "Greška pri slanju RSVP-a.");
      return;
    }

    setSuccess("Hvala! Uspješno smo zaprimili tvoj odgovor.");
    reset({ name: "", attending: "yes", guestsCount: 1, message: "" });
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-emerald-800">Hvala!</h3>
        <p className="mt-2 text-sm text-emerald-700">{success}</p>
        <button
          onClick={() => setSuccess(null)}
          className="mt-5 rounded-xl border border-emerald-200 px-5 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          Pošalji još jedan odgovor
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
            <svg className="h-5 w-5 text-rose-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
          </div>
          <h2 className="font-display text-xl font-bold text-stone-900">Potvrdi dolazak</h2>
          <p className="mt-1 text-sm text-stone-500">Javite nam možete li doći na svečanost</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-700">
              Ime i prezime
            </label>
            <input
              className={inputClass}
              placeholder="Vaše ime i prezime"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Attending — card-style buttons */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-700">
              Dolazite?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["yes", "maybe", "no"] as const).map((val) => {
                const labels = { yes: "Da, dolazim", maybe: "Možda", no: "Ne mogu" };
                const icons = {
                  yes: (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  ),
                  maybe: (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  no: (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ),
                };
                const colors = {
                  yes: "border-emerald-300 bg-emerald-50 text-emerald-700",
                  maybe: "border-amber-300 bg-amber-50 text-amber-700",
                  no: "border-red-200 bg-red-50 text-red-600",
                };
                const isSelected = attending === val;
                return (
                  <label
                    key={val}
                    className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all ${
                      isSelected
                        ? colors[val]
                        : "border-stone-200 bg-stone-50 text-stone-500 hover:border-stone-300"
                    }`}
                  >
                    <input type="radio" value={val} className="sr-only" {...register("attending")} />
                    {icons[val]}
                    <span className="text-xs font-medium leading-tight">{labels[val]}</span>
                  </label>
                );
              })}
            </div>
            {errors.attending && (
              <p className="mt-1.5 text-xs text-red-600">{errors.attending.message}</p>
            )}
          </div>

          {/* Guest count — only when yes or maybe */}
          {attending !== "no" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stone-700">
                Broj osoba (uključujući vas)
              </label>
              <input
                className={inputClass}
                type="number"
                min={1}
                max={20}
                {...register("guestsCount", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
              />
              {errors.guestsCount && (
                <p className="mt-1.5 text-xs text-red-600">{errors.guestsCount.message}</p>
              )}
            </div>
          )}

          {/* Message */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-700">
              Poruka <span className="font-normal text-stone-400">(opcionalno)</span>
            </label>
            <textarea
              className={inputClass}
              placeholder="Čestitke, posebne napomene..."
              rows={3}
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>
            )}
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
            {isSubmitting ? "Šaljem..." : "Pošalji odgovor"}
          </button>
        </form>
      </div>
    </div>
  );
}
