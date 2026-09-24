import { DetailItem, PageContainer, PageHeader, PageTitle, type Crumb } from '@/components/layout/page'
import { Card, CardContent } from '@/components/ui/card'
import { COMMENT_ROLES, COMMENTS, TESTS } from '@/data/app'

/* Grade detail: stat card, PDF of the test and the comment timeline. */
export function GradeDetail({ test, breadcrumbs }: { test: (typeof TESTS)[number]; breadcrumbs: Crumb[] }) {
  return (
    <PageContainer>
      <PageHeader breadcrumbs={breadcrumbs} title={test.title} description={`${test.subject} · Semestre ${test.semester}`} />
      <Card>
        <CardContent className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          <DetailItem label="Note">
            <p className="text-3xl font-semibold tabular-nums">{test.value}</p>
          </DetailItem>
          <DetailItem label="Date du test">{test.date}</DetailItem>
          <DetailItem label="Matière">{test.subject}</DetailItem>
        </CardContent>
      </Card>
      <Card className="overflow-hidden py-0">
        <div className="bg-muted flex h-[70vh] justify-center overflow-auto">
          <embed src="/demo/sample-grade-test.pdf" type="application/pdf" className="size-full" />
        </div>
      </Card>
      <section className="flex flex-col gap-4">
        <PageTitle as="h2" className="flex flex-wrap items-center justify-between gap-4" title="Commentaires" />
        <div className="relative flex flex-col">
          <div className="bg-border absolute inset-y-2 left-[5px] w-px" />
          {COMMENTS.map((c) => (
            <div key={c.author} className="relative flex flex-col gap-1 py-4 pl-6 first:pt-0 last:pb-0">
              <span className={`${COMMENT_ROLES[c.role].dot} absolute top-1.5 left-0 size-2.5 rounded-full`} />
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{c.author}</p>
                <p className="text-muted-foreground text-xs">{c.date}</p>
              </div>
              <p className={`${COMMENT_ROLES[c.role].text} text-sm font-medium`}>{c.role}</p>
              <p className="text-sm">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">Seuls les coachs et formateurs peuvent commenter cette évaluation.</p>
      </section>
    </PageContainer>
  )
}
