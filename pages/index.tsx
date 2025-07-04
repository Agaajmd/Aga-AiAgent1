import { useState, useRef, useEffect } from "react"
import Head from "next/head"
import { MessageSquare, RotateCcw, Menu, X, Plus } from "lucide-react"
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
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
    setIsSidebarOpen(false) // Close sidebar on mobile after clearing
    addToast({
      type: "info",
      message: "Percakapan dibersihkan 🧹",
    })
  }

  const handleExampleClick = (question: string) => {
    sendMessage(question)
    setIsSidebarOpen(false) // Close sidebar on mobile after selecting
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById('mobile-sidebar')
        const menuButton = document.getElementById('menu-button')
        if (sidebar && !sidebar.contains(event.target as Node) && 
            menuButton && !menuButton.contains(event.target as Node)) {
          setIsSidebarOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSidebarOpen])

  // Enhanced keyboard detection for mobile
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    let initialViewportHeight = window.innerHeight
    let rafId: number | null = null

    const updateViewportHeight = () => {
      if (window.innerWidth < 1024) {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
    }

    const detectKeyboard = () => {
      if (window.innerWidth < 1024) {
        const currentHeight = window.innerHeight
        const heightDifference = initialViewportHeight - currentHeight
        
        // More sensitive keyboard detection (120px threshold)
        const keyboardVisible = heightDifference > 120
        
        if (keyboardVisible !== isKeyboardVisible) {
          setIsKeyboardVisible(keyboardVisible)
          
          // Add/remove body classes for CSS targeting
          if (keyboardVisible) {
            document.body.classList.add('keyboard-active')
            document.documentElement.classList.add('keyboard-active')
          } else {
            document.body.classList.remove('keyboard-active')
            document.documentElement.classList.remove('keyboard-active')
          }
        }
        
        updateViewportHeight()
      }
    }

    const debouncedDetectKeyboard = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(detectKeyboard)
    }

    // Better keyboard detection using multiple events
    const setupKeyboardDetection = () => {
      if (window.innerWidth < 1024) {
        // Use visualViewport API if available (better for mobile)
        if (window.visualViewport) {
          const visualViewportHandler = () => {
            const heightDifference = initialViewportHeight - (window.visualViewport?.height || window.innerHeight)
            const keyboardVisible = heightDifference > 120
            
            if (keyboardVisible !== isKeyboardVisible) {
              setIsKeyboardVisible(keyboardVisible)
              
              if (keyboardVisible) {
                document.body.classList.add('keyboard-active')
                document.documentElement.classList.add('keyboard-active')
              } else {
                document.body.classList.remove('keyboard-active')
                document.documentElement.classList.remove('keyboard-active')
              }
            }
          }
          
          window.visualViewport.addEventListener('resize', visualViewportHandler)
          return () => {
            if (window.visualViewport) {
              window.visualViewport.removeEventListener('resize', visualViewportHandler)
            }
          }
        } else {
          // Fallback for browsers without visualViewport
          window.addEventListener('resize', debouncedDetectKeyboard)
          return () => {
            window.removeEventListener('resize', debouncedDetectKeyboard)
            if (rafId) cancelAnimationFrame(rafId)
          }
        }
      }
      return () => {}
    }

    // Initialize
    updateViewportHeight()
    initialViewportHeight = window.innerHeight
    const cleanupKeyboard = setupKeyboardDetection()
    
    // Handle orientation changes
    const handleOrientationChange = () => {
      setTimeout(() => {
        initialViewportHeight = window.innerHeight
        updateViewportHeight()
        // Reset keyboard state on orientation change
        setIsKeyboardVisible(false)
        document.body.classList.remove('keyboard-active')
        document.documentElement.classList.remove('keyboard-active')
      }, 500)
    }

    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
      if (cleanupKeyboard) cleanupKeyboard()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [isKeyboardVisible])

  // Enhanced input focus handling for immediate keyboard response
  const handleInputFocus = () => {
    if (window.innerWidth < 1024) {
      // Immediately set keyboard visible for instant UI response
      setIsKeyboardVisible(true)
      document.body.classList.add('keyboard-active', 'input-focused')
      document.documentElement.classList.add('keyboard-active')
      
      // Prevent body scrolling when keyboard appears
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = '0'
      
      // Ensure proper viewport height
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      
      // Scroll to bottom and ensure input visibility
      setTimeout(() => {
        scrollToBottom()
        
        const chatInput = document.querySelector('textarea')
        if (chatInput) {
          // Ensure input is in view
          chatInput.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'end',
            inline: 'nearest'
          })
        }
      }, 100)
    }
  }

  const handleInputBlur = () => {
    if (window.innerWidth < 1024) {
      // Delay to handle touch events properly
      setTimeout(() => {
        // Check if any input is still focused
        const activeElement = document.activeElement
        if (!activeElement || (activeElement.tagName !== 'TEXTAREA' && activeElement.tagName !== 'INPUT')) {
          setIsKeyboardVisible(false)
          document.body.classList.remove('keyboard-active', 'input-focused')
          document.documentElement.classList.remove('keyboard-active')
          
          // Restore body scrolling
          document.body.style.position = ''
          document.body.style.width = ''
          document.body.style.top = ''
          
          // Reset viewport height
          const vh = window.innerHeight * 0.01
          document.documentElement.style.setProperty('--vh', `${vh}px`)
        }
      }, 200)
    }
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

      {/* Mobile-First Layout */}
      <div className="flex h-screen mobile-viewport-height bg-background relative overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Hidden on mobile, slide-in when open */}
        <div 
          id="mobile-sidebar"
          className={`
            fixed left-0 top-0 h-full w-80 bg-background border-r border-border/50 z-50 
            transform transition-transform duration-300 ease-in-out
            lg:static lg:translate-x-0 lg:z-auto lg:w-64 xl:w-80
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">AI Agent Aga</h1>
                <p className="text-xs text-muted-foreground">Asisten AI Indonesia</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Sidebar Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {/* New Chat Button */}
            <button 
              onClick={clearMessages}
              className="w-full flex items-center gap-2 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors mb-4"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Chat Baru</span>
            </button>
            
            {/* Chat History */}
            <div className="space-y-3">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Riwayat Chat
              </h3>
              <div className="space-y-2">
                {messages.length > 0 ? (
                  <div className="p-3 rounded-lg bg-secondary/30 border border-border/30">
                    <div className="text-sm text-foreground font-medium mb-1">
                      Chat Aktif
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {messages.length} pesan • {new Date().toLocaleDateString('id-ID')}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground p-3 text-center">
                    Belum ada riwayat chat
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border/30 space-y-3">
            <div className="flex items-center justify-between">
              {/* Theme Toggle only on Desktop */}
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
              {messages.length > 0 && (
                <button
                  onClick={clearMessages}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-lg transition-colors ml-auto"
                >
                  <RotateCcw className="w-3 h-3" />
                  Hapus Chat
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="flex-1 flex flex-col lg:min-w-0 h-full relative">
          {/* Mobile Header - FIXED position on mobile */}
          <div className="fixed top-0 left-0 right-0 lg:relative lg:top-auto lg:left-auto lg:right-auto bg-background/95 backdrop-blur-sm border-b border-border/30 z-30 lg:z-auto lg:bg-background/95">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <button
                  id="menu-button"
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors touch-manipulation"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="font-semibold text-foreground text-sm">AI Agent Aga</h1>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Theme Toggle on Mobile */}
                <div className="lg:hidden">
                  <ThemeToggle />
                </div>
                {messages.length > 0 && (
                  <button
                    onClick={clearMessages}
                    className="p-2 rounded-lg hover:bg-secondary/50 transition-colors touch-manipulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Header - Only for desktop */}
          <div className="hidden lg:block border-b border-border/30 bg-background/95 backdrop-blur-sm">
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

          {/* Messages Container - With dynamic padding for keyboard */}
          <div 
            ref={chatContainerRef}
            className={`flex-1 overflow-y-auto overscroll-behavior-contain pt-[73px] lg:pt-0 transition-all duration-300 keyboard-aware-container messages-keyboard-adjust ${
              isKeyboardVisible 
                ? 'pb-[60px]' // Minimal padding when keyboard is visible
                : 'pb-[120px]' // Normal padding when keyboard is hidden
            } lg:pb-0`}
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            <div className="min-h-full">
              {messages.length === 0 ? (
                <MessageRevealAnimation delay={200}>
                  <div className="flex items-center justify-center p-4 min-h-[calc(100vh-280px)] lg:min-h-[calc(100vh-200px)]">
                    <EmptyState onExampleClick={handleExampleClick} />
                  </div>
                </MessageRevealAnimation>
              ) : (
                <div className="pb-4">
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
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </div>

          {/* Chat Input - FIXED position on mobile with enhanced keyboard handling */}
          <div className={`fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto lg:left-auto lg:right-auto bg-background/98 backdrop-blur-xl border-t border-border/30 z-40 lg:z-auto transition-all duration-300 safe-area-inset-bottom ${
            isKeyboardVisible ? 'input-container-keyboard' : 'lg:bg-background/95 lg:backdrop-blur-sm'
          }`}>
            <MessageRevealAnimation delay={300}>
              <ChatInput 
                onSendMessage={sendMessage} 
                isLoading={isLoading}
                disabled={false}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </MessageRevealAnimation>
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
