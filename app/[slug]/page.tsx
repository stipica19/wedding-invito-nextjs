type PublicInvitationPageProps = {
  params: { slug: string };
};

export default function PublicInvitationPage({
  params,
}: PublicInvitationPageProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Invitation: {params.slug}</h1>
      {/* <InvitationPreview />
      <RSVPForm /> */}
    </div>
  );
}
