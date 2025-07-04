"use client"

import type React from "react"
import { MessageSquare, RotateCcw } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

interface HeaderProps {
  onClearChat?: () => void
  messageCount?: number
}

const Header: React.FC<HeaderProps> = ({ onClearChat, messageCount = 0 }) => {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                AI Agent Aga
              </h1>
              <p className="text-sm text-muted-foreground">Asisten AI Indonesia</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {messageCount > 0 && onClearChat && (
              <button
                onClick={onClearChat}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground bg-secondary hover:bg-secondary/80 rounded-lg transition-all duration-300"
                title="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden md:inline">Clear</span>
                {messageCount > 0 && (
                  <span className="ml-1 bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full text-xs">
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
