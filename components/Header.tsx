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
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 shadow-lg animate-slide-down">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 animate-slide-in-left">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-primary via-primary/90 to-primary/70 rounded-xl flex items-center justify-center shadow-lg hover-lift animate-glow">
                <MessageSquare className="w-6 h-6 text-primary-foreground animate-float" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse-slow"></div>
            </div>
            <div className="animate-fade-in">
              <h1 className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                AI Agent Aga
              </h1>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-primary/70 animate-pulse" />
                <p className="text-sm text-muted-foreground">Asisten AI Cerdas Indonesia</p>
                <div className="flex items-center gap-1 ml-2">
                  <Wifi className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500 font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 animate-slide-in-right">
            {messageCount > 0 && onClearChat && (
              <button
                onClick={onClearChat}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-all duration-300 hover-lift hover:shadow-md group"
                title="Clear conversation"
              >
                <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
                <span className="hidden sm:inline">Clear Chat</span>
                {messageCount > 0 && (
                  <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium animate-scale">
                    {messageCount}
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
