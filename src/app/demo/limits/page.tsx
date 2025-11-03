'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LimitGauge from "@/components/rg/LimitGauge"
import LimitsModal from "@/components/rg/LimitsModal"
import ResponsibleRibbon from "@/components/rg/ResponsibleRibbon"
import { Shield, Clock, Ban } from "lucide-react"

export default function LimitsPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <ResponsibleRibbon />
      <div className="container mx-auto max-w-screen-md px-4 py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Responsible Gaming</h1>
          <p className="text-muted-foreground mt-2">
            Manage your limits and play responsibly
          </p>
        </div>

        <LimitGauge />

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Your Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Daily Stake Limit</div>
                    <div className="text-sm text-muted-foreground">Maximum amount you can stake per day</div>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setModalOpen(true)}>
                  Adjust
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Session Time Limit</div>
                    <div className="text-sm text-muted-foreground">Maximum session duration</div>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">2 hours</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Ban className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Self-Exclusion</div>
                    <div className="text-sm text-muted-foreground">Take a break from betting</div>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-medium mb-2">Why we have limits</p>
              <p className="text-muted-foreground">
                Limits help you stay in control and prevent overspending. We recommend setting limits 
                before you start betting and reviewing them regularly.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-900">
              <strong>Need help?</strong> If you or someone you know has a gambling problem, 
              resources are available at <a href="#" className="underline">ConnexOntario.ca</a>
            </p>
          </CardContent>
        </Card>
      </div>

      <LimitsModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}

