import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore, type Thread } from "@/lib/store"
import { MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ThreadCardProps {
  thread: Thread
  onClick?: () => void
}

export default function ThreadCard({ thread, onClick }: ThreadCardProps) {
  const { parlays, friends, user } = useStore()
  const parlay = parlays.find(p => p.id === thread.parlayId)
  const author = thread.authorId === user.id ? user : friends.find(f => f.id === thread.authorId)

  return (
    <Card 
      className="rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{thread.title}</CardTitle>
            <div className="mt-1 text-sm text-muted-foreground">
              by {author?.name} · {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <MessageCircle className="h-3 w-3" />
            {thread.commentsCount}
          </Badge>
        </div>
      </CardHeader>
      {parlay && (
        <CardContent>
          <div className="rounded-lg border border-border bg-muted/50 p-3 text-sm">
            <div className="font-medium mb-2">{parlay.legs.length}-leg parlay</div>
            <div className="space-y-1 text-xs text-muted-foreground">
              {parlay.legs.slice(0, 2).map(leg => (
                <div key={leg.id}>• {leg.market}</div>
              ))}
              {parlay.legs.length > 2 && (
                <div>• +{parlay.legs.length - 2} more...</div>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

