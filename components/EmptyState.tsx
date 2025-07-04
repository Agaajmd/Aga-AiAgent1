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
    "Halo Aga! Apa kabar hari ini?",
    "Siapa kamu, Aga?",
    "Jelaskan tentang kecerdasan buatan",
    "Jam berapa sekarang?",
    "Ceritakan tentang teknologi blockchain",
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
        Asisten AI Indonesia yang siap membantu Anda dengan pertanyaan apapun.
        <span className="hidden md:inline"> Dari penjelasan konsep hingga bantuan praktis sehari-hari.</span>
      </p>

      {/* Capabilities grid - Mobile stacked */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="p-4 md:p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-sm md:text-base text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Example questions - Mobile optimized */}
      <div className="w-full">
        <h3 className="text-base md:text-lg font-medium text-foreground mb-4 md:mb-6">
          Mulai percakapan dengan menanyakan:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {exampleQuestions.slice(0, 4).map((question, index) => (
            <button
              key={index}
              onClick={() => onExampleClick?.(question)}
              className="text-left p-3 md:p-4 rounded-xl bg-background hover:bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md group touch-manipulation active:scale-95"
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                </div>
                <span className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                  {question}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom tip */}
      <div className="mt-6 md:mt-8 p-3 md:p-4 rounded-xl bg-primary/5 border border-primary/20 w-full max-w-2xl">
        <p className="text-xs md:text-sm text-primary/80">
          💡 <span className="font-medium">Tips:</span> Anda bisa bertanya dalam bahasa Indonesia. Saya akan memberikan jawaban yang akurat dan membantu!
        </p>
      </div>
    </div>
  )
}

export default EmptyState
