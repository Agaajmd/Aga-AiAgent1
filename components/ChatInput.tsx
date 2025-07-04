"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"
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
      
      <div className="bg-background border-t border-border/30 sticky bottom-0 backdrop-blur-sm bg-background/80">
      <div className="p-4 lg:p-6">
        <div className="max-w-3xl mx-auto">
          {/* Quick suggestions - Only show when empty */}
          {message.length === 0 && !isLoading && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(suggestion)}
                    className="px-3 py-2 text-sm bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground rounded-full transition-all duration-200 border border-border/30"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative">
            <div className={`relative flex items-end bg-background rounded-2xl border transition-all duration-300 ${
              isFocused 
                ? 'border-primary shadow-lg shadow-primary/20' 
                : 'border-border shadow-sm'
            }`}>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Tanyakan apa saja kepada Aga..."
                disabled={disabled}
                className="flex-1 resize-none border-0 bg-transparent px-4 py-4 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-0 min-h-[56px] max-h-[120px] rounded-2xl"
                rows={1}
                maxLength={1000}
              />
              
              {/* Send button integrated */}
              <div className="p-2">
                <button
                  type="submit"
                  disabled={!isMessageValid || isLoading || disabled}
                  className={`rounded-xl p-2 transition-all duration-300 ${
                    isMessageValid && !isLoading && !disabled
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105'
                      : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Character counter */}
            {message.length > 700 && (
              <div className={`absolute -bottom-6 right-0 text-xs ${
                message.length > 900 
                  ? 'text-destructive' 
                  : 'text-muted-foreground'
              }`}>
                {message.length}/1000
              </div>
            )}
          </form>

          {/* Typing indicator */}
          {isLoading && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>Aga sedang mengetik...</span>
            </div>
          )}

          {/* Character limit warning */}
          {message.length > 900 && (
            <div className="mt-2 text-sm text-destructive">
              {1000 - message.length} karakter tersisa
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  )
}

export default ChatInput
