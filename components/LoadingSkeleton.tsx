"use client"
import type React from "react"

interface LoadingSkeletonProps {
  className?: string
  variant?: "text" | "avatar" | "button" | "card"
  lines?: number
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = "", 
  variant = "text",
  lines = 1 
}) => {
  const getSkeletonClasses = () => {
    const baseClasses = "skeleton animate-pulse"
    
    switch (variant) {
      case "avatar":
        return `${baseClasses} w-10 h-10 rounded-full`
      case "button":
        return `${baseClasses} h-10 rounded-lg w-24`
      case "card":
        return `${baseClasses} h-32 rounded-2xl`
      case "text":
      default:
        return `${baseClasses} h-4 rounded`
    }
  }

  if (variant === "text" && lines > 1) {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${getSkeletonClasses()} ${
              index === lines - 1 ? "w-3/4" : "w-full"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    )
  }

  return <div className={`${getSkeletonClasses()} ${className}`} />
}

export default LoadingSkeleton
