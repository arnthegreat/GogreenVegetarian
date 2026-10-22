# Inquiry email API

Contact messages, partnership inquiries, and cooking-class notification requests
are submitted to the Node backend and delivered using the Resend REST Email API.
The recipient is fixed to `send2alang@yahoo.com` in `server/index.js`; the browser
cannot select another recipient. The Resend API key stays on the backend and must
never be added to frontend code or committed to the repository.

## One-time Resend setup

Email delivery requires a Resend account and a sender domain that Resend has
verified. Those account and domain verification steps must be completed by the
site owner; the application cannot create or verify them automatically.

1. Add a domain you control in the [Resend Domains dashboard](https://resend.com/domains)
   and publish the DNS records Resend provides. Wait until Resend marks the
   domain as verified.
2. Create an API key in the [Resend API Keys dashboard](https://resend.com/api-keys)
   with permission to send emails.
3. In the ignored `server/.env` file, set `RESEND_API_KEY` to that secret and
   `RESEND_FROM` to a sender on the verified domain, for example
   `Gogreen Vegetarian <inquiries@your-verified-domain.com>`. Do not use the
   visitor's address or the Yahoo recipient address as the sender unless that
   address belongs to a domain verified in Resend.
4. Start the API with `npm run api`. Start the Vite development server separately
   with `npm run dev`; Vite proxies `/api` requests to port `3001`.

The backend sets the visitor's address as `Reply-To`, so the founder can reply
directly to each inquiry. Resend only confirms successful acceptance by its API;
check delivery and spam filtering in the receiving mailbox during initial testing.

## Production deployment

Deploy `server/index.js` as a persistent Node.js service and install project
dependencies. Configure `RESEND_API_KEY`, `RESEND_FROM`, `API_HOST=0.0.0.0`, and
the platform's `PORT` as private service environment variables. Route same-origin
`/api/*` requests from the website to this service through the hosting platform's
reverse proxy. If the frontend and API use separate origins, configure a
same-origin proxy rather than exposing the API key or adding permissive CORS.

The API limits each connection address to five submissions per ten minutes and
rejects malformed or oversized requests. When deployed behind a trusted proxy,
set `API_TRUST_PROXY=true` only if that proxy overwrites the incoming
`X-Forwarded-For` header. Apply provider-level abuse protection for a public
production site.

Without both `RESEND_API_KEY` and a non-placeholder `RESEND_FROM`, the API returns
an explicit service error and the website will not show a successful submission
message.
