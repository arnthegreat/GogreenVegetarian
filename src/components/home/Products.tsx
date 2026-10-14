import { useState } from 'react'
import { ChevronLeft, ChevronRight } from '@/components/icons'
import { PRODUCTS, VISIBLE } from '@/data/catalog'
import { useReveal } from '@/hooks/useReveal'
import type { Page } from '@/types/navigation'

export function Products({
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
