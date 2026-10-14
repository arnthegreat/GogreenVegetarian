import { useState } from 'react'
import { IMG } from '@/data/site'
import { useReveal } from '@/hooks/useReveal'
import NotifyModal from '@/components/NotifyModal'

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

export function ClassesSection() {
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
