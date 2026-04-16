import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/Template";
import { schemaRegistry, templateRegistry } from "@/components/templates/registry";
import type { TemplateKey } from "@/components/templates/registry";
import CreateForm from "./CreateForm";

type PageProps = {
  params: Promise<{ templateId: string }>;
};

export default async function CreateInvitationPage({ params }: PageProps) {
  const { templateId } = await params;

  let template: {
    id: string;
    name: string;
    colorVariants: string[];
    defaultData: Record<string, unknown>;
  } | null = null;

  try {
    await connectToDatabase();
    const raw = await Template.findById(templateId)
      .select("_id name colorVariants defaultData")
      .lean();

    if (!raw) notFound();

    template = {
      id: String(raw._id),
      name: raw.name,
      colorVariants: raw.colorVariants ?? [],
      defaultData: (raw.defaultData as Record<string, unknown>) ?? {},
    };
  } catch {
    notFound();
  }

  if (!template) notFound();

  const rawLayout = String(template.defaultData.layout ?? "elegance");
  const layoutKey: TemplateKey = rawLayout in templateRegistry
    ? (rawLayout as TemplateKey)
    : "elegance";

  const schema = schemaRegistry[layoutKey] ?? schemaRegistry.elegance;

  return (
    <CreateForm
      templateId={template.id}
      templateName={template.name}
      colorVariants={template.colorVariants}
      defaultData={template.defaultData}
      schema={schema}
      layoutKey={layoutKey}
    />
  );
}
