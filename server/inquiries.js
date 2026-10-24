const defaultRecipient = "send2alang@yahoo.com"

const maxRequestBytes = 16 * 1024

const rateLimitWindowMs = 10 * 60 * 1000

const rateLimitMax = 5

const rateLimits = new Map()

export class InquiryRequestError extends Error {
  constructor(message, status = 400) {
    super(message)

    this.status = status
  }
}

export function getEmailConfig(env = process.env) {
  const apiKey = env.RESEND_API_KEY?.trim()

  const from = env.RESEND_FROM?.trim()

  const rawRecipients = env.INQUIRY_TO?.trim() || defaultRecipient

  const recipients = [
    ...new Set(
      rawRecipients
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean),
    ),
  ]

  const senderAddress = from?.match(/<([^<>]+)>/)?.[1] || from || ""

  const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  return {
    apiKey,

    from,

    recipients,

    configured:
      Boolean(apiKey && from) &&
      !/your-(?:verified-)?domain\.com/i.test(from) &&
      validEmail(senderAddress) &&
      recipients.length > 0 &&
      recipients.every(validEmail),
  }
}

function getText(value, name, maxLength, required = true) {
  if (value === undefined && !required) return ""

  if (typeof value !== "string")
    throw new InquiryRequestError(`${name} is required.`)

  const text = value.trim()

  if (required && !text) throw new InquiryRequestError(`${name} is required.`)

  if (text.length > maxLength)
    throw new InquiryRequestError(`${name} is too long.`)

  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(text)) {
    throw new InquiryRequestError(`${name} contains invalid characters.`)
  }

  return text
}

function getEmail(value) {
  const email = getText(value, "Email address", 254)

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new InquiryRequestError("Enter a valid email address.")
  }

  return email
}

export function parseInquiry(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new InquiryRequestError("Invalid inquiry.")
  }

  const email = getEmail(body.email)

  if (body.type === "contact") {
    const name = getText(body.name, "Name", 120)

    const country = getText(body.country, "Country", 100)

    const phone = getText(body.phone, "Phone number", 50, false)

    const subject = getText(body.subject, "Topic", 120)

    const otherSubject = getText(body.otherSubject, "Other topic", 120, false)

    const message = getText(body.message, "Message", 5000)

    return {
      replyTo: email,

      subject: "Website contact inquiry",

      text: [
        "Website contact inquiry",

        `Name: ${name}`,

        `Email: ${email}`,

        `Country: ${country}`,

        `Phone: ${phone || "Not provided"}`,

        `Topic: ${subject}`,

        ...(otherSubject ? [`Additional topic details: ${otherSubject}`] : []),

        "",

        "Message:",

        message,
      ].join("\n"),
    }
  }

  if (body.type === "partnership") {
    const business = getText(body.business, "Business name", 160)

    const name = getText(body.name, "Contact name", 120)

    const phone = getText(body.phone, "Phone number", 50, false)

    const country = getText(body.country, "Country", 100)

    const businessType = getText(body.businessType, "Business type", 120)

    const message = getText(body.message, "Message", 5000, false)

    return {
      replyTo: email,

      subject: "Website partnership inquiry",

      text: [
        "Website partnership inquiry",

        `Business: ${business}`,

        `Contact name: ${name}`,

        `Email: ${email}`,

        `Phone: ${phone || "Not provided"}`,

        `Country: ${country}`,

        `Business type: ${businessType}`,

        "",

        "Message:",

        message || "Not provided",
      ].join("\n"),
    }
  }

  if (body.type === "class-notification") {
    return {
      replyTo: email,

      subject: "Cooking class launch notification request",

      text: `A visitor requested a cooking class launch notification.\n\nEmail: ${email}`,
    }
  }

  throw new InquiryRequestError("Invalid inquiry type.")
}

export async function readInquiryBody(req) {
  const contentLength = Number(req.headers["content-length"])

  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    throw new InquiryRequestError("Request is too large.", 413)
  }

  if (req.body !== undefined) {
    const serializedBody =
      typeof req.body === "string" ? req.body : JSON.stringify(req.body)

    if (Buffer.byteLength(serializedBody, "utf8") > maxRequestBytes) {
      throw new InquiryRequestError("Request is too large.", 413)
    }

    if (typeof req.body !== "string") return req.body

    try {
      return JSON.parse(req.body)
    } catch {
      throw new InquiryRequestError("Invalid JSON request.")
    }
  }

  let body = ""

  for await (const chunk of req) {
    body += Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk)

    if (Buffer.byteLength(body, "utf8") > maxRequestBytes) {
      throw new InquiryRequestError("Request is too large.", 413)
    }
  }

  try {
    return JSON.parse(body)
  } catch {
    throw new InquiryRequestError("Invalid JSON request.")
  }
}

export function rateLimited(ip) {
  const now = Date.now()

  if (rateLimits.size > 1000) {
    for (const [address, limit] of rateLimits) {
      if (limit.resetAt <= now) rateLimits.delete(address)
    }
  }

  const current = rateLimits.get(ip)

  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + rateLimitWindowMs })

    return false
  }

  current.count += 1

  return current.count > rateLimitMax
}

export async function sendInquiry(inquiry, config) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",

    headers: {
      Authorization: `Bearer ${config.apiKey}`,

      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      from: config.from,

      to: config.recipients,

      reply_to: inquiry.replyTo,

      subject: inquiry.subject,

      text: inquiry.text,
    }),

    signal: AbortSignal.timeout(10_000),
  })

  return {
    ok: response.ok,

    status: response.status,

    requestId: response.headers.get("x-resend-id"),
  }
}
