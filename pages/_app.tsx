import type { AppProps } from "next/app"
import { ThemeProvider } from "../components/ThemeProvider"
import { ToastProvider } from "../components/Toast"
import ErrorBoundary from "../components/ErrorBoundary"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="chatbot-theme">
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
