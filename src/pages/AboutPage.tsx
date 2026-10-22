import { useReveal } from '@/hooks/useReveal'
import { IMG } from '@/data/site'
import { ClassesSection } from '@/components/sections/CookingClasses'
import { InnerNav } from '@/components/layout/index'
import type { Page } from '@/types/navigation'

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

export default function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
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
            className="reveal grid md:grid-cols-3 gap-10"
          >
            {[
              {
                title: "Our Mission",
                body: "To create authentic, delicious plant-based Cambodian products that make healthy, compassionate living easy and accessible — without sacrificing flavor, culture, or tradition.",
                delay: 0,
              },
              {
                title: "Our Vision",
                body: "To become Southeast Asia's most trusted plant-based food brand, bringing the rich culinary heritage of Cambodia to tables across the region and beyond.",
                delay: 120,
              },
              {
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
                All Plant-Based Products Rooted in{" "}
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
              <div className="rounded-[2rem] overflow-hidden aspect-[3/3] bg-[#A8C49A]">
                <img
                  src={IMG.aboutPage1}
                  alt="Gogreen plant-based products"
                  className="w-full h-full inset-0 object-cover object-[center_0%] hover:scale-105 transition-transform duration-700"
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
