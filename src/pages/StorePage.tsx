import { type StoreItem } from '@/data/catalog'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { useCarousel } from '@/hooks/useCarousel'
import { useReveal } from '@/hooks/useReveal'
import { InnerNav } from '@/components/layout/index'
import type { Page } from '@/types/navigation'

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

export default function StorePage({
  navigate,
  store,
}: {
  navigate: (p: Page) => void
  store: StoreItem
}) {
  const heroRef = useReveal(0.01)
  const findRef = useReveal()
  const photosRef = useReveal(0.06)
  const productsRef = useReveal()
  const ctaRef = useReveal()

  const storeImages = store.storeImages

  return (
    <div className="min-h-screen bg-[#F8F4EC]">
      <InnerNav navigate={navigate} label="Back to Stores" />

      {/* Hero */}
      <div
        ref={heroRef as React.RefObject<HTMLDivElement>}
        className="reveal relative h-[45vh] md:h-[55vh] overflow-hidden grain"
      >
        <img
          src={store.heroImage}
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
          {store.products.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {store.products.map((p) => (
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
          ) : (
            <p className="text-[#6B6558] text-sm">
              Product availability has not been listed for this store yet.
            </p>
          )}
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
