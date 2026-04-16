import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/Template";

type RouteContext = {
  params: { id: string };
};

export async function GET(_: Request, context: RouteContext) {
  try {
    await connectToDatabase();

    const template = await Template.findById(context.params.id)
      .select("_id name category previewImage colorVariants defaultData")
      .lean();

    if (!template) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      item: {
        id: String(template._id),
        name: template.name,
        category: template.category,
        previewImage: template.previewImage ?? "",
        colorVariants: template.colorVariants ?? [],
        defaultData: template.defaultData ?? {},
      },
    });
  } catch (error) {
    console.error("Get template error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
