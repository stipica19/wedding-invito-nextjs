type CreateInvitationPageProps = {
  params: { templateId: string };
};

export default async function CreateInvitationPage({
  params,
}: CreateInvitationPageProps) {
  // TODO: Use getServerSession from next-auth to protect this route.
  // const session = await getServerSession(authOptions);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Create Invitation</h1>
      <p className="text-sm text-gray-500">Template ID: {params.templateId}</p>
      <p className="text-sm text-gray-500">
        TODO: Build the invitation creation form and live preview.
      </p>
    </div>
  );
}
