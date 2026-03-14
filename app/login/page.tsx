"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginInput } from "@/schemas/auth.schema";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/dashboard";

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginInput) {
    setServerError(null);

    const res = await signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl,
    });

    if (!res || res.error) {
      setServerError("Neispravan email ili lozinka.");
      return;
    }

    router.push(res.url ?? "/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border p-6">
        <h1 className="text-2xl font-semibold">Prijava</h1>
        <p className="mt-1 text-sm text-gray-500">
          Prijavi se da upravljaš pozivnicama.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
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

          <button
            disabled={isSubmitting}
            className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {isSubmitting ? "Prijavljujem..." : "Prijavi se"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Nemaš račun?{" "}
          <Link className="underline" href="/register">
            Registriraj se
          </Link>
        </p>
      </div>
    </main>
  );
}
