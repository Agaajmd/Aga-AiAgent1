"use client"
import { MessageCircle, Zap, Shield, Brain } from "lucide-react"

export function EmptyState() {
  const features = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Intelligent Responses",
      description: "Smart AI-powered conversations with fallback intelligence",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Always Available",
      description: "Reliable responses even when external services are down",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Robust System",
      description: "Multiple layers of AI and smart response systems",
    },
  ]

  const exampleQuestions = [
    "Hello! How are you today?",
    "What can you help me with?",
    "Can you help me with programming?",
    "Tell me about artificial intelligence",
    "How do you work?",
  ]

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageCircle className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-2xl font-semibold mb-3">Welcome to Aga Assistant AI</h2>
        <p className="text-muted-foreground mb-8">
          Hi! I'm Aga, your intelligent AI assistant. Ask questions, get help, brainstorm ideas, or just have a friendly
          chat with me!
        </p>

        <div className="grid gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 text-left">
              <div className="text-primary">{feature.icon}</div>
              <div>
                <h3 className="font-medium text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-left">
          <h3 className="font-medium text-sm mb-3 text-center">Try asking me:</h3>
          <div className="grid gap-2">
            {exampleQuestions.map((question, index) => (
              <div
                key={index}
                className="p-2 rounded-lg bg-muted/30 text-sm text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer"
              >
                "{question}"
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-6">
          💡 This AI uses advanced response systems with multiple fallbacks for reliability
        </p>
      </div>
    </div>
  )
}
