import { AddGradeForm } from '@/components/grades/add-grade-form'
import { Modal } from '@/components/feedback/modal'
import { useToast } from '@/components/feedback/toast'
import { Button } from '@/components/ui/button'

export const ADD_GRADE_HASH = '#ajouter-une-note'

export function AddGradeModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const toast = useToast()
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Ajouter une note"
      focusFirstField={false}
      description="Renseignez les informations de la note pour l'ajouter à votre dossier."
    >
      <AddGradeForm
        onSubmit={() => {
          onOpenChange(false)
          toast('Note enregistrée')
        }}
        cancel={
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
        }
      />
    </Modal>
  )
}
