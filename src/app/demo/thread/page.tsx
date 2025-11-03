'use client'

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ParlayCard from "@/components/parlay/ParlayCard"
import Comment from "@/components/social/Comment"
import Composer from "@/components/social/Composer"
import ResponsibleRibbon from "@/components/rg/ResponsibleRibbon"

export default function ThreadPage() {
  const { threads, comments, parlays } = useStore()
  const thread = threads[0]
  const threadComments = comments.filter(c => c.threadId === thread.id)
  const parlay = parlays.find(p => p.id === thread.parlayId)

  return (
    <>
      <ResponsibleRibbon />
      <div className="container mx-auto max-w-screen-lg px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{thread.title}</h1>
          <p className="text-muted-foreground mt-2">
            Discussion about this weekend's slate
          </p>
        </div>

        {parlay && (
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Attached Parlay</h2>
            <ParlayCard parlay={parlay} />
          </div>
        )}

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Comments ({threadComments.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {threadComments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </CardContent>
        </Card>

        <Composer threadId={thread.id} />
      </div>
    </>
  )
}

