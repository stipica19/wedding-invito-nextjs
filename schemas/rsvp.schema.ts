import { z } from "zod";

export const rsvpSchema = z.object({
    name: z.string().min(1),
    attending: z.enum(["yes", "no", "maybe"]),
    guestsCount: z.number().int().min(0).optional(),
    message: z.string().max(500).optional(),
});
