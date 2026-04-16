"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginInput } from "@/schemas/auth.schema";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const rawCallbackUrl = params.get("callbackUrl") || "/dashboard";

  const callbackUrl = (() => {
    if (!rawCallbackUrl.startsWith("/") || rawCallbackUrl.startsWith("//")) {
      return "/dashboard";
    }
    if (rawCallbackUrl === "/login" || rawCallbackUrl === "/register") {
      return "/dashboard";
    }
    return rawCallbackUrl;
  })();

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
    <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Email adresa
          </label>
          <input
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
            placeholder="ivana@email.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700">
            Lozinka
          </label>
          <input
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
            placeholder="••••••••"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <button
          disabled={isSubmitting}
          className="w-full rounded-xl bg-rose-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-rose-800 disabled:opacity-60"
        >
          {isSubmitting ? "Prijavljivanje..." : "Prijavi se"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-stone-500">
        Nemate račun?{" "}
        <Link
          href="/register"
          className="font-medium text-rose-700 hover:text-rose-800"
        >
          Registrirajte se
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-linear-to-br from-rose-50 via-stone-50 to-amber-50 px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="mb-4 inline-flex items-center gap-2">
            <svg
              className="h-5 w-5 text-rose-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
            </svg>
            <span className="font-semibold text-stone-900">Invito</span>
          </Link>
          <h1 className="font-display text-3xl font-bold text-stone-900">
            Dobrodošli nazad
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Prijavite se da upravljate vašim pozivnicama
          </p>
        </div>

        <Suspense fallback={<div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm h-64 animate-pulse" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
