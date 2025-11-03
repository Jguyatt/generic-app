import { Badge } from "@/components/ui/badge"
import { formatOdds } from "@/lib/ui"

interface OddsBadgeProps {
  odds: number
}

export default function OddsBadge({ odds }: OddsBadgeProps) {
  return (
    <Badge variant="secondary" className="font-mono">
      {formatOdds(odds)}
    </Badge>
  )
}

