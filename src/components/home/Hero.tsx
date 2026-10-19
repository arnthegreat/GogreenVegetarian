import { useCallback, useEffect, useState } from 'react'
import { IMG } from '@/data/site'
import type { Page } from '@/types/navigation'

export function Hero({ navigate }: { navigate: (p: Page) => void }) {
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
            Gogreen Vegetarian crafts authentic plant-based products from
            traditional Prahok Ktis to fermented soybean pastes made with
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
