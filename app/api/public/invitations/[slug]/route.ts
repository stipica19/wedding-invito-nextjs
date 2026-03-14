import { NextResponse } from "next/server";

type RouteContext = {
    params: { slug: string };
};

export async function GET(_: Request, context: RouteContext) {
    return NextResponse.json({
        ok: true,
        data: { slug: context.params.slug },
        message: "Public invitation lookup stub",
    });
}
