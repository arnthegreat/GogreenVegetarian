export type ContactInquiry = {
  type: "contact"

  name: string

  email: string

  country: string

  phone: string

  subject: string

  otherSubject: string

  message: string
}

export type PartnershipInquiry = {
  type: "partnership"

  business: string

  name: string

  email: string

  phone: string

  country: string

  businessType: string

  message: string
}

export type ClassNotificationInquiry = {
  type: "class-notification"

  email: string
}

export type Inquiry = ContactInquiry | PartnershipInquiry | ClassNotificationInquiry

export async function submitInquiry(inquiry: Inquiry): Promise<void> {
  let response: Response

  try {
    response = await fetch("/api/inquiries", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(inquiry),

      signal: AbortSignal.timeout(15_000),
    })
  } catch {
    throw new Error(
      "Could not connect to the email service. Please try again later.",
    )
  }

  if (response.ok) return

  let message = "We could not send your message. Please try again later."

  try {
    const result: { error?: unknown } = await response.json()

    if (typeof result.error === "string") message = result.error
  } catch {
    // Keep the user-facing fallback when the server response is not JSON.
  }

  throw new Error(message)
}
