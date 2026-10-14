import { useEffect, useState } from 'react'
import { LeafIcon } from '@/components/icons'
import type { Page } from '@/types/navigation'

export default function Nav({ navigate }: { navigate: (p: Page) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])
  return (
    <nav
      style={{ transition: "background 0.4s, box-shadow 0.4s" }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "bg-[#1A2E15] shadow-2xl shadow-black/30" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#A8C49A]/20 flex items-center justify-center group-hover:bg-[#A8C49A]/30 transition-colors">
            <LeafIcon className="w-4 h-4 text-[#A8C49A]" />
          </div>
          <span className="font-sans text-lg font-bold tracking-wide">
            <span style={{ color: "#C4962A" }}>Go</span>
            <span style={{ color: "#A8C49A" }}>green</span>{" "}
            <span style={{ color: "#C4962A" }}>Vegetarian</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#products"
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            Products
          </a>
          <a
            href="#stores"
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            Stores
          </a>
          <button
            onClick={() => navigate("founder")}
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            Founder
          </button>
          <button
            onClick={() => navigate("about")}
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            About Us
          </button>
          <button
            onClick={() => navigate("contact")}
            className="text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#1A2E15] border-t border-white/10 px-6 py-5 space-y-1">
          {[
            { label: "Products", href: "#products" },
            { label: "Stores", href: "#stores" },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3 text-white/70 hover:text-white font-medium border-b border-white/5 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false)
              navigate("founder")
            }}
            className="flex items-center gap-2 py-3 text-white/70 hover:text-white font-medium border-b border-white/5 w-full text-left"
          >
            Founder
          </button>
          <button
            onClick={() => {
              setOpen(false)
              navigate("about")
            }}
            className="flex items-center gap-2 py-3 text-white/70 hover:text-white font-medium border-b border-white/5 w-full text-left"
          >
            About Us
          </button>
          <button
            onClick={() => {
              setOpen(false)
              navigate("contact")
            }}
            className="flex items-center gap-2 py-3 text-white/70 hover:text-white font-medium border-b border-white/5 w-full text-left"
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  )
}
