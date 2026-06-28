'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080809]/90 backdrop-blur-md border-b border-white/[0.06]' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-[0.2em] text-white uppercase">SYNCD</span>
        <nav className="hidden md:flex items-center gap-8">
          {['Services', 'Why Us', 'Work', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-white/20 text-white/70 hover:border-white/60 hover:text-white transition-all"
        >
          Let's Talk
        </a>
      </div>
    </header>
  )
}
