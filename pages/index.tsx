import { useState, useRef, useEffect } from "react"
import Head from "next/head"
import { ChatMessage } from "../components/chat-message"
import ChatInput from "../components/ChatInput"
import Header from "../components/Header"
import EmptyState from "../components/EmptyState"
import { TypingIndicator } from "../components/typing-indicator"
import { ToastProvider, useToast } from "../components/toast-provider"
import { MessageRevealAnimation } from "../components/AnimatedElements"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isError?: boolean
}

function HomeContent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { addToast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    // Add user message with enhanced structure
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: messageText,
      role: "user",
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      })

      const data = await response.json()

      if (response.ok && data.message) {
        // Add AI response
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          content: data.message,
          role: "assistant",
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, aiMessage])
        
        addToast({
          type: "success",
          message: "Respons diterima! ✨",
        })
      } else {
        // Handle API error
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          content: data.error || "Maaf, saya mengalami gangguan. Silakan coba lagi dalam beberapa saat.",
          role: "assistant",
          timestamp: new Date(),
          isError: true,
        }
        setMessages(prev => [...prev, errorMessage])
        
        addToast({
          type: "error",
          message: "Gagal mendapatkan respons AI",
        })
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Oops! Sepertinya ada masalah koneksi. Pastikan internet Anda stabil dan coba lagi.",
        role: "assistant",
        timestamp: new Date(),
        isError: true,
      }
      setMessages(prev => [...prev, errorMessage])
      
      addToast({
        type: "error",
        message: "Kesalahan koneksi internet",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
    addToast({
      type: "info",
      message: "Percakapan dibersihkan 🧹",
    })
  }

  const handleExampleClick = (question: string) => {
    sendMessage(question)
  }

  return (
    <>
      <Head>
        <title>AI Agent Aga - Asisten AI Cerdas Indonesia</title>
        <meta
          name="description"
          content="AI Agent Aga - Asisten AI cerdas berbahasa Indonesia dengan teknologi Groq Llama. Tanyakan apa saja dan dapatkan respons yang akurat dan membantu."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="keywords" content="AI, chatbot, asisten virtual, Indonesia, Groq, Llama" />
        <meta name="author" content="AI Agent Aga" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Mobile optimizations */}
        <meta name="theme-color" content="#56DFCF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AI Agent Aga" />
      </Head>

      <div className="flex flex-col h-screen bg-background transition-all duration-500 overflow-hidden">
        {/* Header */}
        <MessageRevealAnimation delay={0}>
          <Header onClearChat={clearMessages} messageCount={messages.length} />
        </MessageRevealAnimation>

        {/* Messages Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto relative"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          {/* Content container */}
          <div className="relative px-4">
            {messages.length === 0 ? (
              <MessageRevealAnimation delay={200}>
                <EmptyState onExampleClick={handleExampleClick} />
              </MessageRevealAnimation>
            ) : (
              <div className="space-y-3 py-4">
                {messages.map((message, index) => (
                  <MessageRevealAnimation key={message.id} delay={index * 50}>
                    <ChatMessage message={message} index={index} />
                  </MessageRevealAnimation>
                ))}
                
                {/* Typing indicator */}
                {isLoading && (
                  <MessageRevealAnimation delay={0}>
                    <TypingIndicator />
                  </MessageRevealAnimation>
                )}
              </div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Chat Input */}
        <MessageRevealAnimation delay={300}>
          <ChatInput 
            onSendMessage={sendMessage} 
            isLoading={isLoading}
            disabled={false}
          />
        </MessageRevealAnimation>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  )
}
