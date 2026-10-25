# EmailJS setup

The contact, partnership, and cooking-class notification forms send directly
from the browser using the EmailJS SDK. No email API server or private email
provider key is used.

## Configure EmailJS

1. Create an EmailJS account and connect an email service in the
   [EmailJS dashboard](https://dashboard.emailjs.com/).
2. Create one email template for all three inquiry forms. Set its recipients in
   the template's **To Email** field, for example:
   `send2alang@yahoo.com, aaronbonaobrakh@gmail.com`. Keep recipients in the
   EmailJS template rather than accepting them from the browser.
3. Set the template's **Reply To** field to `{{reply_to}}` and **Subject** to
   `{{subject}}`.
4. Add these variables to the template content:

   - `{{inquiry_type}}`
   - `{{name}}`
   - `{{business}}`
   - `{{email}}`
   - `{{country}}`
   - `{{phone}}`
   - `{{topic}}`
   - `{{other_topic}}`
   - `{{business_type}}`
   - `{{message}}`

   For example, a plain-text template body could be:

   ```text
   {{inquiry_type}}

   Name: {{name}}
   Business: {{business}}
   Email: {{email}}
   Country: {{country}}
   Phone: {{phone}}
   Topic: {{topic}}
   Other topic: {{other_topic}}
   Business type: {{business_type}}

   Message:
   {{message}}
   ```

5. Copy the service ID, template ID, and public key from EmailJS.
6. In the Vercel project, add these environment variables for every environment
   you deploy. Then redeploy:

   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

   Vite embeds `VITE_*` variables into the website at build time, so set them
   before redeploying. These values are used by the browser. EmailJS calls its
   public key a public key; never put a private key or email account password
   in a `VITE_*` variable.

For local development, create `.env.local` in the project root (next to
`package.json`), copy the three variable names from `.env.example`, fill in
their values, and restart the Vite server. Vite loads `.env.local` when it
starts; `.env.example` is only a template and is not loaded automatically.
The `.env.local` file is ignored by Git.

## Protect the public form

Client-side EmailJS configuration is visible to site visitors by design. In
EmailJS, restrict allowed origins/domains to the production website and any
development origins you use. Configure EmailJS's rate limits and CAPTCHA
protection if available for your plan, and monitor the EmailJS usage dashboard.
The old server-side rate limit does not apply to browser-based submissions.

After configuring and deploying, submit one real test inquiry and confirm it
appears in EmailJS's email history and reaches the template recipients.
