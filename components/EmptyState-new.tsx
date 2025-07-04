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
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0">
      <div className="text-center max-w-lg sm:max-w-2xl animate-slide-up w-full">
        {/* Logo section - Mobile optimized */}
        <div className="relative mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl hover-lift animate-float">
            <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-primary/30 to-primary/10 rounded-xl sm:rounded-2xl animate-pulse-slow"></div>
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce-slow">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Title section - Mobile responsive */}
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 animate-fade-in bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
          Selamat datang di AI Agent Aga
        </h2>
        
        <p className="text-sm sm:text-lg text-muted-foreground mb-6 sm:mb-8 animate-fade-in-delayed leading-relaxed px-2">
          Asisten AI cerdas yang siap membantu Anda dengan pertanyaan apapun. 
          <span className="hidden sm:inline"> Didukung teknologi terdepan untuk pengalaman terbaik.</span>
        </p>

        {/* Features grid - Mobile stacked */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-muted/20 to-muted/5 border border-border/30 hover:border-primary/30 transition-all duration-500 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Example questions - Mobile optimized */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-sm sm:text-base font-medium text-foreground animate-fade-in-delayed">
            Atau coba tanyakan:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {exampleQuestions.slice(0, 4).map((question, index) => (
              <button
                key={index}
                onClick={() => onExampleClick?.(question)}
                className="group text-left p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-background/80 to-muted/20 hover:from-primary/5 hover:to-primary/10 border border-border/30 hover:border-primary/30 transition-all duration-300 hover-lift animate-slide-up text-xs sm:text-sm text-muted-foreground hover:text-foreground touch-manipulation active:scale-95"
                style={{ animationDelay: `${index * 0.1 + 0.6}s` }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-md sm:rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <span className="group-hover:translate-x-1 transition-transform duration-300 leading-relaxed">
                    {question}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile tip */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in-delayed">
          <p className="text-xs sm:text-sm text-primary/80 leading-relaxed">
            💡 <span className="font-medium">Tips:</span> Ketik pertanyaan Anda di bawah atau pilih salah satu contoh di atas untuk memulai percakapan
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmptyState
