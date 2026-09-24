import { useState } from 'react'
import { Bell } from '@/components/icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { NOTIFICATIONS } from '@/data/app'
import { cn } from '@/lib/utils'

/* Bell with the unread badge; "Tout marquer comme lu" clears dots and badge. */
export function NotificationsPopover({ triggerClassName }: { triggerClassName?: string }) {
  const [allRead, setAllRead] = useState(false)
  const unread = allRead ? 0 : NOTIFICATIONS.filter((n) => n.unread).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('relative', triggerClassName)}
          aria-label={unread ? `Notifications, ${unread} non lues` : 'Notifications'}
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="bg-primary text-primary-foreground absolute top-1.25 right-1.25 flex size-4 items-center justify-center rounded-full text-[10px] leading-none font-bold shadow-[0_0_0_2px_var(--background)]">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-88 overflow-hidden p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
          {unread > 0 && (
            <Button variant="link" size="xs" className="text-muted-foreground hover:text-foreground h-auto px-0" onClick={() => setAllRead(true)}>
              Tout marquer comme lu
            </Button>
          )}
        </div>
        <ul className="max-h-96 divide-y overflow-y-auto">
          {NOTIFICATIONS.map((n, i) => {
            const isUnread = n.unread && !allRead
            return (
              <li key={i}>
                <button
                  type="button"
                  className={cn('hover:bg-accent/60 flex w-full items-start gap-3 px-4 py-3 text-left transition-colors', n.unread && 'bg-accent/40')}
                >
                  <span className={cn('mt-2 size-1.5 shrink-0 rounded-full', isUnread ? 'bg-primary' : 'bg-transparent')} />
                  <Avatar>
                    <AvatarFallback className="text-xs">{n.initials}</AvatarFallback>
                  </Avatar>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm">
                      <span className="font-semibold">{n.author}</span>
                      <span className="text-muted-foreground">{` · ${n.role}`}</span>
                      <span className="font-medium">{n.action}</span>
                    </span>
                    <span className="text-muted-foreground mt-0.5 block truncate text-sm">{n.subject}</span>
                    <span className="text-muted-foreground mt-1 block text-xs">{n.date}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
