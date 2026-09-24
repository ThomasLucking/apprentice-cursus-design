import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type IconProps = ComponentProps<'svg'>

/* Lucide icons with the exact paths of the original app, rendered like lucide-vue
   (class "lucide lucide-<name>") so size/color utilities behave the same. */
function lucide(name: string, body: ReactNode) {
  function Icon({ className, ...props }: IconProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn('lucide', `lucide-${name}`, className)}
        {...props}
      >
        {body}
      </svg>
    )
  }
  Icon.displayName = name
  return Icon
}

export const ArrowRight = lucide('arrow-right', <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>)
export const Bell = lucide('bell', <><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></>)
export const BookOpen = lucide('book-open', <><path d="M12 5v16" /><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" /></>)
export const Check = lucide('check', <path d="M20 6 9 17l-5-5" />)
export const ChevronDown = lucide('chevron-down', <path d="m6 9 6 6 6-6" />)
export const ChevronLeft = lucide('chevron-left', <path d="m15 18-6-6 6-6" />)
export const ChevronRight = lucide('chevron-right', <path d="m9 18 6-6-6-6" />)
export const ChevronsUpDown = lucide('chevrons-up-down', <><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" /></>)
export const CirclePlus = lucide('circle-plus', <><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></>)
export const ExternalLink = lucide('external-link', <><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>)
export const Eye = lucide('eye', <><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></>)
export const FileText = lucide('file-text', <><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></>)
export const FileX = lucide('file-x', <><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="m14.5 12.5-5 5" /><path d="m9.5 12.5 5 5" /></>)
export const FolderKanban = lucide('folder-kanban', <><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" /><path d="M8 10v4" /><path d="M12 10v2" /><path d="M16 10v6" /></>)
export const FolderOpen = lucide('folder-open', <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />)
export const GripVertical = lucide('grip-vertical', <><circle cx="9" cy="12" r="1" /><circle cx="9" cy="5" r="1" /><circle cx="9" cy="19" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="5" r="1" /><circle cx="15" cy="19" r="1" /></>)
export const House = lucide('house', <><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></>)
export const Image = lucide('image', <><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></>)
export const LogOut = lucide('log-out', <><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></>)
export const Menu = lucide('menu', <><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></>)
export const Minus = lucide('minus', <path d="M5 12h14" />)
export const Moon = lucide('moon', <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />)
export const Pencil = lucide('pencil', <><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></>)
export const Plus = lucide('plus', <><path d="M5 12h14" /><path d="M12 5v14" /></>)
export const Search = lucide('search', <><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></>)
export const Sun = lucide('sun', <><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></>)
export const Trash = lucide('trash', <><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>)
export const Upload = lucide('upload', <><path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /></>)
export const Users = lucide('users', <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></>)
export const X = lucide('x', <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>)

/* Bare glyphs used by the feature styles (status chips, toast, gradebook). */
function glyph(body: ReactNode, strokeWidth = '2.5', linejoin = true) {
  return function Glyph(props: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin={linejoin ? 'round' : undefined}
        aria-hidden="true"
        {...props}
      >
        {body}
      </svg>
    )
  }
}

export const GlyphCheck = glyph(<path d="M20 6 9 17l-5-5" />)
export const GlyphWarn = glyph(<><path d="M12 8v5" /><path d="M12 17h.01" /></>, '2.5', false)
export const GlyphCross = glyph(<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>, '2.5', false)
export const GlyphComment = glyph(<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />, '2')
export const GlyphChevronDown = glyph(<path d="m6 9 6 6 6-6" />, '2')
export const GlyphChevronRight = glyph(<path d="m9 18 6-6-6-6" />, '2')
export const GlyphSearch = glyph(<><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>, '2')
