"use client"
import { Bot, Sparkles, Zap } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3 sm:mb-4 px-3 sm:px-0">
      <div className="flex gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-md animate-pulse">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Typing bubble */}
        <div className="bg-gradient-to-br from-background/80 to-muted/20 rounded-2xl sm:rounded-3xl px-4 py-3 sm:px-5 sm:py-4 border border-border/50 shadow-md backdrop-blur-sm animate-pulse">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            <span className="ml-2 text-xs sm:text-sm text-muted-foreground font-medium animate-pulse">
              Aga sedang mengetik...
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
