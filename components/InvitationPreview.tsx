type InvitationPreviewProps = {
  title?: string;
  date?: string;
};

export default function InvitationPreview({
  title = "Sample Event",
  date = "June 12, 2026",
}: InvitationPreviewProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 p-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-600">{date}</p>
      <p className="mt-4 text-sm text-gray-600">
        TODO: Render template preview data and event details.
      </p>
    </div>
  );
}
