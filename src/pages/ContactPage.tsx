import { useState } from 'react'
import { COUNTRIES } from '@/data/site'
import { InnerNav } from '@/components/layout/index'
import type { Page } from '@/types/navigation'
import { submitInquiry } from '@/lib/submitInquiry'

export default function ContactPage({ navigate }: { navigate: (p: Page) => void }) {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    subject: "",
    otherSubject: "",
    message: "",
  })
  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitting(true)
    try {
      await submitInquiry({ type: 'contact', ...form })
      setSent(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'We could not send your message. Please try again later.',
      )
    } finally {
      setSubmitting(false)
    }
  }
  const selectedCountry = COUNTRIES.find((c) => c.name === form.country)
  const fieldClass =
    "w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FEFCF7] text-[#1A2E15] text-sm placeholder-[#B0A898] focus:outline-none focus:border-[#6B8F5E] transition-colors"

  return (
    <div className="min-h-screen bg-[#F8F4EC]">
      <InnerNav navigate={navigate} />
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
        <div className="lg:sticky lg:top-24">
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#1A2E15] leading-tight mb-5">
            We'd Love to
            <br />
            <span className="text-[#2D5016]">Hear From You</span>
          </h1>
          <p className="text-[#6B6558] leading-relaxed mb-10">
            Whether you have a product question, want to discuss wholesale, or
            simply want to share your thoughts — please use the form to send us
            your message or ideas.
          </p>
          <div className="space-y-5">
            {[
              { icon: "📍", label: "Location", val: "Phnom Penh, Cambodia" },
              { icon: "📞", label: "Phone", val: "+855 12 345 678" },
              { icon: "✉️", label: "Email", val: "send2alang@yahoo.com" },
              { icon: "🕘", label: "Response time", val: "Within 24 hours" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div>
                  <div className="text-[#1A2E15] font-semibold text-sm">
                    {item.label}
                  </div>
                  <div className="text-[#6B6558] text-sm">{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-[#E0D8C8] p-8 lg:p-10">
          {sent ? (
            <div className="py-16 text-center">
              <div className="text-6xl mb-5">🌿</div>
              <h2 className="font-display text-2xl font-semibold text-[#2D5016] mb-3">
                Message Received!
              </h2>
              <p className="text-[#6B6558] leading-relaxed mb-6">
                Thank you for reaching out. We'll get back to you within 24
                hours.
              </p>
              <button
                onClick={() => navigate("home")}
                className="px-7 py-3 rounded-full bg-[#2D5016] text-white font-semibold hover:bg-[#3D6822] transition-colors text-sm"
              >
                Return Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#1A2E15] mb-1">
                  Send a Message
                </h2>
                <p className="text-[#6B6558] text-sm">
                  Fields marked * are required.
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                  Full Name *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={set("name")}
                  placeholder="Your full name"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                  Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                  Country *
                </label>
                <select
                  required
                  value={form.country}
                  onChange={set("country")}
                  className={fieldClass}
                >
                  <option value="">Select your country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.flag} {c.name}
                      {c.code ? ` (${c.code})` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  {selectedCountry?.code && (
                    <div className="shrink-0 px-3 py-3 rounded-xl border border-[#E0D8C8] bg-[#F0EAD8] text-[#1A2E15] text-sm font-medium whitespace-nowrap">
                      {selectedCountry.flag} {selectedCountry.code}
                    </div>
                  )}
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder={
                      selectedCountry?.code
                        ? "Your number"
                        : "Select country first"
                    }
                    className={fieldClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                  What is it about? *
                </label>
                <select
                  required
                  value={form.subject}
                  onChange={set("subject")}
                  className={fieldClass}
                >
                  <option value="">Select a topic</option>
                  <option>Product Inquiry</option>
                  <option>Wholesale / Bulk Order</option>
                  <option>Retail Partnership</option>
                  <option>Cooking Classes</option>
                  <option>Feedback or Suggestion</option>
                  <option>Press / Media</option>
                  <option>Other</option>
                </select>
                {form.subject === "Other" && (
                  <input
                    value={form.otherSubject}
                    onChange={set("otherSubject")}
                    placeholder="Please describe your topic..."
                    className={`${fieldClass} mt-2`}
                  />
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Share your thoughts, questions, or ideas with us..."
                  className={`${fieldClass} resize-none`}
                />
              </div>
              {submitError && (
                <p role="alert" className="text-sm text-red-700">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-[#2D5016] hover:bg-[#3D6822] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
              <p className="text-center text-[#B0A898] text-xs">
                Or call us at{" "}
                <a
                  href="tel:+85512345678"
                  className="text-[#6B8F5E] hover:underline"
                >
                  +855 12 345 678
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
