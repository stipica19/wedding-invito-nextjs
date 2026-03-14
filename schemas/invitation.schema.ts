import { z } from "zod";

export const invitationBaseSchema = z.object({
    templateId: z.string().min(1),
    title: z.string().min(2),
    selectedColor: z.string().optional(),
    data: z.record(z.string(), z.any()).optional(),
    // optional custom slug from user:
    slug: z.string().optional(),
});

export const invitationCreateSchema = invitationBaseSchema;
export const invitationUpdateSchema = invitationBaseSchema.partial();
