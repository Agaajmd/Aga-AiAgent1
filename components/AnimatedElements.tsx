"use client"

import { useEffect, useState } from "react"
import { Plane, Send, Zap } from "lucide-react"

interface FlyingPlaneProps {
  trigger?: boolean
  onComplete?: () => void
}

export function FlyingPlane({ trigger = false, onComplete }: FlyingPlaneProps) {
  const [isFlying, setIsFlying] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsFlying(true)
      const timer = setTimeout(() => {
        setIsFlying(false)
        onComplete?.()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete])

  if (!isFlying) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div className="animate-plane-fly">
        <div className="relative">
          {/* Main plane icon with trail effect */}
          <div className="absolute">
            <Plane className="w-8 h-8 text-primary drop-shadow-lg" />
          </div>
          
          {/* Sparkle trail */}
          <div className="absolute -ml-2 -mt-1">
            <Zap className="w-4 h-4 text-yellow-400 animate-pulse opacity-70" />
          </div>
          <div className="absolute -ml-4 -mt-0.5">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
          </div>
          <div className="absolute -ml-6 mt-1">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0,
  onComplete 
}: { 
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
}) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setCurrentIndex(0)
      }, delay)
      return () => clearTimeout(delayTimer)
    }
  }, [delay])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timer)
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, text, speed, onComplete, isComplete])

  return (
    <span className="relative">
      {displayText}
      {!isComplete && (
        <span className="animate-pulse ml-1 text-primary">|</span>
      )}
    </span>
  )
}

export function MessageRevealAnimation({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode
  delay?: number
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`transition-all duration-800 ${
      isVisible 
        ? 'opacity-100 transform translate-y-0 scale-100 blur-0' 
        : 'opacity-0 transform translate-y-8 scale-95 blur-sm'
    }`}>
      {children}
    </div>
  )
}
