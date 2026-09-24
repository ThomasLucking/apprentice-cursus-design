import { Modal } from '@/components/feedback/modal'
import { useToast } from '@/components/feedback/toast'
import { ProjectForm } from '@/components/portfolio/project-form'
import { Button } from '@/components/ui/button'

export const NEW_PROJECT_HASH = '#nouveau-projet'

export function NewProjectModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const toast = useToast()
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="lg"
      title="Nouveau projet"
      description="Décrivez le projet tel qu’il apparaîtra dans votre portfolio."
    >
      <ProjectForm
        onSubmit={() => {
          onOpenChange(false)
          toast('Projet enregistré')
        }}
        actions={
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
        }
      />
    </Modal>
  )
}
