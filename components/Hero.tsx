import { WHATSAPP_AUDIT_URL } from '@/lib/site'
import HeroChat from './HeroChat'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 pt-28 pb-20 md:pt-24 overflow-hidden">
      {/* Soft warm gradient wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(1200px 600px at 85% 15%, rgba(150,110,75,0.10) 0%, transparent 55%), radial-gradient(900px 500px at 10% 90%, rgba(150,110,75,0.08) 0%, transparent 55%)' }}
      />

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-10 items-center">

        {/* Left — copy */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#4a3528]/12 bg-white shadow-[0_2px_10px_-4px_rgba(74,53,40,0.15)] mb-7">
            <span className="text-[#4a3528]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" /></svg>
            </span>
            <span className="text-xs font-medium text-[#4a3528]/70">Your business, on autopilot.</span>
          </div>

          <h1 className="text-[2.9rem] sm:text-6xl lg:text-[4.6rem] font-bold leading-[1.02] tracking-tight text-[#4a3528] mb-6">
            Reply faster.
            <br />
            Miss fewer customers.
          </h1>

          <p className="text-lg text-[#4a3528]/55 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-9">
            SYNCD helps businesses across MENA handle customer messages and calls on
            WhatsApp, Instagram, and TikTok — in Arabic and English, 24/7, without growing the team.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start">
            <a
              href={WHATSAPP_AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-[#4a3528] text-white text-[15px] font-semibold hover:bg-[#5e4636] transition-colors"
            >
              Book Your Audit
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border border-[#4a3528]/15 bg-white text-[#4a3528] text-[15px] font-semibold hover:border-[#4a3528]/35 transition-colors"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18" /><path d="M7 14l3-3 3 3 4-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              See How It Works
            </a>
          </div>

          <p className="text-sm text-[#4a3528]/40 mt-4">Free audit — we map where you lose customers first.</p>
        </div>

        {/* Right — live product visual */}
        <div className="relative">
          <HeroChat />
        </div>
      </div>
    </section>
  )
}
