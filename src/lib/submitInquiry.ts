import emailjs from "@emailjs/browser"

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

type EmailTemplateParams = {
  inquiry_type: string

  subject: string

  reply_to: string

  email: string

  name: string

  business: string

  country: string

  phone: string

  topic: string

  other_topic: string

  business_type: string

  message: string
}

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()

const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()

const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()

function getTemplateParams(inquiry: Inquiry): EmailTemplateParams {
  const params: EmailTemplateParams = {
    inquiry_type: "",

    subject: "",

    reply_to: inquiry.email,

    email: inquiry.email,

    name: "",

    business: "",

    country: "",

    phone: "",

    topic: "",

    other_topic: "",

    business_type: "",

    message: "",
  }

  if (inquiry.type === "contact") {
    return {
      ...params,

      inquiry_type: "Contact inquiry",

      subject: "Website contact inquiry",

      name: inquiry.name,

      country: inquiry.country,

      phone: inquiry.phone || "Not provided",

      topic: inquiry.subject,

      other_topic: inquiry.otherSubject,

      message: inquiry.message,
    }
  }

  if (inquiry.type === "partnership") {
    return {
      ...params,

      inquiry_type: "Partnership inquiry",

      subject: "Website partnership inquiry",

      name: inquiry.name,

      business: inquiry.business,

      country: inquiry.country,

      phone: inquiry.phone || "Not provided",

      business_type: inquiry.businessType,

      message: inquiry.message || "Not provided",
    }
  }

  return {
    ...params,

    inquiry_type: "Cooking class notification request",

    subject: "Cooking class launch notification request",

    message: `A visitor requested a cooking class launch notification.\n\nEmail: ${inquiry.email}`,
  }
}

export async function submitInquiry(inquiry: Inquiry): Promise<void> {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "Email is not configured yet. Please contact us directly by email.",
    )
  }

  try {
    await emailjs.send(
      serviceId,

      templateId,

      getTemplateParams(inquiry),

      { publicKey },
    )
  } catch (error) {
    console.error("EmailJS could not send the inquiry.", error)

    throw new Error(
      "We could not send your message. Please try again later or contact us directly by email.",
    )
  }
}
