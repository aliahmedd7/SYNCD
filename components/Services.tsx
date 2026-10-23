import Reveal from './Reveal'

const leadPoints = [
  'Answers product, pricing, shipping & policy questions instantly',
  'Books appointments and captures leads automatically',
  'Follows up and recovers abandoned checkouts',
  'Clean handoff to a real person when it matters',
  'Built on the official WhatsApp Business API — verified & ban-proof',
]

const tileBase =
  'rounded-3xl border border-[#2563eb]/[0.08] bg-white shadow-[0_4px_30px_-16px_rgba(37,99,235,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_-22px_rgba(37,99,235,0.35)]'

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 px-6 bg-[#eff4ff]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="flex items-center gap-2 text-xs font-semibold text-[#2563eb]/50 uppercase tracking-[0.2em] mb-4"><span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />What we do</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2563eb] leading-[1.05] tracking-tight">
            Two AI agents that run your front desk
          </h2>
          <p className="text-lg text-[#2563eb]/55 mt-5 leading-relaxed">
            We start with one painful workflow, then connect your tools into a system that runs itself.
          </p>
        </div>

        {/* Bento grid */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-6 auto-rows-auto lg:auto-rows-[minmax(0,1fr)] gap-4 md:gap-5" stagger={80}>

          {/* Lead tile — large */}
          <div className={`${tileBase} p-8 flex flex-col lg:col-span-4 lg:row-span-2`}>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#2563eb] flex items-center justify-center text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" strokeLinejoin="round" />
                  <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#2563eb]/50 bg-[#eef2ff] rounded-full px-3 py-1.5">Lead Service</span>
            </div>
            <h3 className="font-display text-2xl md:text-[1.75rem] font-bold text-[#2563eb] mb-1">AI Conversation & DM Automation</h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563eb]/40 mb-4">WhatsApp · Instagram · TikTok</p>
            <p className="text-[15px] text-[#2563eb]/55 leading-relaxed mb-6 max-w-lg">
              An AI agent that handles customer chats 24/7 across every channel — so no lead ever goes cold.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-auto">
              {leadPoints.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-[#2563eb]/70 leading-relaxed">
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#2563eb]/[0.1] flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          {/* Stat tile — 24/7 (amber accent) */}
          <div className="rounded-3xl p-7 flex flex-col justify-center lg:col-span-2 bg-[#f59e0b] shadow-[0_6px_30px_-14px_rgba(245,158,11,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-20px_rgba(245,158,11,0.6)]">
            <p className="font-display text-5xl font-bold text-[#422006] leading-none">24/7</p>
            <p className="text-sm text-[#5c3a06] mt-2 leading-relaxed font-medium">Always on. Every message answered, day or night.</p>
          </div>

          {/* Stat tile — speed */}
          <div className={`${tileBase} p-7 flex flex-col justify-center lg:col-span-2`}>
            <p className="font-display text-5xl font-bold text-[#2563eb] leading-none">&lt;10s</p>
            <p className="text-sm text-[#2563eb]/55 mt-2 leading-relaxed">Average first reply — before they message a competitor.</p>
          </div>

          {/* Voice tile */}
          <div className={`${tileBase} p-8 flex flex-col lg:col-span-3`}>
            <div className="w-12 h-12 rounded-2xl bg-[#2563eb] flex items-center justify-center text-white mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-[#2563eb] mb-2">AI Voice Receptionist</h3>
            <p className="text-[15px] text-[#2563eb]/55 leading-relaxed">
              Answers your phone 24/7, handles inquiries, books appointments, and routes every lead. Never a missed call, never a busy line.
            </p>
          </div>

          {/* Custom Automations — inverted blue tile */}
          <div className="rounded-3xl bg-[#2563eb] p-8 flex flex-col lg:col-span-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(37,99,235,0.6)]">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M14.7 6.3a4 4 0 0 1 0 5.6l-3 3a4 4 0 0 1-5.6-5.6l1.5-1.5M9.3 17.7a4 4 0 0 1 0-5.6l3-3a4 4 0 0 1 5.6 5.6l-1.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-2">Custom Automations</h3>
            <p className="text-[15px] text-white/70 leading-relaxed">
              We connect your existing tools — CRM, sheets, calendars, payments, inventory — and wipe out the repetitive manual work in between. Tailored, not templated.
            </p>
          </div>

        </Reveal>
      </div>
    </section>
  )
}
