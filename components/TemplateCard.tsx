type TemplateCardProps = {
  name?: string;
  category?: string;
};

export default function TemplateCard({
  name = "Classic Minimal",
  category = "Wedding",
}: TemplateCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="text-sm text-gray-500">{category}</div>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-2 text-sm text-gray-600">
        TODO: Render preview thumbnail and quick actions.
      </p>
    </div>
  );
}
