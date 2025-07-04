import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/toast-provider"

export const metadata: Metadata = {
  title: "AI Agent Aga - Asisten AI Modern Indonesia",
  description:
    "Bertemu dengan Aga, asisten AI cerdas Anda. Nikmati masa depan percakapan AI dengan antarmuka chat modern dan responsif.",
  keywords: ["AI", "Chat", "Assistant", "Artificial Intelligence", "Conversation", "Indonesia", "Aga"],
  authors: [{ name: "Aga" }],
  robots: "index, follow",
  openGraph: {
    title: "AI Agent Aga",
    description: "Bertemu dengan Aga - Pendamping AI cerdas Anda",
    type: "website",
    locale: "id_ID",
  },
  generator: 'Aga AI Assistant'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
