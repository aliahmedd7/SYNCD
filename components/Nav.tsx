'use client'

import { useEffect, useState } from 'react'
import { WHATSAPP_AUDIT_URL } from '@/lib/site'

const NAV_LINKS = [
  ['Services', '#services'],
  ['How It Works', '#how-it-works'],
  ['Why SYNCD', '#why-us'],
] as const

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen ? 'bg-white/90 backdrop-blur-md border-b border-[#2563eb]/[0.07]' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-18 py-3 flex items-center justify-between">

          {/* Left: circular menu button */}
          <button
            className="flex items-center justify-center w-11 h-11 rounded-full border border-[#2563eb]/15 bg-white hover:bg-[#2563eb]/[0.04] transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className="relative flex flex-col items-center justify-center gap-[5px] w-5 h-5">
              <span className={`block w-5 h-[2px] rounded bg-[#2563eb] origin-center transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block w-5 h-[2px] rounded bg-[#2563eb] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-[2px] rounded bg-[#2563eb] origin-center transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </span>
          </button>

          {/* Center: desktop nav links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-[#2563eb]/55 hover:text-[#2563eb] transition-colors">
                {label}
              </a>
            ))}
          </nav>

          {/* Right: wordmark + AI badge + CTA */}
          <div className="flex items-center gap-3">
            <a href="#hero" className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-[#2563eb]">SYNCD</span>
              <span className="text-[10px] font-bold text-white bg-[#2563eb] rounded-md px-1.5 py-0.5 leading-none">AI</span>
            </a>
            <a
              href={WHATSAPP_AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-sm font-semibold px-5 py-2.5 rounded-full bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors"
            >
              Book Your Audit
            </a>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col justify-center px-8 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-7">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[2.2rem] font-bold text-[#2563eb] leading-none"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-14">
          <a
            href={WHATSAPP_AUDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#2563eb] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors"
          >
            Book Your Audit
          </a>
        </div>

        <p className="absolute bottom-10 left-8 text-xs text-[#2563eb]/30 tracking-widest uppercase">© 2026 SYNCD</p>
      </div>
    </>
  )
}
