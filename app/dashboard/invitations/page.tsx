import Link from "next/link";
import { redirect } from "next/navigation";
import CopyInviteLinkButton from "@/components/CopyInviteLinkButton";
import { getAuthSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Invitation } from "@/models/Invitation";

type InvitationListItem = {
  _id: string;
  slug: string;
  status: "draft" | "pending" | "published";
  data?: Record<string, unknown>;
};

const statusConfig = {
  published: {
    label: "Objavljeno",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  pending: {
    label: "Na čekanju",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  draft: {
    label: "Nacrt",
    className: "bg-stone-100 text-stone-600 border-stone-200",
  },
};

export default async function DashboardInvitationsPage() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/login");
  }

  await connectToDatabase();
  const invitations = (await Invitation.find({ ownerId: session.user.id })
    .sort({ createdAt: -1 })
    .lean()) as unknown as InvitationListItem[];

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard"
            className="mb-2 inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700"
          >
            ← Dashboard
          </Link>
          <h1 className="font-display text-3xl font-bold text-stone-900">
            Moje pozivnice
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            {invitations.length}{" "}
            {invitations.length === 1 ? "pozivnica" : "pozivnica"} ukupno
          </p>
        </div>
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 rounded-xl bg-rose-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-800"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Nova pozivnica
        </Link>
      </div>

      {/* List */}
      <div className="mt-8">
        {invitations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
            <p className="text-sm font-medium text-stone-700">
              Još nemate pozivnica
            </p>
            <p className="mt-1 text-xs text-stone-500">
              Odaberite templejt i kreirajte prvu
            </p>
            <Link
              href="/templates"
              className="mt-4 inline-block rounded-xl bg-rose-700 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-800 transition-colors"
            >
              Pregledaj templejte
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {invitations.map((invitation) => {
              const title =
                typeof invitation.data?.title === "string"
                  ? invitation.data.title
                  : invitation.slug;
              const status =
                statusConfig[invitation.status] ?? statusConfig.draft;

              return (
                <article
                  key={String(invitation._id)}
                  className="flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50">
                      <svg
                        className="h-4 w-4 text-rose-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="font-semibold text-stone-900">{title}</h2>
                      <p className="text-xs text-stone-500">/{invitation.slug}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      {status.label}
                    </span>
                    <Link
                      href={`/dashboard/invitations/${String(invitation._id)}`}
                      className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      Detalji i RSVP
                    </Link>
                    {invitation.status === "published" ? (
                      <>
                        <Link
                          href={`/${invitation.slug}`}
                          target="_blank"
                          className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors"
                        >
                          Otvori
                        </Link>
                        <CopyInviteLinkButton slug={invitation.slug} />
                      </>
                    ) : (
                      <span className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs text-stone-400">
                        Nije javno
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
