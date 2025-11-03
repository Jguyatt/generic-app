import RoadmapTimeline from "@/components/marketing/RoadmapTimeline"

export default function RoadmapPage() {
  return (
    <div className="container mx-auto max-w-screen-lg px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">12-Month Roadmap</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          From private beta to public launch, here's our journey to bringing 
          social betting to Ontario
        </p>
      </div>

      <RoadmapTimeline />

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
        <p className="text-sm">
          <strong>Want early access?</strong> Join our waitlist to be among the first to try MikeBets
        </p>
      </div>
    </div>
  )
}

