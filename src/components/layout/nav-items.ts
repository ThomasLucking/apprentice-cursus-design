import { BookOpen, CirclePlus, FolderKanban, House, Users } from '@/components/icons'
import type { Role } from '@/data/app'

export type NavItem = {
  label: string
  to: string
  icon: typeof House
  /** exact: only this path; otherwise the path and everything below it. */
  exact?: boolean
  /** only listed while active (the legacy full-page "Ajouter une note"). */
  legacy?: boolean
}

export const NAV_ITEMS: Record<Role, NavItem[]> = {
  apprentice: [
    { label: 'Accueil', to: '/apprentice', icon: House, exact: true },
    { label: 'Carnet de notes', to: '/apprentice/grades', icon: BookOpen },
    { label: 'Ajouter une note', to: '/apprentice/grades/create', icon: CirclePlus, legacy: true },
    { label: 'Portfolio', to: '/apprentice/portfolio', icon: FolderKanban },
  ],
  coach: [
    { label: 'Accueil', to: '/coach', icon: House, exact: true },
    { label: 'Apprentis', to: '/coach/apprentices', icon: Users },
  ],
}

function matches(item: NavItem, path: string) {
  return item.exact ? path === item.to : path === item.to || path.startsWith(item.to + '/')
}

/** Visible items and the active one (the most specific match wins). */
export function navFor(role: Role, path: string) {
  const all = NAV_ITEMS[role]
  const active = all
    .filter((i) => matches(i, path))
    .sort((a, b) => b.to.length - a.to.length)[0]
  return { items: all.filter((i) => !i.legacy || i === active), active }
}
