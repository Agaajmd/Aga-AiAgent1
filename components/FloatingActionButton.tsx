"use client"
import type React from "react"
import { ArrowUp, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface FloatingActionButtonProps {
  onScrollToTop?: () => void
  onNewChat?: () => void
  showScrollTop?: boolean
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onScrollToTop,
  onNewChat,
  showScrollTop = false
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsVisible(scrollTop > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shouldShow = showScrollTop && isVisible

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-300 ${
      shouldShow ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
    }`}>
      {/* New Chat Button */}
      {onNewChat && (
        <button
          onClick={onNewChat}
          className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-glow group glass-deep"
          title="New Chat"
        >
          <MessageCircle className="w-6 h-6 mx-auto group-hover:scale-110 transition-transform" />
        </button>
      )}
      
      {/* Scroll to Top Button */}
      {onScrollToTop && (
        <button
          onClick={onScrollToTop}
          className="w-12 h-12 bg-background/80 text-foreground border border-border/30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover-lift glass backdrop-blur-xl group"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 mx-auto group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  )
}

export default FloatingActionButton
