import { Link, useNavigate } from 'react-router'
import { Eye, FolderOpen, Plus } from '@/components/icons'
import { PageContainer, PageHeader } from '@/components/layout/page'
import { DeleteProjectDialog } from '@/components/portfolio/delete-project-dialog'
import { NEW_PROJECT_HASH, NewProjectModal } from '@/components/portfolio/new-project-modal'
import { ProjectForm } from '@/components/portfolio/project-form'
import { ProjectList } from '@/components/portfolio/project-list'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { EDITED_PROJECT, PROJECTS } from '@/data/app'
import { useHashModal } from '@/hooks/use-hash-modal'

function NewProjectButton() {
  return (
    <Button asChild>
      <Link to={NEW_PROJECT_HASH}>
        <Plus /> Nouveau projet
      </Link>
    </Button>
  )
}

/* Portfolio: draggable project list, or the empty state (`empty`). */
export function Portfolio({ empty = false }: { empty?: boolean }) {
  const [newProject, setNewProject] = useHashModal(NEW_PROJECT_HASH)

  return (
    <PageContainer>
      <PageHeader
        title="Portfolio"
        description="Glissez un projet pour changer son ordre d'affichage dans l'aperçu exportable."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/apprentice/portfolio/preview">
                <Eye /> Aperçu
              </Link>
            </Button>
            <NewProjectButton />
          </div>
        }
      />
      {empty ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderOpen />
            </EmptyMedia>
            <EmptyTitle>Aucun projet pour l'instant</EmptyTitle>
            <EmptyDescription>Ajoutez votre premier projet pour commencer à constituer votre portfolio de formation.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <NewProjectButton />
          </EmptyContent>
        </Empty>
      ) : (
        <ProjectList initial={PROJECTS} />
      )}
      <NewProjectModal open={newProject} onOpenChange={setNewProject} />
    </PageContainer>
  )
}

const portfolioCrumb = [{ label: 'Portfolio', to: '/apprentice/portfolio' }]

/* Full-page forms: "Nouveau projet" (legacy) and "Modifier un projet". */
export function ProjectPage({ edit = false }: { edit?: boolean }) {
  const navigate = useNavigate()
  const back = () => navigate('/apprentice/portfolio')
  const project = edit ? EDITED_PROJECT : undefined

  return (
    <PageContainer size="sm">
      <PageHeader breadcrumbs={portfolioCrumb} title={project?.title ?? 'Nouveau projet'} />
      <ProjectForm
        project={project}
        onSubmit={back}
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/apprentice/portfolio">Annuler</Link>
            </Button>
            {project && <DeleteProjectDialog title={project.title} onConfirm={back} />}
          </>
        }
      />
    </PageContainer>
  )
}
