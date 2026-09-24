import { AddGradeModal, ADD_GRADE_HASH } from '@/components/grades/add-grade-modal'
import { GradebookSummary, GradeList } from '@/components/grades/gradebook'
import { Plus } from '@/components/icons'
import { PageContainer, PageTitle } from '@/components/layout/page'
import { Button } from '@/components/ui/button'
import { useHashModal } from '@/hooks/use-hash-modal'

export function GradesDashboard() {
  const [addGrade, setAddGrade] = useHashModal(ADD_GRADE_HASH)

  return (
    <PageContainer size="lg">
      <PageTitle
        className="flex flex-wrap items-end justify-between gap-4"
        title="Carnet de notes"
        description="Vos notes et vos moyennes par domaine, pondérées comme pour le CFC."
        actions={
          <Button onClick={() => setAddGrade(true)}>
            <Plus /> Ajouter une note
          </Button>
        }
      />
      <GradebookSummary />
      <GradeList />
      <AddGradeModal open={addGrade} onOpenChange={setAddGrade} />
    </PageContainer>
  )
}
