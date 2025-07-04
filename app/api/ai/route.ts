import { type NextRequest, NextResponse } from "next/server"

interface AIResponse {
  success: boolean
  data?: string
  error?: string
}

// Simple but effective AI-like responses
const generateSmartResponse = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase().trim()

  // Greeting responses
  if (lowerPrompt.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    const greetings = [
      "Hello! I'm here to help you with any questions or conversations you'd like to have.",
      "Hi there! What would you like to talk about today?",
      "Hey! I'm ready to assist you. What's on your mind?",
      "Hello! Feel free to ask me anything or just chat.",
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // How are you responses
  if (lowerPrompt.match(/(how are you|how do you feel|how's it going)/)) {
    const responses = [
      "I'm doing great, thank you for asking! I'm here and ready to help with whatever you need.",
      "I'm functioning well and excited to assist you today! How are you doing?",
      "I'm doing wonderfully! I love having conversations and helping people. What about you?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // What/Who questions
  if (lowerPrompt.match(/^(what|who) (are you|is your name)/)) {
    return "I'm an AI assistant designed to have helpful conversations and answer questions. I'm here to assist you with a wide variety of topics!"
  }

  // Help requests
  if (lowerPrompt.match(/(help|assist|support)/)) {
    return "I'm here to help! I can assist with answering questions, having conversations, providing information, brainstorming ideas, or just chatting. What would you like help with?"
  }

  // Thank you responses
  if (lowerPrompt.match(/(thank you|thanks|appreciate)/)) {
    const responses = [
      "You're very welcome! I'm happy to help.",
      "My pleasure! Feel free to ask if you need anything else.",
      "You're welcome! I'm here whenever you need assistance.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Question about capabilities
  if (lowerPrompt.match(/(what can you do|your capabilities|what do you know)/)) {
    return "I can help with a variety of tasks including answering questions, having conversations, providing explanations, brainstorming ideas, helping with writing, and much more. What specific area would you like help with?"
  }

  // Programming/coding questions
  if (lowerPrompt.match(/(code|programming|javascript|python|html|css|react|node)/)) {
    return "I'd be happy to help with programming questions! I can assist with various programming languages, debugging, explaining concepts, and providing code examples. What specific programming topic would you like to discuss?"
  }

  // Math/calculation questions
  if (lowerPrompt.match(/(math|calculate|equation|formula)/)) {
    return "I can help with math problems and calculations! Feel free to share the specific math question or problem you're working on, and I'll do my best to help you solve it."
  }

  // Writing help
  if (lowerPrompt.match(/(write|writing|essay|article|story)/)) {
    return "I'd love to help with your writing! Whether you need help brainstorming ideas, structuring content, improving grammar, or developing your writing style, I'm here to assist. What kind of writing project are you working on?"
  }

  // General knowledge questions
  if (lowerPrompt.match(/^(what is|what are|explain|tell me about)/)) {
    return `That's an interesting question about "${prompt}". While I'd love to provide a detailed answer, I'm currently running in a simplified mode. Could you be more specific about what aspect you'd like to know about? I'll do my best to help!`
  }

  // Default intelligent response
  const responses = [
    `That's an interesting point about "${prompt}". I'd like to help you explore this topic further. Could you provide a bit more context or let me know what specific aspect you're most curious about?`,
    `I find your question about "${prompt}" quite thought-provoking. While I'm currently operating in a simplified mode, I'm still here to help. What would you like to know more about?`,
    `Thanks for sharing that with me. Regarding "${prompt}", I'd be happy to discuss this topic with you. What particular angle or aspect interests you most?`,
    `That's a great topic to explore! While I'm running in a basic mode right now, I can still help discuss "${prompt}". What specific information or perspective are you looking for?`,
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}

// Try to use Hugging Face API with a simple, reliable model
async function tryHuggingFaceAPI(prompt: string): Promise<string | null> {
  try {
    // Using GPT-2, which is one of the most reliable models on Hugging Face
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 100,
          temperature: 0.7,
          do_sample: true,
          top_p: 0.9,
          return_full_text: false,
        },
        options: {
          wait_for_model: true,
          use_cache: false,
        },
      }),
    })

    if (!response.ok) {
      console.log(`Hugging Face API failed with status: ${response.status}`)
      return null
    }

    const result = await response.json()

    if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
      let generatedText = result[0].generated_text.trim()

      // Clean up the response
      if (generatedText.length > 0) {
        // Remove any repetitive patterns
        const sentences = generatedText.split(/[.!?]+/).filter((s: string) => s.trim().length > 0)
        if (sentences.length > 0) {
          generatedText = sentences[0].trim() + "."
        }

        // Ensure it's not too long
        if (generatedText.length > 200) {
          generatedText = generatedText.substring(0, 200).trim() + "..."
        }

        return generatedText
      }
    }

    return null
  } catch (error) {
    console.error("Hugging Face API error:", error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Prompt is required and must be a string",
        },
        { status: 400 },
      )
    }

    if (prompt.length > 1000) {
      return NextResponse.json(
        { success: false, error: "Prompt is too long. Maximum 1000 characters allowed." },
        { status: 400 },
      )
    }

    console.log("Received prompt:", prompt)

    // First, try Hugging Face API
    let aiResponse = await tryHuggingFaceAPI(prompt)

    // If Hugging Face fails, use our smart response system
    if (!aiResponse) {
      console.log("Hugging Face API failed, using smart response system")
      aiResponse = generateSmartResponse(prompt)
    } else {
      console.log("Successfully got response from Hugging Face API")
    }

    return NextResponse.json({ success: true, data: aiResponse })
  } catch (error) {
    console.error("AI API Error:", error)

    // Even if everything fails, provide a helpful response
    const fallbackResponse =
      "I'm experiencing some technical difficulties, but I'm still here to help! Could you try rephrasing your question or ask me something else?"

    return NextResponse.json({ success: true, data: fallbackResponse })
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "AI Chat API is running",
      info: "Use POST to send messages",
      status: "operational",
    },
    { status: 200 },
  )
}
