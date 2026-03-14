"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, type RegisterInput } from "@/schemas/auth.schema";

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: RegisterInput) {
    setServerError(null);
    setSuccess(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setServerError(data?.message ?? "Nešto je pošlo po krivu.");
      return;
    }

    setSuccess("Registracija uspješna. Preusmjeravam na login...");
    setTimeout(() => router.push("/login"), 600);
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border p-6">
        <h1 className="text-2xl font-semibold">Registracija</h1>
        <p className="mt-1 text-sm text-gray-500">
          Kreiraj račun da možeš raditi pozivnice.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-medium">Ime</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="Ivana"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="ivana@email.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Lozinka</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2"
              placeholder="••••••••"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {serverError}
            </p>
          )}
          {success && (
            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {success}
            </p>
          )}

          <button
            disabled={isSubmitting}
            className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {isSubmitting ? "Spremam..." : "Registriraj se"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Već imaš račun?{" "}
          <Link className="underline" href="/login">
            Prijavi se
          </Link>
        </p>
      </div>
    </main>
  );
}
