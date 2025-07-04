"use client"
import { Copy, User, Bot, Check, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/toast-provider"
import { useState } from "react"
import { TypewriterText } from "./AnimatedElements"

interface ChatMessageProps {
  message: {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
    isError?: boolean
  }
  index?: number
}

export function ChatMessage({ message, index = 0 }: ChatMessageProps) {
  const { addToast } = useToast()
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const isUser = message.role === "user"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      addToast({
        type: "success",
        message: "Pesan disalin! 📋",
      })
    } catch (err) {
      addToast({
        type: "error",
        message: "Gagal menyalin pesan",
      })
    }
  }

  const handleLike = () => {
    setLiked(!liked)
    if (!liked) {
      addToast({
        type: "success",
        message: "Terima kasih! 💖",
      })
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={`w-full ${isUser ? 'bg-secondary/20' : 'bg-background'} transition-colors`}>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isUser 
                ? 'bg-primary text-primary-foreground' 
                : message.isError
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-secondary text-secondary-foreground'
            }`}>
              {isUser ? (
                <User className="w-5 h-5" />
              ) : (
                <Bot className="w-5 h-5" />
              )}
            </div>
          </div>

          {/* Message content */}
          <div className="flex-1 min-w-0">
            {/* Sender name */}
            <div className="text-sm font-medium text-foreground mb-2">
              {isUser ? 'Anda' : 'AI Agent Aga'}
            </div>
            
            {/* Message text */}
            <div className="prose prose-gray max-w-none dark:prose-invert">
              {isUser ? (
                <p className="text-foreground m-0 leading-relaxed">{message.content}</p>
              ) : (
                <div className={`text-foreground leading-relaxed ${message.isError ? 'text-destructive' : ''}`}>
                  <TypewriterText 
                    text={message.content} 
                    speed={25} 
                    delay={index * 100}
                  />
                </div>
              )}
            </div>

            {/* Message actions */}
            {!isUser && !message.isError && (
              <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`h-8 px-2 ${
                    liked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            )}

            {/* Timestamp */}
            <div className="text-xs text-muted-foreground mt-2">
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
