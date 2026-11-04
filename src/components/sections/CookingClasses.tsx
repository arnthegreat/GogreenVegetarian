import { useState } from 'react'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { useCarousel } from '@/hooks/useCarousel'
import { useReveal } from '@/hooks/useReveal'
import NotifyModal from '@/components/NotifyModal'
import { imageAsset } from '@/lib/imageAssets'

const CLASS_PHOTOS = [
  {
    src: imageAsset("cookingclass.jpg"),
    alt: "Students learning to prepare vegetables during a cooking class",
  },
  {
    src: imageAsset("cookingclass2.jpg"),
    alt: "The instructor and students preparing ingredients together",
  },
  {
    src: imageAsset("cookingclass3.jpg"),
    alt: "The instructor demonstrating a cooking technique to students",
  },
  {
    src: imageAsset("cookingclass4.jpg"),
    alt: "Students watching a cooking demonstration",
  },
  {
    src: imageAsset("cookingclass5.jpg"),
    alt: "The cooking class instructor with her students",
  },
]

export function ClassesSection() {
  const [showNotify, setShowNotify] = useState(false)
  const headRef = useReveal()
  const gridRef = useReveal(0.06)
  const {
    current,
    setCurrent,
    prev,
    next,
    interactionProps,
  } = useCarousel(CLASS_PHOTOS.length, 5000)

  return (
    <>
      <section
        id="classes"
        className="scroll-mt-16 bg-[#F0EAD8] py-16 sm:py-24 lg:py-36 grain grain-light"
        aria-label="Cooking classes"
        {...interactionProps}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div
            ref={headRef as React.RefObject<HTMLDivElement>}
            className="reveal grid lg:grid-cols-2 gap-8 lg:gap-10 items-end mb-10 sm:mb-16"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <p className="text-[#6B8F5E] text-xs font-semibold tracking-widest uppercase">
                  Learn With Us
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C4962A]/15 border border-[#C4962A]/30 text-[#C4962A] text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C4962A] animate-pulse" />{" "}
                  Returning Soon
                </span>
              </div>
              <h2 className="font-sans font-bold text-4xl md:text-5xl text-[#1A2E15] leading-tight">
                Our Cooking Classes
                <br />
                <span className="text-[#2D5016]">Will Be Back</span>
              </h2>
            </div>
            <p className="text-[#6B6558] leading-relaxed text-lg">
              We have loved welcoming students to learn Cambodian plant-based
              cooking in past classes. Sessions are paused for now, but we are
              looking forward to bringing them back soon. Sign up and we will
              let you know when new classes are planned.
            </p>
          </div>
          <div
            ref={gridRef as React.RefObject<HTMLDivElement>}
            className="reveal max-w-4xl mx-auto mb-10 sm:mb-12"
            role="region"
            aria-label="Photos from past cooking classes"
            aria-roledescription="carousel"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#1A2E15] shadow-xl">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#A8C49A]">
                {CLASS_PHOTOS.map((photo, index) => (
                  <img
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    aria-hidden={index !== current}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
                      index === current ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <button
                  onClick={prev}
                  aria-label="Previous cooking class photo"
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next cooking class photo"
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <p className="text-white/75 text-sm">
                  Memories from our past cooking classes
                </p>
                <span className="text-white/50 text-xs tabular-nums shrink-0">
                  {current + 1}/{CLASS_PHOTOS.length}
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {CLASS_PHOTOS.map((photo, index) => (
                <button
                  key={photo.src}
                  onClick={() => setCurrent(index)}
                  aria-label={`Show cooking class photo ${index + 1}`}
                  aria-current={index === current ? "true" : undefined}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? "w-6 bg-[#2D5016]"
                      : "w-2 bg-[#6B8F5E]/40"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => setShowNotify(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#2D5016] text-[#2D5016] font-semibold hover:bg-[#2D5016] hover:text-white transition-all"
            >
              Notify Me When Classes Return
            </button>
          </div>
        </div>
      </section>
      {showNotify && <NotifyModal onClose={() => setShowNotify(false)} />}
    </>
  )
}
