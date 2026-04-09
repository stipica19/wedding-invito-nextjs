export type AuthUser = {
    id: string;
    email?: string;
    role?: "user" | "admin";
};

export type AuthSession = {
    user?: AuthUser;
} | null;

export async function getAuthSession(): Promise<AuthSession> {
    const { getServerSession } = await import("next-auth/next");
    const { authOptions } = await import("@/app/api/auth/[...nextauth]/route");

    return getServerSession(authOptions);
}
