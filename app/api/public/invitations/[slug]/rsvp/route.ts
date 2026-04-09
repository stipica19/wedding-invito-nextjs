import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Invitation } from "@/models/Invitation";
import { RSVP } from "@/models/RSVP";
import { rsvpSchema } from "@/schemas/rsvp.schema";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function POST(req: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    await connectToDatabase();

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

    const body = await req.json().catch(() => null);
    const parsed = rsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validation error", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const guestsCount =
      payload.attending === "no" ? 0 : payload.guestsCount ?? 0;

    const created = await RSVP.create({
      invitationId: invitation._id,
      name: payload.name,
      attending: payload.attending,
      guestsCount,
      message: payload.message ?? "",
    });

    return NextResponse.json(
      {
        ok: true,
        data: {
          id: String(created._id),
          invitationId: String(created.invitationId),
          name: created.name,
          attending: created.attending,
          guestsCount: created.guestsCount,
          message: created.message ?? "",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create RSVP error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}