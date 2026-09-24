/* Grades of the signed-in apprentice, shared by Accueil (charts) and Carnet de notes.
   Rows are shaped like the tables in db_schema/db.mmd, and averages are derived the way the
   app does it: grades sit on leaf evaluation_nodes, parents take a weighted_average of their
   children (evaluation_node_connections.weight), then each node's rounding_step is applied
   to give the evaluation_results.rounded_value. */

export const SUBJECT_CATEGORIES: Record<number, string> = {
  1: 'Modules',
  2: 'CIE',
  3: 'Compétences élargies',
  4: 'Culture générale',
}

// subject_id → subject_category_id
const SUBJECTS: Record<number, number> = { 1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 3, 9: 3, 10: 4, 11: 4 }

export type EvaluationNode = {
  name: string
  aggregation: 'weighted_average' | null
  rounding_step?: number
  period_scope?: 'semester' | 'cursus'
  subject_id?: number
}

export const NODES: Record<number, EvaluationNode> = {
  1: { name: 'Note finale CFC', aggregation: 'weighted_average', rounding_step: 0.1, period_scope: 'cursus' },
  2: { name: 'TPI', aggregation: null, rounding_step: 0.5, period_scope: 'cursus' },
  3: { name: 'Compétences en informatique', aggregation: 'weighted_average', rounding_step: 0.5, period_scope: 'cursus' },
  4: { name: 'Compétences de base élargies', aggregation: 'weighted_average', rounding_step: 0.5, period_scope: 'cursus' },
  5: { name: 'Culture générale', aggregation: 'weighted_average', rounding_step: 0.5, period_scope: 'cursus' },
  6: { name: 'Modules école pro', aggregation: 'weighted_average', rounding_step: 0.5, period_scope: 'semester' },
  7: { name: 'Modules CIE', aggregation: 'weighted_average', rounding_step: 0.5, period_scope: 'semester' },
  10: { name: 'M114 — Codage et compression', subject_id: 1, aggregation: null },
  11: { name: 'M117 — Infrastructure réseau', subject_id: 2, aggregation: null },
  12: { name: 'M122 — Scripts shell', subject_id: 3, aggregation: null },
  13: { name: 'M164 — Bases de données', subject_id: 4, aggregation: null },
  14: { name: 'CIE 187 — Poste de travail', subject_id: 5, aggregation: null },
  15: { name: 'CIE 106 — Requêtes SQL', subject_id: 6, aggregation: null },
  16: { name: 'Mathématique', subject_id: 7, aggregation: null },
  17: { name: 'Anglais', subject_id: 8, aggregation: null },
  18: { name: 'Physique', subject_id: 9, aggregation: null },
  19: { name: 'Langue et communication', subject_id: 10, aggregation: null },
  20: { name: 'Société', subject_id: 11, aggregation: null },
}

// evaluation_node_connections: [parent_id, child_id, weight]
const CONNECTIONS: [number, number, number][] = [
  [1, 2, 40], [1, 3, 30], [1, 4, 10], [1, 5, 30],
  [3, 6, 80], [3, 7, 20],
  [6, 10, 1], [6, 11, 1], [6, 12, 1], [6, 13, 1],
  [7, 14, 1], [7, 15, 1],
  [4, 16, 1], [4, 17, 1], [4, 18, 1],
  [5, 19, 1], [5, 20, 1],
]

export type Grade = { id: number; evaluation_node_id: number; value: number; test_date: string; semester: number }

