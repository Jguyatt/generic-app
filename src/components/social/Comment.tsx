import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useStore, type Comment as CommentType } from "@/lib/store"
import { formatDistanceToNow } from "date-fns"

interface CommentProps {
  comment: CommentType
}

export default function Comment({ comment }: CommentProps) {
  const { friends, user } = useStore()
  const author = comment.authorId === user.id ? user : friends.find(f => f.id === comment.authorId)

  return (
    <div className="flex gap-3 rounded-lg p-3 hover:bg-accent/50 transition-colors">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
          {author?.name[0] || 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{author?.name || 'Unknown'}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm">{comment.text}</p>
      </div>
    </div>
  )
}

