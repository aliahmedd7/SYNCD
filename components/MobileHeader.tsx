'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  {
    href: '/dashboard/overview',
    label: 'Overview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: '/dashboard/pipeline',
    label: 'Pipeline',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="5" height="18" rx="1" />
        <rect x="9.5" y="3" width="5" height="13" rx="1" />
        <rect x="17" y="3" width="5" height="8" rx="1" />
      </svg>
    ),
  },
  {
    href: '/dashboard/clients',
    label: 'Clients',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    href: '/dashboard/projects',
    label: 'Projects',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    href: '/dashboard/outreach',
    label: 'Outreach',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
]

export default function MobileHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Top bar — mobile only */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#0c0c0e] flex-shrink-0">
        <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">SYNCD</span>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.05] transition-colors"
          aria-label="Open menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>

      {/* Drawer overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-64 bg-[#0c0c0e] border-r border-white/[0.06] flex flex-col h-full shadow-2xl">
            {/* Drawer header */}
            <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">SYNCD</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white/30 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
              {links.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== '/dashboard/overview' && pathname.startsWith(link.href))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-white/[0.08] text-white'
                        : 'text-white/35 hover:text-white/70 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className={active ? 'text-white' : 'text-white/35'}>{link.icon}</span>
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#c8ff00]/10 flex items-center justify-center">
                  <span className="text-xs text-[#c8ff00] font-medium">A</span>
                </div>
                <div className="text-xs text-white/30">Admin</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
