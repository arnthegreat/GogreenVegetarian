import { useEffect, useState, type FocusEvent } from 'react'

export function useCarousel(count: number, delay = 5000) {
  const [current, setCurrent] = useState(0)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(preference.matches)
    sync()
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (focused || reducedMotion || count < 2) return

    const timer = window.setInterval(
      () => setCurrent((slide) => (slide + 1) % count),
      delay,
    )

    return () => window.clearInterval(timer)
  }, [count, delay, focused, reducedMotion])

  return {
    current,
    setCurrent,
    prev: () => setCurrent((slide) => (slide - 1 + count) % count),
    next: () => setCurrent((slide) => (slide + 1) % count),
    reducedMotion,
    interactionProps: {
      onFocusCapture: () => setFocused(true),
      onBlurCapture: (event: FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false)
        }
      },
    },
  }
}
