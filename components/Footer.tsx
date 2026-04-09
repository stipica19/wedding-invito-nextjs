import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-rose-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
              </svg>
              <span className="font-semibold text-stone-900">Invito</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-stone-500 leading-relaxed">
              Kreirajte prekrasne vjenčane pozivnice i pratite odgovore vaših
              gostiju — sve na jednom mjestu.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Proizvod
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/templates"
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Templejti
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Besplatno počni
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Račun
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Prijava
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Registracija
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Invito. Sva prava zadržana.
          </p>
          <p className="text-xs text-stone-400">
            Napravljeno s ♡ za posebne trenutke
          </p>
        </div>
      </div>
    </footer>
  );
}
