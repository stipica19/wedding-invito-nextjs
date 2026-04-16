import { notFound } from "next/navigation";
import InvitationPreview from "@/components/InvitationPreview";
import RSVPForm from "@/components/RSVPForm";

type PublicInvitationPageProps = {
  params: Promise<{ slug: string }>;
};

type PublicInvitationPayload = {
  id: string;
  slug: string;
  status: "draft" | "pending" | "published";
  selectedColor?: string;
  data?: Record<string, unknown>;
};

async function getPublicInvitation(
  slug: string
): Promise<PublicInvitationPayload | null> {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/public/invitations/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const payload = await res.json().catch(() => ({}));
  return (payload?.data ?? null) as PublicInvitationPayload | null;
}

export default async function PublicInvitationPage({
  params,
}: PublicInvitationPageProps) {
  const { slug } = await params;
  const invitation = await getPublicInvitation(slug);

  if (!invitation) {
    notFound();
  }

  const title =
    typeof invitation.data?.title === "string"
      ? invitation.data.title
      : `Invitation: ${slug}`;
  const date =
    typeof invitation.data?.date === "string"
      ? invitation.data.date
      : "Date not set";

  return (
    <div className="mx-auto max-w-lg px-4 py-10 space-y-8">
      <InvitationPreview
        title={title}
        date={date}
        selectedColor={invitation.selectedColor}
        data={invitation.data}
      />
      <RSVPForm slug={slug} />
    </div>
  );
}
