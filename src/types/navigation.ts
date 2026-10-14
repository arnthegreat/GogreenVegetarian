

export type Page = "home" | "contact" | "shop" | "about" | "partner" | "founder" | "activities" | "product" | "store"

export type Navigate = (page: Page, section?: string) => void
