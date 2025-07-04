"use client"
import { Copy, User, Bot, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/toast-provider"
import { useState } from "react"

interface ChatMessageProps {
  message: {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { addToast } = useToast()
  const [copied, setCopied] = useState(false)
  const isUser = message.role === "user"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      addToast({
        type: "success",
        message: "Pesan disalin ke clipboard!",
      })
    } catch (err) {
      addToast({
        type: "error",
        message: "Gagal menyalin pesan",
      })
    }
  }

  return (
    <div className={`flex gap-4 p-4 group ${isUser ? "flex-row-reverse" : ""} ${
      isUser ? "animate-slide-in-right" : "animate-slide-in-left"
    }`}>
      {/* Avatar with enhanced styling */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
          isUser 
            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg" 
            : "bg-gradient-to-br from-secondary to-muted text-foreground shadow-lg glass"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5" />
        ) : (
          <div className="relative">
            <Bot className="w-5 h-5" />
            <Sparkles className="w-2 h-2 absolute -top-1 -right-1 text-primary animate-pulse" />
          </div>
        )}
      </div>

      <div className={`flex-1 max-w-[85%] ${isUser ? "text-right" : ""}`}>
        {/* Message bubble with glassmorphism */}
        <div
          className={`inline-block p-4 rounded-2xl transition-all duration-300 hover:shadow-lg relative overflow-hidden ${
            isUser 
              ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md shadow-md" 
              : "bg-gradient-to-br from-background/50 to-muted/30 text-foreground rounded-bl-md glass border border-border/20"
          }`}
        >
          {/* Message content with enhanced typography */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap relative z-10">
            {message.content}
          </p>
          
          {/* Subtle pattern overlay for AI messages */}
          {!isUser && (
            <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>
          )}
        </div>

        {/* Enhanced metadata section */}
        <div
          className={`flex items-center gap-3 mt-3 text-xs text-muted-foreground/70 transition-all duration-300 opacity-60 group-hover:opacity-100 ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          <span className="font-medium">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          
          {/* Enhanced copy button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={copyToClipboard} 
            className="h-7 w-7 p-0 rounded-lg transition-all duration-300 hover:bg-accent/50 hover:scale-110 group/btn"
            title="Salin pesan"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-500 animate-scale" />
            ) : (
              <Copy className="w-3 h-3 group-hover/btn:scale-110 transition-transform" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
