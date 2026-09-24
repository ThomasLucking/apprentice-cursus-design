import { useEffect, useState } from 'react'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Eases from 0 to `target` over `ms` on mount; jumps straight there with reduced motion. */
export function useCountUp(target: number, ms = 900, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (reduced()) return
    let frame = 0
    let start: number | null = null
    const tick = (now: number) => {
      start ??= now + delay
      const t = Math.min(1, Math.max(0, (now - start) / ms))
      setValue(target * (1 - (1 - t) ** 3))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, ms, delay])

  return reduced() ? target : value
}
