"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

type Leg = { league: string; market: string; odds: string }

export default function ManualParlayForm(){
  const [legs, setLegs] = useState<Leg[]>([
    { league: "", market: "", odds: "" },
    { league: "", market: "", odds: "" },
    { league: "", market: "", odds: "" },
    { league: "", market: "", odds: "" },
    { league: "", market: "", odds: "" },
  ])
  const [stake, setStake] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [blocked, setBlocked] = useState(false)

  function updateLeg(i:number, field:keyof Leg, val:string){
    setLegs(prev=> prev.map((l,idx)=> idx===i? { ...l, [field]: val } as Leg : l))
  }

  async function onSubmit(e: React.FormEvent){
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r=>setTimeout(r, 1200))
    setSubmitting(false)
    setBlocked(true)
  }

  const disabled = submitting || blocked

  return (
    <Card className="rounded-xl border-gray-300 bg-gray-100 text-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-800">Manual Parlay Entry</CardTitle>
        <p className="text-sm text-gray-500">Enter every leg by hand. Odds may be outdated. Submissions are not guaranteed.</p>
      </CardHeader>
      <CardContent>
        {blocked && (
          <Alert className="mb-4 border-gray-300 bg-gray-200 text-gray-700">
            <AlertTitle className="font-semibold">You're too late — cannot place parlay.</AlertTitle>
            <AlertDescription>Window closed. Please re-enter your 5-leg parlay from scratch.</AlertDescription>
          </Alert>
        )}
        <form onSubmit={onSubmit} className="space-y-6">
          {legs.map((leg, i)=> (
            <div key={i} className="rounded-lg border border-gray-300 bg-gray-50 p-4">
              <div className="mb-2 text-sm font-medium text-gray-700">Leg {i+1}</div>
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <Label htmlFor={`league-${i}`} className="text-gray-700">League</Label>
                  <Input id={`league-${i}`} placeholder="e.g., NHL" value={leg.league}
                    onChange={e=>updateLeg(i, "league", e.target.value)}
                    disabled={disabled}
                    className="bg-gray-100 text-gray-700 placeholder:text-gray-400 border-gray-300 focus-visible:ring-gray-400" />
                </div>
                <div>
                  <Label htmlFor={`market-${i}`} className="text-gray-700">Market</Label>
                  <Input id={`market-${i}`} placeholder="e.g., Leafs ML" value={leg.market}
                    onChange={e=>updateLeg(i, "market", e.target.value)}
                    disabled={disabled}
                    className="bg-gray-100 text-gray-700 placeholder:text-gray-400 border-gray-300 focus-visible:ring-gray-400" />
                </div>
                <div>
                  <Label htmlFor={`odds-${i}`} className="text-gray-700">Odds</Label>
                  <Input id={`odds-${i}`} placeholder="e.g., -120" value={leg.odds}
                    onChange={e=>updateLeg(i, "odds", e.target.value)}
                    disabled={disabled}
                    className="bg-gray-100 text-gray-700 placeholder:text-gray-400 border-gray-300 focus-visible:ring-gray-400" />
                </div>
              </div>
            </div>
          ))}

          <Separator className="bg-gray-300" />

          <div className="grid gap-3 md:grid-cols-3 items-end">
            <div className="md:col-span-2">
              <Label htmlFor="stake" className="text-gray-700">Stake</Label>
              <Input id="stake" placeholder="e.g., 10.00" value={stake}
                onChange={e=>setStake(e.target.value)} disabled={disabled}
                className="bg-gray-100 text-gray-700 placeholder:text-gray-400 border-gray-300 focus-visible:ring-gray-400" />
            </div>
            <Button type="submit" disabled={disabled}
              className="h-10 w-full rounded-md bg-gray-400 text-gray-800 hover:bg-gray-400 cursor-not-allowed">
              {submitting? "Submitting…" : blocked? "Submission Closed" : "Place Parlay"}
            </Button>
          </div>

          <p className="text-xs text-gray-500">By placing a parlay you agree to vague terms and conditions which are not visible here.</p>
        </form>
      </CardContent>
    </Card>
  )
}

