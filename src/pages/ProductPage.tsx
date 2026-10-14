import { useReveal } from '@/hooks/useReveal'
import { PRODUCT_DETAILS, type ProductItem } from '@/data/catalog'
import { InnerNav } from '@/components/layout/index'
import type { Page } from '@/types/navigation'

export default function ProductPage({
  navigate,
  product,
}: {
  navigate: (p: Page) => void
  product: ProductItem
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
