import { InnerNav } from '@/components/layout/index'
import type { Page } from '@/types/navigation'

export default function ShopComingSoonPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="min-h-screen bg-[#1A2E15] flex flex-col">
      <InnerNav navigate={navigate} />
      <div className="flex-1 flex items-center justify-center px-6 py-24 text-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A8C49A]/15 border border-[#A8C49A]/25 text-[#A8C49A] text-xs font-semibold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A8C49A] animate-pulse" />{" "}
            Under Development
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-white leading-tight mb-6">
            Our Online Shop is
            <br />
            <span className="text-[#A8C49A]">Coming Soon</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            We're building something beautiful. Our online store is currently
            under development — but you can find our products at leading stores
            across Phnom Penh, or reach out to order directly.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">
            <p className="text-[#A8C49A] text-xs font-semibold tracking-widest uppercase mb-4">
              Order Directly
            </p>
            <div className="space-y-3">
              <a
                href="tel:+85512345678"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span className="font-display text-lg font-semibold">
                  +855 12 345 678
                </span>
              </a>
              <a
                href="mailto:hello@gogreen.com.kh"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span>hello@gogreen.com.kh</span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C4962A] hover:bg-[#E8B84B] text-white font-semibold transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate("home")}
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/10 font-semibold transition-all"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
