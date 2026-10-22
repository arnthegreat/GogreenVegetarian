import { createServer } from 'node:http'

const recipient = 'send2alang@yahoo.com'
const maxRequestBytes = 16 * 1024
const rateLimitWindowMs = 10 * 60 * 1000
const rateLimitMax = 5
const rateLimits = new Map()
const resendApiKey = process.env.RESEND_API_KEY
const resendFrom = process.env.RESEND_FROM
const emailDeliveryConfigured =
  Boolean(resendApiKey && resendFrom) &&
  !resendFrom.includes('your-domain.com')

function respond(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(body))
}

function rateLimited(ip) {
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

function getText(value, name, maxLength, required = true) {
  if (value === undefined && !required) return ''
  if (typeof value !== 'string') throw new Error(`${name} is required.`)
  const text = value.trim()
  if (required && !text) throw new Error(`${name} is required.`)
  if (text.length > maxLength) throw new Error(`${name} is too long.`)
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(text)) {
    throw new Error(`${name} contains invalid characters.`)
  }
  return text
}

function getEmail(value) {
  const email = getText(value, 'Email address', 254)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Enter a valid email address.')
  }
  return email
}

function parseInquiry(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new Error('Invalid inquiry.')
  }

  const email = getEmail(body.email)
  if (body.type === 'contact') {
    const name = getText(body.name, 'Name', 120)
    const country = getText(body.country, 'Country', 100)
    const phone = getText(body.phone, 'Phone number', 50, false)
    const subject = getText(body.subject, 'Topic', 120)
    const otherSubject = getText(body.otherSubject, 'Other topic', 120, false)
    const message = getText(body.message, 'Message', 5000)
    return {
      replyTo: email,
      subject: 'Website contact inquiry',
      text: [
        'Website contact inquiry',
        `Name: ${name}`,
        `Email: ${email}`,
        `Country: ${country}`,
        `Phone: ${phone || 'Not provided'}`,
        `Topic: ${subject}`,
        ...(otherSubject ? [`Additional topic details: ${otherSubject}`] : []),
        '',
        'Message:',
        message,
      ].join('\n'),
    }
  }

  if (body.type === 'partnership') {
    const business = getText(body.business, 'Business name', 160)
    const name = getText(body.name, 'Contact name', 120)
    const phone = getText(body.phone, 'Phone number', 50, false)
    const country = getText(body.country, 'Country', 100)
    const businessType = getText(body.businessType, 'Business type', 120)
    const message = getText(body.message, 'Message', 5000, false)
    return {
      replyTo: email,
      subject: 'Website partnership inquiry',
      text: [
        'Website partnership inquiry',
        `Business: ${business}`,
        `Contact name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Country: ${country}`,
        `Business type: ${businessType}`,
        '',
        'Message:',
        message || 'Not provided',
      ].join('\n'),
    }
  }

  if (body.type === 'class-notification') {
    return {
      replyTo: email,
      subject: 'Cooking class launch notification request',
      text: `A visitor requested a cooking class launch notification.\n\nEmail: ${email}`,
    }
  }

  throw new Error('Invalid inquiry type.')
}

async function readBody(req) {
  let body = ''
  for await (const chunk of req) {
    body += chunk
    if (Buffer.byteLength(body, 'utf8') > maxRequestBytes) {
      const error = new Error('Request is too large.')
      error.status = 413
      throw error
    }
  }
  try {
    return JSON.parse(body)
  } catch {
    const error = new Error('Invalid JSON request.')
    error.status = 400
    throw error
  }
}

const server = createServer(async (req, res) => {
  if (req.method !== 'POST' || req.url?.split('?')[0] !== '/api/inquiries') {
    respond(res, 404, { error: 'Not found.' })
    return
  }
  if (!req.headers['content-type']?.startsWith('application/json')) {
    respond(res, 415, { error: 'Send the inquiry as JSON.' })
    return
  }

  const forwardedFor = req.headers['x-forwarded-for']
  const forwardedAddresses =
    process.env.API_TRUST_PROXY === 'true' && typeof forwardedFor === 'string'
      ? forwardedFor.split(',').map((address) => address.trim()).filter(Boolean)
      : []
  const ip =
    forwardedAddresses[0] || req.socket.remoteAddress || 'unknown'
  if (rateLimited(ip)) {
    respond(res, 429, { error: 'Too many submissions. Please try again later.' })
    return
  }

  let inquiry
  try {
    inquiry = parseInquiry(await readBody(req))
  } catch (error) {
    const status =
      error instanceof Error && 'status' in error ? error.status : 400
    respond(res, status, {
      error: error instanceof Error ? error.message : 'Invalid inquiry.',
    })
    return
  }

  if (!emailDeliveryConfigured) {
    respond(res, 503, {
      error: 'Email delivery is not configured. Please try again later.',
    })
    return
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: resendFrom,
        to: [recipient],
        reply_to: inquiry.replyTo,
        subject: inquiry.subject,
        text: inquiry.text,
      }),
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      console.error(`Resend email API returned HTTP ${response.status}.`)
      respond(res, 502, {
        error: 'We could not send your message. Please try again later.',
      })
      return
    }

    respond(res, 200, { ok: true })
  } catch {
    console.error('Could not connect to the Resend email API.')
    respond(res, 502, {
      error: 'We could not send your message. Please try again later.',
    })
  }
})

const port = Number(process.env.API_PORT || process.env.PORT || 3001)
const host = process.env.API_HOST || '0.0.0.0'

server.listen(port, host, () => {
  console.log(`Inquiry API listening on ${host}:${port}`)
  if (!emailDeliveryConfigured) {
    console.warn(
      'Resend email delivery is not configured. Set RESEND_API_KEY and RESEND_FROM.',
    )
  } else {
    console.log('Resend REST email delivery is configured.')
  }
})
