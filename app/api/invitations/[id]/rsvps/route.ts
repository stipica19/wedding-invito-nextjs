import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { Invitation } from "@/models/Invitation";
import { RSVP } from "@/models/RSVP";
import { getAuthSession } from "@/lib/auth";

type RouteContext = {
    params: Promise<{ id: string }>;
};

type RSVPListItem = {
    name?: string;
    attending?: "yes" | "no" | "maybe";
    guestsCount?: number;
    message?: string;
    createdAt?: Date;
};

function escapeCsv(value: string): string {
    return `"${value.replace(/"/g, '""')}"`;
}

export async function GET(req: Request, context: RouteContext) {
    const { id } = await context.params;

    const session = await getAuthSession();
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid invitation id" }, { status: 400 });
    }

    await connectToDatabase();

    const ownerId = session.user.id;
    const invitation = await Invitation.findOne({
        _id: id,
        ownerId,
    }).lean();

    if (!invitation) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const rsvps = (await RSVP.find({ invitationId: id })
        .sort({ createdAt: -1 })
        .lean()) as RSVPListItem[];

    const { searchParams } = new URL(req.url);
    if (searchParams.get("format") === "csv") {
        const header = ["name", "attending", "guestsCount", "message", "createdAt"];
        const lines = rsvps.map((item) => {
            const createdAt = item.createdAt ? new Date(item.createdAt).toISOString() : "";
            const message = typeof item.message === "string" ? item.message : "";

            return [
                escapeCsv(String(item.name ?? "")),
                escapeCsv(String(item.attending ?? "")),
                escapeCsv(String(item.guestsCount ?? 0)),
                escapeCsv(message),
                escapeCsv(createdAt),
            ].join(",");
        });

        const csv = [header.join(","), ...lines].join("\n");
        const filename = `rsvps-${id}.csv`;

        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename=\"${filename}\"`,
                "Cache-Control": "no-store",
            },
        });
    }

    return NextResponse.json({
        ok: true,
        data: { invitationId: id, rsvps },
    });
}
