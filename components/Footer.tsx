import { WHATSAPP_NUMBER, WHATSAPP_AUDIT_URL, INSTAGRAM_URL } from '@/lib/site'

const NAV_LINKS = [
  ['Services', '#services'],
  ['How It Works', '#how-it-works'],
  ['Why SYNCD', '#why-us'],
  ['Book Your Audit', '#book'],
] as const

export default function Footer() {
  return (
    <footer className="border-t border-[#2563eb]/[0.08] px-6 pt-14 pb-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold tracking-tight text-[#2563eb]">SYNCD</span>
              <span className="text-[10px] font-bold text-white bg-[#2563eb] rounded-md px-1.5 py-0.5 leading-none">AI</span>
            </div>
            <p className="text-sm text-[#2563eb]/55 leading-relaxed">
              AI automation for businesses across MENA. Reply faster, never miss a customer,
              and put the busywork on autopilot.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-[#2563eb]/55 hover:text-[#2563eb] transition-colors">
                {label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <a
              href={WHATSAPP_AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#2563eb]/12 text-sm font-medium text-[#2563eb]/70 hover:border-[#2563eb]/35 hover:text-[#2563eb] transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L0 24l6.308-1.506A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.798 9.798 0 01-5.017-1.38l-.36-.214-3.742.893.943-3.648-.235-.374A9.796 9.796 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
              WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[#2563eb]/12 text-sm font-medium text-[#2563eb]/70 hover:border-[#2563eb]/35 hover:text-[#2563eb] transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#2563eb]/[0.08]">
          <p className="text-xs text-[#2563eb]/40">© 2026 SYNCD. All rights reserved.</p>
          <p className="text-xs text-[#2563eb]/40">+{WHATSAPP_NUMBER} · MENA</p>
        </div>
      </div>
    </footer>
  )
}
