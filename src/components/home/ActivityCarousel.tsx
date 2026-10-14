import { useCarousel } from '@/hooks/useCarousel'
import { ArrowRight, ChevronLeft, ChevronRight } from '@/components/icons'
import type { Navigate } from '@/types/navigation'

export const ACTIVITIES = [
  {
    label: "New Launch",
    title: "Prahok Ktis Now at Aeon Supermarket",
    date: "Sep 2026",
    dateTime: "2026-09",
    description:
      "Explore our plant-based Prahok Ktis and find Gogreen Vegetarian at Aeon Supermarket in Phnom Penh.",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop&auto=format",
  },
  {
    label: "Event",
    title: "Gogreen at the 2026 Phnom Penh Food Festival",
    date: "Aug 2026",
    dateTime: "2026-08",
    description:
      "Follow our activity feed for news of Gogreen Vegetarian at the Phnom Penh Food Festival.",
    img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop&auto=format",
  },
  {
    label: "Milestone",
    title: "100+ Products — Celebrating 6 Years of Craft",
    date: "Jul 2026",
    dateTime: "2026-07",
    description:
      "Founded in 2020, Gogreen Vegetarian has grown into a Cambodian brand with more than 100 plant-based products.",
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop&auto=format",
  },
  {
    label: "Community",
    title: "Founder Chanlang Joins Buddhist Wellness Forum",
    date: "Jun 2026",
    dateTime: "2026-06",
    description:
      "Our founder’s journey is rooted in compassion, vegetarian living, and a commitment to the community.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop&auto=format",
  },
]

export function ActivityCarousel({ navigate }: { navigate: Navigate }) {
  const {
    current,
    setCurrent,
    prev,
    next,
    interactionProps,
  } = useCarousel(ACTIVITIES.length, 4000)

  const activity = ACTIVITIES[current]

  return (
    <section
      id="activities"
      aria-label="Featured activities"
      aria-roledescription="carousel"
      {...interactionProps}
      className="relative w-full min-h-80 md:min-h-96 overflow-hidden bg-forest grain"
    >
      {ACTIVITIES.map((a, i) => (
        <img
          key={a.img}
          src={a.img}
          alt={a.title}
          aria-hidden={i !== current}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1A2E15]/60" />
      {/* Content */}
      <div className="absolute inset-0 flex items-center px-4 md:px-16 pt-16 lg:pt-20 pb-10 gap-3 md:gap-6 z-10">
        <button
          onClick={prev}
          aria-label="Previous"
          className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C4962A] text-white text-[10px] font-bold uppercase tracking-widest mb-2">
            {activity.label}
          </span>
          <h3 className="text-white font-sans font-bold text-base md:text-xl leading-snug">
            {activity.title}
          </h3>
          <p className="text-[#A8C49A] text-xs mt-1">{activity.date}</p>
          <button
            onClick={() => navigate("activities")}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold text-white hover:bg-gold-light hover:text-forest transition-colors btn-glow"
          >
            Explore Activities &amp; Updates <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={next}
          aria-label="Next"
          className="shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {ACTIVITIES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Show activity ${i + 1}: ${ACTIVITIES[i].title}`}
            aria-current={i === current ? "true" : undefined}
            className={`h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-gold w-6" : "bg-white/30 w-3"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
