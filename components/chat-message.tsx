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
    <div className={`group flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in px-2 sm:px-0`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3 max-w-[85%] sm:max-w-[80%] lg:max-w-[70%]`}>
        {/* Avatar - Mobile optimized */}
        <div className="flex-shrink-0">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
            isUser 
              ? 'bg-gradient-to-br from-teal to-mint text-white' 
              : message.isError
                ? 'bg-gradient-to-br from-red-500 to-red-600 text-white'
                : 'bg-gradient-to-br from-teal to-mint text-white'
          }`}>
            {isUser ? (
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </div>
          {/* Status indicator */}
          {!isUser && !message.isError && (
            <div className="w-2 h-2 bg-teal rounded-full mt-1 ml-6 sm:ml-7 animate-pulse"></div>
          )}
        </div>

        {/* Message content - Mobile responsive */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className={`rounded-2xl px-4 py-3 shadow-md backdrop-blur-sm border transition-all duration-300 mobile-message ${
            isUser
              ? 'bg-gradient-to-br from-teal to-mint text-white border-teal/20' 
              : message.isError
                ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                : 'bg-gradient-to-br from-pink/80 to-mint/10 text-foreground border-mint/30 hover:border-teal/30'
          }`}>
            
            {/* Message text with mobile typography */}
            <div className="prose prose-sm sm:prose-base max-w-none text-inherit leading-relaxed">
              {isUser ? (
                <p className="text-base font-medium m-0">{message.content}</p>
              ) : (
                <div className="text-base">
                  <TypewriterText 
                    text={message.content} 
                    speed={25} 
                    delay={index * 100}
                  />
                </div>
              )}
            </div>

            {/* Message actions - Mobile touch friendly */}
            {!isUser && !message.isError && (
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-mint/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8 px-3 text-sm text-muted-foreground hover:text-teal transition-all duration-200 hover:bg-teal/10 touch-manipulation active:scale-95 rounded-lg mobile-touch"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="ml-1 hidden sm:inline">{copied ? 'Tersalin!' : 'Salin'}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`h-8 px-3 text-sm transition-all duration-200 hover:bg-teal/10 touch-manipulation active:scale-95 rounded-lg mobile-touch ${
                    liked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-muted-foreground hover:text-teal'
                  }`}
                >
                  <Heart className={`w-4 h-4 transition-all duration-200 ${liked ? 'fill-current scale-110' : ''}`} />
                  <span className="ml-1 hidden sm:inline">{liked ? 'Disukai' : 'Suka'}</span>
                </Button>
              </div>
            )}
          </div>

          {/* Timestamp - Mobile friendly */}
          <div className={`text-xs text-muted-foreground/70 mt-2 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
            {!isUser && (
              <span className="ml-2 inline-flex items-center gap-1 opacity-60">
                <Sparkles className="w-2.5 h-2.5 text-teal" />
                <span className="hidden sm:inline">AI Agent Aga</span>
                <span className="sm:hidden">Aga</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
