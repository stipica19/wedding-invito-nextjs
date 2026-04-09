import { z } from "zod";

export const rsvpSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Ime mora imati barem 2 znaka")
        .max(120, "Ime je predugacko"),
    attending: z.enum(["yes", "no", "maybe"]),
    guestsCount: z.number().int().min(0, "Broj gostiju ne moze biti negativan").optional(),
    message: z
        .string()
        .trim()
        .max(500, "Poruka moze imati najvise 500 znakova")
        .optional(),
})
    .superRefine((data, ctx) => {
        if (data.attending === "yes" && (data.guestsCount ?? 0) < 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["guestsCount"],
                message: "Ako dolazis, broj gostiju mora biti barem 1",
            });
        }

        if (data.attending === "no" && (data.guestsCount ?? 0) !== 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["guestsCount"],
                message: "Ako ne dolazis, broj gostiju mora biti 0",
            });
        }
    })
    .transform((data) => ({
        ...data,
        message: data.message && data.message.length > 0 ? data.message : undefined,
    }));
