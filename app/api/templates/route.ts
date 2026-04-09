import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Template } from "@/models/Template";

export async function GET() {
  try {
    await connectToDatabase();

    const items = await Template.find()
      .sort({ createdAt: -1 })
      .select("_id name category previewImage colorVariants defaultData")
      .lean();

    return NextResponse.json({
      ok: true,
      items: items.map((t) => ({
        id: String(t._id),
        name: t.name,
        category: t.category,
        previewImage: t.previewImage ?? "",
        colorVariants: t.colorVariants ?? [],
        defaultData: t.defaultData ?? {},
      })),
    });
  } catch (error) {
    console.error("List templates error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
