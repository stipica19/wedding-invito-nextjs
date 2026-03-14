import { NextResponse } from "next/server";

type RouteContext = {
    params: { id: string };
};

export async function GET(_: Request, context: RouteContext) {
    return NextResponse.json({
        ok: true,
        data: { invitationId: context.params.id, rsvps: [] },
        message: "List RSVPs stub",
    });
}
