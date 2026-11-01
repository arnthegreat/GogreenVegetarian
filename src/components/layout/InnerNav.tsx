import { ChevronLeft } from '@/components/icons'
import gogreenLogo from '@/assets/logo/gogreenlogo.png'
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
        className="flex items-center"
      >
        <img
          src={gogreenLogo}
          alt="Gogreen Vegetarian"
          className="h-14 w-14 lg:h-16 lg:w-16 object-contain"
        />
        <span className="font-sans text-sm font-bold tracking-wide ml-1">
          <span style={{ color: "#C4962A" }}>GO</span>
          <span style={{ color: "#A8C49A" }}>GREEN</span>{" "}
          <span style={{ color: "#C4962A" }}>VEGETARIAN</span>
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
