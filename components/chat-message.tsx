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
    <div className={`w-full ${isUser ? 'bg-secondary/10' : 'bg-background'} transition-colors group`}>
      <div className="px-4 py-4 md:px-6 md:py-6 max-w-4xl mx-auto">
        <div className="flex gap-3 md:gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
              isUser 
                ? 'bg-primary text-primary-foreground' 
                : message.isError
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-secondary text-secondary-foreground'
            }`}>
              {isUser ? (
                <User className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Bot className="w-4 h-4 md:w-5 md:h-5" />
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
            <div className="prose prose-sm md:prose-base prose-gray max-w-none dark:prose-invert">
              {isUser ? (
                <p className="text-foreground m-0 leading-relaxed break-words">{message.content}</p>
              ) : (
                <div className={`text-foreground leading-relaxed break-words ${message.isError ? 'text-destructive' : ''}`}>
                  <TypewriterText 
                    text={message.content} 
                    speed={25} 
                    delay={index * 100}
                  />
                </div>
              )}
            </div>

            {/* Message actions - Mobile optimized */}
            {!isUser && !message.isError && (
              <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors touch-manipulation"
                >
                  {copied ? (
                    <Check className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                  <span className="hidden md:inline">{copied ? 'Tersalin!' : 'Salin'}</span>
                </button>
                
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 px-2 py-1.5 md:px-3 md:py-2 text-xs md:text-sm hover:bg-secondary/50 rounded-lg transition-colors touch-manipulation ${
                    liked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Heart className={`w-3 h-3 md:w-4 md:h-4 ${liked ? 'fill-current' : ''}`} />
                  <span className="hidden md:inline">{liked ? 'Disukai' : 'Suka'}</span>
                </button>
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
