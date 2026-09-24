import { useCountUp } from '@/hooks/use-count-up'

/* Number that counts up on mount; screen readers get the final value only. */
export function CountUp({ value, format = (n) => String(Math.round(n)), delay }: { value: number; format?: (n: number) => string; delay?: number }) {
  const shown = useCountUp(value, 900, delay)
  return (
    <>
      <span aria-hidden="true">{format(shown)}</span>
      <span className="sr-only">{format(value)}</span>
    </>
  )
}
