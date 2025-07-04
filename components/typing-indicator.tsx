"use client"
import { Bot, Sparkles, Zap } from "lucide-react"

export function TypingIndicator() {
  return (
    <div className="flex gap-4 p-4 animate-slide-in-left">
      {/* Enhanced AI avatar */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-muted text-foreground flex items-center justify-center glass shadow-lg animate-pulse-slow">
        <div className="relative">
          <Bot className="w-5 h-5" />
          <Sparkles className="w-2 h-2 absolute -top-1 -right-1 text-primary animate-pulse" />
        </div>
      </div>

      <div className="flex-1">
        {/* Enhanced typing bubble */}
        <div className="inline-block p-4 rounded-2xl rounded-bl-md glass border border-border/20 bg-gradient-to-br from-background/50 to-muted/30 shadow-md">
          <div className="flex items-center gap-2">
            {/* Enhanced typing dots */}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2.5 h-2.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2.5 h-2.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            
            {/* Thinking icon */}
            <Zap className="w-3 h-3 text-primary/60 animate-pulse ml-2" />
          </div>
        </div>
        
        {/* Enhanced status text */}
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground/70 animate-fade-in">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Aga sedang berpikir...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
