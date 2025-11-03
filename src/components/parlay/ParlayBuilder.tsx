'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useStore, type Leg } from "@/lib/store"
import { calculatePotentialReturn, combineAmericanOdds } from "@/lib/odds"
import { formatCurrency, formatOdds } from "@/lib/ui"
import ParlayLeg from "./ParlayLeg"
import LimitGauge from "../rg/LimitGauge"
import { toast } from "sonner"
import { mockGames } from "@/lib/mock"
import ParlayCard from "./ParlayCard"

export default function ParlayBuilder() {
  const { parlays, limits, applyStake } = useStore()
  const [currentLegs, setCurrentLegs] = useState<Leg[]>([])
  const [stake, setStake] = useState([10])
  const [mode, setMode] = useState<"build" | "tail">("build")

  const combinedOdds = currentLegs.length > 0 ? combineAmericanOdds(currentLegs.map(l => l.odds)) : 0
  const potential = currentLegs.length > 0 ? calculatePotentialReturn(stake[0], currentLegs.map(l => l.odds)) : 0

  const addLeg = (game: typeof mockGames[0], market: string, odds: number) => {
    const newLeg: Leg = {
      id: `leg-${Date.now()}`,
      league: game.league,
      team: game.home,
      market: `${game.home} ${market}`,
      odds
    }
    setCurrentLegs([...currentLegs, newLeg])
  }

  const removeLeg = (id: string) => {
    setCurrentLegs(currentLegs.filter(l => l.id !== id))
  }

  const handleLockSlip = () => {
    if (currentLegs.length === 0) {
      toast.error("Add at least one leg to your parlay")
      return
    }
    if (stake[0] > limits.remainingStake) {
      toast.error(`Stake exceeds your daily limit. Remaining: ${formatCurrency(limits.remainingStake)}`)
      return
    }
    
    toast.success(
      <div className="space-y-1">
        <div className="font-semibold">🎉 Parlay Locked!</div>
        <div className="text-sm">
          {currentLegs.length} legs · Stake {formatCurrency(stake[0])} · Potential {formatCurrency(potential)}
        </div>
      </div>
    )
    setCurrentLegs([])
  }

  return (
    <div className="space-y-6">
      <LimitGauge />
      
      <Tabs value={mode} onValueChange={(v) => setMode(v as "build" | "tail")} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="build">Build from Scratch</TabsTrigger>
          <TabsTrigger value="tail">Tail from Friends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="build" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Game Selection */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Available Games</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockGames.map(game => (
                  <div key={game.id} className="rounded-lg border border-border p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{game.away} @ {game.home}</div>
                        <div className="text-xs text-muted-foreground">{game.league} · {game.time}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => addLeg(game, 'ML', -120)}
                        className="text-xs"
                      >
                        ML {formatOdds(-120)}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => addLeg(game, '+3.5', +105)}
                        className="text-xs"
                      >
                        +3.5 {formatOdds(+105)}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => addLeg(game, 'O 5.5', +110)}
                        className="text-xs"
                      >
                        O 5.5 {formatOdds(+110)}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Right: Current Slip */}
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Your Parlay ({currentLegs.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentLegs.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    Add legs from the games on the left
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {currentLegs.map(leg => (
                        <div key={leg.id} className="flex items-center gap-2">
                          <div className="flex-1">
                            <ParlayLeg leg={leg} />
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => removeLeg(leg.id)}
                            className="text-xs"
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-muted p-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Combined Odds</span>
                        <span className="font-mono font-semibold">{formatOdds(combinedOdds)}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Stake</span>
                          <span className="font-semibold">{formatCurrency(stake[0])}</span>
                        </div>
                        <Slider 
                          value={stake} 
                          onValueChange={setStake}
                          min={5}
                          max={Math.min(100, limits.remainingStake)}
                          step={5}
                          className="py-2"
                        />
                      </div>

                      <div className="flex items-center justify-between border-t border-border pt-3">
                        <span className="text-sm font-medium">Potential Return</span>
                        <span className="text-lg font-bold text-green-600">{formatCurrency(potential)}</span>
                      </div>

                      <Button className="w-full" size="lg" onClick={handleLockSlip}>
                        🔒 Lock Slip
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tail" className="space-y-4">
          <div className="space-y-4">
            {parlays.slice(0, 2).map(parlay => (
              <ParlayCard key={parlay.id} parlay={parlay} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

