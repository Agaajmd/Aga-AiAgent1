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
    <div className={`group flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 animate-fade-in px-3 sm:px-0`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%] lg:max-w-[70%]`}>
        {/* Avatar - Mobile optimized */}
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
            isUser 
              ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground' 
              : message.isError
                ? 'bg-gradient-to-br from-red-500 to-red-600 text-white'
                : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
          }`}>
            {isUser ? (
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </div>
          {/* Status indicator */}
          {!isUser && !message.isError && (
            <div className="w-2 h-2 bg-green-400 rounded-full mt-1 ml-6 sm:ml-7 animate-pulse"></div>
          )}
        </div>

        {/* Message content - Mobile responsive */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className={`rounded-2xl sm:rounded-3xl px-3 py-2.5 sm:px-4 sm:py-3 shadow-md backdrop-blur-sm border transition-all duration-300 ${
            isUser
              ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-primary/20' 
              : message.isError
                ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                : 'bg-gradient-to-br from-background/80 to-muted/20 text-foreground border-border/50 hover:border-primary/30'
          }`}>
            
            {/* Message text with mobile typography */}
            <div className="prose prose-sm sm:prose-base max-w-none text-inherit leading-relaxed">
              {isUser ? (
                <p className="text-sm sm:text-base font-medium m-0">{message.content}</p>
              ) : (
                <div className="text-sm sm:text-base">
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
              <div className="flex items-center gap-1 sm:gap-2 mt-2 pt-2 border-t border-border/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-6 px-2 sm:h-8 sm:px-3 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-primary/10 touch-manipulation active:scale-95 rounded-lg"
                >
                  {copied ? (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  ) : (
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="ml-1 hidden sm:inline">{copied ? 'Tersalin!' : 'Salin'}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`h-6 px-2 sm:h-8 sm:px-3 text-xs sm:text-sm transition-all duration-200 hover:bg-primary/10 touch-manipulation active:scale-95 rounded-lg ${
                    liked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Heart className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${liked ? 'fill-current scale-110' : ''}`} />
                  <span className="ml-1 hidden sm:inline">{liked ? 'Disukai' : 'Suka'}</span>
                </Button>
              </div>
            )}
          </div>

          {/* Timestamp - Mobile friendly */}
          <div className={`text-xs text-muted-foreground/70 mt-1 px-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
            {!isUser && (
              <span className="ml-2 inline-flex items-center gap-1 opacity-60">
                <Sparkles className="w-2.5 h-2.5" />
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
