"use client";

import { signOut } from "next-auth/react";

export default function NavbarSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="ml-1 rounded-lg border border-stone-200 px-3 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-colors"
    >
      Odjava
    </button>
  );
}
