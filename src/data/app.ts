/* Demo content of the other screens: users, notifications, apprentices, grade tests,
   comments, portfolio and form options. */

export type Role = 'apprentice' | 'coach'

export const USERS: Record<Role, { firstName: string; name: string; initials: string; role: string }> = {
  apprentice: { firstName: 'Test', name: 'Test User', initials: 'TU', role: 'Apprenti·e' },
  coach: { firstName: 'Local', name: 'Local Admin', initials: 'LA', role: 'Super-administrateur·rice' },
}

export const NOTIFICATIONS = [
  { initials: 'MD', author: 'Marc Dubois', role: 'Coach', action: 'a commenté votre note', subject: 'M117 — Épreuve pratique, base de données', date: '16.09.2026', unread: true },
  { initials: 'SM', author: 'Sylvie Meier', role: 'Formateur', action: 'a commenté votre note', subject: 'M117 — Épreuve pratique, base de données', date: '15.09.2026', unread: true },
  { initials: 'MD', author: 'Marc Dubois', role: 'Coach', action: 'a commenté votre projet', subject: 'Application de gestion de stock', date: '26.08.2026', unread: false },
  { initials: 'SM', author: 'Sylvie Meier', role: 'Formateur', action: 'a commenté votre note', subject: "TPA — Travail Personnel d'Approfondissement", date: '15.08.2026', unread: false },
]

/* ── Coach side ─────────────────────────────────────────────── */
export type Apprentice = {
  id: number
  name: string
  initials: string
  track: 'IT' | 'EC'
  year: '1ère' | '2ème' | '3ème' | '4ème'
  coach: string | null
  trainer: string | null
}

export const APPRENTICES: Apprentice[] = [
  { id: 1, name: 'Léa Dubois', initials: 'LD', track: 'IT', year: '1ère', coach: 'Marc Lefevre', trainer: 'Sophie Renard' },
  { id: 2, name: 'Nathan Girard', initials: 'NG', track: 'IT', year: '2ème', coach: null, trainer: 'Sophie Renard' },
  { id: 3, name: 'Camille Petit', initials: 'CP', track: 'EC', year: '1ère', coach: 'Julien Blanc', trainer: null },
  { id: 4, name: 'Hugo Moreau', initials: 'HM', track: 'EC', year: '3ème', coach: 'Julien Blanc', trainer: 'Claire Fontaine' },
  { id: 5, name: 'Manon Rousseau', initials: 'MR', track: 'IT', year: '3ème', coach: null, trainer: null },
  { id: 6, name: 'Théo Simon', initials: 'TS', track: 'IT', year: '4ème', coach: 'Marc Lefevre', trainer: 'Claire Fontaine' },
  { id: 7, name: 'Chloé Laurent', initials: 'CL', track: 'EC', year: '2ème', coach: 'Julien Blanc', trainer: 'Sophie Renard' },
  { id: 8, name: 'Lucas Michel', initials: 'LM', track: 'EC', year: '4ème', coach: null, trainer: 'Claire Fontaine' },
]

export const TRACKS = ['IT', 'EC'] as const
export const YEARS = ['1ère', '2ème', '3ème', '4ème'] as const

// Averages per branch shown in the apprentice sheet (same demo data for everyone).
export const BRANCHES = [
  { name: 'Programmation', last: '3 sept.', value: 4.8 },
  { name: 'Réseaux & systèmes', last: '28 août', value: 3.1 },
  { name: 'Base de données', last: '20 août', value: 5.6 },
  { name: 'Anglais technique', last: '12 août', value: 2.3 },
  { name: 'Gestion de projet', last: '5 août', value: 4.2 },
  { name: 'Culture générale', last: '30 juil.', value: 1.4 },
]

// Domain totals on an apprentice's page: [label, weight, value].
export const DOMAIN_TOTALS: [string, string, string][] = [
  ['Note finale CFC', '100%', '5.0'],
  ['TPI', '40%', '5.0'],
  ['Compétences en informatique', '30%', '5.0'],
  ['Compétences de base élargies', '10%', '4.5'],
  ['Culture générale', '30%', '5.5'],
]

