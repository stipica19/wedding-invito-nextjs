import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    // NextAuth će te obično preusmjeriti preko middleware-a, ali ovo je sigurnosna mreža.
    return (
      <main className="p-6">
        <p>Nisi prijavljen.</p>
        <Link className="underline" href="/login">
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-sm text-gray-600">
        Ulogiran kao: <b>{session.user.email}</b> (role:{" "}
        {(session.user as any).role})
      </p>

      <div className="flex gap-3">
        <Link className="rounded-lg border px-3 py-2" href="/templates">
          Pregled template-a
        </Link>
        <Link
          className="rounded-lg border px-3 py-2"
          href="/dashboard/invitations"
        >
          Moje pozivnice
        </Link>
      </div>
    </main>
  );
}
