import {
  getEmailConfig,
  InquiryRequestError,
  parseInquiry,
  rateLimited,
  readInquiryBody,
  sendInquiry,
} from "../server/inquiries.js"

function respond(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" })

  res.end(JSON.stringify(body))
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")

    respond(res, 405, { error: "Method not allowed." })

    return
  }

  if (!req.headers["content-type"]?.startsWith("application/json")) {
    respond(res, 415, { error: "Send the inquiry as JSON." })

    return
  }

  const forwardedFor = req.headers["x-forwarded-for"]

  const ip =
    (typeof forwardedFor === "string"
      ? forwardedFor.split(",")[0].trim()
      : "") ||
    req.socket.remoteAddress ||
    "unknown"

  if (rateLimited(ip)) {
    respond(res, 429, {
      error: "Too many submissions. Please try again later.",
    })

    return
  }

  let inquiry

  try {
    inquiry = parseInquiry(await readInquiryBody(req))
  } catch (error) {
    const status = error instanceof InquiryRequestError ? error.status : 400

    respond(res, status, {
      error: error instanceof Error ? error.message : "Invalid inquiry.",
    })

    return
  }

  const emailConfig = getEmailConfig()

  if (!emailConfig.configured) {
    respond(res, 503, {
      error: "Email delivery is not configured. Please try again later.",
    })

    return
  }

  try {
    const result = await sendInquiry(inquiry, emailConfig)

    if (!result.ok) {
      console.error(
        `Resend email API returned HTTP ${result.status}.` +
          (result.requestId ? ` Request ID: ${result.requestId}.` : ""),
      )

      respond(res, 502, {
        error: "We could not send your message. Please try again later.",
      })

      return
    }

    respond(res, 200, { ok: true })
  } catch (error) {
    console.error(
      "Could not connect to the Resend email API.",

      error instanceof Error ? error.message : "Unknown network error.",
    )

    respond(res, 502, {
      error: "We could not send your message. Please try again later.",
    })
  }
}
