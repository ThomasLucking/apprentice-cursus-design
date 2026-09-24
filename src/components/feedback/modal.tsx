import type { ReactNode } from 'react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { X } from '@/components/icons'

/* Centered form modal ("Ajouter une note", "Nouveau projet"). The page form's card
   becomes the body and its footer sticks to the bottom (see .modal__body in features.css). */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  size = 'md',
  focusFirstField = true,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  size?: 'md' | 'lg'
  /** false: focus the panel itself (no focus ring on open). */
  focusFirstField?: boolean
  children: ReactNode
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className={`modal modal--${size}`}
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => {
            // Focus the first field of the form (or the panel), not the close button.
            const root = e.currentTarget as HTMLElement
            const target = focusFirstField
              ? root.querySelector<HTMLElement>('.modal__body :is(input:not([type="file"]):not([disabled]), textarea)')
              : root.querySelector<HTMLElement>('.modal__panel')
            if (target) {
              e.preventDefault()
              target.focus()
            }
          }}
        >
          {/* Radix locks page scroll through the Overlay. */}
          <DialogPrimitive.Overlay className="modal__overlay" onClick={() => onOpenChange(false)} />
          <div className="modal__panel" tabIndex={-1}>
            <div className="modal__head">
              <div className="flex min-w-0 flex-col gap-1">
                <DialogPrimitive.Title className="text-lg font-semibold tracking-tight">{title}</DialogPrimitive.Title>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
              <DialogPrimitive.Close className="modal__close" aria-label="Fermer">
                <X className="size-4" />
              </DialogPrimitive.Close>
            </div>
            <div className="modal__body">{children}</div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
