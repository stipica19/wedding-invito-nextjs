import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import NavbarSignOut from "./NavbarSignOut";

export default async function NavBar() {
  const session = await getAuthSession();
  const user = session?.user ?? null;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-rose-600"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
          <span className="text-lg font-semibold text-stone-900 tracking-tight">
            Invito
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/templates"
            className="px-3 py-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            Templejti
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Dashboard
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="px-3 py-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                >
                  Admin
                </Link>
              )}
              <NavbarSignOut />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                Prijava
              </Link>
              <Link
                href="/register"
                className="ml-1 rounded-lg bg-rose-700 px-4 py-2 text-white hover:bg-rose-800 transition-colors"
              >
                Registracija
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
