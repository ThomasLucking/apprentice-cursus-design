import type { ReactNode } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

export type Column<T> = { header: string; className?: string; headClassName?: string; cell: (row: T) => ReactNode }

const clickableRow = 'hover:bg-muted/50 focus-visible:bg-muted/50 cursor-pointer focus-visible:outline-none'

/* DataTable: card-wrapped table, clickable rows. Filtered-out rows are hidden (not removed),
   and an empty row is appended when nothing matches. */
export function DataTable<T>({
  columns,
  rows,
  visible = () => true,
  rowKey,
  onRowClick,
  empty,
}: {
  columns: Column<T>[]
  rows: T[]
  visible?: (row: T) => boolean
  rowKey: (row: T) => string | number
  onRowClick: (row: T) => void
  empty: string
}) {
  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      <Table className="[&_td]:px-4 [&_th]:px-4">
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            {columns.map((c) => (
              <TableHead key={c.header} className={cn(c.headClassName, 'text-muted-foreground')}>
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={rowKey(row)}
              hidden={!visible(row)}
              tabIndex={0}
              className={clickableRow}
              onClick={() => onRowClick(row)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onRowClick(row)
                }
              }}
            >
              {columns.map((c) => (
                <TableCell key={c.header} className={c.className}>
                  {c.cell(row)}
                </TableCell>
              ))}
            </TableRow>
            ))}
          {!rows.some(visible) && (
            <TableRow className={cn(clickableRow, 'hover:bg-transparent')}>
              <TableCell colSpan={columns.length} className={cn(columns[0].className, 'text-muted-foreground h-24 text-center')}>
                {empty}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
