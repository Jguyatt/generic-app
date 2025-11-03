import { Leg } from "@/lib/store"
import { formatOdds } from "@/lib/ui"

interface ParlayLegProps {
  leg: Leg
  showActions?: boolean
  onEdit?: () => void
}

export default function ParlayLeg({ leg, showActions = false, onEdit }: ParlayLegProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3 text-sm transition-colors hover:bg-accent/50">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
          {leg.team?.[0] || leg.league[0]}
        </div>
        <div>
          <div className="font-medium">{leg.market}</div>
          <div className="text-xs text-muted-foreground">{leg.league}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="font-mono font-semibold">{formatOdds(leg.odds)}</div>
        {showActions && onEdit && (
          <button 
            onClick={onEdit}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

