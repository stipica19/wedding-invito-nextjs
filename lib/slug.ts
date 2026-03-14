export const RESERVED_SLUGS = new Set([
    "login",
    "register",
    "dashboard",
    "templates",
    "create",
    "admin",
    "api",
])

export function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
}

export function isReservedSlug(slug: string) {
    return RESERVED_SLUGS.has(slug)
}