import type { ReactNode } from 'react'
import { CommentCount, StatusChip } from '@/components/grades/status'
import {
  byDateDesc,
  categoryOf,
  CURRENT_SEMESTER,
  dateCH,
  fmt,
  GRADE_COMMENTS,
  GRADES,
  inSemester,
  NODES,
  nodeValue,
  PASS,
} from '@/data/grades'

function Stat({ label, value, foot }: { label: string; value: ReactNode; foot: ReactNode }) {
  return (
    <div className="stat">
      <span className="stat__label">{label}</span>
      <span className="stat__value">{value}</span>
      <span className="stat__foot">{foot}</span>
    </div>
  )
}

export function StatTiles() {
  const final = nodeValue(1, GRADES, true)!
  const cur = nodeValue(1, inSemester(CURRENT_SEMESTER), true)!
  const prev = nodeValue(1, inSemester(CURRENT_SEMESTER - 1), true)!
  const delta = cur - prev
  const failed = GRADES.filter((g) => g.value < PASS).length

  return (
    <section className="stat-grid" aria-label="Statistiques">
      <Stat
        label="Note finale CFC"
        value={<>{fmt(final)} <small>/ 6</small></>}
        foot={<><StatusChip value={final} />provisoire, sans TPI</>}
      />
      <Stat
        label={`Moyenne du semestre ${CURRENT_SEMESTER}`}
        value={fmt(cur)}
        foot={
          Math.abs(delta) < 0.05 ? (
            `stable par rapport au semestre ${CURRENT_SEMESTER - 1}`
          ) : (
            <>
              <span className={delta > 0 ? 'delta-up' : 'delta-down'}>{(delta > 0 ? '+' : '−') + fmt(Math.abs(delta))}</span>
              {`vs semestre ${CURRENT_SEMESTER - 1}`}
            </>
          )
        }
      />
      <Stat label="Notes saisies" value={GRADES.length} foot={`${inSemester(CURRENT_SEMESTER).length} ce semestre`} />
      <Stat label="Notes insuffisantes" value={failed} foot={`sur ${GRADES.length} notes, seuil 4.0`} />
    </section>
  )
}

export function RecentGrades() {
  const recent = [...GRADES].sort(byDateDesc).slice(0, 5)
  return (
    <ul className="recent" id="recent-grades">
      {recent.map((g) => (
        <li key={g.id}>
          <span className={g.value < PASS ? 'recent__grade is-fail' : 'recent__grade'}>{fmt(g.value)}</span>
          <span className="recent__main">
            <span className="recent__title">{NODES[g.evaluation_node_id].name}</span>
            <span className="recent__meta">{`${categoryOf(g.evaluation_node_id)} · S${g.semester} · ${dateCH(g.test_date)}`}</span>
          </span>
          <CommentCount count={GRADE_COMMENTS[g.id] ?? 0} className="recent__comments" />
        </li>
      ))}
    </ul>
  )
}
