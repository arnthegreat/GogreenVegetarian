import { ChevronLeft, LeafIcon } from '@/components/icons'
import type { Page } from '@/types/navigation'

export default function InnerNav({
  navigate,
  label = "Back to Home",
}: {
  navigate: (p: Page) => void
  label?: string
}) {
  return (
    <div className="sticky top-0 z-40 bg-[#1A2E15] px-6 lg:px-10 h-16 flex items-center justify-between">
      <button
        onClick={() => navigate("home")}
        className="flex items-center gap-2.5"
      >
        <div className="w-7 h-7 rounded-full bg-[#A8C49A]/15 flex items-center justify-center">
          <LeafIcon className="w-3.5 h-3.5 text-[#A8C49A]" />
        </div>
        <span className="font-sans text-base font-bold tracking-wide">
          <span style={{ color: "#C4962A" }}>Go</span>
          <span style={{ color: "#A8C49A" }}>green</span>{" "}
          <span style={{ color: "#C4962A" }}>Vegetarian</span>
        </span>
      </button>
      <button
        onClick={() => navigate("home")}
        className="text-white/60 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> {label}
      </button>
    </div>
  )
}
