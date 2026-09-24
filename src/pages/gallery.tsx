import { Link } from 'react-router'
import { useTheme } from '@/hooks/use-theme'

type Screen = [name: string, to: string, reference: string | null]

const SECTIONS: [string, Screen[]][] = [
  ['Authentification', [['Connexion', '/login', 'login']]],
  [
    'Apprenti·e',
    [
      ['Accueil', '/apprentice', 'home'],
      ['Carnet de notes', '/apprentice/grades', 'grades-dashboard'],
      ['Ajouter une note (modale)', '/apprentice/grades#ajouter-une-note', 'grades-create'],
      ['Détail d’une note', '/apprentice/grades/1', 'grade-details'],
      ['Portfolio', '/apprentice/portfolio', 'portfolio'],
      ['Portfolio vide', '/apprentice/portfolio/empty', 'portfolio-empty'],
      ['Nouveau projet (modale)', '/apprentice/portfolio#nouveau-projet', 'portfolio-project-create'],
      ['Modifier un projet', '/apprentice/portfolio/edit', 'portfolio-project-edit'],
      ['Aperçu du portfolio', '/apprentice/portfolio/preview', 'portfolio-preview'],
    ],
  ],
  [
    'Coach · formateur·rice · admin',
    [
      ['Accueil', '/coach', 'home-coach'],
      ['Apprentis', '/coach/apprentices', 'apprentices'],
      ['Fiche apprenti·e', '/coach/apprentices/1', 'apprentice-show'],
      ['Note d’un·e apprenti·e', '/coach/apprentices/1/grades/1', 'apprentice-grade'],
      ['Note introuvable', '/coach/grade-not-found', null],
    ],
  ],
  [
    'Overlays & mobile',
    [
      ['Fiche latérale apprenti·e', '/coach/apprentices', 'apprentice-sheet'],
      ['Suppression d’un projet', '/apprentice/portfolio/edit', 'delete-dialog'],
      ['Combobox des matières', '/apprentice#ajouter-une-note', 'grade-combobox'],
      ['Select des mois', '/apprentice#ajouter-une-note', 'month-select'],
      ['Mobile — accueil', '/apprentice', 'mobile-home'],
      ['Mobile — menu', '/apprentice', 'mobile-menu'],
      ['Thème clair', '/apprentice', 'home-light'],
    ],
  ],
]

/* Index of every screen, with screenshots of the original app. */
export function Gallery() {
  const { toggle } = useTheme()
  return (
    <main className="mx-auto max-w-7xl px-4 pt-8 pb-16">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.035em]">Apprentice Cursus — designs</h1>
          <p className="text-muted-foreground mt-1 max-w-[40rem] text-sm">
            A pixel-identical React + shadcn/ui copy of every screen in the app. Thumbnails are screenshots of the original app.
          </p>
        </div>
        <button
          type="button"
          onClick={toggle}
          className="bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 cursor-pointer items-center rounded-md border px-4 text-sm font-medium"
        >
          Thème clair / sombre
        </button>
      </header>
      {SECTIONS.map(([title, screens]) => (
        <section key={title}>
          <h2 className="mt-10 mb-4 text-lg font-semibold tracking-[-0.035em]">{title}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
            {screens.map(([name, to, ref]) => (
              <Link
                key={name}
                to={to}
                className="bg-card hover:border-primary/50 flex flex-col overflow-hidden rounded-xl border shadow-sm transition-colors"
              >
                {ref && (
                  <img loading="lazy" alt="" src={`/reference/${ref}.png`} className="bg-muted aspect-[16/10] w-full border-b object-cover object-top" />
                )}
                <div className="px-4 py-3">
                  <div className="text-sm font-medium">{name}</div>
                  <div className="text-muted-foreground mt-0.5 font-mono text-xs">{to}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
