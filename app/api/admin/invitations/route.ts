import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({
        ok: true,
        data: [],
        message: "Admin list invitations stub",
    });
}
