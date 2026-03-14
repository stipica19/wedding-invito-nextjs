import { NextResponse } from "next/server";

type RouteContext = {
    params: { slug: string };
};

export async function POST(_: Request, context: RouteContext) {
    return NextResponse.json({
        ok: true,
        data: { slug: context.params.slug },
        message: "Create RSVP stub",
    });
}
