import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(2, "Ime mora imati barem 2 znaka"),
    email: z.string().email("Neispravan email"),
    password: z.string().min(6, "Lozinka mora imati barem 6 znakova"),
})

export const loginSchema = z.object({
    email: z.string().email("Neispravan email"),
    password: z.string().min(1, "Lozinka je obavezna"),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>