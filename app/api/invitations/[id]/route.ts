import { NextResponse } from "next/server";

type RouteContext = {
    params: { id: string };
};

export async function GET(_: Request, context: RouteContext) {
    return NextResponse.json({
        ok: true,
        data: { id: context.params.id },
        message: "Get invitation by id stub",
    });
}

export async function PATCH(_: Request, context: RouteContext) {
    return NextResponse.json({
        ok: true,
        data: { id: context.params.id },
        message: "Update invitation stub",
    });
}
