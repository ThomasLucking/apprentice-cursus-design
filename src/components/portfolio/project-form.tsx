import type { ComponentProps, FormEvent, ReactNode } from 'react'
import { ChipsInput, FileButton } from '@/components/forms/controls'
import { Plus } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { SKILLS, type Project } from '@/data/app'

function TextField({ id, label, ...input }: { id: string; label: string } & ComponentProps<typeof Input>) {
  return (
    <Field data-invalid="false">
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input id={id} name={id} aria-invalid="false" {...input} />
      <FieldError />
    </Field>
  )
}

/* Portfolio project form ("Nouveau projet" modal/page, "Modifier" page). */
export function ProjectForm({ project, onSubmit, actions }: { project?: Project; onSubmit: () => void; actions: ReactNode }) {
  function submit(e: FormEvent) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form noValidate onSubmit={submit}>
      <Card>
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Informations générales</FieldLegend>
              <TextField id="title" label="Titre du projet" required defaultValue={project?.title} />
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField id="organization" label="Entreprise" defaultValue={project?.organization} />
                <TextField id="responsibilities" label="Rôle" defaultValue={project?.responsibilities} />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField id="date_start" label="Date de début" type="date" required defaultValue={project?.dateStart} />
                <TextField id="date_end" label="Date de fin" type="date" defaultValue={project?.dateEnd} />
              </div>
              <Field data-invalid="false">
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea id="description" name="description" rows={4} required aria-invalid="false" defaultValue={project?.description} />
                <FieldError />
              </Field>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Technique</FieldLegend>
              <Field data-invalid="false">
                <FieldLabel htmlFor="technology-draft">Technologies</FieldLabel>
                <ChipsInput id="technology-draft" defaultValue={project?.technologies ?? []} placeholder="Ajouter une technologie…" />
                <FieldError />
                <FieldDescription>Validez avec Entrée ou une virgule.</FieldDescription>
              </Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField id="demo_path" label="Lien de démonstration" type="url" placeholder="https://" />
                <TextField id="repository_url" label="Lien du code source" type="url" placeholder="https://" defaultValue={project?.repositoryUrl} />
              </div>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Captures d'écran</FieldLegend>
              <Field data-invalid="false">
                <FileButton accept="image/*" label="Ajouter une capture d'écran">
                  <Plus className="size-5" />
                </FileButton>
                <FieldError />
                <FieldDescription>Images uniquement, 5 Mo maximum par fichier, 10 captures au plus.</FieldDescription>
              </Field>
            </FieldSet>
            <FieldSeparator />
            <FieldSet>
              <FieldLegend>Compétences démontrées</FieldLegend>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <Toggle
                    key={skill}
                    variant="outline"
                    size="sm"
                    className="data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
                  >
                    {skill}
                  </Toggle>
                ))}
              </div>
              <FieldError />
            </FieldSet>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-wrap gap-2 border-t">
          <Button type="submit">Enregistrer le projet</Button>
          {actions}
        </CardFooter>
      </Card>
    </form>
  )
}
