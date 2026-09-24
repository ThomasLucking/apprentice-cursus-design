import { Link } from 'react-router'
import { AddGradeModal, ADD_GRADE_HASH } from '@/components/grades/add-grade-modal'
import { DistributionChart, DomainChart, SemesterChart } from '@/components/home/charts'
import { RecentGrades, StatTiles } from '@/components/home/stats'
import { ChartCard, HatchPattern } from '@/components/home/chart-parts'
import { BookOpen, CirclePlus, FolderKanban } from '@/components/icons'
import { PageContainer, PageTitle } from '@/components/layout/page'
import { ShortcutGrid } from '@/components/layout/shortcut-card'
import { USERS } from '@/data/app'
import { CURRENT_SEMESTER, SEMESTERS } from '@/data/grades'
import { useHashModal } from '@/hooks/use-hash-modal'

const SHORTCUTS = [
  { to: '/apprentice/grades', icon: BookOpen, title: 'Carnet de notes', description: 'Consultez les notes et les moyennes par domaine.' },
  { to: ADD_GRADE_HASH, icon: CirclePlus, title: 'Ajouter une note', description: 'Saisissez une nouvelle note et déposez le justificatif.' },
  { to: '/apprentice/portfolio', icon: FolderKanban, title: 'Portfolio', description: 'Gérez vos projets et exportez votre portfolio.' },
]

export function ApprenticeHome() {
  const [addGrade, setAddGrade] = useHashModal(ADD_GRADE_HASH)

  return (
    <PageContainer size="lg">
      <PageTitle
        className="home-hero"
        title={`Bonjour ${USERS.apprentice.firstName}`}
        description="Voici où vous en êtes dans votre formation."
        actions={
          <div className="home-hero__meta">
            <span className="pill">Filière <strong>IT</strong></span>
            <span className="pill">Variante <strong>standard</strong></span>
            <span className="pill">Semestre <strong>{`${CURRENT_SEMESTER} / ${SEMESTERS}`}</strong></span>
          </div>
        }
      />

      <StatTiles />

      <div className="chart-grid">
        <SemesterChart />
        <DomainChart
          link={
            <Link to="/apprentice/grades" className="chart-card__link">
              Voir le carnet de notes →
            </Link>
          }
        />
      </div>

      <div className="chart-grid">
        <DistributionChart />
        <ChartCard labelId="t-recent" title="Dernières notes" description="Les 5 plus récentes">
          <RecentGrades />
        </ChartCard>
      </div>

      <h2 className="section-title">Accès rapide</h2>
      <ShortcutGrid items={SHORTCUTS} />

      <HatchPattern />
      <AddGradeModal open={addGrade} onOpenChange={setAddGrade} />
    </PageContainer>
  )
}
