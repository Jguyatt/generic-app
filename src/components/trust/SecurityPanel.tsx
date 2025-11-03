import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Server, FileCheck, Shield } from "lucide-react"

export default function SecurityPanel() {
  const items = [
    {
      icon: Lock,
      title: "Encryption in Transit & at Rest",
      description: "All data encrypted using industry-standard protocols (TLS 1.3, AES-256)"
    },
    {
      icon: Server,
      title: "Segregated Workloads",
      description: "Isolated environments for different data types and processing stages"
    },
    {
      icon: FileCheck,
      title: "Comprehensive Audit Logging",
      description: "Every action tracked and logged for compliance and security audits"
    },
    {
      icon: Shield,
      title: "Regular Security Assessments",
      description: "Third-party penetration testing and vulnerability assessments"
    }
  ]

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Security & Infrastructure</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={index} className="space-y-2 rounded-lg border border-border p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <h4 className="text-sm font-semibold">{item.title}</h4>
            </div>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

