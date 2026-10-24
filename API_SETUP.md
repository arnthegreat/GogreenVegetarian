# Inquiry email API

Contact messages, partnership inquiries, and cooking-class notification requests
are submitted to a same-origin API and delivered using the Resend REST Email API.
The API key and recipient list are read only by the backend; neither is sent by
the browser. The default recipient is `send2alang@yahoo.com`. Set `INQUIRY_TO` to
a comma-separated list to deliver inquiries to more than one inbox.

## One-time Resend setup

Email delivery requires a Resend account and a sender domain that Resend has
verified. Those account and domain verification steps must be completed by the
site owner; the application cannot create or verify them automatically.

1. Add a domain you control in the [Resend Domains dashboard](https://resend.com/domains)
   and publish the DNS records Resend provides. Wait until Resend marks the
   domain as verified.
2. Create an API key in the [Resend API Keys dashboard](https://resend.com/api-keys)
   with permission to send emails.
3. Set `RESEND_API_KEY` to that secret and `RESEND_FROM` to a sender on the
   verified domain, for example `Gogreen Vegetarian <inquiries@example.com>`.
   Do not use the visitor's address or a public mailbox as the sender.
4. For local development, put the settings in the ignored `server/.env` file.
   Optionally set `INQUIRY_TO=send2alang@yahoo.com,another-inbox@example.com`.
5. Start the API with `npm run api`. Start the Vite development server separately
   with `npm run dev`; Vite proxies `/api` requests to port `3001`.
6. Check `http://localhost:3001/api/health`. A `200` response with
   `{"ok":true,"emailDeliveryConfigured":true}` confirms the server has a
   non-placeholder API key and sender configured. A `503` response means the
   server still needs configuration; this check does not verify the key with
   Resend or confirm that the sender domain is actually verified.

The backend sets the visitor's address as `Reply-To`, so the founder can reply
directly to each inquiry. Resend only confirms successful acceptance by its API;
check delivery and spam filtering in the receiving mailbox during initial testing.

## Vercel deployment

The Vite site can use the Vercel Functions in `api/` for `/api/inquiries` and
`/api/health`; the local Node server remains available for development. In the
Vercel project settings, add these environment variables for each environment
you deploy, then redeploy:

- `RESEND_API_KEY`: the Resend secret API key.
- `RESEND_FROM`: a sender on a domain verified in Resend, such as
  `Gogreen Vegetarian <inquiries@example.com>`.
- `INQUIRY_TO`: a comma-separated list such as
  `owner@example.com,second-inbox@example.com`. This is optional; without it,
  the Yahoo address is used.

Keep the API key in Vercel's encrypted environment-variable settings; never put
it in the frontend, source control, or a chat message. After redeployment, visit
`https://gogreen-vegetarian.vercel.app/api/health`. A `200` response means the
required settings are present. A `503` response means the API still needs
configuration. The health check cannot validate the API key with Resend or
verify domain ownership.

The `vercel.app` website address is not a sending domain that you own. Resend
requires a domain you control and have verified, so you will need to register or
use a domain you own, add it in Resend, and publish Resend's DNS records. You
can continue hosting the site on its existing Vercel URL; the sending domain
does not have to match the website URL.

Both API routes reject malformed or oversized requests, and the inquiry route
limits each observed client address to five submissions per ten minutes.
In-memory rate limits on serverless instances are best-effort; configure
additional platform-level abuse protection for a public production site.

## Delivery verification

Submit a real test inquiry after configuring a verified sender. A successful
form response means Resend accepted the request, not necessarily that the email
reached the inbox. Check Resend's email logs and both recipient inboxes,
including spam, during initial testing.

Without both `RESEND_API_KEY` and a non-placeholder `RESEND_FROM`, the API returns
an explicit service error and the website will not show a successful submission
message.
