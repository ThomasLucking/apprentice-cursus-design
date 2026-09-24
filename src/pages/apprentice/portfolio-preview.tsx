import { Link } from 'react-router'
import { ChevronLeft, ExternalLink, FileText } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { PROJECTS, projectMeta, USERS } from '@/data/app'

/* Printable A4-style sheet; always light, "Exporter en PDF" prints it. */
export function PortfolioPreview() {
  return (
    <div className="bg-muted/40 min-h-svh">
      <header className="bg-background sticky top-0 z-10 flex items-center justify-between gap-4 border-b px-6 py-3 print:hidden">
        <Link className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm" to="/apprentice/portfolio">
          <ChevronLeft className="size-4" /> Retour au portfolio
        </Link>
        <Button onClick={() => window.print()}>
          <FileText /> Exporter en PDF
        </Button>
      </header>
      <main className="mx-auto my-10 max-w-3xl bg-white p-12 text-neutral-900 shadow-sm print:my-0 print:max-w-none print:px-0 print:shadow-none">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{USERS.apprentice.name}</h1>
          <p className="text-sm text-neutral-500">Portfolio de projets</p>
        </div>
        {PROJECTS.map((p) => (
          <article key={p.id} className="mt-8 break-inside-avoid border-t border-neutral-200 pt-8">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="mt-1 text-sm text-neutral-500">{projectMeta(p, true)}</p>
            <p className="mt-3 text-sm/relaxed">{p.description}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {p.technologies.map((t) => (
                <li key={t} className="rounded-sm border border-neutral-200 px-2 py-0.5 text-xs">
                  {t}
                </li>
              ))}
            </ul>
            {p.repositoryUrl && (
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <a href={p.repositoryUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 underline-offset-4 hover:underline">
                  <ExternalLink className="size-3.5" /> Code source
                </a>
              </div>
            )}
            <ul className="mt-4 flex flex-wrap gap-1.5" />
          </article>
        ))}
      </main>
    </div>
  )
}
