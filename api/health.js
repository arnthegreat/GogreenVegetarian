import { getEmailConfig } from "../server/inquiries.js"

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")

    res.writeHead(405, { "Content-Type": "application/json; charset=utf-8" })

    res.end(JSON.stringify({ error: "Method not allowed." }))

    return
  }

  const configured = getEmailConfig().configured

  res.writeHead(configured ? 200 : 503, {
    "Content-Type": "application/json; charset=utf-8",
  })

  res.end(
    JSON.stringify({
      ok: configured,

      emailDeliveryConfigured: configured,
    }),
  )
}
