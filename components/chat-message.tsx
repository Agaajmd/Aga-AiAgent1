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
    <div className={`w-full py-2 px-4 md:px-6 group ${isUser ? '' : 'bg-secondary/5'}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
          {/* AI Avatar - Only show for AI messages on the left */}
          {!isUser && (
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                message.isError
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'
              }`}>
                <Bot className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </div>
          )}

          {/* Message Bubble */}
          <div className={`relative max-w-[80%] md:max-w-[70%] ${isUser ? 'order-1' : 'order-2'}`}>
            {/* Sender name */}
            <div className={`text-xs font-medium mb-1 ${
              isUser ? 'text-right text-muted-foreground' : 'text-left text-muted-foreground'
            }`}>
              {isUser ? 'Anda' : 'AI Agent Aga'}
            </div>
            
            {/* Bubble container */}
            <div className={`relative px-4 py-3 shadow-sm ${
              isUser 
                ? 'chat-bubble-user' 
                : message.isError 
                  ? 'chat-bubble-error' 
                  : 'chat-bubble-ai'
            }`}>
              {/* Message content */}
              <div className={`prose prose-sm md:prose-base max-w-none ${
                isUser 
                  ? 'prose-invert' 
                  : message.isError 
                    ? 'prose-red dark:prose-red' 
                    : 'prose-gray dark:prose-invert'
              }`}>
                {isUser ? (
                  <p className="m-0 leading-relaxed break-words">{message.content}</p>
                ) : (
                  <div className={`leading-relaxed break-words ${message.isError ? 'text-destructive' : 'text-foreground'}`}>
                    <TypewriterText 
                      text={message.content} 
                      speed={25} 
                      delay={index * 100}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Timestamp */}
            <div className={`text-xs text-muted-foreground mt-1 ${
              isUser ? 'text-right' : 'text-left'
            }`}>
              {formatTime(message.timestamp)}
            </div>

            {/* Message actions - Only for AI messages */}
            {!isUser && !message.isError && (
              <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors touch-manipulation"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span className="hidden sm:inline">{copied ? 'Tersalin!' : 'Salin'}</span>
                </button>
                
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 px-2 py-1.5 text-xs hover:bg-secondary/50 rounded-lg transition-colors touch-manipulation ${
                    liked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Heart className={`w-3 h-3 ${liked ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">{liked ? 'Disukai' : 'Suka'}</span>
                </button>
              </div>
            )}
          </div>

          {/* User Avatar - Only show for user messages on the right */}
          {isUser && (
            <div className="flex-shrink-0 order-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-secondary to-secondary/80 flex items-center justify-center">
                <User className="w-4 h-4 md:w-5 md:h-5 text-secondary-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
