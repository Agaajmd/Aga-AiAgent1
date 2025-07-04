import type { NextApiRequest, NextApiResponse } from "next"

interface ChatResponse {
  success: boolean
  message?: string
  error?: string
}

// Indonesian smart response system
const generateIndonesianSmartResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase().trim()

  // Greeting responses
  if (lowerMessage.match(/^(hai|halo|selamat|hi|hello)/)) {
    const greetings = [
      "Halo! Saya Aga, di sini untuk membantu Anda dengan pertanyaan atau percakapan apa pun.",
      "Hai! Saya Aga. Apa yang ingin kita bicarakan hari ini?",
      "Halo! Saya Aga, siap membantu. Ada yang bisa saya bantu?",
      "Selamat datang! Saya Aga, asisten AI Anda. Silakan bertanya apa saja atau hanya mengobrol.",
    ]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // How are you responses
  if (lowerMessage.match(/(apa kabar|bagaimana kabar|gimana kabar|how are you)/)) {
    const responses = [
      "Saya baik-baik saja, terima kasih sudah bertanya! Saya di sini dan siap membantu apa pun yang Anda butuhkan.",
      "Saya berfungsi dengan baik dan senang bisa membantu Anda hari ini! Bagaimana kabar Anda?",
      "Saya sangat baik! Saya suka bercakap-cakap dan membantu orang. Bagaimana dengan Anda?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // What/Who questions
  if (lowerMessage.match(/(siapa kamu|apa itu|jelaskan tentang kecerdasan buatan|apa itu ai|siapa anda|siapa saya)/)) {
    if (lowerMessage.includes("kecerdasan buatan") || lowerMessage.includes("ai")) {
      return "Kecerdasan Buatan (AI) adalah teknologi yang memungkinkan mesin untuk belajar, berpikir, dan membuat keputusan seperti manusia. AI mencakup machine learning, deep learning, dan berbagai aplikasi seperti asisten virtual, pengenalan gambar, dan otomasi. AI membantu dalam berbagai bidang seperti kesehatan, pendidikan, bisnis, dan banyak lagi."
    }
    if (lowerMessage.includes("siapa saya")) {
      return "Anda adalah pengguna yang sedang berbicara dengan saya, Aga. Saya tidak memiliki informasi personal tentang Anda, tetapi saya di sini untuk membantu dengan pertanyaan atau percakapan apa pun yang Anda inginkan!"
    }
    return "Saya adalah Aga, asisten AI yang dirancang untuk membantu menjawab pertanyaan dan melakukan percakapan yang bermanfaat. Saya dibuat oleh Aga untuk membantu Anda dengan berbagai topik!"
  }

  // Help requests
  if (lowerMessage.match(/(bantuan|tolong|help|assist)/)) {
    return "Saya di sini untuk membantu! Saya bisa membantu menjawab pertanyaan, berdiskusi, memberikan informasi, brainstorming ide, atau hanya mengobrol. Apa yang bisa saya bantu?"
  }

  // Thank you responses
  if (lowerMessage.match(/(terima kasih|makasih|thanks|thank you)/)) {
    const responses = [
      "Sama-sama! Saya senang bisa membantu.",
      "Dengan senang hati! Jangan ragu untuk bertanya jika butuh bantuan lagi.",
      "Sama-sama! Saya di sini kapan pun Anda butuh bantuan.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Time-related questions
  if (lowerMessage.match(/(jam berapa|waktu|sekarang|hari ini|tanggal|what time)/)) {
    const now = new Date()
    const timeOptions: Intl.DateTimeFormatOptions = { 
      timeZone: 'Asia/Jakarta', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }
    const dateOptions: Intl.DateTimeFormatOptions = { 
      timeZone: 'Asia/Jakarta',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    
    const currentTime = now.toLocaleTimeString('id-ID', timeOptions)
    const currentDate = now.toLocaleDateString('id-ID', dateOptions)
    
    if (lowerMessage.includes('jam') || lowerMessage.includes('time')) {
      return `Sekarang pukul ${currentTime} WIB.`
    } else {
      return `Hari ini adalah ${currentDate}, pukul ${currentTime} WIB.`
    }
  }

  // Programming/coding questions
  if (lowerMessage.match(/(programming|coding|javascript|python|html|css|react|node|pemrograman)/)) {
    return "Saya senang membantu dengan pertanyaan pemrograman! Saya bisa membantu dengan berbagai bahasa pemrograman, debugging, menjelaskan konsep, dan memberikan contoh kode. Topik pemrograman apa yang ingin Anda diskusikan?"
  }

  // Weather questions
  if (lowerMessage.match(/(cuaca|hujan|panas|dingin|weather)/)) {
    return "Maaf, saya tidak memiliki akses ke data cuaca real-time. Untuk informasi cuaca terkini, saya sarankan menggunakan aplikasi cuaca atau situs web seperti BMKG untuk wilayah Indonesia."
  }

  // Math questions
  if (lowerMessage.match(/(matematika|hitung|rumus|math|calculate)/)) {
    return "Saya bisa membantu dengan pertanyaan matematika! Silakan berikan soal matematika atau perhitungan yang ingin Anda selesaikan, dan saya akan berusaha membantu menjelaskannya."
  }

  // General knowledge questions
  if (lowerMessage.match(/^(apa itu|apa yang|jelaskan|ceritakan tentang)/)) {
    return `Itu pertanyaan yang menarik tentang "${message}". Meskipun saya ingin memberikan jawaban yang detail, saat ini saya berjalan dalam mode yang disederhanakan. Bisakah Anda lebih spesifik tentang aspek mana yang ingin Anda ketahui? Saya akan berusaha membantu semampu saya!`
  }

  // Default intelligent response
  const responses = [
    `Itu poin yang menarik tentang "${message}". Saya ingin membantu Anda mengeksplorasi topik ini lebih lanjut. Bisakah Anda memberikan konteks lebih atau beri tahu aspek spesifik apa yang paling Anda penasari?`,
    `Saya menganggap pertanyaan Anda tentang "${message}" cukup menarik. Meskipun saat ini saya beroperasi dalam mode yang disederhanakan, saya tetap di sini untuk membantu. Apa yang ingin Anda ketahui lebih lanjut?`,
    `Terima kasih telah berbagi dengan saya. Mengenai "${message}", saya senang mendiskusikan topik ini dengan Anda. Sudut pandang atau aspek mana yang paling menarik bagi Anda?`,
    `Itu topik yang bagus untuk dieksplorasi! Meskipun saya berjalan dalam mode dasar saat ini, saya masih bisa membantu membahas "${message}". Informasi atau perspektif spesifik apa yang Anda cari?`,
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChatResponse>) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed. Please use POST.",
    })
  }

  const { message } = req.body

  // Validate input
  if (!message || typeof message !== "string") {
    return res.status(400).json({
      success: false,
      error: "Message is required and must be a string",
    })
  }

  if (message.length > 1000) {
    return res.status(400).json({
      success: false,
      error: "Message is too long. Maximum 1000 characters allowed.",
    })
  }

  console.log("📝 Processing message:", message.substring(0, 100) + (message.length > 100 ? "..." : ""))

  try {
    // Check if Groq API key is available
    const groqApiKey = process.env.GROQ_API_KEY
    
    if (!groqApiKey) {
      console.warn("⚠️ GROQ_API_KEY not found, using fallback response")
      throw new Error("API key not configured")
    }

    // Try Groq API first (Llama model)
    console.log("🚀 Sending request to Groq API...")
    
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${groqApiKey}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{
          role: "user",
          content: message
        }],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    if (groqResponse.ok) {
      const result = await groqResponse.json()
      console.log("✅ Received response from Groq API")
      
      const aiResponse = result.choices?.[0]?.message?.content?.trim()
      
      if (aiResponse && aiResponse.length > 0) {
        console.log("✅ Using Groq API response")
        return res.status(200).json({
          success: true,
          message: aiResponse,
        })
      }
    } else {
      console.log(`❌ Groq API failed with status: ${groqResponse.status}`)
    }

    // Fallback to Aga's intelligent response system
    console.log("🧠 Using Aga's intelligent response system as fallback")
    const agaResponse = generateIndonesianSmartResponse(message)
    console.log("✅ Generated Aga response")
    return res.status(200).json({
      success: true,
      message: agaResponse,
    })
  } catch (error) {
    console.error("❌ Unexpected error in chat API:")
    console.error("Error:", error instanceof Error ? error.message : String(error))

    console.log("🔄 Using smart response system as fallback due to error")
    const smartResponse = generateIndonesianSmartResponse(message)

    return res.status(200).json({
      success: true,
      message: smartResponse,
    })
  }
}
