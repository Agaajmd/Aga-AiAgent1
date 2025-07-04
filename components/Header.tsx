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
    <header className="border-b border-mint/30 bg-gradient-to-r from-pink via-mint/10 to-teal/5 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-full mx-auto px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center justify-between h-12 sm:h-auto">
          {/* Logo and title - More compact for mobile */}
          <div className="flex items-center gap-2 animate-slide-in-left min-w-0 flex-1">
            <div className="relative flex-shrink-0">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-teal to-mint rounded-lg flex items-center justify-center shadow-md">
                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-lg font-bold text-foreground text-teal truncate">
                AI Agent Aga
              </h1>
              {/* Mobile-optimized subtitle */}
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-teal rounded-full animate-pulse"></div>
                <span className="text-xs text-teal font-medium">Online</span>
                <div className="hidden sm:flex items-center gap-1 ml-1">
                  <Sparkles className="w-2 h-2 text-teal animate-pulse" />
                  <span className="text-xs text-muted-foreground">Asisten AI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons - Compact mobile */}
          <div className="flex items-center gap-1 sm:gap-2 animate-slide-in-right flex-shrink-0">
            {messageCount > 0 && onClearChat && (
              <button
                onClick={onClearChat}
                className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 text-xs text-muted-foreground hover:text-foreground bg-mint/20 hover:bg-mint/30 rounded-lg transition-all duration-300 touch-manipulation active:scale-95 relative mobile-touch"
                title="Clear conversation"
              >
                <RotateCcw className="w-3 h-3 transition-transform group-hover:rotate-180 duration-500" />
                <span className="hidden md:inline text-xs">Clear</span>
                {messageCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal text-white px-1 py-0.5 rounded-full text-xs font-medium min-w-[1rem] h-4 flex items-center justify-center">
                    {messageCount > 99 ? '99+' : messageCount}
                  </span>
                )}
              </button>
            )}
            <div className="scale-75 sm:scale-100">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
