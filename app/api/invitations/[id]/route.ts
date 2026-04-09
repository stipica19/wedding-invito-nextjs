import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { isReservedSlug, slugify } from "@/lib/slug";
import { Invitation } from "@/models/Invitation";
import { invitationUpdateSchema } from "@/schemas/invitation.schema";
import { getAuthSession } from "@/lib/auth";

type RouteContext = {
    params: { id: string };
};

export async function GET(_: Request, context: RouteContext) {
    const session = await getAuthSession();
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(context.params.id)) {
        return NextResponse.json({ message: "Invalid invitation id" }, { status: 400 });
    }

    await connectToDatabase();

    const ownerId = session.user.id;
    const invitation = await Invitation.findOne({
        _id: context.params.id,
        ownerId,
    }).lean();

    if (!invitation) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
        ok: true,
        data: invitation,
    });
}

export async function PATCH(req: Request, context: RouteContext) {
    const session = await getAuthSession();
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(context.params.id)) {
        return NextResponse.json({ message: "Invalid invitation id" }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    const parsed = invitationUpdateSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { message: "Validation error", errors: parsed.error.flatten() },
            { status: 400 }
        );
    }

    await connectToDatabase();

    const ownerId = session.user.id;
    const invitation = await Invitation.findOne({
        _id: context.params.id,
        ownerId,
    }).lean();

    if (!invitation) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const input = parsed.data;
    const updatePayload: Record<string, unknown> = {};

    if (typeof input.templateId !== "undefined") {
        updatePayload.templateId = input.templateId;
    }
    if (typeof input.selectedColor !== "undefined") {
        updatePayload.selectedColor = input.selectedColor;
    }
    if (typeof input.data !== "undefined") {
        updatePayload.data = input.data;
    }

    const slugSource = input.slug ?? input.title;
    if (typeof slugSource !== "undefined") {
        const baseSlug = slugify(slugSource);

        if (!baseSlug || isReservedSlug(baseSlug)) {
            return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
        }

        let finalSlug = baseSlug;
        let i = 1;
        while (
            await Invitation.exists({
                slug: finalSlug,
                _id: { $ne: context.params.id },
            })
        ) {
            i += 1;
            finalSlug = `${baseSlug}-${i}`;
        }

        updatePayload.slug = finalSlug;
    }

    if (Object.keys(updatePayload).length === 0) {
        return NextResponse.json({ message: "No fields to update" }, { status: 400 });
    }

    const updated = await Invitation.findOneAndUpdate(
        { _id: context.params.id, ownerId },
        { $set: updatePayload },
        { new: true }
    ).lean();

    if (!updated) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
        ok: true,
        data: updated,
    });
}
