import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'MinuteZen — Harmony of Body, Peace of Mind',
  description: 'Daily yoga & meditation for body and mind.',
  openGraph: {
    title: 'MinuteZen — Harmony of Body, Peace of Mind',
    description: 'Daily yoga & meditation for body and mind.',
  },
  icons: {
    icon: '/minute-zen.webp',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
