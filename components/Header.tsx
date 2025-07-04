"use client"

import type React from "react"
import { MessageSquare, RotateCcw, Wifi, Sparkles } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

interface HeaderProps {
  onClearChat?: () => void
  messageCount?: number
}

const Header: React.FC<HeaderProps> = ({ onClearChat, messageCount = 0 }) => {
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 shadow-lg animate-slide-down">
      <div className="max-w-full mx-auto px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and title - optimized for mobile */}
          <div className="flex items-center gap-2 sm:gap-4 animate-slide-in-left min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary via-primary/90 to-primary/70 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg hover-lift animate-glow">
                <MessageSquare className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground animate-float" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
            </div>
            <div className="animate-fade-in min-w-0 flex-1">
              <h1 className="text-base sm:text-xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate">
                AI Agent Aga
              </h1>
              {/* Hide subtitle on very small screens, show simplified version */}
              <div className="hidden xs:flex items-center gap-1 sm:gap-2">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary/70 animate-pulse flex-shrink-0" />
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Asisten AI Cerdas</p>
                <div className="hidden sm:flex items-center gap-1 ml-1">
                  <Wifi className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500 flex-shrink-0" />
                  <span className="text-xs text-green-500 font-medium">Online</span>
                </div>
              </div>
              {/* Mobile status indicator */}
              <div className="flex xs:hidden items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-500 font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* Action buttons - mobile optimized */}
          <div className="flex items-center gap-1.5 sm:gap-3 animate-slide-in-right flex-shrink-0">
            {messageCount > 0 && onClearChat && (
              <button
                onClick={onClearChat}
                className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-md sm:rounded-lg transition-all duration-300 hover-lift hover:shadow-md group relative"
                title="Clear conversation"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:rotate-180 duration-500" />
                <span className="hidden md:inline">Clear</span>
                {messageCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground px-1 py-0.5 rounded-full text-xs font-medium animate-scale min-w-[1.25rem] h-5 flex items-center justify-center">
                    {messageCount > 99 ? '99+' : messageCount}
                  </span>
                )}
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
