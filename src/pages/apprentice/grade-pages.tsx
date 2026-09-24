import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { AddGradeForm, type GradeMode } from '@/components/grades/add-grade-form'
import { GradeDetail } from '@/components/grades/grade-detail'
import { PageContainer, PageHeader } from '@/components/layout/page'
import { Button } from '@/components/ui/button'
import { TESTS } from '@/data/app'

export function ApprenticeGrade() {
  const { gradeId } = useParams()
  const test = TESTS.find((t) => String(t.id) === gradeId)
  if (!test) return <Navigate to="/apprentice/grades" replace />
  return <GradeDetail test={test} breadcrumbs={[{ label: 'Carnet de notes', to: '/apprentice/grades' }]} />
}

const CREATE_PATHS: Record<GradeMode, string> = {
  notes: '/apprentice/grades/create',
  modules: '/apprentice/grades/create/modules',
}

/* Legacy full-page "Ajouter une note" (the modal replaced it in the nav). */
export function GradeCreate({ mode }: { mode: GradeMode }) {
  const navigate = useNavigate()
  return (
    <PageContainer size="sm">
      <PageHeader title="Ajouter une note" description="Renseignez les informations de la note pour l'ajouter au dossier de l'apprenti·e." />
      <AddGradeForm
        key={mode}
        mode={mode}
        onModeChange={(next) => navigate(CREATE_PATHS[next])}
        onSubmit={() => navigate('/apprentice/grades')}
        cancel={
          <Button variant="outline" asChild>
            <Link to="/apprentice/grades">Annuler</Link>
          </Button>
        }
      />
    </PageContainer>
  )
}
