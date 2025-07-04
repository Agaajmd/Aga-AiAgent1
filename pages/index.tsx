import { useState, useRef, useEffect } from "react"
import Head from "next/head"
import { MessageSquare, RotateCcw } from "lucide-react"
import { ChatMessage } from "../components/chat-message"
import ChatInput from "../components/ChatInput"
import Header from "../components/Header"
import EmptyState from "../components/EmptyState"
import { TypingIndicator } from "../components/typing-indicator"
import { ToastProvider, useToast } from "../components/toast-provider"
import { MessageRevealAnimation } from "../components/AnimatedElements"
import { ThemeToggle } from "../components/ThemeToggle"

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

      {/* Main Layout Container */}
      <div className="flex h-screen bg-background">
        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:flex lg:w-64 xl:w-80 flex-col border-r border-border/50 bg-background/50">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">AI Agent Aga</h1>
                <p className="text-xs text-muted-foreground">Asisten AI Indonesia</p>
              </div>
            </div>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 p-4">
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">Chat Baru</span>
              </button>
            </div>
            
            {/* Chat History Placeholder */}
            <div className="mt-6">
              <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                Riwayat Chat
              </h3>
              <div className="space-y-1">
                {messages.length > 0 && (
                  <div className="p-2 rounded-md bg-secondary/30 text-sm text-muted-foreground">
                    Chat saat ini ({messages.length} pesan)
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border/30">
            <div className="flex items-center justify-between">
              <ThemeToggle />
              {messages.length > 0 && (
                <button
                  onClick={clearMessages}
                  className="flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-md transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden">
            <MessageRevealAnimation delay={0}>
              <Header onClearChat={clearMessages} messageCount={messages.length} />
            </MessageRevealAnimation>
          </div>

          {/* Desktop Header - Minimal */}
          <div className="hidden lg:block border-b border-border/30 bg-background/80 backdrop-blur-sm">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="font-medium text-foreground">
                    {messages.length > 0 ? 'Percakapan dengan Aga' : 'Chat dengan AI Agent Aga'}
                  </h2>
                  {messages.length > 0 && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {messages.length} pesan
                    </span>
                  )}
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={clearMessages}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear Chat
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            {/* Messages Content */}
            <div className="max-w-4xl mx-auto">
              {messages.length === 0 ? (
                <MessageRevealAnimation delay={200}>
                  <div className="h-full flex items-center justify-center px-4 py-8">
                    <EmptyState onExampleClick={handleExampleClick} />
                  </div>
                </MessageRevealAnimation>
              ) : (
                <div className="px-4 lg:px-6">
                  <div className="space-y-6 py-6">
                    {messages.map((message, index) => (
                      <MessageRevealAnimation key={message.id} delay={index * 50}>
                        <div className="max-w-3xl mx-auto">
                          <ChatMessage message={message} index={index} />
                        </div>
                      </MessageRevealAnimation>
                    ))}
                    
                    {/* Typing indicator */}
                    {isLoading && (
                      <MessageRevealAnimation delay={0}>
                        <div className="max-w-3xl mx-auto">
                          <TypingIndicator />
                        </div>
                      </MessageRevealAnimation>
                    )}
                  </div>
                </div>
              )}
              
              {/* Scroll anchor */}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>

          {/* Chat Input Area */}
          <div className="border-t border-border/30 bg-background/80 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <MessageRevealAnimation delay={300}>
                <ChatInput 
                  onSendMessage={sendMessage} 
                  isLoading={isLoading}
                  disabled={false}
                />
              </MessageRevealAnimation>
            </div>
          </div>
        </div>
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
