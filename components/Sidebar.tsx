'use client'

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
    href: '/dashboard/campaigns',
    label: 'Campaigns',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col border-r border-white/[0.06] bg-[#0c0c0e]">
      <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
        <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">SYNCD</span>
        <Link href="/" className="text-[10px] text-white/20 hover:text-white/50 transition-colors tracking-widest uppercase">
          ← Site
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
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

      <div className="px-5 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#c8ff00]/10 flex items-center justify-center">
            <span className="text-xs text-[#c8ff00] font-medium">A</span>
          </div>
          <div className="text-xs text-white/30">Admin</div>
        </div>
      </div>
    </aside>
  )
}
