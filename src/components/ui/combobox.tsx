import { useState } from "react"

import { Check, ChevronsUpDown, Search } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

/* Searchable single-select list in a popover (shadcn combobox pattern). */
function Combobox({
  id,
  items,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
}: {
  id?: string
  items: string[]
  value: string | null
  onValueChange: (value: string) => void
  placeholder: string
  searchPlaceholder: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [highlighted, setHighlighted] = useState(0)

  const q = query.trim().toLowerCase()
  const visible = items.filter((item) => item.toLowerCase().includes(q))

  function openChange(next: boolean) {
    setOpen(next)
    setQuery("")
    setHighlighted(0)
  }

  function select(item: string) {
    onValueChange(item)
    openChange(false)
  }

  return (
    <div data-slot="combobox">
      <Popover open={open} onOpenChange={openChange}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            data-slot="combobox-anchor"
            variant="outline"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            {value ?? placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-slot="combobox-list"
          role="listbox"
          sideOffset={4}
          className="flex max-h-(--radix-popover-content-available-height) w-(--radix-popover-trigger-width) min-w-(--radix-popover-trigger-width) flex-col overflow-hidden p-0 outline-none"
        >
          <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
            <Search className="size-4 shrink-0 opacity-50" />
            <input
              data-slot="command-input"
              role="combobox"
              aria-expanded="true"
              aria-autocomplete="list"
              autoComplete="off"
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setHighlighted(0)
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                  e.preventDefault()
                  const step = e.key === "ArrowDown" ? 1 : -1
                  setHighlighted((i) => Math.max(0, Math.min(visible.length - 1, i + step)))
                } else if (e.key === "Enter" && visible[highlighted]) {
                  e.preventDefault()
                  select(visible[highlighted])
                }
              }}
            />
          </div>
          <div role="group" data-slot="combobox-group" className="overflow-y-auto p-1 text-foreground">
            {visible.map((item, i) => {
              const selected = item === value
              return (
                <div
                  key={item}
                  data-slot="combobox-item"
                  role="option"
                  aria-selected={selected}
                  data-state={selected ? "checked" : "unchecked"}
                  data-highlighted={i === highlighted ? "" : undefined}
                  className={cn(
                    "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground"
                  )}
                  onPointerMove={() => setHighlighted(i)}
                  onClick={() => select(item)}
                >
                  {item}
                  {selected && (
                    <span data-slot="combobox-item-indicator" className="ml-auto">
                      <Check className="size-4" />
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { Combobox }
