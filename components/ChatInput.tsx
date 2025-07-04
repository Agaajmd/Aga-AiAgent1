"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Loader2, Sparkles, Mic, Zap } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  disabled?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, disabled = false }) => {
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
      setIsTyping(false)
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
    <div className="border-t border-border/30 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 animate-slide-up">
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Quick suggestions */}
        {message.length === 0 && !isLoading && (
          <div className="flex flex-wrap gap-2 animate-fade-in">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setMessage(suggestion)}
                className="px-3 py-2 text-xs bg-gradient-to-r from-muted/40 to-muted/60 hover:from-primary/10 hover:to-primary/20 text-muted-foreground hover:text-foreground rounded-full transition-all duration-300 hover-lift border border-border/20 hover:border-primary/30 group animate-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Sparkles className="w-3 h-3 inline mr-1.5 group-hover:animate-pulse" />
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <div className={`flex-1 relative transition-all duration-500 ${isFocused ? 'animate-glow' : ''}`}>
            <div className={`relative rounded-2xl border-2 transition-all duration-300 glass ${
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
                className="w-full resize-none border-0 bg-transparent px-5 py-4 pr-16 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-0 min-h-[56px] max-h-[120px] transition-all"
                rows={1}
                maxLength={1000}
              />
              
              {/* Enhanced character counter */}
              {message.length > 0 && (
                <div className={`absolute bottom-3 right-14 text-xs transition-all duration-300 animate-fade-in ${
                  message.length > 900 
                    ? 'text-destructive font-medium' 
                    : message.length > 700 
                      ? 'text-yellow-500' 
                      : 'text-muted-foreground/60'
                }`}>
                  {message.length}/1000
                </div>
              )}
              
              {/* Voice input button */}
              <button
                type="button"
                className="absolute bottom-3 right-3 p-2 text-muted-foreground/60 hover:text-primary transition-all duration-300 rounded-lg hover:bg-primary/10 group"
                title="Voice input (coming soon)"
                disabled
              >
                <Mic className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            
            {/* Enhanced typing indicator */}
            {isLoading && (
              <div className="absolute -bottom-10 left-4 flex items-center gap-3 text-xs text-muted-foreground animate-fade-in">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2 h-2 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
                <span className="animate-pulse">Aga sedang mengetik...</span>
                <Zap className="w-3 h-3 animate-pulse text-primary/60" />
              </div>
            )}
          </div>

          {/* Enhanced send button */}
          <button
            type="submit"
            disabled={!isMessageValid || isLoading || disabled}
            className={`relative overflow-hidden rounded-xl p-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 group min-w-[56px] h-[56px] ${
              isMessageValid && !isLoading && !disabled
                ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 animate-glow'
                : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center relative z-10">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              )}
            </div>
            
            {/* Button ripple effect */}
            {isMessageValid && !isLoading && !disabled && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/50 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"></div>
            )}
            
            {/* Send button glow */}
            {isMessageValid && !isLoading && !disabled && (
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg group-hover:bg-primary/30 transition-all duration-300"></div>
            )}
          </button>
        </form>

        {/* Character limit warning */}
        {message.length > 900 && (
          <div className="flex items-center gap-2 text-xs text-destructive animate-fade-in">
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
            <span>{1000 - message.length} karakter tersisa</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatInput
