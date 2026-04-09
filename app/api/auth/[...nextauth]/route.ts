import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { loginSchema } from "@/schemas/auth.schema";

type CredentialsUserPayload = {
    id?: unknown;
    role?: unknown;
};

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsed = loginSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const { email, password } = parsed.data;

                await connectToDatabase();

                const user = await User.findOne({ email }).lean();
                if (!user) return null;

                const ok = await bcrypt.compare(password, user.passwordHash);
                if (!ok) return null;

                return {
                    id: String(user._id),
                    email: user.email,
                    role: user.role ?? "user",
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as CredentialsUserPayload;

                if (typeof authUser.id === "string") {
                    token.id = authUser.id;
                }

                if (authUser.role === "user" || authUser.role === "admin") {
                    token.role = authUser.role;
                }
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user && typeof token.id === "string") {
                session.user.id = token.id;
            }

            if (session.user && (token.role === "user" || token.role === "admin")) {
                session.user.role = token.role;
            }

            return session;
    },
    },

    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };