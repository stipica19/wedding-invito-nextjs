import Link from "next/link";

async function getMyInvitations() {
  const res = await fetch("http://localhost:3000/api/invitations", {
    cache: "no-store",
  });
  // Ovo neće raditi na serveru zbog auth cookie-a kad koristiš hardcoded URL.
  // Zato ćemo umjesto toga napraviti client page ili koristiti server actions.
  return res.json();
}

export default function MyInvitationsPage() {
  // Najbrže za MVP: client page (dolje u koraku 4)
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Moje pozivnice</h1>
      <p className="text-sm text-gray-600 mt-2">
        Ovu stranicu ćemo napraviti kao client fetch (zbog cookies/session).
      </p>
      <Link className="underline" href="/dashboard/invitations/list">
        Idi na list view
      </Link>
    </main>
  );
}
