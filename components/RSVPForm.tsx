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
      return;
    }

    if (attending === "no") {
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

      setServerError(data?.message ?? "Greska pri slanju RSVP.");
      return;
    }

    setSuccess("Hvala, uspjesno smo zaprimili tvoj RSVP.");
    reset({
      name: "",
      attending: "yes",
      guestsCount: 1,
      message: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 grid gap-4 rounded-lg border border-gray-200 p-4"
    >
      <div>
        <label className="block text-sm font-medium">Ime</label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Tvoje ime"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Dolazis?</label>
        <select
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          {...register("attending")}
        >
          <option value="yes">Da</option>
          <option value="no">Ne</option>
          <option value="maybe">Mozda</option>
        </select>
        {errors.attending && (
          <p className="mt-1 text-sm text-red-600">
            {errors.attending.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Broj gostiju</label>
        <input
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          type="number"
          min={0}
          disabled={attending === "no"}
          {...register("guestsCount", {
            setValueAs: (v) => (v === "" ? undefined : Number(v)),
          })}
        />
        {errors.guestsCount && (
          <p className="mt-1 text-sm text-red-600">
            {errors.guestsCount.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Poruka</label>
        <textarea
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Dodaj poruku (opcionalno)"
          rows={3}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      {serverError && (
        <p className="rounded bg-red-50 p-2 text-sm text-red-700">
          {serverError}
        </p>
      )}
      {success && (
        <p className="rounded bg-green-50 p-2 text-sm text-green-700">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-gray-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isSubmitting ? "Saljem..." : "Posalji RSVP"}
      </button>
    </form>
  );
}