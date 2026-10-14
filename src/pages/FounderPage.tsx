import { useCallback, useEffect, useState } from 'react'
import { IMG } from '@/data/site'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { useReveal } from '@/hooks/useReveal'
import { InnerNav } from '@/components/layout/index'
import type { Page } from '@/types/navigation'

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

export default function FounderPage({ navigate }: { navigate: (p: Page) => void }) {
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
