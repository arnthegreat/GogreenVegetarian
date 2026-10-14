import { useState } from 'react'
import { COUNTRIES, IMG } from '@/data/site'
import { InnerNav } from '@/components/layout/index'
import type { Page } from '@/types/navigation'

export default function PartnerPage({ navigate }: { navigate: (p: Page) => void }) {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    business: "",
    name: "",
    email: "",
    phone: "",
    country: "Cambodia",
    type: "",
    message: "",
  })
  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }
  const fieldClass =
    "w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FEFCF7] text-[#1A2E15] text-sm placeholder-[#B0A898] focus:outline-none focus:border-[#6B8F5E] transition-colors"
  const CURRENT_PARTNERS = [
    { name: "Aeon Supermarket", type: "Supermarket", icon: "🏬" },
    { name: "Thai Huot Supermarket", type: "Supermarket", icon: "🛒" },
    { name: "Chip Mong Supermarket", type: "Supermarket", icon: "🏪" },
    { name: "CambodiaTrade", type: "Trade Partner", icon: "🤝" },
    { name: "WEE Market Hub", type: "Market Hub", icon: "🌐" },
    { name: "Wholesale Vegetarian Groceries", type: "Wholesaler", icon: "📦" },
    { name: "Vegetarian Restaurants", type: "Food Service", icon: "🍃" },
    { name: "Sbai Reoung Mart", type: "Convenience Store", icon: "🏷️" },
  ]

  return (
    <div className="min-h-screen bg-[#F8F4EC]">
      <InnerNav navigate={navigate} />
      <div className="relative bg-[#1A2E15] overflow-hidden">
        <img
          src={IMG.partner}
          alt="Retail partnership"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-20 lg:py-28 text-center">
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
            Retail &amp; Wholesale
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-white leading-tight mb-6">
            Ready to Stock Your
            <br />
            <span className="text-[#A8C49A]">Plant-Based Pantry?</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you're a supermarket, restaurant, wellness brand, or
            distributor — we'd love to put Gogreen products on your shelves.
          </p>
        </div>
      </div>

      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
              Why Partner With Us
            </p>
            <h2 className="font-sans font-bold text-4xl text-[#1A2E15] leading-tight">
              The <span className="text-[#2D5016]">Gogreen Advantage</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: "🏆",
                title: "Proven Quality",
                body: "Our products are already trusted by 8 retail partners across Phnom Penh. Quality your customers can taste.",
              },
              {
                icon: "📈",
                title: "Growing Demand",
                body: "The plant-based market in Southeast Asia is growing fast. Offering Gogreen positions your business at the forefront of the wellness and ethical food movement.",
              },
              {
                icon: "🤲",
                title: "Flexible Terms",
                body: "We offer wholesale pricing, consignment options, and custom packaging for large-scale partners.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-[#FEFCF7] rounded-3xl p-8 border border-[#E0D8C8] hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-5">{p.icon}</div>
                <h3 className="font-display text-lg font-semibold text-[#1A2E15] mb-3">
                  {p.title}
                </h3>
                <p className="text-[#6B6558] text-sm leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#F0EAD8] rounded-3xl p-8 lg:p-12 mb-16">
            <h3 className="font-display text-2xl font-semibold text-[#1A2E15] mb-8 text-center">
              How It Works
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  title: "Apply",
                  desc: "Fill out the partnership inquiry form below with your business details.",
                },
                {
                  step: "02",
                  title: "Discuss",
                  desc: "Our team will reach out within 48 hours to understand your needs.",
                },
                {
                  step: "03",
                  title: "Sample",
                  desc: "We'll send you a complimentary product sample pack to try before committing.",
                },
                {
                  step: "04",
                  title: "Launch",
                  desc: "Finalize terms, receive your first order, and start delighting your customers.",
                },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="font-display text-3xl font-semibold text-[#A8C49A]/50 mb-2">
                    {s.step}
                  </div>
                  <h4 className="font-display font-semibold text-[#1A2E15] mb-2">
                    {s.title}
                  </h4>
                  <p className="text-[#6B6558] text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="font-display text-2xl font-semibold text-[#1A2E15] mb-6 text-center">
              Our Current Partners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CURRENT_PARTNERS.map((p) => (
                <div
                  key={p.name}
                  className="bg-[#FEFCF7] border border-[#E0D8C8] rounded-2xl p-4 text-center"
                >
                  <div className="text-2xl mb-2">{p.icon}</div>
                  <div className="font-medium text-[#1A2E15] text-xs leading-snug">
                    {p.name}
                  </div>
                  <div className="text-[#6B8F5E] text-[10px] mt-1">
                    {p.type}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center bg-[#1A2E15] rounded-3xl px-8 py-7 mb-16">
            <div className="flex-1 text-center md:text-left">
              <div className="text-white font-display text-lg font-semibold mb-1">
                Prefer to talk directly?
              </div>
              <div className="text-white/50 text-sm">
                Call or WhatsApp us — we're happy to discuss partnership details
                over the phone.
              </div>
            </div>
            <a
              href="tel:+85512345678"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C4962A] hover:bg-[#E8B84B] text-white font-semibold transition-colors text-sm"
            >
              +855 12 345 678
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#F0EAD8] py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-10">
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
              Partnership Inquiry
            </p>
            <h2 className="font-display text-3xl font-semibold text-[#1A2E15]">
              Apply to Become a Partner
            </h2>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-[#E0D8C8] p-8 lg:p-10">
            {sent ? (
              <div className="py-14 text-center">
                <div className="text-6xl mb-5">🌿</div>
                <h3 className="font-display text-2xl font-semibold text-[#2D5016] mb-3">
                  Inquiry Received!
                </h3>
                <p className="text-[#6B6558] leading-relaxed mb-6">
                  Thank you for your interest. Our team will reach out within 48
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                      Business Name *
                    </label>
                    <input
                      required
                      value={form.business}
                      onChange={set("business")}
                      placeholder="Your company or store name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                      Contact Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Your full name"
                      className={fieldClass}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@business.com"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+855 ..."
                      className={fieldClass}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
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
                      {COUNTRIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                      Business Type *
                    </label>
                    <select
                      required
                      value={form.type}
                      onChange={set("type")}
                      className={fieldClass}
                    >
                      <option value="">Select type</option>
                      <option>Supermarket / Grocery Store</option>
                      <option>Convenience Store</option>
                      <option>Restaurant / Café</option>
                      <option>Wholesale / Distributor</option>
                      <option>Online Retailer</option>
                      <option>Wellness / Health Store</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                    Tell Us About Your Business
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Describe your business, estimated order volumes, and how you'd like to work with us..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#2D5016] hover:bg-[#3D6822] text-white font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Submit Partnership Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
