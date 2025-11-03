import ParlayBuilder from "@/components/parlay/ParlayBuilder"
import ResponsibleRibbon from "@/components/rg/ResponsibleRibbon"

export default function BuilderPage() {
  return (
    <>
      <ResponsibleRibbon />
      <div className="container mx-auto max-w-screen-xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Parlay Builder</h1>
          <p className="text-muted-foreground mt-2">
            Build your own parlay or tail one from your friends
          </p>
        </div>
        <ParlayBuilder />
      </div>
    </>
  )
}

