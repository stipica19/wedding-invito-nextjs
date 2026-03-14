import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

import { connectToDatabase } from "@/lib/db"
import { registerSchema } from "@/schemas/auth.schema"
import { User } from "@/models/User"

export async function POST(req: Request) {
    try {
        await connectToDatabase()

        const body = await req.json()
        const parsed = registerSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Validation error", errors: parsed.error.flatten() },
                { status: 400 }
            )
        }

        const { email, password } = parsed.data

        const existing = await User.findOne({ email }).lean()
        if (existing) {
            return NextResponse.json({ message: "Email already in use" }, { status: 409 })
        }

        const passwordHash = await bcrypt.hash(password, 10)

        await User.create({
            email,
            passwordHash,
            role: "user",
        })

        return NextResponse.json({ message: "Registered" }, { status: 201 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}