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
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl animate-slide-up">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-2xl flex items-center justify-center shadow-2xl hover-lift animate-float">
            <MessageSquare className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl animate-pulse-slow"></div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce-slow">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-foreground mb-4 animate-fade-in bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Selamat Datang di AI Agent Aga!
        </h2>
        <p className="text-muted-foreground mb-8 text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Mulai percakapan dengan Aga, asisten AI cerdas Anda. Tanyakan apa saja yang ingin Anda ketahui!
        </p>

        <div className="grid gap-4 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 text-left hover-lift animate-fade-in glass"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="text-primary bg-primary/10 p-3 rounded-lg animate-glow">{feature.icon}</div>
              <div>
                <h3 className="font-semibold text-base text-card-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4 font-medium animate-fade-in" style={{ animationDelay: '0.7s' }}>
            💫 Contoh pertanyaan untuk memulai:
          </p>
          {exampleQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => onExampleClick?.(question)}
              className="w-full p-4 bg-card/30 hover:bg-card/60 rounded-xl text-sm text-card-foreground transition-all duration-300 cursor-pointer border border-border/30 hover:border-primary/50 text-left hover-lift animate-slide-in-right group backdrop-blur-sm"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <span className="text-primary/70 mr-2 transition-all group-hover:text-primary">💬</span>
              <span className="group-hover:text-primary transition-colors">"{question}"</span>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50 animate-fade-in backdrop-blur-sm" style={{ animationDelay: '1.2s' }}>
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tips:</strong> Tekan <kbd className="px-2 py-1 bg-background rounded text-xs border">Enter</kbd> untuk mengirim, 
            <kbd className="px-2 py-1 bg-background rounded text-xs border ml-1">Shift+Enter</kbd> untuk baris baru
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmptyState
