import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from "react"
import gogreenLogo from "@/assets/gogreen-logo.png"

/* ─ Scroll-reveal hook — retriggers every time element enters viewport ───── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("revealed")
        } else {
          el.classList.remove("revealed")
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

type Page = "home" | "contact" | "shop" | "about" | "partner" | "founder" | "activities" | "product" | "store"

type Navigate = (page: Page, section?: string) => void

function useCarousel(count: number, delay = 5000) {
  const [current, setCurrent] = useState(0)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReducedMotion(preference.matches)
    sync()
    preference.addEventListener("change", sync)
    return () => preference.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (focused || reducedMotion || count < 2) return
    const timer = window.setInterval(
      () => setCurrent((slide) => (slide + 1) % count),
      delay,
    )
    return () => window.clearInterval(timer)
  }, [count, delay, current, focused, reducedMotion])

  return {
    current,
    setCurrent,
    prev: () => setCurrent((slide) => (slide - 1 + count) % count),
    next: () => setCurrent((slide) => (slide + 1) % count),
    reducedMotion,
    interactionProps: {
      onFocusCapture: () => setFocused(true),
      onBlurCapture: (event: React.FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false)
      },
    },
  }
}

const IMG = {
  hero: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1800&h=1000&fit=crop&auto=format",
  heroSlides: [
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=1050&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&h=1050&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800&h=1050&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1592039017841-65201402f522?w=800&h=1050&fit=crop&auto=format",
  ],
  about:
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=900&h=700&fit=crop&auto=format",
  aboutPage1:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&h=600&fit=crop&auto=format",
  founderSlides: [
    "https://images.unsplash.com/photo-1625631980722-b728f9cf1036?w=800&h=1000&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1625631980777-823fc2938950?w=800&h=1000&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1625631980683-825234bfb7d5?w=800&h=1000&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1743807059700-1d4d97003972?w=800&h=1000&fit=crop&auto=format",
  ],
  class1:
    "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=700&h=500&fit=crop&auto=format",
  class2:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&h=500&fit=crop&auto=format",
  class3:
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=700&h=500&fit=crop&auto=format",
  p1: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&h=500&fit=crop&auto=format",
  p2: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=600&h=500&fit=crop&auto=format",
  p3: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=600&h=500&fit=crop&auto=format",
  p4: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&h=500&fit=crop&auto=format",
  p5: "https://images.unsplash.com/photo-1592039017841-65201402f522?w=600&h=500&fit=crop&auto=format",
  p6: "https://images.unsplash.com/photo-1788519694838-c516ca032475?w=600&h=500&fit=crop&auto=format",
  partner:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=700&fit=crop&auto=format",
}

const COUNTRIES = [
  { name: "Cambodia", code: "+855", flag: "🇰🇭" },
  { name: "Thailand", code: "+66", flag: "🇹🇭" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳" },
  { name: "Laos", code: "+856", flag: "🇱🇦" },
  { name: "Myanmar", code: "+95", flag: "🇲🇲" },
  { name: "China", code: "+86", flag: "🇨🇳" },
  { name: "Hong Kong", code: "+852", flag: "🇭🇰" },
  { name: "Taiwan", code: "+886", flag: "🇹🇼" },
  { name: "South Korea", code: "+82", flag: "🇰🇷" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Philippines", code: "+63", flag: "🇵🇭" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "New Zealand", code: "+64", flag: "🇳🇿" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭" },
  { name: "Sweden", code: "+46", flag: "🇸🇪" },
  { name: "Denmark", code: "+45", flag: "🇩🇰" },
  { name: "Norway", code: "+47", flag: "🇳🇴" },
  { name: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "UAE", code: "+971", flag: "🇦🇪" },
  { name: "Other", code: "", flag: "🌍" },
]

// ─── Icons ────────────────────────────────────────────────────────────────────

function LeafIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 4l-1-2c2.6-.34 5.69-.37 8.8.88A10 10 0 0 0 19 4c-3.18 1.63-5.3 3.64-6.24 5.73" />
    </svg>
  )
}
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  )
}
function ChevronLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  )
}
function ChevronRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  )
}

// ─── Shared inner page nav ────────────────────────────────────────────────────

function InnerNav({
  navigate,
  label = "Back to Home",
}: {
  navigate: (p: Page) => void
  label?: string
}) {
  return (
    <div className="sticky top-0 z-40 bg-[#1A2E15] px-6 lg:px-10 h-16 flex items-center justify-between">
      <button
        onClick={() => navigate("home")}
        className="flex items-center gap-2.5"
      >
        <div className="w-7 h-7 rounded-full bg-[#A8C49A]/15 flex items-center justify-center">
          <LeafIcon className="w-3.5 h-3.5 text-[#A8C49A]" />
        </div>
        <span className="font-sans text-base font-bold tracking-wide">
          <span style={{ color: "#C4962A" }}>Go</span>
          <span style={{ color: "#A8C49A" }}>green</span>{" "}
          <span style={{ color: "#C4962A" }}>Vegetarian</span>
        </span>
      </button>
      <button
        onClick={() => navigate("home")}
        className="text-white/60 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> {label}
      </button>
    </div>
  )
}

// ─── Notify Modal ─────────────────────────────────────────────────────────────

function NotifyModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#B0A898] hover:text-[#1A2E15] transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {sent ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="font-display text-xl font-semibold text-[#2D5016] mb-2">
              You're on the list!
            </h3>
            <p className="text-[#6B6558] text-sm">
              We'll email you as soon as our cooking classes are ready to
              launch.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#2D5016] text-white text-sm font-semibold hover:bg-[#3D6822] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C4962A]/15 text-[#C4962A] text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4962A] animate-pulse" />{" "}
                Coming Soon
              </div>
              <h2 className="font-display text-2xl font-semibold text-[#1A2E15] mb-1">
                Get Notified
              </h2>
              <p className="text-[#6B6558] text-sm leading-relaxed">
                Enter your email and we'll let you know when our cooking classes
                officially launch.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                  Your Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FEFCF7] text-[#1A2E15] text-sm placeholder-[#B0A898] focus:outline-none focus:border-[#6B8F5E] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#2D5016] hover:bg-[#3D6822] text-white font-semibold transition-colors"
              >
                Notify Me When Classes Launch
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Shop Coming Soon ─────────────────────────────────────────────────────────

function ShopComingSoonPage({ navigate }: { navigate: (p: Page) => void }) {
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

// ─── About Page ───────────────────────────────────────────────────────────────

const PRODUCT_MARQUEE_ITEMS = [
  "🌿 Prahok Ktis (Plant-Based)",
  "🫙 Prahok Kapi Pao",
  "🧫 Fermented Soybean Paste",
  "🌱 Herb & Lemongrass Blend",
  "🌶️ Chilli Kapi Oil",
  "🍃 Preserved Herb Jar",
  "🫚 Aromatic Cooking Paste",
  "🧄 Garlic Kapi Sauce",
]

function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  const storyImgRef = useReveal()
  const storyTextRef = useReveal()
  const missionRef = useReveal(0.06)
  const missionCardsRef = useReveal(0.06)
  const whatRef = useReveal()
  const whatImgRef = useReveal()
  const benefitsHeadRef = useReveal()
  const benefitsGridRef = useReveal(0.06)
  const promisesHeadRef = useReveal()
  const promisesGridRef = useReveal(0.06)
  const ctaRef = useReveal()

  return (
    <div className="min-h-screen bg-[#F8F4EC]">
      <InnerNav navigate={navigate} />

      {/* ── Hero banner ── */}
      <div className="relative bg-[#1A2E15] overflow-hidden grain">
        <img
          src={IMG.hero}
          alt="Gogreen fresh ingredients"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2E15]/60 to-[#1A2E15]" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-32 text-center">
          <p className="hero-badge text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
            Our Story
          </p>
          <h1 className="hero-h1 font-display text-5xl md:text-6xl font-semibold text-white leading-tight mb-6">
            About <span className="shimmer-text">Gogreen Vegetarian</span>
          </h1>
          <p className="hero-p text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            A Cambodian plant-based brand built on compassion, heritage, and the
            belief that food can heal — people, communities, and the planet.
          </p>
        </div>
      </div>

      {/* ── Brand story ── */}
      <section className="py-24 lg:py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div
            ref={storyImgRef as React.RefObject<HTMLDivElement>}
            className="reveal-left relative"
          >
            <div className="rounded-[2rem] overflow-hidden aspect-[4/3] bg-[#A8C49A]">
              <img
                src={IMG.about}
                alt="Gogreen fresh ingredients"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-5 -right-4 hidden lg:block hero-card">
              <div className="bg-[#2D5016] text-white rounded-2xl px-6 py-4 shadow-2xl">
                <div className="font-display text-sm font-semibold">
                  Est. July 2020
                </div>
                <div className="text-[#A8C49A] text-xs mt-0.5">
                  Phnom Penh, Cambodia
                </div>
              </div>
            </div>
          </div>
          <div
            ref={storyTextRef as React.RefObject<HTMLDivElement>}
            className="reveal-right"
          >
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
              Who We Are
            </p>
            <h2 className="font-sans font-bold text-4xl text-[#1A2E15] leading-tight mb-6">
              A Product Line Built on{" "}
              <span className="text-[#2D5016]">Compassion &amp; Heritage</span>
            </h2>
            <p className="text-[#6B6558] leading-relaxed text-lg mb-5">
              Gogreen Vegetarian was born from a simple but powerful belief:
              what we put into our food shapes the world we leave behind.
              Founded on July 18, 2020, by Chanlang Prum in Phnom Penh,
              Cambodia, Gogreen produces over 100 authentic plant-based products
              crafted without meat, without artificial preservatives, and
              without compromise.
            </p>
            <p className="text-[#6B6558] leading-relaxed mb-8">
              From Prahok Ktis and Kapi Pao to fermented soybean pastes and herb
              blends, every product carries our commitment to health,
              sustainability, and the living culinary traditions of Cambodia.
            </p>
            <button
              onClick={() => navigate("home")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D5016] text-white font-semibold hover:bg-[#3D6822] btn-glow transition-all text-sm"
            >
              See Our Products
            </button>
          </div>
        </div>
      </section>

      {/* ── Mission / Vision / Values ── */}
      <section className="bg-[#1A2E15] py-24 lg:py-32 grain overflow-hidden relative">
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-[#2D5016]/40 blur-3xl animate-breathe pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
          <div
            ref={missionRef as React.RefObject<HTMLDivElement>}
            className="reveal text-center mb-14"
          >
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
              What Drives Us
            </p>
            <h2 className="font-sans font-bold text-4xl text-white leading-tight">
              Mission, Vision &amp;{" "}
              <span className="text-[#A8C49A]">Values</span>
            </h2>
          </div>
          <div
            ref={missionCardsRef as React.RefObject<HTMLDivElement>}
            className="reveal grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                body: "To create authentic, delicious plant-based Cambodian products that make healthy, compassionate living easy and accessible — without sacrificing flavor, culture, or tradition.",
                delay: 0,
              },
              {
                icon: "🌏",
                title: "Our Vision",
                body: "To become Southeast Asia's most trusted plant-based food brand, bringing the rich culinary heritage of Cambodia to tables across the region and beyond.",
                delay: 120,
              },
              {
                icon: "🌿",
                title: "Our Values",
                body: "Compassion for all living beings. Respect for Cambodian culture. Commitment to health and sustainability. Transparency in every ingredient. Courage to build something meaningful.",
                delay: 240,
              },
            ].map((v) => (
              <div
                key={v.title}
                className="card-lift bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-[#A8C49A]/30 transition-all duration-500"
                style={{ transitionDelay: `${v.delay}ms` }}
              >
                <div className="text-4xl mb-5">{v.icon}</div>
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {v.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Make — marquee instead of cards ── */}
      <section className="py-24 lg:py-32 bg-[#F0EAD8] grain grain-light overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div
              ref={whatRef as React.RefObject<HTMLDivElement>}
              className="reveal-left"
            >
              <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
                What We Make
              </p>
              <h2 className="font-sans font-bold text-4xl text-[#1A2E15] leading-tight mb-6">
                100+ Plant-Based Products Rooted in{" "}
                <span className="text-[#2D5016]">Cambodian Tradition</span>
              </h2>
              <p className="text-[#6B6558] leading-relaxed text-lg mb-8">
                Our product range spans fermented pastes, seasoning sauces, herb
                blends, and traditional Cambodian condiments — all made without
                a single animal ingredient.
              </p>
              <button
                onClick={() => navigate("shop")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016] hover:text-white font-semibold btn-glow transition-all text-sm"
              >
                Shop Our Products
              </button>
            </div>
            <div
              ref={whatImgRef as React.RefObject<HTMLDivElement>}
              className="reveal-right relative"
            >
              <div className="rounded-[2rem] overflow-hidden aspect-[4/3] bg-[#A8C49A]">
                <img
                  src={IMG.aboutPage1}
                  alt="Gogreen plant-based products"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -top-5 -left-4 bg-[#C4962A] text-white rounded-2xl px-5 py-3 shadow-2xl hidden lg:block">
                <div className="font-display text-sm font-semibold">
                  100+ Products
                </div>
                <div className="text-white/75 text-xs mt-0.5">
                  All plant-based
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Full-bleed marquee strip ── */}
      <div className="bg-[#C4962A] overflow-hidden py-4 grain grain-light">
        <div className="marquee-track whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, outer) => (
            <span key={outer} className="inline-flex items-center">
              {Array.from({ length: 12 }).map((__, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-4 px-8 text-white text-base font-bold tracking-wide uppercase"
                >
                  {i % 2 === 0 ? "Plant-Based Food" : "Plant-Based Product"}
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Classes Section ── */}
      <ClassesSection />

      {/* ── Why Gogreen — Benefits ── */}
      <section className="bg-[#F8F4EC] py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div
            ref={benefitsHeadRef as React.RefObject<HTMLDivElement>}
            className="reveal text-center mb-14"
          >
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
              Why Gogreen
            </p>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#1A2E15] leading-tight">
              The Gogreen Difference
            </h2>
          </div>
          <div
            ref={benefitsGridRef as React.RefObject<HTMLDivElement>}
            className="reveal grid md:grid-cols-3 gap-8"
          >
            {BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className="card-lift bg-white rounded-3xl px-8 py-10 border border-[#E0D8C8] hover:border-[#A8C49A] hover:shadow-xl transition-all text-center"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="text-4xl mb-5">{b.icon}</div>
                <h3 className="font-display text-xl font-semibold text-[#1A2E15] mb-4">
                  {b.title}
                </h3>
                <p className="text-[#6B6558] text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Commitment ── */}
      <section className="bg-[#1A2E15] py-24 lg:py-32 grain">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div
            ref={promisesHeadRef as React.RefObject<HTMLDivElement>}
            className="reveal text-center mb-14"
          >
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
              Our Commitment
            </p>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-white leading-tight">
              A Promise We Never Break
            </h2>
          </div>
          <div
            ref={promisesGridRef as React.RefObject<HTMLDivElement>}
            className="reveal grid md:grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden"
          >
            {PROMISES.map((p, i) => (
              <div
                key={p.title}
                className="card-lift bg-[#1A2E15] px-10 py-10 hover:bg-[#2D5016]/40 transition-colors duration-500"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {p.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="reveal bg-[#2D5016] py-16 grain grain-light"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white mb-5">
            Ready to Try Gogreen?
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            Find our products at leading supermarkets across Phnom Penh, or get
            in touch to order directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("contact")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#2D5016] font-semibold hover:bg-[#F0EAD8] btn-glow transition-all"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate("home")}
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/10 font-semibold transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Partner Page ─────────────────────────────────────────────────────────────

function PartnerPage({ navigate }: { navigate: (p: Page) => void }) {
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

// ─── Contact Page ─────────────────────────────────────────────────────────────

function ContactPage({ navigate }: { navigate: (p: Page) => void }) {
  const [sent, setSent] = useState(false)
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
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
              { icon: "✉️", label: "Email", val: "hello@gogreen.com.kh" },
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
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#2D5016] hover:bg-[#3D6822] text-white font-semibold transition-colors flex items-center justify-center gap-2"
              >
                Send Message
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

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({ navigate }: { navigate: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <nav
      style={{ transition: "background 0.4s, box-shadow 0.4s" }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "bg-[#1A2E15] shadow-2xl shadow-black/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#A8C49A]/20 flex items-center justify-center group-hover:bg-[#A8C49A]/30 transition-colors">
            <LeafIcon className="w-4 h-4 text-[#A8C49A]" />
          </div>
          <span className="font-sans text-lg font-bold tracking-wide">
            <span style={{ color: "#C4962A" }}>Go</span>
            <span style={{ color: "#A8C49A" }}>green</span>{" "}
            <span style={{ color: "#C4962A" }}>Vegetarian</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#products"
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            Products
          </a>
          <a
            href="#stores"
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            Stores
          </a>
          <button
            onClick={() => navigate("founder")}
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            Founder
          </button>
          <button
            onClick={() => navigate("about")}
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            About Us
          </button>
          <button
            onClick={() => navigate("contact")}
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#1A2E15] border-t border-white/10 px-6 py-5 space-y-1">
          {[
            { label: "Products", href: "#products" },
            { label: "Stores", href: "#stores" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-white/70 hover:text-white font-medium border-b border-white/5 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false)
              navigate("founder")
            }}
            className="flex items-center gap-2 py-3 text-white/70 hover:text-white font-medium border-b border-white/5 w-full text-left"
          >
            Founder
          </button>
          <button
            onClick={() => {
              setOpen(false)
              navigate("about")
            }}
            className="flex items-center gap-2 py-3 text-white/70 hover:text-white font-medium border-b border-white/5 w-full text-left"
          >
            About Us
          </button>
          <button
            onClick={() => {
              setOpen(false)
              navigate("contact")
            }}
            className="flex items-center gap-2 py-3 text-white/70 hover:text-white font-medium border-b border-white/5 w-full text-left"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  )
}

// ─── Activity Carousel ────────────────────────────────────────────────────────

const ACTIVITIES = [
  {
    label: "New Launch",
    title: "Prahok Ktis Now at Aeon Supermarket",
    date: "Sep 2026",
    dateTime: "2026-09",
    description:
      "Explore our plant-based Prahok Ktis and find Gogreen Vegetarian at Aeon Supermarket in Phnom Penh.",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop&auto=format",
  },
  {
    label: "Event",
    title: "Gogreen at the 2026 Phnom Penh Food Festival",
    date: "Aug 2026",
    dateTime: "2026-08",
    description:
      "Follow our activity feed for news of Gogreen Vegetarian at the Phnom Penh Food Festival.",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop&auto=format",
  },
  {
    label: "Milestone",
    title: "100+ Products — Celebrating 6 Years of Craft",
    date: "Jul 2026",
    dateTime: "2026-07",
    description:
      "Founded in 2020, Gogreen Vegetarian has grown into a Cambodian brand with more than 100 plant-based products.",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop&auto=format",
  },
  {
    label: "Community",
    title: "Founder Chanlang Joins Buddhist Wellness Forum",
    date: "Jun 2026",
    dateTime: "2026-06",
    description:
      "Our founder’s journey is rooted in compassion, vegetarian living, and a commitment to the community.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop&auto=format",
  },
]

function ActivityCarousel({ navigate }: { navigate: Navigate }) {
  const {
    current,
    setCurrent,
    prev,
    next,
    interactionProps,
  } = useCarousel(ACTIVITIES.length, 4000)

  const activity = ACTIVITIES[current]

  return (
    <section
      id="activities"
      aria-label="Featured activities"
      aria-roledescription="carousel"
      {...interactionProps}
      className="relative w-full min-h-80 md:min-h-96 overflow-hidden bg-forest grain"
    >
      {ACTIVITIES.map((a, i) => (
        <img
          key={a.img}
          src={a.img}
          alt={a.title}
          aria-hidden={i !== current}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1A2E15]/60" />
      {/* Content */}
      <div className="absolute inset-0 flex items-center px-4 md:px-16 pt-16 lg:pt-20 pb-10 gap-3 md:gap-6 z-10">
        <button
          onClick={prev}
          aria-label="Previous"
          className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C4962A] text-white text-[10px] font-bold uppercase tracking-widest mb-2">
            {activity.label}
          </span>
          <h3 className="text-white font-sans font-bold text-base md:text-xl leading-snug">
            {activity.title}
          </h3>
          <p className="text-[#A8C49A] text-xs mt-1">{activity.date}</p>
          <button
            onClick={() => navigate("activities")}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold text-white hover:bg-gold-light hover:text-forest transition-colors btn-glow"
          >
            Explore Activities &amp; Updates <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={next}
          aria-label="Next"
          className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {ACTIVITIES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Show activity ${i + 1}: ${ACTIVITIES[i].title}`}
            aria-current={i === current ? "true" : undefined}
            className={`h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-gold w-6" : "bg-white/30 w-3"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

// ─── Activities & Updates ─────────────────────────────────────────────────────

const ACTIVITY_ARCHIVE = [
  ...ACTIVITIES,
  {
    label: "Our Beginnings",
    title: "A Greener Journey Begins",
    date: "Jul 2020",
    dateTime: "2020-07",
    img: IMG.hero,
    description:
      "Chanlang Prum founded Gogreen Vegetarian in 2020, bringing a passion for plant-based living to Cambodian products and everyday cooking.",
  },
]

function ActivitiesPage({ navigate }: { navigate: Navigate }) {
  const [filter, setFilter] = useState("All")
  const gridRef = useReveal(0.01)
  const now = new Date()
  const currentMonth = new Date(now.getFullYear(), now.getMonth()).getTime()
  const getStatus = (date: string) => {
    const [year, month] = date.split("-").map(Number)
    const timestamp = new Date(year, month - 1).getTime()
    return timestamp > currentMonth
      ? "Upcoming"
      : timestamp === currentMonth
        ? "This Month"
        : "Past"
  }
  const visible = ACTIVITY_ARCHIVE.filter(
    (activity) => filter === "All" || getStatus(activity.dateTime) === filter,
  )

  return (
    <div className="min-h-screen bg-cream">
      <InnerNav navigate={navigate} />
      <header className="relative bg-forest text-white grain px-6 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-sage-light text-xs font-semibold uppercase tracking-widest mb-5">
            The Gogreen Journal
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Growing greener.
            <br />
            <span className="text-gold-light">Together.</span>
          </h1>
          <p className="text-white/65 max-w-2xl mt-6 leading-relaxed">
            Upcoming activities, brand news, and moments from our journey.
            Explore the past, present, and future of Gogreen Vegetarian.
          </p>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-forest">
            Activities &amp; Updates
          </h2>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter activities"
          >
            {["All", "Upcoming", "This Month", "Past"].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                aria-pressed={filter === option}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === option
                    ? "bg-forest text-cream"
                    : "bg-cream-dark text-stone hover:bg-border"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="reveal grid md:grid-cols-2 gap-8"
        >
          {visible.map((activity) => (
            <article
              key={activity.title}
              className="bg-warm-white rounded-2xl overflow-hidden border border-border card-lift"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={activity.img}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-forest text-cream rounded-full px-3 py-1 text-xs font-semibold">
                  {getStatus(activity.dateTime)}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between gap-4 text-xs font-semibold uppercase tracking-widest mb-4">
                  <span className="text-sage">{activity.label}</span>
                  <time dateTime={activity.dateTime} className="text-stone">
                    {activity.date}
                  </time>
                </div>
                <h3 className="text-xl font-bold text-forest leading-snug mb-4">
                  {activity.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </article>
          ))}
          {visible.length === 0 && (
            <p className="md:col-span-2 text-stone py-12 text-center">
              No activities in this view yet. Explore all updates or check back
              for more news.
            </p>
          )}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-cream hover:bg-forest-hover transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </button>
          <button
            onClick={() => navigate("contact")}
            className="rounded-full border border-border px-6 py-3 font-semibold text-forest hover:bg-cream-dark transition-colors"
          >
            Ask About an Activity
          </button>
        </div>
      </main>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ navigate }: { navigate: (p: Page) => void }) {
  const slides = IMG.heroSlides
  const [current, setCurrent] = useState(0)
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length],
  )
  useEffect(() => {
    const id = setInterval(next, 3500)
    return () => clearInterval(id)
  }, [next])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden grain grain-light"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#1A2E15]">
        <img
          src={IMG.hero}
          alt="Fresh plant-based ingredients"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2E15] via-[#1A2E15]/40 to-[#2D5016]/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-24 pt-32 lg:py-32 lg:pt-40 grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-center w-full">
        <div className="text-center lg:text-left">
          <h1
            className="hero-h1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold text-white leading-[1.1] mb-5 lg:mb-7"
            style={{
              fontFamily:
                "'Century Gothic', CenturyGothic, AppleGothic, Poppins, sans-serif",
            }}
          >
            Made from <span className="shimmer-text">PLANTS</span>,
            <br />
            Made with <span className="shimmer-text">LOVE</span>
          </h1>
          <p className="hero-p text-white/65 text-base sm:text-lg leading-relaxed mb-8 lg:mb-10 max-w-[520px] mx-auto lg:mx-0">
            Gogreen Vegetarian crafts authentic plant-based products — from
            traditional Prahok Ktis to fermented soybean pastes — made with
            compassion, heritage, and zero compromise on quality.
          </p>
          <div className="hero-btns flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-10 lg:mb-14">
            <button
              onClick={() => navigate("shop")}
              className="relative inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#2D5016] hover:bg-[#3D6822] text-white font-semibold btn-glow transition-colors text-sm sm:text-base"
            >
              Shop Products
              <span className="absolute -top-2.5 -right-2.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#121E10] border border-[#C4962A]/60 text-[#E8B84B] text-[9px] font-bold leading-none shadow-lg">
                <span className="w-1 h-1 rounded-full bg-[#E8B84B] animate-pulse inline-block mr-0.5" />
                Soon
              </span>
            </button>
            <button
              onClick={() => navigate("contact")}
              className="inline-flex items-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/10 font-semibold transition-all text-sm sm:text-base"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Hero slideshow panel — shown on all screen sizes */}
        <div className="hero-panel block relative">
          <div className="rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[3/4] bg-[#2D5016] relative shadow-2xl">
            {slides.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Gogreen product ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: i === current ? 1 : 0 }}
              />
            ))}
            {/* Gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E15]/40 via-transparent to-transparent" />
            {/* Dots inside image */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-white w-5" : "bg-white/40 w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  )
}

// ─── Products ────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    img: IMG.p1,
    name: "Prahok Ktis (Plant-Based)",
    desc: "Our signature plant-based take on Cambodia's beloved fermented paste — rich, umami-forward, and completely animal-free.",
    tag: "Bestseller",
  },
  {
    img: IMG.p2,
    name: "Prahok Kapi Pao",
    desc: "A slow-roasted, smoky Kapi-style paste made entirely from fermented plant ingredients and aromatic Cambodian spices.",
    tag: "Signature",
  },
  {
    img: IMG.p3,
    name: "Fermented Soybean Paste",
    desc: "Traditionally fermented for depth and complexity — an all-purpose Cambodian condiment packed with probiotic goodness.",
    tag: "Traditional",
  },
  {
    img: IMG.p4,
    name: "Herb & Lemongrass Blend",
    desc: "A fresh, fragrant seasoning paste of lemongrass, galangal, kaffir lime, and green herbs — ready to cook with.",
    tag: "New",
  },
  {
    img: IMG.p5,
    name: "Preserved Herb Jar",
    desc: "Cambodian herbs preserved in natural brine — zero additives, packed with probiotic plant cultures.",
    tag: "Artisan",
  },
  {
    img: IMG.p6,
    name: "Chilli Kapi Oil",
    desc: "A bold, aromatic plant-based chilli oil infused with Cambodian Kapi spices — perfect as a dipping sauce or cooking base.",
    tag: "Spicy",
  },
]
const VISIBLE = 4

function Products({
  navigate,
  setSelectedProduct,
}: {
  navigate: (p: Page) => void
  setSelectedProduct: (i: number) => void
}) {
  const [start, setStart] = useState(0)
  const headRef = useReveal()
  const gridRef = useReveal(0.08)
  return (
    <section
      id="products"
      className="bg-[#1A2E15] py-16 sm:py-24 lg:py-36 grain"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 sm:mb-12"
        >
          <div>
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5">
              Our Products
            </p>
            <h2
              className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight"
              style={{
                fontFamily:
                  "'Century Gothic', CenturyGothic, AppleGothic, Poppins, sans-serif",
              }}
            >
              Our Plant-Based <span className="text-[#A8C49A]">Collection</span>
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <p className="text-white/55 md:max-w-sm leading-relaxed text-sm">
              Handcrafted plant-based products rooted in Cambodian tradition —
              authentic flavors, zero animal ingredients.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStart((s) => Math.max(0, s - 1))}
                disabled={start === 0}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-white/40 text-xs tabular-nums">
                {start + 1}–{Math.min(start + VISIBLE, PRODUCTS.length)} /{" "}
                {PRODUCTS.length}
              </span>
              <button
                onClick={() =>
                  setStart((s) => Math.min(PRODUCTS.length - VISIBLE, s + 1))
                }
                disabled={start + VISIBLE >= PRODUCTS.length}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {PRODUCTS.slice(start, start + VISIBLE).map((p, i) => (
            <div
              key={p.name}
              onClick={() => {
                setSelectedProduct(start + i)
                navigate("product")
              }}
              className="card-lift rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#2D5016] relative">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#C4962A]/20 text-[#E8B84B]">
                  {p.tag}
                </span>
                <h3 className="font-display text-base font-semibold text-white mt-3 mb-2">
                  {p.name}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("shop")}
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C4962A] hover:bg-[#E8B84B] text-white font-semibold btn-glow transition-colors"
          >
            Shop All Products
            <span className="absolute -top-2.5 -right-2.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#121E10] border border-[#C4962A]/60 text-[#E8B84B] text-[9px] font-bold leading-none shadow-lg">
              <span className="w-1 h-1 rounded-full bg-[#E8B84B] animate-pulse inline-block mr-0.5" />
              Soon
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Stores ──────────────────────────────────────────────────────────────────

const STORES = [
  {
    name: "Aeon Supermarket",
    type: "Supermarket",
    icon: "🏬",
    address: "Ground Floor, AEON Mall Sen Sok, Russian Blvd, Phnom Penh",
    hours: "9am–10pm",
  },
  {
    name: "Thai Huot Supermarket",
    type: "Supermarket",
    icon: "🛒",
    address: "123 Monivong Blvd, BKK1, Phnom Penh",
    hours: "7am–9pm",
  },
  {
    name: "Chip Mong Supermarket",
    type: "Supermarket",
    icon: "🏪",
    address: "Chip Mong 271 Mall, St 271, Phnom Penh",
    hours: "8am–9pm",
  },
  {
    name: "CambodiaTrade",
    type: "Trade Partner",
    icon: "🤝",
    address: "No. 45, Preah Norodom Blvd, Phnom Penh",
    hours: "8am–6pm Mon–Sat",
  },
  {
    name: "We Market Hub",
    type: "Market Hub",
    icon: "🌐",
    address: "Olympia Mall, Monivong Blvd, Phnom Penh",
    hours: "10am–9pm",
  },
  {
    name: "Wholesale Vegetarian Groceries",
    type: "Wholesaler",
    icon: "📦",
    address: "No. 88, St 182, Phnom Penh",
    hours: "6am–6pm",
  },
  {
    name: "Vegetarian Restaurants",
    type: "Food Service",
    icon: "🍃",
    address: "Various locations across Phnom Penh",
    hours: "7am–8pm",
  },
  {
    name: "Sbai Reoung Mart",
    type: "Convenience Store",
    icon: "🏷️",
    address: "No. 12, St 63, Daun Penh, Phnom Penh",
    hours: "6am–9pm",
  },
]

type StoreItem = typeof STORES[number]

function Stores({
  navigate,
  setSelectedStore,
}: {
  navigate: (p: Page) => void
  setSelectedStore: (i: number) => void
}) {
  const headRef = useReveal()
  const gridRef = useReveal(0.08)
  const ctaRef = useReveal()
  return (
    <section
      id="stores"
      className="bg-[#F8F4EC] py-16 sm:py-24 lg:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className="reveal text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F0E4] border border-[#A8C49A]/40 text-[#2D5016] text-xs font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D5016] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D5016]" />
            </span>
            Now In Stock · Phnom Penh
          </div>
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#1A2E15] leading-tight mb-5">
            Find Us at Leading{" "}
            <span className="text-[#2D5016]">Stores Near You</span>
          </h2>
          <p className="text-[#6B6558] max-w-xl mx-auto text-lg leading-relaxed">
            Gogreen Vegetarian products are now available across Phnom Penh's
            top supermarkets and convenience stores.
          </p>
        </div>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14"
        >
          {STORES.map((s, i) => (
            <div
              key={s.name}
              onClick={() => {
                setSelectedStore(i)
                navigate("store")
              }}
              className="card-lift group bg-[#FEFCF7] hover:bg-[#F0EAD8] border border-[#E0D8C8] hover:border-[#A8C49A]/60 rounded-2xl p-6 transition-all duration-300 cursor-pointer"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="text-3xl mb-4 group-hover:animate-wiggle inline-block">
                {s.icon}
              </div>
              <div className="text-[10px] font-semibold tracking-widest uppercase text-[#6B8F5E] mb-1.5">
                {s.type}
              </div>
              <div
                className="text-base font-bold text-[#1A2E15] group-hover:text-[#2D5016] transition-colors leading-snug tracking-wide"
                style={{
                  fontFamily:
                    "'Century Gothic', CenturyGothic, AppleGothic, 'Poppins', Futura, sans-serif",
                  fontWeight: 700,
                }}
              >
                {s.name}
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[#6B8F5E]/70 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6B8F5E]" /> In
                stock
              </div>
            </div>
          ))}
        </div>
        <div
          ref={ctaRef as React.RefObject<HTMLDivElement>}
          className="reveal grain rounded-3xl bg-[#1A2E15] px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="text-white font-display text-xl font-semibold mb-1">
              Want to stock Gogreen products in your store?
            </p>
            <p className="text-white/50 text-sm">
              We welcome wholesale and retail partnership inquiries across
              Cambodia.
            </p>
          </div>
          <button
            onClick={() => navigate("partner")}
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C4962A] hover:bg-[#E8B84B] text-white font-semibold btn-glow transition-colors"
          >
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Product Detail Page ──────────────────────────────────────────────────────

type ProductItem = typeof PRODUCTS[number]

const PRODUCT_DETAILS: Record<string, {
  about: string
  howToUse: string
  pairWith: string
  howToCook: string
  ingredients: string
}> = {
  "Prahok Ktis (Plant-Based)": {
    about:
      "Prahok Ktis is Cambodia's most beloved fermented condiment, now reimagined entirely from plants. Our plant-based version captures the deep, funky umami of the original using fermented soybean, sea vegetables, and aromatic Cambodian spices — achieving the same complex flavour profile without any animal ingredients. Made in small batches in Phnom Penh.",
    howToUse:
      "Use directly as a condiment alongside steamed rice, or mix into soups and stews for an instant depth of flavour. A small spoonful goes a long way — it is intensely savoury and concentrated. It can also be diluted with water or coconut milk to create a flavouring base.",
    pairWith:
      "Pairs beautifully with steamed jasmine rice, raw vegetable platters, amok tofu, green mango salad, and fresh rice paper rolls. It also complements roasted aubergine and grilled corn.",
    howToCook:
      "Sauté one teaspoon with shallots, lemongrass, and galangal in coconut oil for two minutes to create a fragrant cooking base. Use this as the foundation for stir-fries, noodle broths, or coconut curries.",
    ingredients:
      "Fermented soybean, sea vegetable extract, lemongrass, galangal, kaffir lime leaf, chilli, sea salt, palm sugar. No artificial preservatives. Store refrigerated after opening.",
  },
  "Prahok Kapi Pao": {
    about:
      "A deeply aromatic, slow-roasted plant-based paste inspired by traditional Cambodian Kapi Pao. Our version replaces shrimp paste with fermented sea vegetables and black beans, roasted low-and-slow until rich and smoky. The result is a complex, umami-laden condiment that honours the spirit of the original.",
    howToUse:
      "Use as a flavouring paste in stir-fries, fried rice, or noodle dishes. Can be thinned into a dipping sauce with lime juice and coconut sugar. Adds immediate depth to any Cambodian or Southeast Asian dish.",
    pairWith:
      "Excellent with fried rice, pad see ew, grilled tofu, roasted pumpkin, and spring rolls. Also pairs well with jasmine rice and steamed vegetables.",
    howToCook:
      "Heat one tablespoon in a wok with oil until fragrant. Add garlic and shallots, then incorporate your vegetables or protein. The paste blooms beautifully with high heat.",
    ingredients:
      "Roasted black soybean, fermented sea vegetable, garlic, shallot, dried chilli, palm sugar, coconut vinegar, sea salt. Slow roasted. No MSG. Refrigerate after opening.",
  },
  "Fermented Soybean Paste": {
    about:
      "Our Fermented Soybean Paste is a living condiment — produced using traditional Cambodian fermentation methods and aged over several weeks. Rich in natural probiotics, it has a complex, savoury depth similar to miso but with distinctly Khmer character. An indispensable pantry staple for plant-based Cambodian cooking.",
    howToUse:
      "Dissolve a spoonful into warm broth for a quick flavour boost, or mix directly into dressings and marinades. Use raw in small amounts — the live cultures are preserved when not overheated.",
    pairWith:
      "Perfect alongside congee, steamed tofu, cucumber slices, and fresh herbs. Stir into sesame noodles or use as a base for miso-style glazes on roasted vegetables.",
    howToCook:
      "For a simple dipping sauce: combine two teaspoons of paste with lime juice, a touch of coconut sugar, and minced chilli. For a broth: whisk one tablespoon into hot (not boiling) water with dried mushrooms.",
    ingredients:
      "Whole soybeans, sea salt, filtered water. Naturally fermented. No additives. No preservatives. Live cultures present. Keep refrigerated.",
  },
  "Herb & Lemongrass Blend": {
    about:
      "A vibrant, freshly prepared herb and lemongrass paste capturing the essential aromatics of Cambodian cuisine. Made from freshly harvested lemongrass, galangal, kaffir lime leaf, turmeric, and green herbs — all blended together without cooking to preserve maximum freshness and fragrance.",
    howToUse:
      "Use directly as a marinade for tofu, tempeh, or jackfruit. Stir into coconut milk for a quick curry base, or mix with oil and citrus for a fresh herb dressing.",
    pairWith:
      "Pairs well with grilled tofu skewers, coconut rice, fresh spring rolls, green papaya salad, and steamed sticky rice with mango.",
    howToCook:
      "Sauté two tablespoons of the blend in coconut oil for three minutes before adding coconut milk and vegetables. For a soup base, add to simmering broth with mushrooms and tofu.",
    ingredients:
      "Fresh lemongrass, galangal, kaffir lime leaf, fresh turmeric, green chilli, coriander root, shallots, garlic, coconut oil, sea salt. No artificial flavour. Refrigerate immediately.",
  },
  "Preserved Herb Jar": {
    about:
      "A traditional Cambodian preservation of fresh herbs — lacto-fermented in natural brine over two weeks. The result is a tangy, probiotic-rich jar of preserved herbs that keeps for months in the fridge and adds a bright, complex dimension to any dish. Zero additives, nothing artificial.",
    howToUse:
      "Use the preserved herbs as a condiment, pickle, or garnish. The brine itself is a versatile ingredient — use it as a seasoning liquid in soups, dressings, or marinades.",
    pairWith:
      "Excellent alongside steamed rice, grilled vegetables, noodle soups, and charcuterie-style plant-based boards. The tangy brine pairs especially well with rich, fatty dishes.",
    howToCook:
      "Add to fried rice at the end of cooking for brightness. Stir the brine into lentil soup for depth. Use the herbs as a topping on grilled corn or roasted cauliflower.",
    ingredients:
      "Cambodian fresh herbs (lemongrass, kaffir lime, holy basil, pandan), filtered water, sea salt. Lacto-fermented. Live cultures. No vinegar. No sugar. Refrigerate.",
  },
  "Chilli Kapi Oil": {
    about:
      "A bold, slow-infused plant-based chilli oil inspired by Cambodian Kapi-style condiments. We combine dried Cambodian chillies with aromatic spices — star anise, cardamom, and fermented sea vegetable — and steep them in golden sunflower oil for 48 hours. The result is a deeply layered, umami-rich oil with a warming, lingering heat.",
    howToUse:
      "Drizzle over congee, noodles, dumplings, fried rice, or steamed tofu. Use as a finishing oil on soups and salads. Also works beautifully as a dipping sauce base — just add a splash of soy and lime.",
    pairWith:
      "Perfect with dim sum-style dishes, steamed buns, plain congee, fried rice, spring rolls, and roasted broccoli. Also excellent on pizza or as a pasta sauce component.",
    howToCook:
      "Use as a cooking oil for stir-fries needing a chilli kick. Add to fried rice at the beginning for a smoky, spiced base. Drizzle cold over finished dishes as a garnish oil.",
    ingredients:
      "Sunflower oil, dried Cambodian chilli, fermented sea vegetable, star anise, Sichuan pepper, cardamom, garlic, shallot, sea salt. No artificial colour. Vegan.",
  },
}

function ProductPage({
  navigate,
  product,
  productIndex,
}: {
  navigate: (p: Page) => void
  product: ProductItem
  productIndex: number
}) {
  const heroRef = useReveal(0.01)
  const aboutRef = useReveal()
  const howRef = useReveal()
  const pairRef = useReveal()
  const cookRef = useReveal()
  const ingRef = useReveal()
  const ctaRef = useReveal()

  const details = PRODUCT_DETAILS[product.name] ?? {
    about: product.desc,
    howToUse: "Use as a flavouring in traditional Cambodian dishes.",
    pairWith: "Pairs well with steamed rice and fresh vegetables.",
    howToCook: "Sauté with aromatics and add to your favourite dishes.",
    ingredients: "All-natural plant-based ingredients. Store refrigerated.",
  }

  return (
    <div className="min-h-screen bg-[#F8F4EC]">
      <InnerNav navigate={navigate} label="Back to Products" />

      {/* Hero */}
      <div
        ref={heroRef as React.RefObject<HTMLDivElement>}
        className="reveal relative h-[50vh] md:h-[60vh] overflow-hidden grain"
      >
        <img
          src={product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E15] via-[#1A2E15]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-20 pb-10 lg:pb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-[#C4962A]/80 text-white text-xs font-bold uppercase tracking-widest mb-4">
            {product.tag}
          </span>
          <h1
            className="hero-h1 text-4xl md:text-6xl font-bold text-white leading-tight"
            style={{
              fontFamily:
                "'Century Gothic', CenturyGothic, AppleGothic, Poppins, sans-serif",
            }}
          >
            {product.name}
          </h1>
        </div>
      </div>

      {/* About */}
      <section
        ref={aboutRef as React.RefObject<HTMLElement>}
        className="reveal py-16 lg:py-20 bg-[#F8F4EC]"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
            About This Product
          </p>
          <h2 className="font-sans font-bold text-3xl text-[#1A2E15] mb-6">
            What Makes It Special
          </h2>
          <p className="text-[#6B6558] text-lg leading-relaxed">
            {details.about}
          </p>
        </div>
      </section>

      {/* How to Use + Pair With */}
      <section className="bg-[#1A2E15] py-16 lg:py-20 grain">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10">
          <div
            ref={howRef as React.RefObject<HTMLDivElement>}
            className="reveal"
          >
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
              How to Use It
            </p>
            <h3 className="font-sans font-bold text-2xl text-white mb-4">
              Usage Guide
            </h3>
            <p className="text-white/65 leading-relaxed">{details.howToUse}</p>
          </div>
          <div
            ref={pairRef as React.RefObject<HTMLDivElement>}
            className="reveal"
          >
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
              What to Eat It With
            </p>
            <h3 className="font-sans font-bold text-2xl text-white mb-4">
              Perfect Pairings
            </h3>
            <p className="text-white/65 leading-relaxed">{details.pairWith}</p>
          </div>
        </div>
      </section>

      {/* How to Cook */}
      <section
        ref={cookRef as React.RefObject<HTMLElement>}
        className="reveal py-16 lg:py-20 bg-[#F0EAD8] grain grain-light"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
            How to Cook With It
          </p>
          <h2 className="font-sans font-bold text-3xl text-[#1A2E15] mb-6">
            Cooking Instructions
          </h2>
          <p className="text-[#6B6558] text-lg leading-relaxed">
            {details.howToCook}
          </p>
        </div>
      </section>

      {/* Ingredients */}
      <section
        ref={ingRef as React.RefObject<HTMLElement>}
        className="reveal py-16 lg:py-20 bg-[#F8F4EC]"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
            Ingredients &amp; Care
          </p>
          <h2 className="font-sans font-bold text-3xl text-[#1A2E15] mb-6">
            What's Inside
          </h2>
          <div className="bg-white border border-[#E0D8C8] rounded-3xl p-8">
            <p className="text-[#6B6558] leading-relaxed">
              {details.ingredients}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="reveal bg-[#2D5016] py-16 grain grain-light"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-sans font-bold text-3xl text-white mb-5">
            Ready to Try {product.name}?
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            Find this product at our retail partners across Phnom Penh, or
            contact us to order directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("home")}
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-white text-[#2D5016] font-semibold hover:bg-[#F0EAD8] btn-glow transition-all"
            >
              Back to Products
            </button>
            <button
              onClick={() => navigate("contact")}
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/10 font-semibold transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Store Detail Page ────────────────────────────────────────────────────────

function StoreSlideshow({
  store,
  images,
}: {
  store: StoreItem
  images: string[]
}) {
  const {
    current,
    setCurrent,
    prev,
    next,
    interactionProps,
  } = useCarousel(images.length)
  return (
    <div
      {...interactionProps}
      role="region"
      aria-roledescription="carousel"
      aria-label={`In-store slideshow for ${store.name}`}
      className="relative aspect-video md:aspect-[21/9] overflow-hidden rounded-2xl bg-forest-mid"
    >
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Plant-based product inspiration at ${store.name}, image ${index + 1}`}
          aria-hidden={index !== current}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
      <button
        onClick={prev}
        aria-label="Previous store image"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-forest/60 hover:bg-forest text-white p-3 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next store image"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-forest/60 hover:bg-forest text-white p-3 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <div className="absolute inset-x-0 bottom-4 flex flex-wrap items-center justify-between gap-3 px-5">
        <span className="text-white/80 text-xs">
          {current + 1} / {images.length}
        </span>
        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Show store image ${index + 1}`}
              aria-current={index === current ? "true" : undefined}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current ? "bg-gold" : "bg-white/40 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StorePage({
  navigate,
  store,
  storeIndex,
}: {
  navigate: (p: Page) => void
  store: StoreItem
  storeIndex: number
}) {
  const heroRef = useReveal(0.01)
  const findRef = useReveal()
  const photosRef = useReveal(0.06)
  const productsRef = useReveal()
  const ctaRef = useReveal()

  const storeImages = [IMG.p1, IMG.p2, IMG.p3]

  return (
    <div className="min-h-screen bg-[#F8F4EC]">
      <InnerNav navigate={navigate} label="Back to Stores" />

      {/* Hero */}
      <div
        ref={heroRef as React.RefObject<HTMLDivElement>}
        className="reveal relative h-[45vh] md:h-[55vh] overflow-hidden grain"
      >
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop&auto=format"
          alt={store.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E15] via-[#1A2E15]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-20 pb-10 lg:pb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-[#A8C49A]/20 border border-[#A8C49A]/40 text-[#A8C49A] text-xs font-bold uppercase tracking-widest mb-4">
            {store.type}
          </span>
          <h1
            className="hero-h1 text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{
              fontFamily:
                "'Century Gothic', CenturyGothic, AppleGothic, Poppins, sans-serif",
            }}
          >
            {store.name}
          </h1>
        </div>
      </div>

      {/* Find Us Here */}
      <section
        ref={findRef as React.RefObject<HTMLElement>}
        className="reveal py-16 lg:py-20 bg-[#F8F4EC]"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
            Location &amp; Hours
          </p>
          <h2 className="font-sans font-bold text-3xl text-[#1A2E15] mb-8">
            Find Us Here
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-[#E0D8C8] p-6">
              <div className="text-2xl mb-3">📍</div>
              <h3 className="font-semibold text-[#1A2E15] mb-2">Address</h3>
              <p className="text-[#6B6558] text-sm leading-relaxed">
                {store.address}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#E0D8C8] p-6">
              <div className="text-2xl mb-3">🕘</div>
              <h3 className="font-semibold text-[#1A2E15] mb-2">
                Opening Hours
              </h3>
              <p className="text-[#6B6558] text-sm leading-relaxed">
                {store.hours}
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-[#E0D8C8] p-6">
              <div className="text-2xl mb-3">🏷️</div>
              <h3 className="font-semibold text-[#1A2E15] mb-2">Store Type</h3>
              <p className="text-[#6B6558] text-sm leading-relaxed">
                {store.type}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-[#2D5016] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2D5016]" /> In
                stock now
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-store slideshow */}
      <section className="bg-[#1A2E15] py-16 lg:py-20 grain">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
            In Store
          </p>
          <h2 className="font-sans font-bold text-3xl text-white mb-8">
            Our Products at {store.name}
          </h2>
          <div
            ref={photosRef as React.RefObject<HTMLDivElement>}
            className="reveal"
          >
            <StoreSlideshow
              key={store.name}
              store={store}
              images={storeImages}
            />
          </div>
        </div>
      </section>

      {/* Products available */}
      <section
        ref={productsRef as React.RefObject<HTMLElement>}
        className="reveal py-16 lg:py-20 bg-[#F0EAD8] grain grain-light"
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
            Available Here
          </p>
          <h2 className="font-sans font-bold text-3xl text-[#1A2E15] mb-8">
            Our Products Available Here
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 bg-white rounded-2xl border border-[#E0D8C8] p-4"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div>
                  <div className="font-semibold text-[#1A2E15] text-sm leading-snug">
                    {p.name}
                  </div>
                  <span className="text-[10px] text-[#C4962A] font-semibold uppercase tracking-wide">
                    {p.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="reveal bg-[#2D5016] py-16 grain grain-light"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-sans font-bold text-3xl text-white mb-5">
            Visit {store.name}
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            {store.address}
            <br />
            Open {store.hours}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("home")}
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-white text-[#2D5016] font-semibold hover:bg-[#F0EAD8] btn-glow transition-all"
            >
              Back to Stores
            </button>
            <button
              onClick={() => navigate("contact")}
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/10 font-semibold transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Founder ─────────────────────────────────────────────────────────────────

const FOUNDER_STORY = [
  "My journey toward founding Gogreen Vegetarian began long before the business itself was established. Growing up in Banteay Meanchey Province, Cambodia, near the Thailand border, I developed a deep love and compassion for animals from an early age.",
  "In 2002, at the age of sixteen, I was introduced to the philosophy of vegetarianism through a Chinese temple founded by Taiwanese practitioners in my hometown. Although I did not immediately adopt a vegetarian lifestyle, the experience planted a seed that would later shape my life's purpose.",
  "Years later, after studying Buddhist teachings related to karma and the interconnectedness of all living beings, I made the decision to become a full vegetarian. Today, I have maintained this commitment for more than sixteen years.",
  "Before becoming an entrepreneur, I worked in a variety of professional roles — Receptionist, Administrator, Secretary, VIP Service Executive, and Personal Assistant. These experiences taught me discipline, leadership, communication, and the importance of serving others with sincerity and professionalism.",
  "Despite my career progression, I carried a dream of creating a vegetarian brand that would promote health, compassion, and environmental awareness. On July 18, 2020, that dream became reality when Gogreen Vegetarian officially opened, supported by the partnership of my Hong Kong friend, Terry.",
  "Only three months later, the COVID-19 pandemic impacted the entire world. During the same period, I was pregnant with my youngest child and faced severe pregnancy sickness, financial uncertainty, landlord disputes, my husband's job loss and COVID-19 infection, as well as significant emotional and mental challenges. There were many moments when I considered stopping entirely.",
  "However, every challenge strengthened my conviction that Gogreen existed for a purpose greater than myself. Through resilience and continuous learning, Gogreen has remained open and continued to grow. Today, we have developed three signature products — Prahok Ktis, Kapi Pao, and Fermented Soybean — available in multiple retail channels throughout Cambodia.",
  "Over the years, I have also dedicated myself to sharing vegetarian knowledge through cooking classes, recipe development, and supporting establishments in transitioning to plant-based concepts. Looking toward the future, my dream is to establish a dedicated vegetarian food manufacturing facility in Cambodia and bring Khmer plant-based cuisine to international markets.",
  "Gogreen is more than a business. It is a lifelong commitment to health, compassion, sustainability, and positive impact.",
]

const FOUNDER_FACTS = [
  { label: "Founded", value: "July 18, 2020" },
  { label: "Vegetarian since", value: "16+ Years" },
  { label: "Signature products", value: "3 + Growing" },
  { label: "Retail presence", value: "Cambodia-wide" },
]

function Founder() {
  const [current, setCurrent] = useState(0)
  const slides = IMG.founderSlides
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + slides.length) % slides.length),
    [slides.length],
  )
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % slides.length),
    [slides.length],
  )
  useEffect(() => {
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [next])

  const headRef = useReveal()
  const portraitRef = useReveal()
  const storyRef = useReveal(0.05)

  return (
    <section
      id="founder"
      className="bg-[#1A2E15] py-16 sm:py-24 lg:py-36 overflow-hidden grain"
    >
      {/* Ambient orbs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#2D5016]/40 blur-3xl animate-orb pointer-events-none" />
      <div
        className="absolute bottom-1/4 left-0 w-60 h-60 rounded-full bg-[#C4962A]/5 blur-3xl animate-breathe pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className="reveal mb-14 lg:mb-16"
        >
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
            Our Founder
          </p>
          <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
            Chanlang Prum
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-14 items-start">
          {/* Portrait — dots live inside the image container */}
          <div
            ref={portraitRef as React.RefObject<HTMLDivElement>}
            className="reveal-left relative shrink-0"
          >
            <div className="rounded-[2rem] overflow-hidden aspect-[3/4] max-h-[420px] lg:max-h-none bg-[#2D5016] relative">
              {slides.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Chanlang Prum — photo ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  style={{ opacity: i === current ? 1 : 0 }}
                />
              ))}
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              {/* Dots inside image, bottom-center */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Photo ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? "bg-white w-5" : "bg-white/40 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
            {/* Fact cards sit cleanly below the portrait — no overlap */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              {FOUNDER_FACTS.map((f, i) => (
                <div
                  key={f.label}
                  className="card-lift bg-white/5 border border-white/10 rounded-xl p-3 hover:border-[#A8C49A]/30 transition-colors"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="text-[10px] font-semibold text-[#6B8F5E] uppercase tracking-wider mb-0.5">
                    {f.label}
                  </div>
                  <div className="font-display text-sm font-semibold text-white">
                    {f.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Story */}
          <div
            ref={storyRef as React.RefObject<HTMLDivElement>}
            className="reveal-right flex flex-col gap-7"
          >
            <blockquote className="border-l-4 border-[#C4962A] pl-6 py-1">
              <p className="font-display text-xl lg:text-2xl italic text-[#A8C49A] leading-relaxed">
                "My dream was simple: to show Cambodia and the world that
                vegetarian food can be as rich, flavorful, and satisfying as any
                traditional cuisine. Every product we create carries a piece of
                my heart and my commitment to health and sustainability."
              </p>
              <footer className="mt-4 text-white/40 text-sm not-italic">
                — Chanlang Prum, Founder's Vision
              </footer>
            </blockquote>
            <div className="h-px bg-white/10" />
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase">
              Founder's Story
            </p>
            <div className="relative">
              <div
                className="founder-scroll overflow-y-auto pr-3 space-y-4"
                style={{
                  maxHeight: "340px",
                  maskImage:
                    "linear-gradient(to bottom, black 75%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 75%, transparent 100%)",
                }}
              >
                {FOUNDER_STORY.map((para, i) => (
                  <p key={i} className="text-white/65 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
                <div className="h-10" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1 pointer-events-none">
                <div className="text-white/25 text-xs flex items-center gap-1">
                  <svg
                    className="w-3 h-3 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Scroll to read more
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Founder Page ─────────────────────────────────────────────────────────────

function FounderPage({ navigate }: { navigate: (p: Page) => void }) {
  const timelineRef = useReveal(0.06)
  const quoteRef = useReveal()
  const ctaRef = useReveal()

  const TIMELINE = [
    {
      year: "2002",
      event:
        "Introduced to vegetarianism at a Chinese temple in Banteay Meanchey",
    },
    {
      year: "2008",
      event:
        "Committed fully to vegetarian lifestyle after years of Buddhist study",
    },
    {
      year: "2015",
      event:
        "Began experimenting with plant-based versions of traditional Cambodian recipes",
    },
    {
      year: "2020",
      event:
        "Founded Gogreen Vegetarian on July 18, with support from partner Terry (HK)",
    },
    {
      year: "2021",
      event:
        "First retail distribution — products launched at Aeon Supermarket",
    },
    {
      year: "2023",
      event:
        "Expanded to 8 retail partners across Phnom Penh, including Chip Mong and Thai Huot",
    },
    {
      year: "2026",
      event:
        "Over 100 plant-based products developed. Cooking classes in preparation.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F4EC]">
      <InnerNav navigate={navigate} />

      {/* Hero banner — full color image with text overlay */}
      <div className="relative h-[55vh] md:h-[70vh] overflow-hidden">
        <img
          src={IMG.founderSlides[0]}
          alt="Chanlang Prum, Founder of Gogreen Vegetarian"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Only gradient at bottom for text legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1A2E15] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-20 pb-10 lg:pb-16">
          <p className="hero-badge text-[#A8C49A] text-xs font-semibold tracking-widest uppercase mb-3">
            The Founder's Story
          </p>
          <h1
            className="hero-h1 text-5xl md:text-7xl font-bold text-white leading-tight"
            style={{
              fontFamily:
                "'Century Gothic', CenturyGothic, AppleGothic, Poppins, sans-serif",
            }}
          >
            THE FOUNDER'S STORY
          </h1>
        </div>
      </div>

      {/* Founder section (reuse Founder component content) */}
      <Founder />

      {/* Timeline */}
      <section className="bg-[#F8F4EC] py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div
            ref={timelineRef as React.RefObject<HTMLDivElement>}
            className="reveal"
          >
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-4">
              Key Milestones
            </p>
            <h2 className="font-sans font-bold text-4xl text-[#1A2E15] mb-12">
              The Gogreen Journey
            </h2>
            <div className="relative">
              <div className="absolute left-[7.5rem] top-0 bottom-0 w-px bg-[#E0D8C8] hidden sm:block" />
              <div className="space-y-8">
                {TIMELINE.map((t, i) => (
                  <div
                    key={t.year}
                    className="flex gap-6 sm:gap-10 items-start"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="shrink-0 w-20 text-right">
                      <span className="font-sans font-bold text-lg text-[#C4962A]">
                        {t.year}
                      </span>
                    </div>
                    <div className="hidden sm:flex shrink-0 w-4 h-4 rounded-full bg-[#A8C49A] border-4 border-[#F8F4EC] mt-1 relative z-10" />
                    <p className="text-[#6B6558] leading-relaxed pt-0.5">
                      {t.event}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Words from the Founder */}
      <section className="bg-[#1A2E15] py-20 lg:py-28 grain">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div
            ref={quoteRef as React.RefObject<HTMLDivElement>}
            className="reveal text-center"
          >
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-8">
              Words from the Founder
            </p>
            <blockquote>
              <p className="font-display text-2xl md:text-3xl italic text-[#A8C49A] leading-relaxed mb-8">
                "Gogreen is more than a business. Every product we create is an
                act of compassion — for the animals we choose not to harm, for
                the people we nourish, and for the land of Cambodia we call
                home. If our work inspires even one person to choose a more
                compassionate way of eating, that is enough."
              </p>
              <footer className="text-white/50 text-base not-italic">
                — Chanlang Prum, Founder, Gogreen Vegetarian
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef as React.RefObject<HTMLElement>}
        className="reveal bg-[#2D5016] py-16 grain grain-light"
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="font-sans font-bold text-3xl text-white mb-5">
            Connect With Gogreen
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            We'd love to hear from you — whether you're a customer, partner, or
            fellow believer in compassionate food.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("contact")}
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-white text-[#2D5016] font-semibold hover:bg-[#F0EAD8] btn-glow transition-all"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate("about")}
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-white/30 text-white hover:border-white hover:bg-white/10 font-semibold transition-all"
            >
              About Gogreen
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── Classes ─────────────────────────────────────────────────────────────────

const CLASS_DATA = [
  {
    img: IMG.class1,
    title: "Cooking with Prahok",
    desc: "Discover how to use our plant-based Prahok Ktis in traditional Cambodian recipes — from amok to stir-fries.",
    duration: "3 hours",
    level: "Beginner",
  },
  {
    img: IMG.class2,
    title: "Fermentation Fundamentals",
    desc: "Learn the art and science of plant-based fermentation — how our pastes and soybean products are crafted at home.",
    duration: "2.5 hours",
    level: "All Levels",
  },
  {
    img: IMG.class3,
    title: "Cambodian Condiment Masterclass",
    desc: "From Kapi Pao to herb-infused pastes — master the sauces and condiments that define Cambodian plant-based cooking.",
    duration: "4 hours",
    level: "Intermediate",
  },
]

function ClassesSection() {
  const [showNotify, setShowNotify] = useState(false)
  const headRef = useReveal()
  const gridRef = useReveal(0.06)
  return (
    <>
      <section
        id="classes"
        className="scroll-mt-16 bg-[#F0EAD8] py-16 sm:py-24 lg:py-36 grain grain-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div
            ref={headRef as React.RefObject<HTMLDivElement>}
            className="reveal grid lg:grid-cols-2 gap-10 items-end mb-16"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase">
                  Learn With Us
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C4962A]/15 border border-[#C4962A]/30 text-[#C4962A] text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4962A] animate-pulse" />{" "}
                  Coming Soon
                </span>
              </div>
              <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#1A2E15] leading-tight">
                Cooking Classes Using
                <br />
                <span className="text-[#2D5016]">Our Products</span>
              </h2>
            </div>
            <p className="text-[#6B6558] leading-relaxed text-lg">
              Our hands-on workshops teach you how to cook with our plant-based
              products — unlocking authentic Cambodian flavors while building
              healthy, sustainable habits in your kitchen.
            </p>
          </div>
          <div
            ref={gridRef as React.RefObject<HTMLDivElement>}
            className="reveal grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-12"
          >
            {CLASS_DATA.map((c, i) => (
              <div
                key={c.title}
                className="card-lift bg-[#FEFCF7] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="h-52 overflow-hidden bg-[#A8C49A] relative">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E15]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-7">
                  <div className="flex gap-2 mb-4">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#E8F0E4] text-[#2D5016]">
                      {c.level}
                    </span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#FBF3E0] text-[#C4962A]">
                      {c.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#1A2E15] mb-2">
                    {c.title}
                  </h3>
                  <p className="text-[#6B6558] text-sm leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => setShowNotify(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#2D5016] text-[#2D5016] font-semibold hover:bg-[#2D5016] hover:text-white transition-all"
            >
              Get Notified
            </button>
          </div>
        </div>
      </section>
      {showNotify && <NotifyModal onClose={() => setShowNotify(false)} />}
    </>
  )
}

// ─── Benefits ────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    icon: "🐾",
    title: "Animal Welfare",
    desc: "Every product is entirely free from animal ingredients and cruelty. We believe all living beings deserve dignity — our entire range reflects that commitment, aligned with Buddhist values and compassionate living.",
  },
  {
    icon: "🫀",
    title: "Health Benefits",
    desc: "Rich in plant proteins, natural probiotics, vitamins, and minerals. Our fermented products actively support digestion, immunity, and long-term wellbeing — giving you nourishment without compromise.",
  },
  {
    icon: "🌍",
    title: "Environmental Impact",
    desc: "Choosing plant-based reduces your carbon footprint significantly. We source locally, minimize packaging waste, and produce with full respect for Cambodia's ecosystems and future generations.",
  },
]

function Benefits() {
  return (
    <section id="benefits" className="bg-[#F8F4EC] py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
            Why Gogreen
          </p>
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#1A2E15] leading-tight mb-5">
            The Gogreen <span className="text-[#2D5016]">Difference</span>
          </h2>
          <p className="text-[#6B6558] max-w-lg mx-auto text-lg leading-relaxed">
            When you choose Gogreen products, you choose ingredients that are
            good for you, good for the planet, and good for every living being.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="bg-[#FEFCF7] rounded-3xl p-10 border border-[#E0D8C8] hover:shadow-xl hover:border-[#A8C49A]/50 transition-all duration-300 group cursor-default text-center"
            >
              <div className="text-5xl mb-6">{b.icon}</div>
              <h3 className="font-display text-xl font-semibold text-[#1A2E15] mb-4 group-hover:text-[#2D5016] transition-colors">
                {b.title}
              </h3>
              <p className="text-[#6B6558] text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Srey Leak",
    role: "Health-Conscious Home Cook · Phnom Penh",
    quote:
      "Gogreen's Prahok Ktis completely changed how I cook. The flavor is so authentic — my family couldn't tell the difference. Finally, a plant-based product that truly respects Cambodian taste.",
    rating: 5,
    photos: [
      "https://images.unsplash.com/photo-1625631980722-b728f9cf1036?w=900&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1625631980634-397b9e9a73f9?w=900&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1780277814234-c3821a9d3f08?w=900&h=700&fit=crop&auto=format",
    ],
  },
  {
    name: "Dara Chhun",
    role: "Vegan Lifestyle Blogger · Cambodia",
    quote:
      "I've tried many plant-based condiments, but nothing comes close to Gogreen. The fermented soybean paste is a pantry staple in my home now. Pure, honest, and deeply flavorful.",
    rating: 5,
    photos: [
      "https://images.unsplash.com/photo-1758522488804-268ef5d2d6a6?w=900&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1758522488640-59b1b0acf03f?w=900&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1758522488776-f7e48e7f5c2b?w=900&h=700&fit=crop&auto=format",
    ],
  },
  {
    name: "Malis Sok",
    role: "Nutritionist & Wellness Coach",
    quote:
      "I recommend Gogreen products to all my clients. The quality of ingredients is exceptional — no preservatives, rich in natural probiotics, and made with real compassion for health.",
    rating: 5,
    photos: [
      "https://images.unsplash.com/photo-1771339140216-8ecb4e490ba7?w=900&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1625631980722-b728f9cf1036?w=900&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1780277814234-c3821a9d3f08?w=900&h=700&fit=crop&auto=format",
    ],
  },
  {
    name: "Piseth Rin",
    role: "Restaurant Owner · Siem Reap",
    quote:
      "We use Gogreen's Kapi Pao across our entire vegetarian menu. Our customers love it. The authenticity of these products is rare — you can taste the heritage in every jar.",
    rating: 5,
    photos: [
      "https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=900&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=900&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1758522488804-268ef5d2d6a6?w=900&h=700&fit=crop&auto=format",
    ],
  },
]

function ReviewPhotoModal({
  photos,
  name,
  onClose,
}: {
  photos: string[]
  name: string
  onClose: () => void
}) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setIndex((i) => (i + 1) % photos.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#1A2E15] rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {photos.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${name} review photo ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E15]/60 via-transparent to-transparent" />
          {/* Prev / Next */}
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "bg-[#C4962A] w-5" : "bg-white/40 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-white/70 text-sm">
            {name} · Photo {index + 1} of {photos.length}
          </span>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-sm transition-colors"
          >
            Close ✕
          </button>
        </div>
      </div>
    </div>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-[#C4962A]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const VISIBLE_REVIEWS = 2

function Testimonials() {
  const [start, setStart] = useState(0)
  const [modalTestimonial, setModalTestimonial] = useState<(typeof TESTIMONIALS)[number] | null>(null)
  const headRef = useReveal()
  const bodyRef = useReveal(0.06)

  const canPrev = start > 0
  const canNext = start + VISIBLE_REVIEWS < TESTIMONIALS.length

  return (
    <section className="bg-[#1A2E15] py-16 sm:py-24 lg:py-36 grain overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-64 h-64 rounded-full bg-[#A8C49A]/5 blur-3xl animate-breathe pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
              Customer Love
            </p>
            <h2 className="font-sans font-bold text-4xl md:text-5xl text-white leading-tight">
              What Our <span className="text-[#A8C49A]">Customers Say</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setStart((s) => Math.max(0, s - 1))}
              disabled={!canPrev}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-white/40 text-xs tabular-nums">
              {start + 1}–
              {Math.min(start + VISIBLE_REVIEWS, TESTIMONIALS.length)} /{" "}
              {TESTIMONIALS.length}
            </span>
            <button
              onClick={() =>
                setStart((s) =>
                  Math.min(TESTIMONIALS.length - VISIBLE_REVIEWS, s + 1),
                )
              }
              disabled={!canNext}
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={bodyRef as React.RefObject<HTMLDivElement>}
          className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {TESTIMONIALS.slice(start, start + VISIBLE_REVIEWS).map((t, i) => (
            <div
              key={t.name}
              className="card-lift bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col gap-5 hover:border-[#A8C49A]/30 hover:bg-white/8 transition-all duration-500"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <Stars count={t.rating} />
              <p className="text-white/70 text-base leading-relaxed italic flex-1">
                "{t.quote}"
              </p>
              <div className="pt-5 border-t border-white/10 flex items-end justify-between gap-4">
                <div>
                  <div className="font-semibold text-white text-base">
                    {t.name}
                  </div>
                  <div className="text-white/40 text-xs mt-0.5">{t.role}</div>
                </div>
                {t.photos && (
                  <button
                    onClick={() => setModalTestimonial(t)}
                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C4962A]/20 hover:bg-[#C4962A]/40 text-[#C4962A] text-xs font-semibold transition-colors"
                  >
                    View Photos
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({
            length: TESTIMONIALS.length - VISIBLE_REVIEWS + 1,
          }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStart(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === start ? "bg-[#A8C49A] w-5" : "bg-white/20 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>

      {modalTestimonial && (
        <ReviewPhotoModal
          photos={modalTestimonial.photos}
          name={modalTestimonial.name}
          onClose={() => setModalTestimonial(null)}
        />
      )}
    </section>
  )
}

// ─── Our Promise ──────────────────────────────────────────────────────────────

const PROMISES = [
  {
    title: "Always Plant-Based",
    body: "Every product we make is 100% free from animal ingredients — always. This is not a trend for us. It is a commitment we made from day one and will never compromise on.",
  },
  {
    title: "No Artificial Additives",
    body: "We use only natural ingredients and traditional fermentation methods. No MSG, no artificial preservatives, no shortcuts — just pure, honest food the way it should be.",
  },
  {
    title: "Authentically Cambodian",
    body: "Our recipes are rooted in generations of Cambodian culinary wisdom. We preserve tradition while making it accessible to modern, health-conscious lifestyles across the world.",
  },
  {
    title: "Sustainable by Design",
    body: "From sourcing local ingredients to minimizing packaging waste, every decision we make considers the long-term health of Cambodia's environment and communities.",
  },
]

function OurPromise() {
  return (
    <section className="bg-[#F8F4EC] py-24 lg:py-36">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase mb-5">
            Our Commitment
          </p>
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#1A2E15] leading-tight">
            Our <span className="text-[#2D5016]">Promise</span> to You
          </h2>
        </div>
        <div className="divide-y divide-[#E0D8C8]">
          {PROMISES.map((p) => (
            <div
              key={p.title}
              className="py-8 grid sm:grid-cols-[220px_1fr] gap-4 sm:gap-10 items-start group"
            >
              <h3 className="font-display text-lg font-semibold text-[#1A2E15] group-hover:text-[#2D5016] transition-colors">
                {p.title}
              </h3>
              <p className="text-[#6B6558] text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ navigate }: { navigate: Navigate }) {
  const footerRef = useReveal(0.05)
  return (
    <>
      <footer
        id="footer-contact"
        className="bg-[#121E10] py-12 sm:py-16 grain grain-heavy"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-full bg-[#A8C49A]/15 flex items-center justify-center">
                  <LeafIcon className="w-4 h-4 text-[#6B8F5E]" />
                </div>
                <span className="font-sans text-lg font-bold tracking-wide">
                  <span style={{ color: "#C4962A" }}>Go</span>
                  <span style={{ color: "#6B8F5E" }}>green</span>{" "}
                  <span style={{ color: "#C4962A" }}>Vegetarian</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Crafting authentic plant-based Cambodian products with
                compassion, heritage, and zero compromise since 2020.
              </p>
              <address className="text-white/30 text-xs not-italic leading-relaxed space-y-1">
                <div>Phnom Penh, Cambodia</div>
                <div>hello@gogreen.com.kh</div>
                <div>+855 12 345 678</div>
              </address>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-5">Company</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => navigate("about")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("founder")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    Founder Story
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("about", "classes")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    Cooking Classes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("contact")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-5">
                Products
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => navigate("shop")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    Shop All Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("partner")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    Wholesale Orders
                  </button>
                </li>
                <li>
                  <a
                    href="#stores"
                    className="text-white/40 text-sm hover:text-white/70 transition-colors"
                  >
                    Find a Store
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => navigate("shop")}
                    className="text-white/40 text-sm hover:text-white/70 transition-colors text-left"
                  >
                    New Arrivals
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-5">Connect</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.82a4.85 4.85 0 01-1.07-.13z" />
                    </svg>
                    TikTok
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/25 text-xs">
              © {new Date().getFullYear()} Gogreen Vegetarian. All rights
              reserved.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-white/25 text-xs hover:text-white/50 transition-colors"
              >
                Cookies
              </a>
              <a
                href="#"
                className="text-white/25 text-xs hover:text-white/50 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/25 text-xs hover:text-white/50 transition-colors"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [route, setRoute] = useState<{ page: Page; section?: string }>({
    page: "home",
  })
  const { page } = route
  const homeScroll = useRef(0)
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [selectedStore, setSelectedStore] = useState(0)
  const navigate = useCallback<Navigate>(
    (nextPage, section) => {
      // Keep the original landing-page position even when visiting several inner pages.
      if (page === "home" && nextPage !== "home")
        homeScroll.current = window.scrollY
      setRoute({ page: nextPage, section })
    },
    [page],
  )

  useLayoutEffect(() => {
    const target = route.section ? document.getElementById(route.section) : null
    if (target) {
      target.scrollIntoView({ block: "start", behavior: "instant" })
    } else {
      window.scrollTo({
        top: page === "home" ? homeScroll.current : 0,
        behavior: "instant",
      })
    }
  }, [route, page])

  if (page === "contact") return <ContactPage navigate={navigate} />
  if (page === "shop") return <ShopComingSoonPage navigate={navigate} />
  if (page === "about") return <AboutPage navigate={navigate} />
  if (page === "partner") return <PartnerPage navigate={navigate} />
  if (page === "founder") return <FounderPage navigate={navigate} />
  if (page === "activities") return <ActivitiesPage navigate={navigate} />
  if (page === "product")
    return (
      <ProductPage
        navigate={navigate}
        product={PRODUCTS[selectedProduct]}
        productIndex={selectedProduct}
      />
    )
  if (page === "store")
    return (
      <StorePage
        navigate={navigate}
        store={STORES[selectedStore]}
        storeIndex={selectedStore}
      />
    )

  return (
    <div className="min-h-screen">
      <Nav navigate={navigate} />
      <ActivityCarousel navigate={navigate} />
      <Hero navigate={navigate} />
      <Products navigate={navigate} setSelectedProduct={setSelectedProduct} />
      <div className="bg-[#C4962A] overflow-hidden py-4 grain grain-light">
        <div className="marquee-track whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, outer) => (
            <span key={outer} className="inline-flex items-center">
              {Array.from({ length: 12 }).map((__, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-4 px-8 text-white text-base font-bold tracking-wide uppercase"
                >
                  {i % 2 === 0 ? "Plant-Based Food" : "Plant-Based Product"}
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <Stores navigate={navigate} setSelectedStore={setSelectedStore} />
      <Testimonials />
      <Footer navigate={navigate} />
    </div>
  )
}
