'use client'

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useStore } from "@/lib/store"
import { formatCurrency } from "@/lib/ui"
import { toast } from "sonner"

interface LimitsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LimitsModal({ open, onOpenChange }: LimitsModalProps) {
  const { limits, raiseLimit } = useStore()
  const [newLimit, setNewLimit] = useState([limits.dailyStake])
  const [reason, setReason] = useState("")
  const [pending, setPending] = useState(false)

  const handleKeepLimit = () => {
    toast.success("Daily limit unchanged")
    onOpenChange(false)
  }

  const handleRequestChange = () => {
    if (newLimit[0] > limits.dailyStake && !reason.trim()) {
      toast.error("Please provide a reason for increasing your limit")
      return
    }
    
    setPending(true)
    raiseLimit({ newLimit: newLimit[0], reason })
    
    setTimeout(() => {
      toast.success(
        <div className="space-y-1">
          <div className="font-semibold">Request submitted</div>
          <div className="text-sm">We'll review your limit change request within 24 hours.</div>
        </div>
      )
      setPending(false)
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Daily Stake Limit</DialogTitle>
          <DialogDescription>
            Your current daily limit helps you play responsibly. Changes require review.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current Limit</span>
              <span className="font-semibold">{formatCurrency(limits.dailyStake)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Remaining Today</span>
              <span className="font-semibold">{formatCurrency(limits.remainingStake)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Proposed New Limit: {formatCurrency(newLimit[0])}</Label>
            <Slider 
              value={newLimit}
              onValueChange={setNewLimit}
              min={50}
              max={500}
              step={25}
              className="py-2"
            />
          </div>

          {newLimit[0] !== limits.dailyStake && (
            <div className="space-y-2">
              <Label htmlFor="reason">
                Reason for change {newLimit[0] > limits.dailyStake && <span className="text-destructive">*</span>}
              </Label>
              <Textarea 
                id="reason"
                placeholder="Tell us why you want to change your limit..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleKeepLimit} disabled={pending}>
            Keep Current Limit
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleRequestChange} 
            disabled={pending || newLimit[0] === limits.dailyStake}
          >
            {pending ? "Submitting..." : "Request Change"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

