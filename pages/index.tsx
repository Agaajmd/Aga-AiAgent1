"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Head from "next/head"
import ChatBubble from "../components/ChatBubble"
import ChatInput from "../components/ChatInput"
import Header from "../components/Header"
import EmptyState from "../components/EmptyState"
import FloatingActionButton from "../components/FloatingActionButton"
import PageTransition from "../components/PageTransition"
import { useToast } from "../components/Toast"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  isError?: boolean
}

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { showToast } = useToast()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    showToast("Mengirim pesan ke AI...", "info")

    try {
      // Send to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      })

      const data = await response.json()

      if (data.success && data.message) {
        // Add AI response
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.message,
          isUser: false,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
        showToast("Respons diterima!", "success")
      } else {
        // Add error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.error || "Gagal mendapatkan respons. Coba lagi.",
          isUser: false,
          timestamp: new Date(),
          isError: true,
        }

        setMessages((prev) => [...prev, errorMessage])
        showToast("Gagal mendapatkan respons AI", "error")
      }
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Terjadi kesalahan koneksi. Periksa internet Anda dan coba lagi.",
        isUser: false,
        timestamp: new Date(),
        isError: true,
      }

      setMessages((prev) => [...prev, errorMessage])
      showToast("Kesalahan koneksi", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    showToast("Percakapan dibersihkan", "info")
  }

  const handleExampleClick = (question: string) => {
    sendMessage(question)
  }

  const handleCopyMessage = () => {
    showToast("Pesan disalin ke clipboard", "success")
  }

  return (
    <PageTransition>
      <Head>
        <title>AI Agent Aga - Asisten AI Cerdas Indonesia</title>
        <meta
          name="description"
          content="AI Agent Aga - Asisten AI cerdas berbahasa Indonesia dengan teknologi Groq Llama. Tanyakan apa saja dan dapatkan respons yang akurat dan membantu."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="AI, chatbot, asisten virtual, Indonesia, Groq, Llama" />
        <meta name="author" content="AI Agent Aga" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen bg-background transition-all duration-300 page-transition">
        {/* Header with enhanced animation */}
        <div className="animate-slide-up">
          <Header onClearChat={clearChat} messageCount={messages.length} />
        </div>

        {/* Messages Area with glassmorphism backdrop */}
        <div className="flex-1 overflow-y-auto relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 pointer-events-none"></div>
          
          {messages.length === 0 ? (
            <div className="animate-fade-in">
              <EmptyState onExampleClick={handleExampleClick} />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-6 relative z-10">
              {/* Messages with staggered animation */}
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <div 
                    key={message.id} 
                    className="group animate-stagger-in" 
                    style={{ animationDelay: `${Math.min(index * 0.1, 1)}s` }}
                  >
                    <ChatBubble
                      message={message.text}
                      isUser={message.isUser}
                      isError={message.isError}
                      timestamp={message.timestamp}
                      onCopy={handleCopyMessage}
                    />
                  </div>
                ))}
              </div>

              {/* Enhanced loading indicator */}
              {isLoading && (
                <div className="group animate-slide-in-left">
                  <ChatBubble message="" isUser={false} isLoading={true} />
                </div>
              )}

              {/* Smooth scroll anchor */}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        {/* Input Area with glassmorphism */}
        <div className="relative z-20">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>

        {/* Floating Action Buttons */}
        <FloatingActionButton 
          onScrollToTop={scrollToTop}
          onNewChat={clearChat}
          showScrollTop={messages.length > 3}
        />

      </div>
    </PageTransition>
  )
}

export default Home
