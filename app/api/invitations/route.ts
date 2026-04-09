import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { isReservedSlug, slugify } from "@/lib/slug";
import { Invitation } from "@/models/Invitation";
import { Template } from "@/models/Template";
import { getAuthSession } from "@/lib/auth";

const createInvitationSchema = z.object({
  templateId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid templateId"),
  title: z.string().min(2),
  selectedColor: z.string().optional(),
  data: z.record(z.string(), z.any()).optional(),
  slug: z.string().optional(),
});

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const items = await Invitation.find({ ownerId: session.user.id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = createInvitationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation error", errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  await connectToDatabase();

  const { templateId, title, selectedColor, data, slug } = parsed.data;
  const templateExists = await Template.exists({ _id: templateId });
  if (!templateExists) {
    return NextResponse.json({ message: "Template not found" }, { status: 400 });
  }

  const base = slug ? slugify(slug) : slugify(title);
  if (!base || isReservedSlug(base)) {
    return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
  }

  let finalSlug = base;
  let i = 1;
  while (await Invitation.exists({ slug: finalSlug })) {
    i += 1;
    finalSlug = `${base}-${i}`;
  }

  const created = await Invitation.create({
    ownerId: session.user.id,
    templateId,
    slug: finalSlug,
    selectedColor: selectedColor ?? "default",
    data: data ?? {},
    status: "published",
  });

  return NextResponse.json({ item: created }, { status: 201 });
}