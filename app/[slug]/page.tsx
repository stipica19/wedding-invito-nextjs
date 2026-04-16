import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { Invitation } from "@/models/Invitation";
import InvitationPreview from "@/components/InvitationPreview";
import RSVPForm from "@/components/RSVPForm";

type PublicInvitationPageProps = {
  params: Promise<{ slug: string }>;
};

async function getPublicInvitation(slug: string) {
  await connectToDatabase();

  const invitation = await Invitation.findOne({
    slug,
    status: "published",
  }).lean();

  if (!invitation) return null;

  return {
    id: String(invitation._id),
    slug: invitation.slug,
    status: invitation.status as "draft" | "pending" | "published",
    selectedColor: invitation.selectedColor ?? "default",
    data: (invitation.data ?? {}) as Record<string, unknown>,
  };
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
