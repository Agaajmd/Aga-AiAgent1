"use client"
import { Bot, Sparkles, Zap } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="w-full bg-background">
      <div className="px-4 py-4 md:px-6 md:py-6 max-w-4xl mx-auto">
        <div className="flex gap-3 md:gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>

          {/* Typing content */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-foreground mb-2">
              AI Agent Aga
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm">sedang mengetik...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
