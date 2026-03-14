import TemplateCard from "../../components/TemplateCard";

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Templates Gallery</h1>
        <p className="text-sm text-gray-500">
          TODO: Add filters by category, theme, and color.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <TemplateCard />
        <TemplateCard name="Modern Chic" category="Birthday" />
        <TemplateCard name="Bold Night" category="Corporate" />
      </div>
    </div>
  );
}
