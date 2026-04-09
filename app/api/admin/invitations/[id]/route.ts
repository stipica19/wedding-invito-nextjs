import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

type RouteContext = {
    params: { id: string };
};

export async function PATCH(_: Request, context: RouteContext) {
    const session = await getAuthSession();

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({
        ok: true,
        data: { id: context.params.id },
        message: "Admin update invitation status stub",
    });
}
