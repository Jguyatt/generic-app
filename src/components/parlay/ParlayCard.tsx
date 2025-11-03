'use client'

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useStore, type Parlay } from "@/lib/store"
import { formatCurrency } from "@/lib/ui"
import { calculatePotentialReturn } from "@/lib/odds"
import ParlayLeg from "./ParlayLeg"
import { toast } from "sonner"
import { formatDistanceToNow } from "date-fns"

interface ParlayCardProps {
  parlay: Parlay
  showActions?: boolean
}

export default function ParlayCard({ parlay, showActions = true }: ParlayCardProps) {
  const { friends, user, copyParlay } = useStore()
  const author = parlay.authorId === user.id ? user : friends.find(f => f.id === parlay.authorId)
  const potential = calculatePotentialReturn(parlay.stake, parlay.legs.map(l => l.odds))
  
  const handleCopy = () => {
    copyParlay(parlay.id)
    toast.success(`Copied ${author?.name}'s parlay—tweak a leg then lock your slip.`)
  }

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {author?.name[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">{author?.name || 'Unknown'}</div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(parlay.createdAt), { addSuffix: true })}
            </div>
          </div>
        </div>
        <Badge variant="secondary">{parlay.legs.length} legs</Badge>
      </CardHeader>
      <CardContent className="space-y-2">
        {parlay.legs.map(leg => (
          <ParlayLeg key={leg.id} leg={leg} />
        ))}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm">
          Stake <span className="font-semibold">{formatCurrency(parlay.stake)}</span> · Potential <span className="font-semibold text-green-600">{formatCurrency(potential)}</span>
        </div>
        {showActions && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">View</Button>
            <Button size="sm" onClick={handleCopy}>Copy & Tweak</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

