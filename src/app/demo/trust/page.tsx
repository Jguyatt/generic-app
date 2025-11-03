import ComplianceBadges from "@/components/trust/ComplianceBadges"
import SecurityPanel from "@/components/trust/SecurityPanel"

export default function TrustPage() {
  return (
    <div className="container mx-auto max-w-screen-lg px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Trust & Compliance</h1>
        <p className="text-muted-foreground mt-2">
          Your security and our regulatory compliance
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Our Commitments</h2>
        <ComplianceBadges />
      </section>

      <SecurityPanel />

      <div className="rounded-lg border border-border bg-muted/50 p-6 space-y-4">
        <h3 className="text-lg font-semibold">Regulatory Oversight</h3>
        <div className="grid gap-4 sm:grid-cols-2 text-sm">
          <div>
            <p className="font-medium mb-1">iGaming Ontario</p>
            <p className="text-muted-foreground">
              Licensed and regulated by the Alcohol and Gaming Commission of Ontario (AGCO)
            </p>
          </div>
          <div>
            <p className="font-medium mb-1">Responsible Gaming</p>
            <p className="text-muted-foreground">
              RG Check accredited and compliant with all responsible gaming standards
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground border-t pt-6">
        <p>🔒 All information is encrypted and stored securely</p>
        <p className="mt-1">Questions? Contact compliance@mikebets.demo</p>
      </div>
    </div>
  )
}

