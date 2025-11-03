"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { X, AlertCircle } from "lucide-react"

interface Selection {
  id: string
  game: string
  pick: string
  odds: number
}

interface BetSlipProps {
  selections: Selection[]
  onRemove: (id: string) => void
  onPlaceBet: () => void
}

export default function BetSlip({ selections, onRemove, onPlaceBet }: BetSlipProps) {
  const [step, setStep] = useState(1)
  const [stake, setStake] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [securityCode, setSecurityCode] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedRisk, setAcceptedRisk] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [loading, setLoading] = useState(false)

  const totalOdds = selections.length > 0 
    ? selections.reduce((acc, sel) => {
        const decimal = sel.odds > 0 ? 1 + sel.odds / 100 : 1 + 100 / Math.abs(sel.odds)
        return acc * decimal
      }, 1)
    : 0

  const americanOdds = totalOdds >= 2 ? Math.round((totalOdds - 1) * 100) : Math.round(-100 / (totalOdds - 1))
  const potentialWin = stake ? parseFloat(stake) * (totalOdds - 1) : 0

  const canProceed = () => {
    if (step === 1) return selections.length > 0 && stake && parseFloat(stake) >= 10
    if (step === 2) return accountNumber && securityCode
    if (step === 3) return acceptedTerms && acceptedRisk
    if (step === 4) return verificationCode.length === 6
    return false
  }

  const handleNext = () => {
    if (step === 4) {
      setLoading(true)
      setTimeout(() => {
        onPlaceBet()
        setLoading(false)
        setStep(1)
        setStake("")
        setAccountNumber("")
        setSecurityCode("")
        setAcceptedTerms(false)
        setAcceptedRisk(false)
        setVerificationCode("")
      }, 2000)
    } else {
      setStep(step + 1)
    }
  }

  return (
    <Card className="lg:sticky lg:top-20 border-gray-300 bg-white">
      <CardHeader className="bg-gray-100 border-b border-gray-300 p-3 sm:p-6">
        <CardTitle className="text-base sm:text-lg text-gray-800">
          Bet Slip ({selections.length}) - Step {step}/4
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 space-y-3 sm:space-y-4">
        {selections.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            Click on odds to add to your bet slip
          </p>
        ) : (
          <>
            {/* Step 1: Review Selections & Enter Stake */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selections.map(sel => (
                    <div key={sel.id} className="flex items-start justify-between gap-2 p-2 bg-gray-50 rounded border border-gray-200">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-600 truncate">{sel.game}</p>
                        <p className="text-sm font-medium text-gray-800 truncate">{sel.pick}</p>
                        <p className="text-xs font-mono text-gray-600">{sel.odds > 0 ? `+${sel.odds}` : sel.odds}</p>
                      </div>
                      <button
                        onClick={() => onRemove(sel.id)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {selections.length > 1 && (
                  <div className="bg-blue-50 border border-blue-200 p-2 rounded">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">Parlay Odds:</span>
                      <span className="font-mono font-semibold text-gray-800">
                        {americanOdds > 0 ? `+${americanOdds}` : americanOdds}
                      </span>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-700">Stake Amount *</Label>
                    <Input 
                      type="number" 
                      placeholder="Minimum $10.00"
                      value={stake}
                      onChange={(e) => setStake(e.target.value)}
                      className="border-gray-300 focus-visible:ring-gray-400 mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Min: $10 • Max: $500</p>
                  </div>

                  {stake && parseFloat(stake) >= 10 && (
                    <div className="bg-green-50 border border-green-200 p-3 rounded">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Stake:</span>
                        <span className="font-semibold">${parseFloat(stake).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">Potential Win:</span>
                        <span className="font-semibold text-green-700">${potentialWin.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-300 p-2 rounded flex gap-2 text-xs">
                  <AlertCircle className="h-4 w-4 text-yellow-700 flex-shrink-0 mt-0.5" />
                  <div className="text-yellow-800">
                    <p className="font-semibold">Important:</p>
                    <p>Additional verification steps required before bet placement.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Account Verification */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="text-sm text-gray-700 bg-blue-50 border border-blue-200 p-3 rounded">
                  <p className="font-semibold mb-1">🔒 Account Verification Required</p>
                  <p className="text-xs">For security purposes, please verify your account details.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-gray-700">Account Number *</Label>
                    <Input 
                      type="text" 
                      placeholder="Enter your 10-digit account number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="border-gray-300 focus-visible:ring-gray-400 mt-1 font-mono"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700">Security PIN *</Label>
                    <Input 
                      type="password" 
                      placeholder="4-digit PIN"
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      maxLength={4}
                      className="border-gray-300 focus-visible:ring-gray-400 mt-1"
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  Your account number can be found in your account settings. Contact support if you don't remember your PIN.
                </p>
              </div>
            )}

            {/* Step 3: Terms & Conditions */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="text-sm text-gray-700 bg-red-50 border border-red-200 p-3 rounded">
                  <p className="font-semibold mb-1">⚠️ Terms & Acknowledgments</p>
                  <p className="text-xs">Please read and accept all terms before proceeding.</p>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-200 rounded p-3 bg-gray-50 text-xs text-gray-700">
                  <p className="font-semibold">Betting Terms & Conditions:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>All bets are final once confirmed. No refunds or cancellations.</li>
                    <li>Odds are subject to change without notice until bet is confirmed.</li>
                    <li>Events may be postponed or cancelled affecting your bet.</li>
                    <li>Maximum payout is $100,000 regardless of odds.</li>
                    <li>We reserve the right to void any bet at our discretion.</li>
                    <li>Account limits may apply and can be changed without notice.</li>
                    <li>Promotional offers do not apply to parlay bets over 5 legs.</li>
                    <li>Settlement times vary and may take up to 72 hours.</li>
                    <li>Technical errors may result in bet cancellation.</li>
                    <li>You confirm you are 21+ and in a legal jurisdiction.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-xs text-gray-700">
                      I have read and agree to the Terms & Conditions, Privacy Policy, and Responsible Gaming Guidelines *
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={acceptedRisk}
                      onChange={(e) => setAcceptedRisk(e.target.checked)}
                      className="mt-1"
                    />
                    <span className="text-xs text-gray-700">
                      I acknowledge that gambling involves risk and I may lose my entire stake *
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Two-Factor Authentication */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="text-sm text-gray-700 bg-green-50 border border-green-200 p-3 rounded">
                  <p className="font-semibold mb-1">📱 Two-Factor Authentication</p>
                  <p className="text-xs">Enter the 6-digit code sent to your phone.</p>
                </div>

                <div>
                  <Label className="text-gray-700">Verification Code *</Label>
                  <Input 
                    type="text" 
                    placeholder="000000"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
                    maxLength={6}
                    className="border-gray-300 focus-visible:ring-gray-400 mt-1 font-mono text-center text-2xl tracking-widest"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Code sent to •••• •••• 1234
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="text-xs text-blue-600 hover:underline">Resend Code</button>
                  <span className="text-xs text-gray-400">•</span>
                  <button className="text-xs text-blue-600 hover:underline">Use Email Instead</button>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-2 rounded text-xs text-gray-600">
                  Code expires in 10 minutes. You have 3 attempts remaining.
                </div>
              </div>
            )}

            <Separator />

            {/* Navigation Buttons */}
            <div className="flex gap-2">
              {step > 1 && (
                <Button 
                  onClick={() => setStep(step - 1)}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700"
                  disabled={loading}
                >
                  Back
                </Button>
              )}
              <Button 
                onClick={handleNext}
                disabled={!canProceed() || loading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 disabled:text-gray-500"
              >
                {loading ? "Processing..." : step === 4 ? "Place Bet" : "Continue"}
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Processing fee: $1.50 • Estimated completion: 2-3 minutes
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
