import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Invitation } from "@/models/Invitation";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    await connectToDatabase();

    // Vracamo samo javno dostupne (published) pozivnice
    const invitation = await Invitation.findOne({
      slug,
      status: "published",
    }).lean();

    if (!invitation) {
      return NextResponse.json(
        { message: "Invitation not found" },
        { status: 404 }
      );
    }

    // Vrati samo sigurna/javna polja
    return NextResponse.json({
      ok: true,
      data: {
        id: String(invitation._id),
        slug: invitation.slug,
        status: invitation.status,
        selectedColor: invitation.selectedColor ?? "default",
        data: invitation.data ?? {},
      },
    });
  } catch (error) {
    console.error("Public invitation lookup error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}