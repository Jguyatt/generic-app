import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RoadmapTimeline() {
  const phases = [
    {
      title: "Build & Test",
      period: "Months 0-6",
      status: "in-progress",
      milestones: [
        "Core platform development",
        "Responsible gaming features",
        "KYC/AML integration",
        "Private beta with invite-only testers"
      ]
    },
    {
      title: "Regulatory & Compliance",
      period: "Months 6-10",
      status: "upcoming",
      milestones: [
        "iGaming Ontario license application",
        "Third-party security audits",
        "Compliance framework finalization",
        "Legal review and approval"
      ]
    },
    {
      title: "Launch",
      period: "Months 10-12",
      status: "upcoming",
      milestones: [
        "Soft launch in Ontario",
        "Marketing campaign rollout",
        "User onboarding at scale",
        "Full public availability"
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {phases.map((phase, index) => (
        <Card key={index} className="rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{phase.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{phase.period}</p>
              </div>
              <Badge variant={phase.status === "in-progress" ? "default" : "secondary"}>
                {phase.status === "in-progress" ? "In Progress" : "Upcoming"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {phase.milestones.map((milestone, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground">•</span>
                  <span>{milestone}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

