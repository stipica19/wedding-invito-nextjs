type TemplatePreviewPageProps = {
  params: { templateId: string };
};

export default function TemplatePreviewPage({
  params,
}: TemplatePreviewPageProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Template Preview</h1>
      <p className="text-sm text-gray-500">Template ID: {params.templateId}</p>
      <p className="text-sm text-gray-500">
        TODO: Render template preview details and CTA to create invitation.
      </p>
    </div>
  );
}
