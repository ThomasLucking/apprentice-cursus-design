import { Link } from 'react-router'
import { FileX, Users } from '@/components/icons'
import { PageContainer, PageHeader } from '@/components/layout/page'
import { ShortcutGrid } from '@/components/layout/shortcut-card'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { USERS } from '@/data/app'

export function CoachHome() {
  return (
    <PageContainer size="lg">
      <PageHeader title={`Bonjour ${USERS.coach.firstName}`} description="Que souhaitez-vous faire aujourd'hui ?" />
      <ShortcutGrid
        items={[{ to: '/coach/apprentices', icon: Users, title: 'Apprentis', description: 'Suivez les notes et le portfolio de vos apprentis.' }]}
      />
    </PageContainer>
  )
}

export function GradeNotFound() {
  return (
    <PageContainer>
      <PageHeader breadcrumbs={[{ label: 'Carnet de notes', to: '/coach/apprentices' }]} title="Note introuvable" />
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileX />
          </EmptyMedia>
          <EmptyTitle>Aucune note ne correspond</EmptyTitle>
          <EmptyDescription>Cette note n'existe pas ou a été supprimée.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" asChild>
            <Link to="/coach/apprentices">Retour</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </PageContainer>
  )
}
