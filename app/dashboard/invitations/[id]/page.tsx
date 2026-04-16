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
  maybe: "Možda",
};

const attendingBadge: Record<RSVPItem["attending"], string> = {
  yes: "bg-emerald-100 text-emerald-700",
  no: "bg-red-100 text-red-700",
  maybe: "bg-amber-100 text-amber-700",
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
  if (!session?.user?.id) redirect("/login");

  if (!mongoose.Types.ObjectId.isValid(id)) notFound();

  await connectToDatabase();

  const invitation = (await Invitation.findOne({
    _id: id,
    ownerId: session.user.id,
  }).lean()) as InvitationDetail | null;

  if (!invitation) notFound();

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
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-stone-500">
        <Link href="/dashboard" className="hover:text-stone-800">Dashboard</Link>
        <span>/</span>
        <Link href="/dashboard/invitations" className="hover:text-stone-800">Pozivnice</Link>
        <span>/</span>
        <span className="text-stone-800">{title}</span>
      </nav>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-stone-900">{title}</h1>
          <p className="mt-0.5 font-mono text-sm text-stone-500">/{invitation.slug}</p>
          <span className={`mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            invitation.status === "published"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-stone-100 text-stone-600"
          }`}>
            {invitation.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {invitation.status === "published" && (
            <Link
              href={`/${invitation.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Javna stranica
            </Link>
          )}
          <Link
            href={`/api/invitations/${String(invitation._id)}/rsvps?format=csv`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3.5 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-400">Ukupno RSVP</p>
          <p className="mt-2 text-2xl font-bold text-stone-900">{rsvps.length}</p>
          <p className="mt-0.5 text-xs text-stone-500">{totalGuests} gostiju</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-600">Dolazi</p>
          <p className="mt-2 text-2xl font-bold text-emerald-700">{yesCount}</p>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-amber-600">Možda</p>
          <p className="mt-2 text-2xl font-bold text-amber-700">{maybeCount}</p>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-widest text-red-500">Ne dolazi</p>
          <p className="mt-2 text-2xl font-bold text-red-600">{noCount}</p>
        </div>
      </div>

      {/* RSVP list */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-stone-900">RSVP odgovori</h2>
          <p className="text-sm text-stone-500">
            Prikazano <span className="font-medium text-stone-700">{filteredRsvps.length}</span> / {rsvps.length}
          </p>
        </div>

        {/* Filter form */}
        <form className="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row">
          <input
            type="search"
            name="q"
            defaultValue={resolvedSearchParams?.q ?? ""}
            className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
            placeholder="Pretraga po imenu ili poruci..."
          />
          <select
            name="status"
            defaultValue={activeStatus}
            className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          >
            <option value="all">Svi statusi</option>
            <option value="yes">Dolazi</option>
            <option value="maybe">Možda</option>
            <option value="no">Ne dolazi</option>
          </select>
          <button
            type="submit"
            className="rounded-xl bg-rose-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-800"
          >
            Primijeni
          </button>
        </form>

        {filteredRsvps.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 p-10 text-center">
            <p className="text-sm text-stone-500">Nema RSVP odgovora za odabrane filtere.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredRsvps.map((item) => (
              <article
                key={String(item._id)}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold text-stone-600">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900">{item.name}</p>
                      <p className="text-xs text-stone-500">{item.guestsCount} {item.guestsCount === 1 ? "gost" : "gosti/gostiju"}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${attendingBadge[item.attending]}`}>
                    {attendingLabel[item.attending]}
                  </span>
                </div>
                {item.message && (
                  <p className="mt-3 rounded-xl bg-stone-50 px-4 py-3 text-sm text-stone-600 italic">
                    &ldquo;{item.message}&rdquo;
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
