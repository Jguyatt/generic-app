'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useStore } from "@/lib/store"
import { formatCurrency } from "@/lib/ui"

export default function LimitGauge() {
  const { limits } = useStore()
  const usedPercentage = ((limits.dailyStake - limits.remainingStake) / limits.dailyStake) * 100

  return (
    <Card className="rounded-2xl border-primary/20 bg-primary/5">
      <CardContent className="pt-6 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Daily Stake Limit</span>
          <span className="text-muted-foreground">
            {formatCurrency(limits.remainingStake)} remaining of {formatCurrency(limits.dailyStake)}
          </span>
        </div>
        <Progress value={usedPercentage} className="h-2" />
        <p className="text-xs text-muted-foreground">
          Resets in 14 hours · <a href="/demo/limits" className="underline">Manage limits</a>
        </p>
      </CardContent>
    </Card>
  )
}

