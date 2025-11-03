'use client'

import { useStore } from "@/lib/store"
import ParlayCard from "@/components/parlay/ParlayCard"
import ThreadCard from "@/components/social/ThreadCard"
import ResponsibleRibbon from "@/components/rg/ResponsibleRibbon"
import { Card, CardContent } from "@/components/ui/card"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { parlays, threads, friends } = useStore()
  const router = useRouter()

  return (
    <>
      <ResponsibleRibbon />
      <div className="container mx-auto max-w-screen-xl px-4 py-8 space-y-8">
        {/* Cold Open: Notifications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Card className="rounded-2xl">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Sam built a 4-leg parlay</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Ava tailed Sam's parlay</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Friend Parlays */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Friends' Parlays</h2>
            <p className="text-sm text-muted-foreground">{friends.length} friends active</p>
          </div>
          <div className="space-y-4">
            {parlays.slice(0, 2).map(parlay => (
              <ParlayCard key={parlay.id} parlay={parlay} />
            ))}
          </div>
        </section>

        {/* Thread Preview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Active Discussions</h2>
          {threads.map(thread => (
            <ThreadCard 
              key={thread.id} 
              thread={thread}
              onClick={() => router.push('/demo/thread')}
            />
          ))}
        </section>
      </div>
    </>
  )
}

