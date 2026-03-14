import { NextResponse } from "next/server";

type RouteContext = {
    params: { id: string };
};

export async function PATCH(_: Request, context: RouteContext) {
    return NextResponse.json({
        ok: true,
        data: { id: context.params.id },
        message: "Admin update invitation status stub",
    });
}
