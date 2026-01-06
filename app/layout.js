import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'WriteFlow - Simplify Your Creative Writing Process',
  description: 'Transform your writing with AI that understands your voice. From brainstorming to polishing, WriteFlow simplifies every step.',
  keywords: ['writing', 'AI', 'creative writing', 'content creation', 'writing tool'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}