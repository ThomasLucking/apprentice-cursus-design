import { useState, type CSSProperties, type ReactNode } from 'react'
import { barPath, ChartBody, ChartCard, Segmented, type Tip } from '@/components/home/chart-parts'
import {
  CURRENT_SEMESTER,
  DOMAIN_IDS,
  FILTERS,
  fmt,
  GRADES,
  gradesUnder,
  inSemester,
  leavesOf,
  NODES,
  nodeValue,
  PASS,
  plural,
  SEMESTERS,
  weightOf,
} from '@/data/grades'

type SetTip = (t: Tip) => void

/* ── Column chart: average per semester (1–8) ──────────────── */
function SemesterBars({ width: W, filter, setTip }: { width: number; filter: number; setTip: SetTip }) {
  const [hover, setHover] = useState<number | null>(null)
  const H = 260
  const m = { t: 20, r: 8, b: 44, l: 28 }
  const iw = W - m.l - m.r
  const ih = H - m.t - m.b
  const slot = iw / SEMESTERS
  const bw = Math.min(44, slot - 12)
  const y = (v: number) => m.t + (1 - v / 6) * ih
  const leaves = leavesOf(filter)

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Moyenne par semestre">
      {[0, 2, 4, 6].map((v) => (
        <g key={v}>
          <line x1={m.l} x2={W - m.r} y1={y(v)} y2={y(v)} className="c-grid" />
          <text x={m.l - 8} y={y(v) + 4} className="c-axis" textAnchor="end">{v}</text>
        </g>
      ))}
      {Array.from({ length: SEMESTERS }, (_, i) => i + 1).map((s) => {
        const cx = m.l + slot * (s - 1) + slot / 2
        const grades = inSemester(s).filter((g) => leaves.includes(g.evaluation_node_id))
        const val = nodeValue(filter, grades, true)
        const future = s > CURRENT_SEMESTER
        const label = s === CURRENT_SEMESTER ? 'c-label c-strong' : future ? 'c-axis c-faint' : 'c-axis'
        return (
          <g key={s}>
            <text x={cx} y={H - 24} className={label} textAnchor="middle">{`S${s}`}</text>
            {s % 2 === 1 && (
              <text x={cx + slot / 2} y={H - 6} className="c-sub" textAnchor="middle">{`Année ${(s + 1) / 2}`}</text>
            )}
            {future ? (
              <rect x={cx - bw / 2} y={m.t} width={bw} height={ih} rx={4} className="c-slot" />
            ) : val === null ? (
              <text x={cx} y={y(0) - 8} className="c-sub" textAnchor="middle">—</text>
            ) : (
              <>
                {/* keyed by filter so the bars grow again when the domain changes */}
                <path
                  key={`bar-${filter}`}
                  d={barPath(cx - bw / 2, cx + bw / 2, y(val), y(0))}
                  className={val < PASS ? 'c-bar c-bar--fail c-grow-y' : 'c-bar c-grow-y'}
                  style={{ '--i': s - 1, opacity: hover === s ? 0.8 : undefined } as CSSProperties}
                />
                <text key={`val-${filter}`} x={cx} y={y(val) - 6} className="c-value c-fade" textAnchor="middle" style={{ '--i': s - 1 } as CSSProperties}>{fmt(val)}</text>
                <rect
                  x={cx - slot / 2}
                  y={0}
                  width={slot}
                  height={H - 30}
                  className="c-hit"
                  onMouseEnter={() => {
                    setHover(s)
                    setTip({
                      x: cx,
                      y: y(val),
                      content: (
                        <>
                          <b>{`${fmt(val)} / 6`}</b>{`Semestre ${s}${s === CURRENT_SEMESTER ? ' (en cours)' : ''}`}
                          <br />
                          <span>{`${plural(grades.length, 'note')} · ${NODES[filter].name}`}</span>
                        </>
                      ),
                    })
                  }}
                  onMouseLeave={() => {
                    setHover(null)
                    setTip(null)
                  }}
                />
              </>
            )}
          </g>
        )
      })}
      <line x1={m.l} x2={W - m.r} y1={y(PASS)} y2={y(PASS)} className="c-threshold" />
      <text x={W - m.r} y={y(PASS) - 6} className="c-threshold-label" textAnchor="end">Seuil 4.0</text>
    </svg>
  )
}

export function SemesterChart() {
  const [filter, setFilter] = useState(1)
  return (
    <ChartCard
      labelId="t-semesters"
      title="Moyenne par semestre"
      description="Semestres 1 à 8 de la formation, arrondis selon le domaine"
      aside={
        <Segmented id="semester-filter" label="Domaine affiché" options={FILTERS.map((f) => ({ value: f.id, label: f.label }))} value={filter} onChange={setFilter} />
      }
    >
      <ChartBody id="chart-semesters" render={(w, setTip) => <SemesterBars width={w} filter={filter} setTip={setTip} />} />
    </ChartCard>
  )
}

