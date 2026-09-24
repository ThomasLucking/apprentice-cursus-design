import { GlyphCheck, GlyphComment, GlyphCross, GlyphWarn } from '@/components/icons'
import { status } from '@/data/grades'

const GLYPHS = { good: GlyphCheck, warn: GlyphWarn, bad: GlyphCross }

/* Validé / Suffisant / À risque chip (ratio ≥ .75, ≥ 4/6, else). */
export function StatusChip({ value }: { value: number }) {
  const [kind, label] = status(value)
  const Glyph = GLYPHS[kind]
  return (
    <span className={`status status--${kind}`}>
      <Glyph />
      {label}
    </span>
  )
}

/* Comment count shown next to a grade ("recent__comments", "gb-comments"). */
export function CommentCount({ count, className }: { count: number; className: string }) {
  if (!count) return null
  return (
    <span className={className} title={`${count} commentaire${count > 1 ? 's' : ''}`}>
      <GlyphComment />
      {count}
    </span>
  )
}
