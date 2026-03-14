import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { connectToDatabase } from "@/lib/db"
import { User } from "@/models/User"
import { loginSchema } from "@/schemas/auth.schema"

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
                // 1) Zod validacija inputa
                const parsed = loginSchema.safeParse(credentials)
                if (!parsed.success) return null

                const { email, password } = parsed.data

                // 2) DB connect
                await connectToDatabase()

                // 3) Nađi usera
                const user = await User.findOne({ email }).lean()
                if (!user) return null

                // 4) Provjeri lozinku
                const ok = await bcrypt.compare(password, user.passwordHash)
                if (!ok) return null

                // 5) Vrati minimalan user objekt (ovo ide u JWT)
                return {
                    id: String(user._id),
                    email: user.email,
                    role: user.role ?? "user",
                }
            },
        }),
    ],

    callbacks: {
        // spremi custom polja u token
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id
                token.role = (user as any).role
            }
            return token
        },

        // iz tokena prebaci u session (da možeš u UI)
        async session({ session, token }) {
            if (session.user) {
                ; (session.user as any).id = token.id
                    ; (session.user as any).role = token.role
            }
            return session
        },
    },

    pages: {
        signIn: "/login",
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }