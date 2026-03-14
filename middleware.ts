import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isDashboard = pathname.startsWith("/dashboard");
    const isAdmin = pathname.startsWith("/admin");

    if (!isDashboard && !isAdmin) {
        return NextResponse.next();
    }

    // TODO: Replace with NextAuth token/session validation.
    const isAuthenticated = true;
    const userRole: "user" | "admin" = "admin";

    if (!isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (isAdmin && userRole !== "admin") {
        const dashboardUrl = new URL("/dashboard", request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};
