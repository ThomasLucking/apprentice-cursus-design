import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { status } from '@/data/grades'

const STATUS_COLOR = { good: 'success', warn: 'warning', bad: 'destructive' } as const

/* 270° arc gauge on a 1–6 scale; the colour follows the branch status. */
export function ScoreGauge({ value, size, stroke, className = '', children }: { value: number; size: number; stroke: number; className?: string; children?: ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const arc = c * 0.75
  const color = STATUS_COLOR[status(value)[0]]
  const circle = (dash: number, token: string) => (
    <circle
      cx={size / 2}
      cy={size / 2}
      r={r}
      fill="none"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeDasharray={`${dash} ${c}`}
      transform={`rotate(135 ${size / 2} ${size / 2})`}
      style={{ stroke: `var(--${token})` }}
    />
  )
  return (
    <div className={`relative inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {circle(arc, 'muted')}
        {circle((arc * value) / 6, color)}
      </svg>
      {children}
    </div>
  )
}

export const STATUS_TEXT = { good: 'text-success', warn: 'text-warning', bad: 'text-destructive' }

/* Coach / formateur name, or a destructive "Non assigné" badge. */
export function Assignment({ name }: { name: string | null }) {
  return name ? <span>{name}</span> : <Badge variant="destructive">Non assigné</Badge>
}
