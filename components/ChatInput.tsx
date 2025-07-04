"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Loader2, Sparkles, Mic, Zap, Plane } from "lucide-react"
import { FlyingPlane } from "./AnimatedElements"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  disabled?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, disabled = false }) => {
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showPlane, setShowPlane] = useState(false)
  const [lastSentMessage, setLastSentMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading && !disabled) {
      setLastSentMessage(message.trim())
      setShowPlane(true)
      
      // Delay sending message to show plane animation
      setTimeout(() => {
        onSendMessage(message.trim())
        setMessage("")
        setIsTyping(false)
      }, 500)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    setIsTyping(e.target.value.length > 0)
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  const isMessageValid = message.trim().length > 0 && message.length <= 1000
  const quickSuggestions = [
    "Halo Aga! 👋",
    "Jelaskan tentang AI",
    "Apa yang bisa kamu lakukan?",
    "Ceritakan hal menarik"
  ]

  return (
    <>
      <FlyingPlane 
        trigger={showPlane} 
        onComplete={() => setShowPlane(false)} 
      />
      
      <div className="border-t border-border/20 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 animate-mobile-slide-in mobile-safe">
        <div className="max-w-full mx-auto px-3 py-3 sm:px-4 sm:py-4 space-y-3 sm:space-y-4">
          {/* Quick suggestions - Mobile optimized */}
          {message.length === 0 && !isLoading && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 animate-text-reveal overflow-x-auto pb-1">
              {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(suggestion)}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm bg-gradient-to-r from-muted/40 to-muted/60 hover:from-primary/10 hover:to-primary/20 text-muted-foreground hover:text-foreground rounded-full transition-all duration-300 border border-border/20 hover:border-primary/30 group glass-mobile animate-gentle-float whitespace-nowrap flex-shrink-0 touch-manipulation active:scale-95"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Sparkles className="w-3 h-3 inline mr-1 group-hover:animate-pulse" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-end gap-3 sm:gap-4">
            <div className={`flex-1 relative transition-all duration-500 ${isFocused ? 'animate-glow' : ''}`}>
              <div className={`relative rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 glass-mobile ${
                isFocused 
                  ? 'border-primary/60 bg-background/95 shadow-2xl shadow-primary/10' 
                  : 'border-border/20 bg-background/40'
              } backdrop-blur-xl`}>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Tanyakan apa saja kepada Aga..."
                  disabled={disabled}
                  className="w-full resize-none border-0 bg-transparent px-4 sm:px-5 py-3 sm:py-4 pr-14 sm:pr-16 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0 min-h-[52px] sm:min-h-[56px] max-h-[120px] transition-all rounded-2xl sm:rounded-3xl"
                  rows={1}
                  maxLength={1000}
                />
                
                {/* Enhanced character counter for mobile */}
                {message.length > 0 && (
                  <div className={`absolute bottom-2 sm:bottom-3 right-12 sm:right-14 text-xs transition-all duration-300 animate-fade-in px-2 py-1 rounded-full backdrop-blur-sm ${
                    message.length > 900 
                      ? 'text-destructive font-medium bg-destructive/10' 
                      : message.length > 700 
                        ? 'text-yellow-500 bg-yellow-500/10' 
                        : 'text-muted-foreground/60 bg-background/20'
                  }`}>
                    {message.length}/1000
                  </div>
                )}
                
                {/* Voice input button - Mobile optimized */}
                <button
                  type="button"
                  className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 p-2.5 text-muted-foreground/60 hover:text-primary transition-all duration-300 rounded-lg hover:bg-primary/10 group touch-hover"
                  title="Voice input (coming soon)"
                  disabled
                >
                  <Mic className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              
              {/* Enhanced typing indicator for mobile */}
              {isLoading && (
                <div className="absolute -bottom-12 left-4 flex items-center gap-3 text-xs text-muted-foreground animate-mobile-slide-in">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-primary/70 rounded-full animate-mobile-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-primary/70 rounded-full animate-mobile-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-2 h-2 bg-primary/70 rounded-full animate-mobile-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                  <span className="animate-pulse font-medium">Aga sedang mengetik...</span>
                  <Zap className="w-3 h-3 animate-pulse text-primary/60" />
                </div>
              )}
            </div>

            {/* Enhanced send button for mobile */}
            <button
              type="submit"
              disabled={!isMessageValid || isLoading || disabled}
              className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 group min-w-[52px] sm:min-w-[56px] h-[52px] sm:h-[56px] touch-hover ${
                isMessageValid && !isLoading && !disabled
                  ? 'bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 glass-mobile'
                  : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center relative z-10">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : showPlane ? (
                  <Plane className="w-5 h-5 animate-bounce" />
                ) : (
                  <Send className="w-5 h-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:scale-95" />
                )}
              </div>
              
              {/* Button ripple effect for mobile */}
              {isMessageValid && !isLoading && !disabled && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/50 opacity-0 group-hover:opacity-100 group-active:opacity-70 transition-all duration-300 rounded-xl sm:rounded-2xl"></div>
              )}
              
              {/* Send button glow */}
              {isMessageValid && !isLoading && !disabled && (
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-primary/20 blur-md group-hover:bg-primary/30 transition-all duration-300"></div>
              )}
            </button>
          </form>

          {/* Character limit warning - Mobile friendly */}
          {message.length > 900 && (
            <div className="flex items-center gap-2 text-xs text-destructive animate-text-reveal p-3 bg-destructive/10 rounded-xl border border-destructive/20">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
              <span className="font-medium">{1000 - message.length} karakter tersisa</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatInput
