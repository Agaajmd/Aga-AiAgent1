"use client"
import { Bot, Sparkles, Zap } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 px-2 sm:px-0">
      <div className="flex gap-3 max-w-[85%] sm:max-w-[80%]">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-teal to-mint flex items-center justify-center text-white shadow-md animate-pulse">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Typing bubble */}
        <div className="bg-gradient-to-br from-pink/80 to-mint/10 rounded-2xl px-4 py-3 border border-mint/30 shadow-md backdrop-blur-sm animate-pulse mobile-message">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal/70 rounded-full animate-mobile-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-teal/70 rounded-full animate-mobile-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-teal/70 rounded-full animate-mobile-bounce" style={{ animationDelay: '0.4s' }}></div>
            <span className="ml-2 text-sm text-muted-foreground font-medium animate-pulse">
              Aga sedang mengetik...
            </span>
            <Sparkles className="w-3 h-3 text-teal animate-pulse ml-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
