'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function HeroCTA() {
  const [email, setEmail] = useState("")

  const handleJoin = () => {
    if (!email.trim() || !email.includes('@')) {
      toast.error("Please enter a valid email address")
      return
    }
    
    toast.success(
      <div className="space-y-1">
        <div className="font-semibold">You're on the list! 🎉</div>
        <div className="text-sm">We'll email you when we launch in Ontario</div>
      </div>
    )
    setEmail("")
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Bet Together.<br />Win Together.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          The first social betting platform built for friends. Copy parlays, 
          share strategies, and compete—all with responsible gaming at the core.
        </p>
      </div>

      <Card className="mx-auto max-w-md rounded-2xl border-primary/20 bg-primary/5">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Input 
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
              className="h-12"
            />
            <Button className="w-full h-12 text-base" size="lg" onClick={handleJoin}>
              Join the Waitlist
            </Button>
          </div>
          
          <div className="space-y-1 text-center text-xs text-muted-foreground">
            <p>🇨🇦 Launching first in Ontario</p>
            <p>19+ only · Play responsibly · Never bet more than you can afford to lose</p>
          </div>
        </CardContent>
      </Card>

      <div className="mx-auto max-w-3xl">
        <div className="grid gap-6 sm:grid-cols-3 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold">Social First</div>
            <div className="text-sm text-muted-foreground">Built for sharing with friends</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">Responsible</div>
            <div className="text-sm text-muted-foreground">Limits & controls baked in</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold">Compliant</div>
            <div className="text-sm text-muted-foreground">Licensed & regulated</div>
          </div>
        </div>
      </div>
    </div>
  )
}