// value 1.0–6.0 (one decimal), semester derived from test_date
export const GRADES: Grade[] = [
  { id: 1, evaluation_node_id: 10, value: 5.2, test_date: '2025-09-18', semester: 1 },
  { id: 2, evaluation_node_id: 19, value: 5.5, test_date: '2025-10-02', semester: 1 },
  { id: 3, evaluation_node_id: 11, value: 4.6, test_date: '2025-10-22', semester: 1 },
  { id: 4, evaluation_node_id: 14, value: 5.4, test_date: '2025-11-20', semester: 1 },
  { id: 5, evaluation_node_id: 17, value: 3.6, test_date: '2025-12-10', semester: 1 },
  { id: 6, evaluation_node_id: 12, value: 4.1, test_date: '2026-01-15', semester: 1 },
  { id: 7, evaluation_node_id: 18, value: 4.0, test_date: '2026-01-29', semester: 1 },
  { id: 8, evaluation_node_id: 20, value: 5.8, test_date: '2026-02-12', semester: 2 },
  { id: 9, evaluation_node_id: 13, value: 5.3, test_date: '2026-03-05', semester: 2 },
  { id: 10, evaluation_node_id: 16, value: 6.0, test_date: '2026-03-12', semester: 2 },
  { id: 11, evaluation_node_id: 16, value: 5.5, test_date: '2026-04-02', semester: 2 },
  { id: 12, evaluation_node_id: 16, value: 4.4, test_date: '2026-05-14', semester: 2 },
  { id: 13, evaluation_node_id: 19, value: 5.1, test_date: '2026-06-04', semester: 2 },
  { id: 14, evaluation_node_id: 15, value: 4.8, test_date: '2026-06-18', semester: 2 },
  { id: 15, evaluation_node_id: 11, value: 5.6, test_date: '2026-09-10', semester: 3 },
  { id: 16, evaluation_node_id: 17, value: 4.5, test_date: '2026-09-17', semester: 3 },
]

// comments (commentable_type = Grade): commentable_id → count
export const GRADE_COMMENTS: Record<number, number> = { 15: 2, 5: 1, 13: 1 }

export const CURRENT_SEMESTER = 3
export const SEMESTERS = 8 // grades.semester CHECK 1..8
export const PASS = 4
export const DOMAIN_IDS = [2, 3, 4, 5]
export const FILTERS = [ // TPI is cursus-scoped, so it has no per-semester value
  { id: 1, label: 'Toutes' },
  { id: 3, label: 'Informatique' },
  { id: 4, label: 'Base élargies' },
  { id: 5, label: 'Culture générale' },
]

/* ── Aggregation (mirrors evaluation_results) ──────────────── */
export const children: Record<number, { id: number; weight: number }[]> = {}
CONNECTIONS.forEach(([parent, id, weight]) => {
  ;(children[parent] ??= []).push({ id, weight })
})

function roundTo(v: number, step?: number) {
  return step ? Math.round(v / step) * step : v
}

// Weighted average of a node over the given grades; null when nothing below it is graded.
export function nodeValue(id: number, grades: Grade[], round: boolean): number | null {
  const node = NODES[id]
  let v: number
  if (!node.aggregation) {
    const own = grades.filter((g) => g.evaluation_node_id === id)
    if (!own.length) return null
    v = own.reduce((s, g) => s + g.value, 0) / own.length
  } else {
    let sum = 0
    let w = 0
    for (const c of children[id] ?? []) {
      const cv = nodeValue(c.id, grades, false)
      if (cv !== null) {
        sum += cv * c.weight
        w += c.weight
      }
    }
    if (!w) return null
    v = sum / w
  }
  return round ? roundTo(v, node.rounding_step) : v
}

export function leavesOf(id: number): number[] {
  if (!NODES[id].aggregation) return [id]
  return (children[id] ?? []).flatMap((c) => leavesOf(c.id))
}

export function gradesUnder(id: number, grades: Grade[] = GRADES) {
  const leaves = leavesOf(id)
  return grades.filter((g) => leaves.includes(g.evaluation_node_id))
}

export function inSemester(s: number) {
  return GRADES.filter((g) => g.semester === s)
}

export function weightOf(parent: number, child: number) {
  return (children[parent] ?? []).find((c) => c.id === child)!.weight
}

export function categoryOf(nodeId: number) {
  return SUBJECT_CATEGORIES[SUBJECTS[NODES[nodeId].subject_id!]]
}

export type Status = 'good' | 'warn' | 'bad'

export function status(v: number): [Status, string] {
  const r = v / 6
  if (r >= 0.75) return ['good', 'Validé']
  if (r >= 4 / 6) return ['warn', 'Suffisant']
  return ['bad', 'À risque']
}

export const fmt = (n: number) => n.toFixed(1)
export const dateCH = (d: string) => d.split('-').reverse().join('.')
export const plural = (n: number, word: string) => `${n} ${word}${n > 1 ? 's' : ''}`

export const byDateDesc = (a: Grade, b: Grade) => (a.test_date < b.test_date ? 1 : -1)

// Only three demo detail pages exist; spread the grades over them.
export const detailId = (g: Grade) => ((g.id - 1) % 3) + 1
