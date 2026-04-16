import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/Template";
import PreviewClient from "./PreviewClient";

type TemplateItem = {
  id: string;
  name: string;
  category: string;
  colorVariants: string[];
  defaultData: Record<string, unknown>;
};

async function getTemplate(id: string): Promise<TemplateItem | null> {
  try {
    await connectToDatabase();
    const template = await Template.findById(id)
      .select("_id name category colorVariants defaultData")
      .lean();
    if (!template) return null;
    return {
      id: String(template._id),
      name: template.name,
      category: template.category,
      colorVariants: template.colorVariants ?? [],
      defaultData: (template.defaultData as Record<string, unknown>) ?? {},
    };
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ templateId: string }>;
};

export default async function TemplatePreviewPage({ params }: Props) {
  const { templateId } = await params;
  const template = await getTemplate(templateId);

  if (!template) notFound();

  return <PreviewClient template={template} />;
}