/* ── Horizontal bars: domain results (cursus) with weight ─── */
function DomainBars({ width: W, setTip }: { width: number; setTip: SetTip }) {
  const [hover, setHover] = useState<number | null>(null)
  const row = 62
  const H = DOMAIN_IDS.length * row + 8
  const iw = W - 40
  const x = (v: number) => (v / 6) * iw

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Moyenne par domaine">
      {DOMAIN_IDS.map((id, i) => {
        const top = i * row
        const val = nodeValue(id, GRADES, true)
        const w = weightOf(1, id)
        const node = NODES[id]
        return (
          <g key={id}>
            <text x={0} y={top + 14} className="c-label">{node.name}</text>
            <text x={W} y={top + 14} className={val === null ? 'c-sub' : 'c-value'} textAnchor="end">{val === null ? '—' : fmt(val)}</text>
            <rect x={0} y={top + 22} width={iw} height={10} rx={4} className="c-bar-track" />
            {val !== null && (
              <rect
                x={0}
                y={top + 22}
                width={x(val)}
                height={10}
                rx={4}
                className={val < PASS ? 'c-bar c-bar--fail c-grow-x' : 'c-bar c-grow-x'}
                style={{ '--i': i, opacity: hover === id ? 0.8 : undefined } as CSSProperties}
              />
            )}
            <text x={0} y={top + 48} className="c-sub">{`Pondération ${w} %${val === null ? ' · pas encore évalué' : ''}`}</text>
            <rect
              x={0}
              y={top}
              width={W}
              height={row - 4}
              className="c-hit"
              onMouseEnter={() => {
                setHover(id)
                setTip({
                  x: val === null ? iw / 2 : x(val),
                  y: top + 20,
                  content:
                    val === null ? (
                      <>
                        <b>Pas encore évalué</b>{node.name}
                        <br />
                        <span>{`Pondération ${w} %`}</span>
                      </>
                    ) : (
                      <>
                        <b>{`${fmt(val)} / 6`}</b>{node.name}
                        <br />
                        <span>{`${gradesUnder(id).length} notes · pondération ${w} % · arrondi ${node.rounding_step}`}</span>
                      </>
                    ),
                })
              }}
              onMouseLeave={() => {
                setHover(null)
                setTip(null)
              }}
            />
          </g>
        )
      })}
      <line x1={x(PASS)} x2={x(PASS)} y1={18} y2={H - 18} className="c-threshold" />
    </svg>
  )
}

export function DomainChart({ link }: { link: ReactNode }) {
  return (
    <ChartCard labelId="t-domains" title="Moyenne par domaine" description="Sur toute la formation · ligne pointillée = seuil 4.0">
      <ChartBody id="chart-domains" render={(w, setTip) => <DomainBars width={w} setTip={setTip} />} />
      {link}
    </ChartCard>
  )
}

/* ── Histogram: grades.value in 0.5-wide bins, 1.0–6.0 ─────── */
function DistributionBars({ width: W, setTip }: { width: number; setTip: SetTip }) {
  const H = 240
  const m = { t: 20, r: 4, b: 26, l: 4 }
  // start at 3.0 unless a lower grade exists, so empty low bins don't squash the chart
  const from = Math.min(3, Math.floor(Math.min(...GRADES.map((g) => g.value))))
  const bins: { lo: number; hi: number; n: number }[] = []
  for (let lo = from; lo < 6; lo += 0.5) {
    bins.push({
      lo,
      hi: lo + 0.5,
      n: GRADES.filter((g) => g.value >= lo && (g.value < lo + 0.5 || (lo === 5.5 && g.value === 6))).length,
    })
  }
  const maxN = Math.max(...bins.map((b) => b.n))
  const iw = W - m.l - m.r
  const ih = H - m.t - m.b
  const slot = iw / bins.length
  const base = m.t + ih
  const ticks = Array.from({ length: 6 - from + 1 }, (_, i) => from + i)
  const px = m.l + (PASS - from) * 2 * slot

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Répartition des notes">
      {bins.map((b, i) => {
        const x0 = m.l + slot * i + 1
        const x1 = x0 + slot - 2
        const h = (b.n / maxN) * ih
        const top = base - h
        const cx = (x0 + x1) / 2
        const fail = b.hi <= PASS
        return (
          <g key={b.lo}>
            {b.n > 0 && (
              <>
                <path d={barPath(x0, x1, top, base)} className={fail ? 'c-bar c-bar--fail c-grow-y' : 'c-bar c-grow-y'} style={{ '--i': i } as CSSProperties} />
                <text x={cx} y={top - 6} className="c-value c-fade" textAnchor="middle" style={{ '--i': i } as CSSProperties}>{b.n}</text>
              </>
            )}
            <rect
              x={x0}
              y={0}
              width={slot}
              height={H}
              className="c-hit"
              onMouseEnter={() =>
                setTip({
                  x: cx,
                  y: b.n ? top : base,
                  content: (
                    <>
                      <b>{plural(b.n, 'note')}</b>
                      <span>
                        {`entre ${fmt(b.lo)} et ${b.lo === 5.5 ? '6.0' : fmt(b.hi - 0.1)}${fail ? ' · insuffisante' : ''}`}
                      </span>
                    </>
                  ),
                })
              }
              onMouseLeave={() => setTip(null)}
            />
          </g>
        )
      })}
      <line x1={m.l} x2={W - m.r} y1={base} y2={base} className="c-grid" />
      {ticks.map((t) => (
        <text key={t} x={m.l + (t - from) * 2 * slot} y={H - 8} className="c-axis" textAnchor={t === from ? 'start' : t === 6 ? 'end' : 'middle'}>
          {`${t}.0`}
        </text>
      ))}
      <line x1={px} x2={px} y1={m.t - 8} y2={base} className="c-threshold" />
    </svg>
  )
}

export function DistributionChart() {
  return (
    <ChartCard
      labelId="t-dist"
      title="Répartition des notes"
      description="Toutes les notes, par tranche de 0.5 point"
      aside={
        <div className="legend">
          <span>
            <i className="sq" />
            4.0 et plus
          </span>
          <span>
            <i className="sq sq--fail" />
            Insuffisante (&lt; 4.0)
          </span>
        </div>
      }
    >
      <ChartBody id="chart-distribution" render={(w, setTip) => <DistributionBars width={w} setTip={setTip} />} />
    </ChartCard>
  )
}