// Accordion groups of an apprentice's gradebook; each leaf lists the demo tests.
export type GradeGroup = { name: string; children?: GradeGroup[] }
export const GRADE_GROUPS: GradeGroup[] = [
  { name: 'Compétences en informatique', children: [{ name: 'Modules école pro' }, { name: 'Modules CIE' }] },
  { name: 'Compétences de base élargies' },
  { name: 'Culture générale' },
  { name: 'TPI' },
]

/* ── Grade detail (Test 1..3) ───────────────────────────────── */
export const TESTS = [
  { id: 1, title: 'Test 1', subject: 'Mathématique', semester: 1, value: '6.0', date: '12.03.2026' },
  { id: 2, title: 'Test 2', subject: 'Mathématique', semester: 1, value: '5.5', date: '02.04.2026' },
  { id: 3, title: 'Test 3', subject: 'Mathématique', semester: 2, value: '4.5', date: '14.05.2026' },
]

export const COMMENT_ROLES = {
  Coach: { dot: 'bg-info', text: 'text-info' },
  Formateur: { dot: 'bg-success', text: 'text-success' },
  Apprenti: { dot: 'bg-warning', text: 'text-warning' },
}

export const COMMENTS: { author: string; role: keyof typeof COMMENT_ROLES; date: string; body: string }[] = [
  { author: 'Marc Dubois', role: 'Coach', date: '15.11.2025', body: 'Bon résultat sur la partie pratique. Pour le prochain test, revois la gestion des transactions et les jointures multiples.' },
  { author: 'Sylvie Meier', role: 'Formateur', date: '17.11.2025', body: "Vu en cours la semaine prochaine — on reprendra l'exercice 4 ensemble." },
]

/* ── Portfolio ──────────────────────────────────────────────── */
export type Project = {
  id: number
  title: string
  organization: string
  responsibilities: string
  period: string
  dateStart: string
  dateEnd: string
  description: string
  technologies: string[]
  repositoryUrl: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Script de sauvegarde automatisée',
    organization: '',
    responsibilities: 'Écriture du script et documentation',
    period: 'Février 2026 – en cours',
    dateStart: '2026-02-01',
    dateEnd: '',
    description: 'Script planifié qui sauvegarde les serveurs de fichiers vers un stockage distant.',
    technologies: ['Bash', 'Docker'],
    repositoryUrl: '',
  },
  {
    id: 2,
    title: 'Application de gestion de stock',
    organization: 'Jobtrek SA',
    responsibilities: 'Conception de la base de données, API REST, interface Vue',
    period: 'Septembre 2025 – Janvier 2026',
    dateStart: '2025-09-01',
    dateEnd: '2026-01-31',
    description: 'Application web interne pour suivre les entrées et sorties de matériel informatique.',
    technologies: ['Laravel', 'Vue', 'PostgreSQL'],
    repositoryUrl: 'https://github.com/example/stock',
  },
  {
    id: 3,
    title: 'Site vitrine pour une association',
    organization: 'Association Les Amis du Lac',
    responsibilities: 'Maquettes, intégration HTML/CSS, déploiement',
    period: 'Mars 2025 – Juin 2025',
    dateStart: '2025-03-01',
    dateEnd: '2025-06-30',
    description: 'Site statique responsive présentant les activités et le calendrier de l association.',
    technologies: ['HTML', 'Tailwind', 'Netlify'],
    repositoryUrl: '',
  },
]

/** "Organisation · période" (+ " · rôle" on the printable preview). */
export function projectMeta(p: Project, withRole: boolean) {
  return [p.organization, p.period, withRole && p.responsibilities].filter(Boolean).join(' · ')
}

// The edit screen of the original app shows this project.
export const EDITED_PROJECT = PROJECTS[1]

export const SKILLS = [
  'Assurance qualité',
  'Bases de données',
  'Cloud & infrastructure',
  'Développement web',
  'Gestion de projet',
  'Sécurité informatique',
  'Travail en équipe',
]

/* ── "Ajouter une note" options ─────────────────────────────── */
export const SUBJECT_LISTS = {
  cfc: ['ECG', 'Mathématique', 'Anglais'],
  maturity: ['Francais', 'Mathématique', 'Allemand', 'Histoire', 'Anglais', 'Economie & droit'],
  modules: [
    'M114 — Codage et compression',
    'M117 — Infrastructure réseau',
    'M122 — Scripts shell',
    'M164 — Bases de données',
    'CIE 187 — Poste de travail',
    'CIE 106 — Requêtes SQL',
  ],
}

export const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
]
