import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/* Width of the chart body; charts re-render on resize so text keeps its real pixel size. */
export function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.clientWidth)
    const ro = new ResizeObserver(() => setWidth(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

export type Tip = { x: number; y: number; content: ReactNode } | null

/* Chart body with its hover tooltip. */
export function ChartBody({ id, render }: { id: string; render: (width: number, setTip: (t: Tip) => void) => ReactNode }) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const [tip, setTip] = useState<Tip>(null)
  const [last, setLast] = useState<Tip>(null)
  if (tip && tip !== last) setLast(tip)
  const shown = tip ?? last // keep the content while it fades out

  return (
    <div className="chart-card__body" id={id} ref={ref}>
      {width > 0 && render(width, setTip)}
      <div className={tip ? 'chart-tip is-on' : 'chart-tip'} role="status" style={shown ? { left: shown.x, top: shown.y } : undefined}>
        {shown?.content}
      </div>
    </div>
  )
}

// Bar path with 4px rounded data end and a square base.
export function barPath(x0: number, x1: number, top: number, base: number) {
  const r = Math.min(4, base - top, (x1 - x0) / 2)
  return `M${x0} ${base} V${top + r} Q${x0} ${top} ${x0 + r} ${top} H${x1 - r} Q${x1} ${top} ${x1} ${top + r} V${base} Z`
}

/* Shared hatch fill for failing bars: identity never rests on red vs green alone. */
export function HatchPattern() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        <pattern id="c-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" className="c-hatch-bg" />
          <line x1="0" y1="0" x2="0" y2="6" className="c-hatch-line" />
        </pattern>
      </defs>
    </svg>
  )
}

export function ChartCard({
  labelId,
  title,
  description,
  aside,
  children,
}: {
  labelId: string
  title: string
  description: string
  aside?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="chart-card" aria-labelledby={labelId}>
      <div className="chart-card__head">
        <div>
          <h2 id={labelId} className="chart-card__title">
            {title}
          </h2>
          <p className="chart-card__desc">{description}</p>
        </div>
        {aside}
      </div>
      {children}
    </section>
  )
}

/* Segmented control (.seg) with one pressed button. */
export function Segmented<T extends string | number>({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string
  label: string
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="seg" id={id} role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}
