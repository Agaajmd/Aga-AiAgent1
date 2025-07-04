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
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-8 lg:py-16">
      {/* Logo section */}
      <div className="relative mb-8">
        <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-gradient-to-r from-primary via-primary/80 to-secondary rounded-2xl flex items-center justify-center shadow-2xl animate-float">
          <MessageSquare className="w-10 h-10 lg:w-12 lg:h-12 text-primary-foreground" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce-slow">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Title section */}
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
        Halo! Saya Aga 👋
      </h1>
      
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
        Asisten AI Indonesia yang siap membantu Anda dengan pertanyaan apapun. 
        Dari penjelasan konsep hingga bantuan praktis sehari-hari.
      </p>

      {/* Capabilities grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10 w-full">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
          >
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Example questions */}
      <div className="w-full">
        <h3 className="text-lg font-medium text-foreground mb-6">
          Mulai percakapan dengan menanyakan:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {exampleQuestions.slice(0, 4).map((question, index) => (
            <button
              key={index}
              onClick={() => onExampleClick?.(question)}
              className="text-left p-4 rounded-xl bg-background hover:bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md group"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                  {question}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom tip */}
      <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 max-w-2xl">
        <p className="text-sm text-primary/80">
          💡 <span className="font-medium">Tips:</span> Anda bisa bertanya dalam bahasa Indonesia. Saya akan memberikan jawaban yang akurat dan membantu!
        </p>
      </div>
    </div>
  )
}

export default EmptyState
