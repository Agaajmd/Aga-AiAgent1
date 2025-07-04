"use client"

import type React from "react"
import { MessageSquare, Sparkles, Zap, Shield } from "lucide-react"

interface EmptyStateProps {
  onExampleClick?: (question: string) => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ onExampleClick }) => {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: "AI-Powered",
      description: "Didukung oleh teknologi AI terdepan dan sistem respons cerdas",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Respons Cepat",
      description: "Dapatkan jawaban instan untuk pertanyaan Anda",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Aman & Privat",
      description: "Percakapan Anda aman dan tidak disimpan",
    },
  ]

  const exampleQuestions = [
    // Kosongkan array untuk menghapus quick suggestions
  ]

  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-lg md:max-w-2xl mx-auto px-4">
      {/* Logo section */}
      <div className="relative mb-6 md:mb-8">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-r from-primary via-primary/80 to-secondary rounded-2xl flex items-center justify-center shadow-xl animate-float">
          <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
        </div>
        <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce-slow">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Title section */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
        Halo! Saya Aga 👋
      </h1>
      
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
        Mulai percakapan dengan mengetik pesan Anda di bawah.
      </p>
    </div>
  )
}

export default EmptyState
