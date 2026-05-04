export function getSpecValue(specs: unknown, key: string): string | null {
    if (!specs) return null
    let parsed = specs
    if (typeof specs === "string") {
        try {
            parsed = JSON.parse(specs)
        } catch {
            return null
        }
    }
    if (!Array.isArray(parsed)) return null
    const found = parsed.find(
        (s) => s.key?.trim().toLowerCase() === key.toLowerCase()
    )
    return found?.value ?? null
}
