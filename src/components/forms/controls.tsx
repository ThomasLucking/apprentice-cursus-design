import { useRef, useState, type ReactNode } from 'react'
import { Minus, Plus, Search, Upload, X } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

/* Grade input with − / + buttons, clamped to [min, max] by `step`. */
export function StepperInput({ id, min, max, step, defaultValue }: { id: string; min: number; max: number; step: number; defaultValue: number }) {
  const [value, setValue] = useState(defaultValue.toFixed(1))
  const bump = (dir: number) => setValue((v) => Math.min(max, Math.max(min, (Number(v) || min) + dir * step)).toFixed(1))

  return (
    <InputGroup>
      <InputGroupAddon>
        <InputGroupButton size="icon-xs" onClick={() => bump(-1)}>
          <Minus />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput
        id={id}
        type="number"
        min={min}
        max={max}
        step={step}
        aria-invalid="false"
        className="text-center font-semibold"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" onClick={() => bump(1)}>
          <Plus />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

/* Dashed drop zone; "parcourir" opens the hidden file input. */
export function Dropzone({ accept, hint }: { accept: string; hint: string }) {
  const input = useRef<HTMLInputElement>(null)
  return (
    <div className="hover:bg-muted/50 flex flex-col items-center justify-center gap-1 rounded-md border border-dashed p-8 text-center transition-colors">
      <Upload className="text-muted-foreground size-5" />
      <p className="text-sm">
        Glisser le scan du test ici, ou{' '}
        <button type="button" className="text-accent-foreground underline underline-offset-2" onClick={() => input.current?.click()}>
          parcourir
        </button>
      </p>
      <p className="text-muted-foreground text-xs">{hint}</p>
      <input ref={input} type="file" accept={accept} className="hidden" />
    </div>
  )
}

/* Removable chips; Enter or a comma adds the typed value. */
export function ChipsInput({ id, defaultValue, placeholder }: { id: string; defaultValue: string[]; placeholder: string }) {
  const [chips, setChips] = useState(defaultValue)
  const [draft, setDraft] = useState('')

  return (
    <div className="border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border px-2 py-1.5 shadow-xs focus-within:ring-[3px]">
      {chips.map((chip) => (
        <Badge key={chip} variant="secondary" className="gap-1 pr-1">
          {chip}{' '}
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground rounded-sm"
            aria-label={`Retirer ${chip}`}
            onClick={() => setChips((c) => c.filter((x) => x !== chip))}
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <input
        id={id}
        value={draft}
        className="placeholder:text-muted-foreground min-w-40 flex-1 bg-transparent text-sm outline-none"
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== 'Enter' && e.key !== ',') return
          e.preventDefault()
          const name = draft.trim().replace(/,$/, '')
          if (name && !chips.includes(name)) setChips((c) => [...c, name])
          setDraft('')
        }}
      />
    </div>
  )
}

/* Square dashed button that opens a hidden multi-file input. */
export function FileButton({ accept, label, children }: { accept: string; label: string; children: ReactNode }) {
  const input = useRef<HTMLInputElement>(null)
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className="border-input text-muted-foreground hover:bg-muted/50 hover:text-foreground flex size-24 items-center justify-center rounded-md border border-dashed transition-colors"
        aria-label={label}
        onClick={() => input.current?.click()}
      >
        {children}
      </button>
      <input ref={input} type="file" accept={accept} multiple className="hidden" />
    </div>
  )
}

/* Search field with a leading icon (apprentices, coach gradebook). */
export function SearchInput({ label, value, onChange, className }: { label: string; value: string; onChange: (value: string) => void; className?: string }) {
  return (
    <InputGroup className={className}>
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput type="search" placeholder={label} aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} />
    </InputGroup>
  )
}
