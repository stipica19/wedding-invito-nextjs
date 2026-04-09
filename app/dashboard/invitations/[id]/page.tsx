import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import mongoose from "mongoose";
import { getAuthSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Invitation } from "@/models/Invitation";
import { RSVP } from "@/models/RSVP";

type InvitationDetail = {
  _id: string;
  slug: string;
  status: "draft" | "pending" | "published";
  data?: Record<string, unknown>;
};

type RSVPItem = {
  _id: string;
  name: string;
  attending: "yes" | "no" | "maybe";
  guestsCount: number;
  message?: string;
  createdAt?: string | Date;
};

type RSVPFilter = "all" | RSVPItem["attending"];

type RSVPDbItem = {
  _id: mongoose.Types.ObjectId;
  name: string;
  attending: "yes" | "no" | "maybe";
  guestsCount?: number;
  message?: string;
  createdAt?: Date;
};

const attendingLabel: Record<RSVPItem["attending"], string> = {
  yes: "Dolazi",
  no: "Ne dolazi",
  maybe: "Mozda",
};

export default async function InvitationDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ status?: string; q?: string }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  const session = await getAuthSession();
  if (!session?.user?.id) {
    redirect("/login");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectToDatabase();

  const invitation = (await Invitation.findOne({
    _id: id,
    ownerId: session.user.id,
  }).lean()) as InvitationDetail | null;

  if (!invitation) {
    notFound();
  }

  const rsvpDocs = (await RSVP.find({ invitationId: invitation._id })
    .sort({ createdAt: -1 })
    .lean()) as RSVPDbItem[];

  const rsvps: RSVPItem[] = rsvpDocs.map((item) => ({
    _id: String(item._id),
    name: item.name,
    attending: item.attending,
    guestsCount: item.guestsCount ?? 0,
    message: item.message ?? "",
    createdAt: item.createdAt ? item.createdAt.toISOString() : undefined,
  }));

  const requestedStatus = resolvedSearchParams?.status;
  const activeStatus: RSVPFilter =
    requestedStatus === "yes" || requestedStatus === "no" || requestedStatus === "maybe"
      ? requestedStatus
      : "all";

  const query = (resolvedSearchParams?.q ?? "").trim().toLowerCase();

  const filteredRsvps = rsvps.filter((item) => {
    const statusMatch = activeStatus === "all" || item.attending === activeStatus;
    const queryMatch =
      query.length === 0 ||
      item.name.toLowerCase().includes(query) ||
      (item.message ?? "").toLowerCase().includes(query);

    return statusMatch && queryMatch;
  });

  const totalGuests = rsvps.reduce((sum, item) => sum + (item.guestsCount ?? 0), 0);
  const yesCount = rsvps.filter((item) => item.attending === "yes").length;
  const maybeCount = rsvps.filter((item) => item.attending === "maybe").length;
  const noCount = rsvps.filter((item) => item.attending === "no").length;

  const title =
    typeof invitation.data?.title === "string"
      ? invitation.data.title
      : invitation.slug;

  return (
    <main className="space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-gray-600">/{invitation.slug}</p>
          <p className="text-xs uppercase text-gray-500">Status: {invitation.status}</p>
        </div>
        <div className="flex gap-2">
          <Link className="rounded-lg border px-3 py-2 text-sm" href="/dashboard/invitations">
            Nazad na listu
          </Link>
          {invitation.status === "published" ? (
            <Link
              className="rounded-lg border px-3 py-2 text-sm"
              href={`/${invitation.slug}`}
              target="_blank"
            >
              Otvori javnu stranicu
            </Link>
          ) : (
            <span className="rounded-lg border px-3 py-2 text-sm text-gray-500">
              Javni link ce raditi kad status bude published
            </span>
          )}
          <Link
            className="rounded-lg border px-3 py-2 text-sm"
            href={`/api/invitations/${String(invitation._id)}/rsvps?format=csv`}
            target="_blank"
          >
            Export CSV
          </Link>
        </div>
      </div>

      <section className="grid gap-3 sm:grid-cols-4">
        <div className="rounded-lg border p-3">
          <p className="text-xs uppercase text-gray-500">Ukupno RSVP</p>
          <p className="mt-2 text-xl font-semibold">{rsvps.length}</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-xs uppercase text-gray-500">Dolazi</p>
          <p className="mt-2 text-xl font-semibold">{yesCount}</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-xs uppercase text-gray-500">Mozda</p>
          <p className="mt-2 text-xl font-semibold">{maybeCount}</p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-xs uppercase text-gray-500">Ne dolazi</p>
          <p className="mt-2 text-xl font-semibold">{noCount}</p>
        </div>
      </section>

      <section className="rounded-lg border p-4">
        <p className="text-sm text-gray-600">Ukupan broj gostiju: <b>{totalGuests}</b></p>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">RSVP odgovori</h2>
          <p className="text-sm text-gray-600">
            Prikazano: <b>{filteredRsvps.length}</b> / {rsvps.length}
          </p>
        </div>

        <form className="grid gap-3 rounded-lg border p-3 sm:grid-cols-[1fr_auto_auto]">
          <input
            type="search"
            name="q"
            defaultValue={resolvedSearchParams?.q ?? ""}
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Pretraga po imenu ili poruci"
          />
          <select
            name="status"
            defaultValue={activeStatus}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            <option value="all">Svi statusi</option>
            <option value="yes">Dolazi</option>
            <option value="maybe">Mozda</option>
            <option value="no">Ne dolazi</option>
          </select>
          <button type="submit" className="rounded-lg border px-3 py-2 text-sm font-medium">
            Primijeni
          </button>
        </form>

        {filteredRsvps.length === 0 ? (
          <p className="rounded-lg border p-4 text-sm text-gray-600">
            Nema RSVP odgovora za odabrane filtere.
          </p>
        ) : (
          <div className="space-y-2">
            {filteredRsvps.map((item) => (
              <article key={String(item._id)} className="rounded-lg border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="text-xs uppercase text-gray-500">
                    {attendingLabel[item.attending]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">Broj gostiju: {item.guestsCount}</p>
                {item.message ? (
                  <p className="mt-2 rounded bg-gray-50 p-2 text-sm text-gray-700">{item.message}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
