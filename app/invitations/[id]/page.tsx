import { redirect } from "next/navigation";

export default async function InvitationIdRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/dashboard/invitations/${id}`);
}
