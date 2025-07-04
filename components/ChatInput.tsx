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
      
      <div className="bg-background border-t border-border/30">
        <div className="max-w-full mx-auto px-4 py-4 space-y-4">
          {/* Simple text recommendations - Mobile focused */}
          {message.length === 0 && !isLoading && (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground mb-3">Coba tanyakan:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(suggestion)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-2"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="flex-1 relative">
              <div className={`relative rounded-2xl border transition-all duration-300 ${
                isFocused 
                  ? 'border-primary bg-background' 
                  : 'border-border bg-background'
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
                  className="w-full resize-none border-0 bg-transparent px-4 py-4 pr-14 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-0 min-h-[56px] max-h-[120px] transition-all rounded-2xl"
                  rows={1}
                  maxLength={1000}
                />
                
                {/* Character counter */}
                {message.length > 700 && (
                  <div className={`absolute bottom-2 right-2 text-xs ${
                    message.length > 900 
                      ? 'text-destructive' 
                      : 'text-muted-foreground'
                  }`}>
                    {message.length}/1000
                  </div>
                )}
              </div>
              
              {/* Simple typing indicator */}
              {isLoading && (
                <div className="absolute -bottom-8 left-0 text-sm text-muted-foreground">
                  <span>Aga sedang mengetik...</span>
                </div>
              )}
            </div>

            {/* Simple send button */}
            <button
              type="submit"
              disabled={!isMessageValid || isLoading || disabled}
              className={`rounded-2xl p-4 transition-all duration-300 min-w-[56px] h-[56px] ${
                isMessageValid && !isLoading && !disabled
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>

          {/* Character limit warning */}
          {message.length > 900 && (
            <div className="text-sm text-destructive">
              {1000 - message.length} karakter tersisa
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ChatInput
