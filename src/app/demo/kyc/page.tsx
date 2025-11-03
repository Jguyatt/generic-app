import KYCFlow from "@/components/trust/KYCFlow"

export default function KYCPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">Account Verification</h1>
        <p className="text-muted-foreground mt-2">
          We need to verify your identity to comply with regulatory requirements
        </p>
      </div>
      <KYCFlow />
    </div>
  )
}

