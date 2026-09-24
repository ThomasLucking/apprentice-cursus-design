import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import { DataTable, type Column } from '@/components/coach/data-table'
import { Assignment } from '@/components/coach/score'
import { SearchInput } from '@/components/forms/controls'
import { GradeDetail } from '@/components/grades/grade-detail'
import { DetailItem, PageContainer, PageHeader, PageTitle } from '@/components/layout/page'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card, CardAction, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { APPRENTICES, DOMAIN_TOTALS, GRADE_GROUPS, TESTS, type GradeGroup } from '@/data/app'
import { cn } from '@/lib/utils'

function useApprentice() {
  const { apprenticeId } = useParams()
  return APPRENTICES.find((a) => String(a.id) === apprenticeId)
}

type Test = (typeof TESTS)[number]

const TEST_COLUMNS: Column<Test>[] = [
  { header: 'Module', headClassName: 'w-[30%]', className: 'font-medium', cell: (t) => t.title },
  { header: 'Matière', headClassName: 'w-[30%]', cell: (t) => t.subject },
  { header: 'Note', headClassName: 'w-[12%]', className: 'font-semibold tabular-nums', cell: (t) => t.value },
  { header: 'Semestre', headClassName: 'w-[12%]', cell: (t) => t.semester },
  { header: 'Date', className: 'tabular-nums', cell: (t) => t.date },
]

/* Collapsible domain groups (all closed at first); nested levels are indented. */
function GradeGroups({ groups, nested = false, visible, onOpen }: { groups: GradeGroup[]; nested?: boolean; visible: (t: Test) => boolean; onOpen: (t: Test) => void }) {
  return (
    <Accordion type="multiple" className={nested ? 'ml-2 border-l pl-4' : undefined}>
      {groups.map((g) => (
        <AccordionItem key={g.name} value={g.name}>
          <AccordionTrigger className={cn('flex-row-reverse justify-end gap-2 hover:no-underline', nested ? 'text-sm' : 'text-base font-semibold')}>
            {g.name}
          </AccordionTrigger>
          <AccordionContent>
            {g.children ? (
              <GradeGroups groups={g.children} nested visible={visible} onOpen={onOpen} />
            ) : (
              <DataTable columns={TEST_COLUMNS} rows={TESTS} visible={visible} rowKey={(t) => t.id} onRowClick={onOpen} empty="Aucune note trouvée." />
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function CoachApprentice() {
  const apprentice = useApprentice()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  if (!apprentice) return <Navigate to="/coach/apprentices" replace />

  const q = search.trim().toLowerCase()
  const visible = (t: Test) => `${t.title} ${t.subject}`.toLowerCase().includes(q)

  return (
    <PageContainer size="lg">
      <PageHeader
        breadcrumbs={[{ label: 'Apprentis', to: '/coach/apprentices' }]}
        title={apprentice.name}
        description={`${apprentice.track} · ${apprentice.year} année`}
      >
        <div className="mt-2 grid max-w-sm grid-cols-2 gap-4">
          <DetailItem label="Coach">
            <Assignment name={apprentice.coach} />
          </DetailItem>
          <DetailItem label="Formateur">
            <Assignment name={apprentice.trainer} />
          </DetailItem>
        </div>
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DOMAIN_TOTALS.map(([label, weight, value], i) => (
          <Card key={label} className={cn('gap-2', i === 0 && 'sm:col-span-2 lg:col-span-full')}>
            <CardHeader>
              <CardDescription className="line-clamp-2 min-h-10">{label}</CardDescription>
              <CardAction>
                <Badge variant="secondary">{weight}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tabular-nums">{value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <PageTitle
          as="h2"
          className="flex flex-wrap items-center justify-between gap-4"
          title="Notes"
          actions={
            <div className="flex items-center gap-2">
              <SearchInput label="Rechercher une note" value={search} onChange={setSearch} className="sm:w-64" />
            </div>
          }
        />
        <GradeGroups groups={GRADE_GROUPS} visible={visible} onOpen={(t) => navigate(`/coach/apprentices/${apprentice.id}/grades/${t.id}`)} />
      </section>
    </PageContainer>
  )
}

export function CoachGrade() {
  const apprentice = useApprentice()
  const { gradeId } = useParams()
  const test = TESTS.find((t) => String(t.id) === gradeId)
  if (!apprentice || !test) return <Navigate to="/coach/grade-not-found" replace />
  return (
    <GradeDetail
      test={test}
      breadcrumbs={[
        { label: 'Apprentis', to: '/coach/apprentices' },
        { label: apprentice.name, to: `/coach/apprentices/${apprentice.id}` },
      ]}
    />
  )
}
