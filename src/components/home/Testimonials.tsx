import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { useReveal } from '@/hooks/useReveal'

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

export function Testimonials() {
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
