export type AuthUser = {
    id: string;
    email?: string;
    role?: "user" | "admin";
};

export type AuthSession = {
    user?: AuthUser;
} | null;

export async function getAuthSession(): Promise<AuthSession> {
    // TODO: Replace with getServerSession from next-auth.
    // const session = await getServerSession(authOptions);
    return null;
}
