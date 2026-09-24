import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router'
import { LogOut, Menu, Moon, Sun } from '@/components/icons'
import { JobtrekLogo } from '@/components/layout/jobtrek-logo'
import { navFor, type NavItem } from '@/components/layout/nav-items'
import { NotificationsPopover } from '@/components/layout/notifications'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { USERS, type Role } from '@/data/app'
import { useTheme } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

const focusRing = 'focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none'
const iconButton = 'text-muted-foreground rounded-full'

function ThemeToggle() {
  const { dark, toggle } = useTheme()
  const label = dark ? 'Passer en thème clair' : 'Passer en thème sombre'
  return (
    <Button variant="ghost" size="icon" className={iconButton} aria-label={label} title={label} aria-pressed={dark} onClick={toggle}>
      <Sun className="hidden size-5 dark:block" />
      <Moon className="size-5 dark:hidden" />
    </Button>
  )
}

function MobileMenu({ items, active }: { items: NavItem[]; active?: NavItem }) {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground -ml-2 md:hidden" aria-label="Ouvrir le menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>
            <JobtrekLogo />
          </SheetTitle>
          <SheetDescription className="sr-only">Navigation principale</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-1 px-4">
          {items.map((item) => {
            const isActive = item === active
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                  isActive ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}

/* App shell (AppLayout): sticky navbar + main area; pages render a PageContainer. */
export function AppLayout({ role }: { role: Role }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const user = USERS[role]
  const { items, active } = navFor(role, pathname)
  const home = `/${role}`

  return (
    <div className="bg-background flex min-h-svh flex-col">
      <a
        href="#main-content"
        className="bg-background focus-visible:ring-ring/50 sr-only z-50 rounded-md px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus-visible:ring-[3px] focus-visible:outline-none"
      >
        Aller au contenu
      </a>
      <nav className="bg-background sticky top-0 z-40 border-b px-4 sm:px-6">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 sm:gap-6">
          <MobileMenu items={items} active={active} />
          <Link className={cn('shrink-0 rounded-md', focusRing)} to={home}>
            <JobtrekLogo />
          </Link>
          <div className="hidden h-full min-w-0 flex-1 items-center gap-1 overflow-x-auto md:flex">
            {items.map((item) => {
              const isActive = item === active
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative flex h-full items-center px-3 text-sm whitespace-nowrap transition-colors',
                    isActive ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {item.label}
                  {isActive && <span className="bg-primary absolute inset-x-2 bottom-0 h-0.5 rounded-full" />}
                </Link>
              )
            })}
          </div>
          <div className="ml-auto flex shrink-0 items-center gap-1 lg:gap-1.5">
            <ThemeToggle />
            <NotificationsPopover triggerClassName={iconButton} />
            <div className="mr-1 ml-2 flex items-center gap-2 lg:ml-3">
              <div className="hidden flex-col items-end lg:flex">
                <span className="text-sm leading-tight font-medium">{user.name}</span>
                <span className="text-muted-foreground text-xs leading-tight">{user.role}</span>
              </div>
              <Avatar title={user.name}>
                <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
              </Avatar>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                navigate('/login')
              }}
            >
              <Button variant="ghost" size="icon" type="submit" className={iconButton} aria-label="Se déconnecter" title="Se déconnecter">
                <LogOut className="size-5" />
              </Button>
            </form>
          </div>
        </div>
      </nav>
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col px-4 py-8 focus:outline-none sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
