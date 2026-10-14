import { useState } from 'react'

export default function NotifyModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#B0A898] hover:text-[#1A2E15] transition-colors"
        >
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
        </button>
        {sent ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="font-display text-xl font-semibold text-[#2D5016] mb-2">
              You're on the list!
            </h3>
            <p className="text-[#6B6558] text-sm">
              We'll email you as soon as our cooking classes are ready to
              launch.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#2D5016] text-white text-sm font-semibold hover:bg-[#3D6822] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C4962A]/15 text-[#C4962A] text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C4962A] animate-pulse" />{" "}
                Coming Soon
              </div>
              <h2 className="font-display text-2xl font-semibold text-[#1A2E15] mb-1">
                Get Notified
              </h2>
              <p className="text-[#6B6558] text-sm leading-relaxed">
                Enter your email and we'll let you know when our cooking classes
                officially launch.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6B6558] uppercase tracking-wide mb-1.5">
                  Your Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FEFCF7] text-[#1A2E15] text-sm placeholder-[#B0A898] focus:outline-none focus:border-[#6B8F5E] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#2D5016] hover:bg-[#3D6822] text-white font-semibold transition-colors"
              >
                Notify Me When Classes Launch
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
