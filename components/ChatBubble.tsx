"use client"

import type React from "react"
import { Copy, User, Bot, AlertCircle } from "lucide-react"

interface ChatBubbleProps {
  message: string
  isUser: boolean
  isLoading?: boolean
  isError?: boolean
  timestamp?: Date
  onCopy?: () => void
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isUser,
  isLoading = false,
  isError = false,
  timestamp,
  onCopy,
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      onCopy?.()
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  return (
    <div className={`flex w-full mb-4 animate-fade-in ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[85%] sm:max-w-[70%] ${isUser ? "flex-row-reverse" : "flex-row"} items-start gap-3`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
            isUser
              ? "bg-primary text-primary-foreground"
              : isError
                ? "bg-destructive text-destructive-foreground"
                : "bg-secondary text-secondary-foreground"
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4" />
          ) : isError ? (
            <AlertCircle className="w-4 h-4" />
          ) : (
            <Bot className="w-4 h-4" />
          )}
        </div>

        {/* Message bubble */}
        <div className="flex-1">
          <div
            className={`relative px-4 py-3 rounded-2xl shadow-lg ${
              isUser
                ? "bg-primary text-primary-foreground rounded-br-md"
                : isError
                  ? "bg-destructive/10 text-destructive border border-destructive/20 rounded-bl-md"
                  : "bg-card text-card-foreground border border-border rounded-bl-md"
            } transition-all`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">Mengetik</span>
                <div className="typing-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message}</p>

                {/* Message actions */}
                <div className={`flex items-center justify-between mt-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                  {timestamp && (
                    <div className="text-xs opacity-70">
                      {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  )}

                  {!isLoading && message && (
                    <button
                      onClick={handleCopy}
                      className="opacity-0 group-hover:opacity-100 hover:opacity-100 p-1 rounded hover:bg-accent transition-all"
                      title="Copy message"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBubble
