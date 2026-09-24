import { Link } from 'react-router'
import type { House } from '@/components/icons'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export type Shortcut = { to: string; icon: typeof House; title: string; description: string }

/* Home shortcut: icon tile, title and description; highlights on hover. */
export function ShortcutCard({ to, icon: Icon, title, description }: Shortcut) {
  return (
    <Link className="group focus-visible:ring-ring/50 rounded-xl focus-visible:ring-[3px] focus-visible:outline-none" to={to}>
      <Card className="group-hover:border-primary/50 group-hover:bg-accent/40 h-full transition-colors">
        <CardHeader>
          <div className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-lg">
            <Icon className="size-5" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export function ShortcutGrid({ items }: { items: Shortcut[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => (
        <ShortcutCard key={s.title} {...s} />
      ))}
    </div>
  )
}
