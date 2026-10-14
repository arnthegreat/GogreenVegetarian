import { useState } from 'react'
import { ChevronLeft } from '@/components/icons'
import { IMG } from '@/data/site'
import { ACTIVITIES } from '@/components/home/ActivityCarousel'
import { useReveal } from '@/hooks/useReveal'
import { InnerNav } from '@/components/layout/index'
import type { Navigate } from '@/types/navigation'

const ACTIVITY_ARCHIVE = [
  ...ACTIVITIES,
  {
    label: "Our Beginnings",
    title: "A Greener Journey Begins",
    date: "Jul 2020",
    dateTime: "2020-07",
    img: IMG.hero,
    description:
      "Chanlang Prum founded Gogreen Vegetarian in 2020, bringing a passion for plant-based living to Cambodian products and everyday cooking.",
  },
]

export default function ActivitiesPage({ navigate }: { navigate: Navigate }) {
  const [filter, setFilter] = useState("All")
  const gridRef = useReveal(0.01)
  const now = new Date()
  const currentMonth = new Date(now.getFullYear(), now.getMonth()).getTime()
  const getStatus = (date: string) => {
    const [year, month] = date.split("-").map(Number)
    const timestamp = new Date(year, month - 1).getTime()
    return timestamp > currentMonth
      ? "Upcoming"
      : timestamp === currentMonth
        ? "This Month"
        : "Past"
  }
  const visible = ACTIVITY_ARCHIVE.filter(
    (activity) => filter === "All" || getStatus(activity.dateTime) === filter,
  )

  return (
    <div className="min-h-screen bg-cream">
      <InnerNav navigate={navigate} />
      <header className="relative bg-forest text-white grain px-6 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto">
          <p className="text-sage-light text-xs font-semibold uppercase tracking-widest mb-5">
            The Gogreen Journal
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
            Growing greener.
            <br />
            <span className="text-gold-light">Together.</span>
          </h1>
          <p className="text-white/65 max-w-2xl mt-6 leading-relaxed">
            Upcoming activities, brand news, and moments from our journey.
            Explore the past, present, and future of Gogreen Vegetarian.
          </p>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-forest">
            Activities &amp; Updates
          </h2>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter activities"
          >
            {["All", "Upcoming", "This Month", "Past"].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                aria-pressed={filter === option}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === option
                    ? "bg-forest text-cream"
                    : "bg-cream-dark text-stone hover:bg-border"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div
          ref={gridRef as React.RefObject<HTMLDivElement>}
          className="reveal grid md:grid-cols-2 gap-8"
        >
          {visible.map((activity) => (
            <article
              key={activity.title}
              className="bg-warm-white rounded-2xl overflow-hidden border border-border card-lift"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={activity.img}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-forest text-cream rounded-full px-3 py-1 text-xs font-semibold">
                  {getStatus(activity.dateTime)}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between gap-4 text-xs font-semibold uppercase tracking-widest mb-4">
                  <span className="text-sage">{activity.label}</span>
                  <time dateTime={activity.dateTime} className="text-stone">
                    {activity.date}
                  </time>
                </div>
                <h3 className="text-xl font-bold text-forest leading-snug mb-4">
                  {activity.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </article>
          ))}
          {visible.length === 0 && (
            <p className="md:col-span-2 text-stone py-12 text-center">
              No activities in this view yet. Explore all updates or check back
              for more news.
            </p>
          )}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-cream hover:bg-forest-hover transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </button>
          <button
            onClick={() => navigate("contact")}
            className="rounded-full border border-border px-6 py-3 font-semibold text-forest hover:bg-cream-dark transition-colors"
          >
            Ask About an Activity
          </button>
        </div>
      </main>
    </div>
  )
}
