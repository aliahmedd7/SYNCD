import type { Metadata } from 'next'
import { Outfit, Geist_Mono } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ variable: '--font-outfit', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SYNCD — AI Business Automation',
  description: 'AI agents and automations that reply to every customer, book every appointment, and handle the busywork 24/7. Built for businesses across Egypt, the Gulf, and MENA.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistMono.variable}`}>
      <body className="bg-white text-[#2563eb] antialiased">{children}</body>
    </html>
  )
}
