import { useState } from 'react'
import { ApprenticeSheet } from '@/components/coach/apprentice-sheet'
import { DataTable, type Column } from '@/components/coach/data-table'
import { Assignment } from '@/components/coach/score'
import { SearchInput } from '@/components/forms/controls'
import { PageContainer, PageHeader } from '@/components/layout/page'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { APPRENTICES, TRACKS, YEARS, type Apprentice } from '@/data/app'

const ALL = 'All'

const COLUMNS: Column<Apprentice>[] = [
  {
    header: 'Apprenti·e',
    cell: (a) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback className="text-xs">{a.initials}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{a.name}</span>
      </div>
    ),
  },
  { header: 'Filière', cell: (a) => a.track },
  { header: 'Année', cell: (a) => a.year },
  { header: 'Coach', cell: (a) => <Assignment name={a.coach} /> },
  { header: 'Formateur', cell: (a) => <Assignment name={a.trainer} /> },
]

function FilterTabs({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList aria-label={label}>
        {[ALL, ...options].map((o) => (
          <TabsTrigger key={o} value={o} className="px-3">
            {o === ALL ? 'Toutes' : o}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export function Apprentices() {
  const [search, setSearch] = useState('')
  const [track, setTrack] = useState(ALL)
  const [year, setYear] = useState(ALL)
  const [selected, setSelected] = useState<Apprentice | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const q = search.trim().toLowerCase()
  const visible = (a: Apprentice) =>
    a.name.toLowerCase().includes(q) && (track === ALL || a.track === track) && (year === ALL || a.year === year)

  return (
    <PageContainer size="lg">
      <PageHeader title="Apprentis" description={`${APPRENTICES.length} apprenti·es au total`} />
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput label="Rechercher un·e apprenti·e" value={search} onChange={setSearch} className="lg:max-w-xs" />
        <div className="flex flex-wrap gap-3">
          <FilterTabs label="Filtrer par filière" options={TRACKS} value={track} onChange={setTrack} />
          <FilterTabs label="Filtrer par année" options={YEARS} value={year} onChange={setYear} />
        </div>
      </div>
      <DataTable
        columns={COLUMNS}
        rows={APPRENTICES}
        visible={visible}
        rowKey={(a) => a.id}
        onRowClick={(a) => {
          setSelected(a)
          setSheetOpen(true)
        }}
        empty="Aucun·e apprenti·e ne correspond à ces filtres."
      />
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        {selected && <ApprenticeSheet apprentice={selected} />}
      </Sheet>
    </PageContainer>
  )
}
