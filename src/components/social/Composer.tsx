'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/lib/store"
import { toast } from "sonner"

interface ComposerProps {
  threadId: string
}

export default function Composer({ threadId }: ComposerProps) {
  const [text, setText] = useState("")
  const { postComment } = useStore()

  const handleSubmit = () => {
    if (!text.trim()) {
      toast.error("Please enter a comment")
      return
    }
    postComment(threadId, text)
    setText("")
    toast.success("Comment posted!")
  }

  return (
    <div className="space-y-3 rounded-lg border border-border bg-background p-4">
      <Textarea 
        placeholder="Add a comment... Use @name to mention friends"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[80px]"
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit}>Post Comment</Button>
      </div>
    </div>
  )
}

