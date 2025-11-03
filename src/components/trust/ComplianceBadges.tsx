import { Badge } from "@/components/ui/badge"
import { Shield, Ban, Radio, CheckCircle } from "lucide-react"

export default function ComplianceBadges() {
  const badges = [
    { icon: Shield, text: "Operate where licensed" },
    { icon: Ban, text: "No celebrity endorsements" },
    { icon: Radio, text: "Responsible ads" },
    { icon: CheckCircle, text: "KYC/AML enforced" },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {badges.map((badge, index) => (
        <div 
          key={index}
          className="flex items-center gap-3 rounded-lg border border-border bg-background p-4"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <badge.icon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-sm font-medium">{badge.text}</span>
        </div>
      ))}
    </div>
  )
}

