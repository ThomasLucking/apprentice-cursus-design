import { Fragment, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router'
import { Segmented } from '@/components/home/chart-parts'
import { CountUp } from '@/components/home/count-up'
import { CommentCount, StatusChip } from '@/components/grades/status'
import { GlyphChevronDown, GlyphChevronRight, GlyphSearch } from '@/components/icons'
import {
  byDateDesc,
  categoryOf,
  children,
  dateCH,
  detailId,
  DOMAIN_IDS,
  fmt,
  GRADE_COMMENTS,
  GRADES,
  gradesUnder,
  NODES,
  nodeValue,
  PASS,
  plural,
  weightOf,
  type Grade,
} from '@/data/grades'

/* ── Summary: final grade gauge + domain cards ─────────────── */

// 270° gauge, like the app's ScoreGauge, with a tick at the pass mark.
function FinalGauge({ value }: { value: number }) {
  const r = 52
  const c = 2 * Math.PI * r
  const arc = c * 0.75
  const fill = arc * Math.max(0, Math.min(1, (value - 1) / 5))
  const a = ((135 + (270 * (PASS - 1)) / 5) * Math.PI) / 180
  return (
    <svg className="gb-gauge" viewBox="0 0 128 128" aria-hidden="true">
      <circle cx="64" cy="64" r={r} className="gb-gauge__track" strokeDasharray={`${arc} ${c}`} transform="rotate(135 64 64)" />
      <circle cx="64" cy="64" r={r} className="gb-gauge__fill" strokeDasharray={`${fill} ${c}`} transform="rotate(135 64 64)" />
      <line x1={64 + 44 * Math.cos(a)} y1={64 + 44 * Math.sin(a)} x2={64 + 60 * Math.cos(a)} y2={64 + 60 * Math.sin(a)} className="gb-gauge__tick" />
    </svg>
  )
}

export function GradebookSummary() {
  const final = nodeValue(1, GRADES, true)!
  return (
    <section className="gb-summary" id="gb-summary" aria-label="Moyennes">
      <article className="gb-final">
        <div className="gb-final__head">
          <h2 className="gb-card-title">Note finale CFC</h2>
          <StatusChip value={final} />
        </div>
        <div className="gb-final__gauge">
          <FinalGauge value={final} />
          <div className="gb-final__value">
            <span><CountUp value={final} format={fmt} /></span>
            <small>sur 6</small>
          </div>
        </div>
        <p className="gb-final__note">Provisoire : moyenne pondérée des domaines déjà notés. Le TPI compte pour 40 % une fois évalué.</p>
      </article>
      <div className="gb-domains">
        {DOMAIN_IDS.map((id, i) => {
          const v = nodeValue(id, GRADES, true)
          const n = gradesUnder(id).length
          return (
            <article key={id} className="gb-domain">
              <div className="gb-domain__head">
                <h3 className="gb-domain__name">{NODES[id].name}</h3>
                <span className="gb-weight">{`${weightOf(1, id)} %`}</span>
              </div>
              {v === null ? (
                <>
                  <p className="gb-domain__value is-empty">—</p>
                  <div className="gb-meter">
                    <span className="gb-meter__tick" />
                  </div>
                  <p className="gb-domain__foot">Pas encore évalué</p>
                </>
              ) : (
                <>
                  <p className="gb-domain__value"><CountUp value={v} format={fmt} /></p>
                  <div className="gb-meter" role="img" aria-label={`${fmt(v)} sur 6`}>
                    <span className={v < PASS ? 'gb-meter__bar is-fail' : 'gb-meter__bar'} style={{ width: `${(v / 6) * 100}%`, '--i': i } as CSSProperties} />
                    <span className="gb-meter__tick" />
                  </div>
                  <p className="gb-domain__foot">
                    <StatusChip value={v} />
                    {plural(n, 'note')}
                  </p>
                </>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}

/* ── Grade list, grouped by domain, with search and semester filter ── */

function GradeTable({ grades }: { grades: Grade[] }) {
  const navigate = useNavigate()
  return (
    <div className="gb-table-wrap">
      <table className="gb-table">
        <thead>
          <tr>
            <th>Évaluation</th>
            <th className="gb-col-cat">Catégorie</th>
            <th className="gb-col-sem">Semestre</th>
            <th className="gb-col-date">Date</th>
            <th className="gb-col-grade">Note</th>
            <th className="gb-col-go">
              <span className="sr-only">Ouvrir</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...grades].sort(byDateDesc).map((g) => {
            const open = () => navigate(`/apprentice/grades/${detailId(g)}`)
            return (
              <tr
                key={g.id}
                tabIndex={0}
                onClick={open}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    open()
                  }
                }}
              >
                <td>
                  <span className="gb-subject">{NODES[g.evaluation_node_id].name}</span>
                  <CommentCount count={GRADE_COMMENTS[g.id] ?? 0} className="gb-comments" />
                </td>
                <td className="gb-col-cat">{categoryOf(g.evaluation_node_id)}</td>
                <td className="gb-col-sem">{`S${g.semester}`}</td>
                <td className="gb-col-date">{dateCH(g.test_date)}</td>
                <td className="gb-col-grade">
                  <span className={g.value < PASS ? 'gb-grade is-fail' : 'gb-grade'}>{fmt(g.value)}</span>
                </td>
                <td className="gb-col-go" aria-hidden="true">
                  <GlyphChevronRight />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const GROUP_ORDER = [...DOMAIN_IDS.slice(1), DOMAIN_IDS[0]] // TPI last: it has no grades yet
const SEMESTER_OPTIONS = [0, ...new Set(GRADES.map((g) => g.semester))].sort().map((s) => ({ value: s, label: s ? `S${s}` : 'Tous' }))

export function GradeList() {
  const [q, setQ] = useState('')
  const [semester, setSemester] = useState(0)
  const [closed, setClosed] = useState<Record<number, boolean>>({}) // remembered between renders

  const query = q.trim().toLowerCase()
  const filtering = Boolean(query || semester)
  const matches = (g: Grade) =>
    (!semester || g.semester === semester) &&
    (!query || `${NODES[g.evaluation_node_id].name} ${categoryOf(g.evaluation_node_id)}`.toLowerCase().includes(query))

  const groups = GROUP_ORDER.map((id) => {
    const all = gradesUnder(id)
    return { id, all, visible: all.filter(matches) }
  })
  const shown = groups.reduce((n, g) => n + g.visible.length, 0)

  function reset() {
    setQ('')
    setSemester(0)
  }

  return (
    <section className="gb-notes" aria-labelledby="gb-notes-title">
      <div className="gb-toolbar">
        <div className="flex min-w-0 gap-2">
          <h2 id="gb-notes-title" className="text-lg font-semibold tracking-tight">Notes</h2>
          <span className="text-muted-foreground text-sm" id="gb-count">
            {filtering ? `${shown} sur ${GRADES.length} notes` : `${GRADES.length} notes`}
          </span>
        </div>
        <div className="gb-toolbar__controls">
          <label className="gb-search">
            <GlyphSearch />
            <span className="sr-only">Filtrer les notes</span>
            <input type="search" id="gb-search" placeholder="Rechercher une note…" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <Segmented id="gb-semesters" label="Semestre" options={SEMESTER_OPTIONS} value={semester} onChange={setSemester} />
        </div>
      </div>
      <div id="gb-list" className="gb-list">
        {!shown && filtering ? (
          <div className="gb-empty">
            <p className="gb-empty__title">Aucune note trouvée</p>
            <p>Essayez un autre terme ou un autre semestre.</p>
            <button type="button" className="gb-link" onClick={reset}>
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          groups.map(({ id, all, visible }) => {
            if (filtering && !visible.length) return null
            const v = nodeValue(id, all, true)
            const subs = (children[id] ?? []).filter((c) => NODES[c.id].aggregation)
            return (
              <details
                key={id}
                className="gb-group"
                open={!closed[id]}
                onToggle={(e) => {
                  const isOpen = e.currentTarget.open
                  setClosed((c) => (c[id] === !isOpen ? c : { ...c, [id]: !isOpen }))
                }}
              >
                <summary>
                  <GlyphChevronDown className="gb-chevron" />
                  <span className="gb-group__name">{NODES[id].name}</span>
                  <span className="gb-group__meta">
                    {all.length ? `${filtering ? `${visible.length} / ` : ''}${plural(all.length, 'note')}` : 'Aucune note'}
                  </span>
                  <span className="gb-group__avg">
                    {v === null ? <span className="gb-muted">—</span> : <>Moyenne <strong>{fmt(v)}</strong></>}
                  </span>
                </summary>
                <div className="gb-group__body">
                  {!all.length ? (
                    <p className="gb-empty-row">Pas encore de note pour ce domaine.</p>
                  ) : subs.length ? (
                    subs.map((c) => {
                      const sv = gradesUnder(c.id).filter(matches)
                      if (!sv.length) return null
                      const subAvg = nodeValue(c.id, gradesUnder(c.id), true)
                      return (
                        <Fragment key={c.id}>
                          <h4 className="gb-sub">
                            {NODES[c.id].name}
                            <span>{(subAvg === null ? '' : `Moyenne ${fmt(subAvg)} · `) + `pondération ${c.weight} %`}</span>
                          </h4>
                          <GradeTable grades={sv} />
                        </Fragment>
                      )
                    })
                  ) : (
                    <GradeTable grades={visible} />
                  )}
                </div>
              </details>
            )
          })
        )}
      </div>
    </section>
  )
}
