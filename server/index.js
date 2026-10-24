import { createServer } from "node:http"

import {
  getEmailConfig,
  InquiryRequestError,
  parseInquiry,
  rateLimited,
  readInquiryBody,
  sendInquiry,
} from "./inquiries.js"

const emailConfig = getEmailConfig()

function respond(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" })

  res.end(JSON.stringify(body))
}

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url?.split("?")[0] === "/api/health") {
    respond(res, emailConfig.configured ? 200 : 503, {
      ok: emailConfig.configured,

      emailDeliveryConfigured: emailConfig.configured,
    })

    return
  }

  if (req.method !== "POST" || req.url?.split("?")[0] !== "/api/inquiries") {
    respond(res, 404, { error: "Not found." })

    return
  }

  if (!req.headers["content-type"]?.startsWith("application/json")) {
    respond(res, 415, { error: "Send the inquiry as JSON." })

    return
  }

  const forwardedFor = req.headers["x-forwarded-for"]

  const forwardedAddresses =
    process.env.API_TRUST_PROXY === "true" && typeof forwardedFor === "string"
      ? forwardedFor
          .split(",")
          .map((address) => address.trim())
          .filter(Boolean)
      : []

  const ip = forwardedAddresses[0] || req.socket.remoteAddress || "unknown"

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
})

const port = Number(process.env.API_PORT || process.env.PORT || 3001)

const host = process.env.API_HOST || "0.0.0.0"

server.listen(port, host, () => {
  console.log(`Inquiry API listening on ${host}:${port}`)

  if (!emailConfig.configured) {
    console.warn(
      "Resend email delivery is not configured. Set RESEND_API_KEY and RESEND_FROM.",
    )
  } else {
    console.log("Resend REST email delivery is configured.")
  }
})
