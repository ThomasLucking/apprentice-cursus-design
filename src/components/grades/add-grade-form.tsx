import { useState, type FormEvent, type ReactNode } from 'react'
import { Dropzone, StepperInput } from '@/components/forms/controls'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Combobox } from '@/components/ui/combobox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { MONTHS, SUBJECT_LISTS } from '@/data/app'

export type GradeMode = 'notes' | 'modules'

/* "Ajouter une note" form, used in the modal and on the full-page screens.
   `onModeChange` lets the full pages navigate instead of switching in place. */
export function AddGradeForm({
  mode: initialMode = 'notes',
  onModeChange,
  onSubmit,
  cancel,
}: {
  mode?: GradeMode
  onModeChange?: (mode: GradeMode) => void
  onSubmit: () => void
  cancel: ReactNode
}) {
  const [mode, setMode] = useState(initialMode)
  const [maturity, setMaturity] = useState(false)
  const [subject, setSubject] = useState<string | null>(null)
  const [oral, setOral] = useState(false)
  const modules = mode === 'modules'

  function changeMode(next: string) {
    if (!next || next === mode) return
    if (onModeChange) return onModeChange(next as GradeMode)
    setMode(next as GradeMode)
    setSubject(null)
    setMaturity(false)
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form noValidate onSubmit={submit}>
      <Card>
        <CardContent>
          <FieldGroup>
            <Field orientation="horizontal">
              <FieldLabel id="grade-mode-label">Type d'évaluation</FieldLabel>
              <ToggleGroup
                type="single"
                variant="outline"
                spacing={0}
                className="ml-auto"
                aria-labelledby="grade-mode-label"
                value={mode}
                onValueChange={changeMode}
              >
                <ToggleGroupItem value="notes">Notes</ToggleGroupItem>
                <ToggleGroupItem value="modules">Modules</ToggleGroupItem>
              </ToggleGroup>
            </Field>

            <Field data-invalid="false">
              <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="matiere">{modules ? 'Module' : 'Matière'}</FieldLabel>
                {!modules && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setMaturity((m) => !m)
                      setSubject(null)
                    }}
                  >
                    <span>{maturity ? 'Voir les matières du CFC' : 'Voir les matières de maturité'}</span>
                  </Button>
                )}
              </div>
              <Combobox
                id="matiere"
                items={modules ? SUBJECT_LISTS.modules : maturity ? SUBJECT_LISTS.maturity : SUBJECT_LISTS.cfc}
                value={subject}
                onValueChange={setSubject}
                placeholder={modules ? 'Sélectionner un module' : 'Sélectionner une matière'}
                searchPlaceholder={modules ? 'Rechercher un module...' : 'Rechercher une matière...'}
              />
              <FieldError />
            </Field>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field data-invalid="false">
                <FieldLabel htmlFor="note">Note obtenue</FieldLabel>
                <StepperInput id="note" min={1} max={6} step={0.5} defaultValue={4.5} />
                <FieldDescription>De 1.0 à 6.0, par pas de 0.5</FieldDescription>
                <FieldError />
              </Field>
              <Field data-invalid="false">
                <FieldLabel htmlFor="date-month">Date du test</FieldLabel>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger id="date-month" className="flex-1">
                      <SelectValue placeholder="Mois" />
                    </SelectTrigger>
                    <SelectContent position="popper" align="start">
                      <SelectGroup>
                        {MONTHS.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input id="date-day" type="number" min={1} max={31} placeholder="Jour" className="w-20" />
                  <Input id="date-year" type="number" min={1900} max={2100} placeholder="Année" className="w-24" />
                </div>
                <FieldError />
              </Field>
            </div>

            {!modules && (
              <Field data-invalid="false">
                <FieldLabel>Justificatif</FieldLabel>
                <div className="mb-2 flex items-center gap-2">
                  <Switch id="is-oral" aria-label="Épreuve orale" checked={oral} onCheckedChange={setOral} />
                  <FieldLabel htmlFor="is-oral" className="font-normal">
                    Épreuve orale
                  </FieldLabel>
                </div>
                <Dropzone accept="application/pdf" hint="PDF uniquement, 10 Mo maximum" />
                <FieldError />
              </Field>
            )}
          </FieldGroup>
        </CardContent>
        <CardFooter className="gap-2 border-t">
          <Button type="submit">Enregistrer la note</Button>
          {cancel}
        </CardFooter>
      </Card>
    </form>
  )
}
