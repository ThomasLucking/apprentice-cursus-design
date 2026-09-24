import { useState } from 'react'
import { Link } from 'react-router'
import { GripVertical, Image, Pencil } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { projectMeta, type Project } from '@/data/app'
import { cn } from '@/lib/utils'

function move<T>(list: T[], from: number, to: number) {
  const next = [...list]
  next.splice(to, 0, next.splice(from, 1)[0])
  return next
}

/* Project rows reordered by drag and drop, or with ↑ / ↓ on the grip handle. */
export function ProjectList({ initial }: { initial: Project[] }) {
  const [projects, setProjects] = useState(initial)
  const [dragged, setDragged] = useState<number | null>(null)
  const [over, setOver] = useState<number | null>(null)

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <ul>
        {projects.map((p, i) => (
          <li
            key={p.id}
            draggable
            className={cn('flex items-center gap-4 border-b p-4 last:border-b-0', dragged === i && 'opacity-50', over === i && dragged !== i && 'bg-accent/60')}
            onDragStart={() => setDragged(i)}
            onDragOver={(e) => {
              e.preventDefault()
              setOver(i)
            }}
            onDrop={(e) => {
              e.preventDefault()
              if (dragged !== null && dragged !== i) setProjects((list) => move(list, dragged, i))
            }}
            onDragEnd={() => {
              setDragged(null)
              setOver(null)
            }}
          >
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 cursor-grab rounded-sm focus-visible:ring-[3px] focus-visible:outline-none"
              aria-label={`Déplacer ${p.title}. Utilisez les flèches haut et bas.`}
              onKeyDown={(e) => {
                const to = e.key === 'ArrowUp' ? i - 1 : e.key === 'ArrowDown' ? i + 1 : -1
                if (to < 0 || to >= projects.length) return
                e.preventDefault()
                const handle = e.currentTarget
                setProjects((list) => move(list, i, to))
                requestAnimationFrame(() => handle.focus())
              }}
            >
              <GripVertical className="size-4" />
            </button>
            <div className="bg-muted text-muted-foreground flex size-12 shrink-0 items-center justify-center rounded-md">
              <Image className="size-4" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="truncate font-medium">{p.title}</p>
              <p className="text-muted-foreground truncate text-sm">{projectMeta(p, false)}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {p.technologies.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <Button variant="outline" size="icon" asChild>
              <Link to="/apprentice/portfolio/edit" aria-label={`Modifier ${p.title}`}>
                <Pencil />
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  )
}
