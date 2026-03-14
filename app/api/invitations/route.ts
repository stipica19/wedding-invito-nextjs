import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectToDatabase } from "@/lib/db"
import { isReservedSlug, slugify } from "@/lib/slug"
import { z } from "zod"
import { Invitation } from "@/models/Invitation"

const createInvitationSchema = z.object({
    templateId: z.string().min(1),
    title: z.string().min(2),
    selectedColor: z.string().optional(),
    data: z.record(z.string(), z.any()).optional(),
    // optional custom slug from user:
    slug: z.string().optional(),
})

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    await connectToDatabase()

    const ownerId = (session.user as any).id
    const items = await Invitation.find({ ownerId }).sort({ createdAt: -1 }).lean()

    return NextResponse.json({ items })
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const body = await req.json().catch(() => null)
    const parsed = createInvitationSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json({ message: "Validation error", errors: parsed.error.flatten() }, { status: 400 })
    }

    await connectToDatabase()

    const ownerId = (session.user as any).id
    const { templateId, title, selectedColor, data, slug } = parsed.data

    // slug generation
    const base = slug ? slugify(slug) : slugify(title)
    if (!base || isReservedSlug(base)) {
        return NextResponse.json({ message: "Invalid slug" }, { status: 400 })
    }

    // ensure unique slug (simple)
    let finalSlug = base
    let i = 1
    while (await Invitation.exists({ slug: finalSlug })) {
        i += 1
        finalSlug = `${base}-${i}`
    }

    const created = await Invitation.create({
        ownerId,
        templateId,
        slug: finalSlug,
        selectedColor: selectedColor ?? "default",
        data: data ?? {},
        status: "pending", // admin approval
    })

    return NextResponse.json({ item: created }, { status: 201 })
}