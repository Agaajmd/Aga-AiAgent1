"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"
import { FlyingPlane } from "./AnimatedElements"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  disabled?: boolean
  onFocus?: () => void
  onBlur?: () => void
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, disabled = false, onFocus, onBlur }) => {
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showPlane, setShowPlane] = useState(false)
  const [lastSentMessage, setLastSentMessage] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Detect if user is on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const handleFocus = () => {
    setIsFocused(true)
    
    // Call parent onFocus handler for keyboard detection
    if (onFocus) {
      onFocus()
    }
    
    // On mobile, ensure the input is properly positioned
    if (isMobile && textareaRef.current) {
      // Small delay to let the keyboard animation start
      setTimeout(() => {
        textareaRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }, 100)
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    
    // Call parent onBlur handler for keyboard detection
    if (onBlur) {
      onBlur()
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

  return (
    <>
      <FlyingPlane 
        trigger={showPlane} 
        onComplete={() => setShowPlane(false)} 
      />
      
      <div className="bg-background border-t border-border/30 sticky bottom-0 backdrop-blur-sm bg-background/80">
      <div className={`bg-background/95 backdrop-blur-sm lg:bg-background/95 lg:backdrop-blur-sm ${
        isFocused && isMobile ? 'keyboard-visible' : ''
      }`}>
        <div className="p-3 md:p-4 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className={`relative flex items-end bg-background rounded-2xl border transition-all duration-300 shadow-lg lg:shadow-sm ${
              isFocused 
                ? 'border-primary shadow-lg shadow-primary/10' 
                : 'border-border'
            }`}>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Ketik pesan Anda..."
                disabled={disabled}
                className={`flex-1 resize-none border-0 bg-transparent px-4 py-3 md:py-4 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-0 min-h-[48px] max-h-[120px] rounded-2xl ${
                  isMobile ? 'mobile-touch-target' : ''
                }`}
                rows={1}
                maxLength={1000}
              />
              
              {/* Send button integrated */}
              <div className="p-2">
                <button
                  type="submit"
                  disabled={!isMessageValid || isLoading || disabled}
                  className={`rounded-xl p-2.5 md:p-3 transition-all duration-300 touch-manipulation ${
                    isMessageValid && !isLoading && !disabled
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 shadow-md'
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
            
            {/* Character counter - Only show when approaching limit */}
            {message.length > 800 && (
              <div className={`absolute -bottom-6 right-0 text-xs ${
                message.length > 950 
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
        </div>
      </div>
      </div>
    </>
  )
}

export default ChatInput
