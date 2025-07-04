"use client"
import type React from "react"
import { ReactNode, useEffect, useState } from "react"

interface PageTransitionProps {
  children: ReactNode
  className?: string
  delay?: number
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "",
  delay = 0
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div 
      className={`transition-all duration-700 ease-out ${
        mounted 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default PageTransition
