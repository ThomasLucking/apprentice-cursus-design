import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

const SIZES = { sm: 'max-w-2xl', md: 'max-w-4xl', lg: 'max-w-7xl' }

/* sm = forms, md = content (default), lg = dashboards/tables */
export function PageContainer({ size = 'md', children }: { size?: keyof typeof SIZES; children: ReactNode }) {
  return <div className={cn('mx-auto flex w-full flex-col gap-6', SIZES[size])}>{children}</div>
}

export type Crumb = { label: string; to: string }

/* Title block: h1 + description (+ extra content below it) with actions on the right. */
export function PageTitle({
  title,
  description,
  children,
  actions,
  as: Heading = 'h1',
  className = 'flex flex-wrap items-start justify-between gap-4',
}: {
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  actions?: ReactNode
  as?: 'h1' | 'h2'
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex min-w-0 flex-col gap-1">
        <Heading className={cn('font-semibold tracking-tight', Heading === 'h1' ? 'text-2xl' : 'text-lg')}>{title}</Heading>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
        {children}
      </div>
      {actions}
    </div>
  )
}

/* PageHeader: optional breadcrumb, then the page title. */
export function PageHeader({ breadcrumbs, ...title }: { breadcrumbs?: Crumb[] } & Parameters<typeof PageTitle>[0]) {
  return (
    <div className="flex flex-col gap-2">
      {breadcrumbs && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((c, i) => (
              <Fragment key={c.to}>
                {i > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={c.to}>{c.label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <PageTitle {...title} />
    </div>
  )
}

/* Label + value pair ("Note", "Coach", "Date du test"…). */
export function DetailItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{label}</p>
      <div className="text-sm">{children}</div>
    </div>
  )
}
