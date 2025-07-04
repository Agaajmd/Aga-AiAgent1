# 🤖 AI Agent Aga - Your Intelligent AI Assistant

![AI Agent Aga](https://img.shields.io/badge/AI-Agent%20Aga-blue?style=for-the-badge&logo=openai)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

Sebuah aplikasi web AI assistant modern yang dibangun dengan Next.js, TypeScript, dan Tailwind CSS. Aga adalah asisten AI yang cerdas dan responsif dengan antarmuka yang indah dan animasi yang smooth.

## ✨ Fitur Utama

- 🎨 **UI/UX Modern**: Desain glassmorphism dengan animasi smooth dan responsif
- 📱 **Mobile-First**: Dioptimalkan untuk semua perangkat dengan animasi khusus mobile
- ✈️ **Animasi Pesawat**: Animasi pesawat terbang yang menarik saat mengirim pesan
- � **Dark/Light Mode**: Tema gelap dan terang dengan transisi smooth
- � **Real-time Chat**: Chat real-time dengan typing indicator dan status
- 🚀 **Groq API**: Powered by Groq's Llama-4-Scout model untuk respons cepat
- 🔄 **Fallback System**: Sistem fallback otomatis jika API utama gagal
- � **Typing Effects**: Efek typewriter untuk respons AI
- � **Micro-interactions**: Hover effects, ripples, dan animasi detail
- � **Copy & Share**: Fitur copy pesan dan feedback system

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/Agaajmd/Aga-AiAgent1.git
cd modern-ai-website
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Setup Environment Variables

Salin file `.env.example` ke `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` dan tambahkan API keys Anda:

```env
# Groq API Configuration
GROQ_API_KEY=your_groq_api_key_here

# Hugging Face API Configuration (fallback)
HUGGING_FACE_API_KEY=your_hugging_face_api_key_here

# App Configuration  
NEXT_PUBLIC_APP_NAME="AI Agent Aga"
NEXT_PUBLIC_APP_DESCRIPTION="Your intelligent AI assistant powered by advanced language models"
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔑 Mendapatkan API Keys

### Groq API Key
1. Kunjungi [Groq Console](https://console.groq.com/)
2. Daftar/Login ke akun Anda
3. Buat API key baru
4. Salin dan masukkan ke `.env.local`

### Hugging Face API Key (Opsional - untuk fallback)
1. Kunjungi [Hugging Face](https://huggingface.co/)
2. Daftar/Login ke akun Anda
3. Pergi ke Settings > Access Tokens
4. Buat token baru
5. Salin dan masukkan ke `.env.local`

## 📱 Fitur Mobile

Website ini dioptimalkan khusus untuk mobile dengan:

- **Touch-friendly UI**: Tombol dan area interaksi yang mudah disentuh
- **Smooth Scrolling**: Scrolling yang halus dengan momentum
- **Mobile Animations**: Animasi khusus untuk pengalaman mobile
- **Responsive Design**: Layout yang sempurna di semua ukuran layar
- **Safe Area**: Support untuk notch dan area aman perangkat
- **Gesture Support**: Swipe dan gesture yang natural

## 🎨 Animasi & Effects

- **Flying Plane**: Animasi pesawat terbang saat mengirim pesan
- **Typewriter Effect**: Efek mengetik untuk respons AI
- **Glassmorphism**: Efek kaca transparan di seluruh UI
- **Micro-interactions**: Hover, focus, dan click animations
- **Loading States**: Animasi loading yang menarik
- **Theme Transitions**: Transisi smooth antara dark/light mode

## 🚀 Deployment

### Deploy ke Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Agaajmd/Aga-AiAgent1)

1. Fork repository ini
2. Connect ke Vercel
3. Tambahkan environment variables di Vercel dashboard
4. Deploy!

### Deploy Manual

```bash
# Build aplikasi
npm run build

# Jalankan production server
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **AI Provider**: Groq API (Llama models)
- **TypeScript**: Full type safety

## 📁 Project Structure

```
├── app/                    # App router pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ChatInput.tsx     # Chat input component
│   ├── chat-message.tsx  # Message display
│   └── ...
├── pages/api/            # API routes
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎨 Customization

### Themes

Edit `app/globals.css` untuk mengustomisasi tema warna dan animasi.

### Components

Semua komponen UI dapat ditemukan di folder `components/` dan dapat disesuaikan sesuai kebutuhan.

### API Integration

Edit `pages/api/chat.ts` untuk mengintegrasikan dengan AI provider lain atau menambah fitur baru.

## 🔧 Development

### Adding New Components

```bash
npx shadcn-ui@latest add [component-name]
```

### Environment Variables

- `GROQ_API_KEY`: Required untuk API Groq
- `NEXT_PUBLIC_APP_NAME`: Nama aplikasi (optional)
- `NEXT_PUBLIC_APP_DESCRIPTION`: Deskripsi aplikasi (optional)

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Acknowledgments

- [Groq](https://groq.com/) untuk API AI yang cepat
- [shadcn/ui](https://ui.shadcn.com/) untuk komponen UI yang beautiful
- [Lucide](https://lucide.dev/) untuk icon yang comprehensive

---

Dibuat dengan ❤️ untuk memberikan pengalaman AI yang terbaik.
