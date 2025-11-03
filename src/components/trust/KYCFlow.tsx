'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, Camera, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function KYCFlow() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (step < 3) {
        setStep(step + 1)
      }
    }, 1500)
  }

  const progress = (step / 3) * 100

  return (
    <Card className="rounded-2xl mx-auto max-w-2xl">
      <CardHeader>
        <div className="space-y-2">
          <CardTitle>Identity Verification</CardTitle>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">Step {step} of 3</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload ID Document</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Please upload a clear photo of your government-issued ID (front side)
              </p>
              <div className="rounded-lg border-2 border-dashed border-border p-12 hover:border-primary transition-colors cursor-pointer">
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={handleNext} disabled={loading}>
              {loading ? "Uploading..." : "Continue to Next Step"}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Liveness Check</h3>
              <p className="text-sm text-muted-foreground mb-6">
                We'll capture a quick video to verify it's really you
              </p>
              <div className="mx-auto w-64 h-64 rounded-lg bg-muted flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="animate-pulse">
                    <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">Position your face in the circle</p>
                </div>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={handleNext} disabled={loading}>
              {loading ? "Verifying..." : "Start Verification"}
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-600">Verification Complete!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your identity has been successfully verified
              </p>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-left">
                <h4 className="text-sm font-semibold mb-2">What happens next?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Your account is now fully activated</li>
                  <li>✓ You can deposit and place bets</li>
                  <li>✓ Withdrawals will be processed normally</li>
                </ul>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={() => toast.success("Returning to dashboard...")}>
              Continue to Dashboard
            </Button>
          </div>
        )}

        <div className="text-xs text-center text-muted-foreground pt-4 border-t">
          🔒 Your information is encrypted and stored securely. We comply with all privacy regulations.
        </div>
      </CardContent>
    </Card>
  )
}

