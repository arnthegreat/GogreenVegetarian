import { STORES } from '@/data/catalog'
import { useReveal } from '@/hooks/useReveal'
import type { Page } from '@/types/navigation'

export function Stores({
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
                {s.logoImage ? (
                  <img
                    src={s.logoImage}
                    alt={`${s.name} logo`}
                    className="h-12 w-24 object-contain"
                  />
                ) : (
                  s.logo
                )}
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
