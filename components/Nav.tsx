'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  ['Home', '#hero'],
  ['Services', '#services'],
  ['Why Us', '#why-us'],
  ['Work', '#work'],
  ['Contact', '#contact'],
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
          scrolled || menuOpen
            ? 'bg-[#080809]/95 backdrop-blur-md border-b border-white/[0.06]'
            : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Left: hamburger on mobile, SYNCD logo on desktop */}
          <div className="flex items-center">
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 -ml-1"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-[1.5px] bg-white origin-center transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-[1.5px] bg-white origin-center transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
            <span className="hidden md:block text-sm font-semibold tracking-[0.2em] text-white uppercase">SYNCD</span>
          </div>

          {/* Center: desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-white/40 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right: SYNCD on mobile, LET'S TALK on desktop */}
          <div>
            <span className="md:hidden text-sm font-semibold tracking-[0.2em] text-white uppercase">SYNCD</span>
            <a
              href="#contact"
              className="hidden md:inline-flex text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full border border-white/20 text-white/70 hover:border-white/60 hover:text-white transition-all"
            >
              Let's Talk
            </a>
          </div>

        </div>
      </header>

      {/* Mobile full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#080809] flex flex-col justify-center px-8 md:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-7">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[2.5rem] font-semibold text-white/70 hover:text-white transition-colors leading-none"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-14">
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/20 text-white/70 text-xs font-semibold tracking-widest uppercase hover:border-white/50 hover:text-white transition-all"
          >
            Let's Talk
          </a>
        </div>

        <p className="absolute bottom-10 left-8 text-xs text-white/15 tracking-widest uppercase">
          © 2026 SYNCD
        </p>
      </div>
    </>
  )
}
