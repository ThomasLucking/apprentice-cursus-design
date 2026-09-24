import { Link } from 'react-router'
import { Assignment, ScoreGauge, STATUS_TEXT } from '@/components/coach/score'
import { ArrowRight } from '@/components/icons'
import { DetailItem } from '@/components/layout/page'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { BRANCHES, type Apprentice } from '@/data/app'
import { fmt, status } from '@/data/grades'

const average = BRANCHES.reduce((s, b) => s + b.value, 0) / BRANCHES.length

/* Side sheet opened from the apprentices table: general gauge + averages per branch. */
export function ApprenticeSheet({ apprentice: a }: { apprentice: Apprentice }) {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarFallback>{a.initials}</AvatarFallback>
          </Avatar>
          <div>
            <SheetTitle>{a.name}</SheetTitle>
            <SheetDescription>{`${a.track} · ${a.year}`}</SheetDescription>
          </div>
        </div>
      </SheetHeader>
      <div className="flex flex-col gap-6 px-4 pb-6">
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <DetailItem label="Coach">
            <Assignment name={a.coach} />
          </DetailItem>
          <DetailItem label="Formateur">
            <Assignment name={a.trainer} />
          </DetailItem>
        </div>
        <div className="bg-card flex flex-col items-center gap-1 rounded-xl border px-6 py-8">
          <p className="text-muted-foreground text-sm">Moyenne générale</p>
          <ScoreGauge value={average} size={170} stroke={14} className="my-2">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-card-foreground text-3xl font-semibold tabular-nums">{fmt(average)}</span>
            </div>
          </ScoreGauge>
          <p className="text-muted-foreground text-sm">sur une échelle de 1 à 6</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Moyennes par branche</h3>
          <div className="divide-y">
            {BRANCHES.map((b) => {
              const [kind, label] = status(b.value)
              return (
                <div key={b.name} className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-card-foreground font-medium">{b.name}</p>
                    <p className="text-muted-foreground text-sm">{`Dernière éval · ${b.last}`}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${STATUS_TEXT[kind]}`}>{label}</span>
                    <ScoreGauge value={b.value} size={40} stroke={5} className="shrink-0" />
                    <span className="text-card-foreground w-8 text-right text-sm font-semibold">{fmt(b.value)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <SheetFooter className="border-t">
        <Button asChild>
          <Link to={`/coach/apprentices/${a.id}`}>
            Voir le carnet de notes <ArrowRight />
          </Link>
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}
