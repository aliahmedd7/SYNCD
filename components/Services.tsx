const pillars = [
  {
    badge: 'Lead Service',
    title: 'AI Conversation & DM Automation',
    sub: 'WhatsApp · Instagram · TikTok',
    description:
      'An AI agent that handles customer chats 24/7 across every channel — so no lead ever goes cold.',
    points: [
      'Answers product, pricing, shipping & policy questions instantly',
      'Books appointments and captures leads automatically',
      'Follows up and recovers abandoned checkouts',
      'Clean handoff to a real person when it matters',
      'Built on the official WhatsApp Business API — verified & ban-proof',
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" strokeLinejoin="round" />
        <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    badge: 'Voice',
    title: 'AI Voice Receptionist',
    sub: 'Never a missed call',
    description:
      'An AI agent that answers your phone 24/7, handles inquiries, books appointments, and routes every lead.',
    points: [
      'Picks up every call, around the clock',
      'Answers inquiries in a natural voice',
      'Books appointments straight into your calendar',
      'Routes urgent calls and follows up on leads',
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 px-6 bg-[#f6f1ea]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-xs font-semibold text-[#4a3528]/40 uppercase tracking-[0.2em] mb-4">What we do</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#4a3528] leading-tight tracking-tight">
            Two AI agents that run your front desk
          </h2>
          <p className="text-lg text-[#4a3528]/55 mt-5 leading-relaxed">
            We start with one painful workflow, then connect your tools into a system that runs itself.
          </p>
        </div>

        {/* Two pillars */}
        <div className="grid md:grid-cols-2 gap-5 items-stretch">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-[#4a3528]/[0.08] rounded-3xl p-8 flex flex-col
                         shadow-[0_4px_30px_-16px_rgba(74,53,40,0.25)] transition-all duration-300
                         hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgba(74,53,40,0.3)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#4a3528] flex items-center justify-center text-white">
                  {p.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#4a3528]/50 bg-[#f1ebe3] rounded-full px-3 py-1.5">
                  {p.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#4a3528] mb-1">{p.title}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#4a3528]/40 mb-4">{p.sub}</p>
              <p className="text-[15px] text-[#4a3528]/55 leading-relaxed mb-7">{p.description}</p>

              <ul className="flex flex-col gap-3 mt-auto pt-6 border-t border-[#4a3528]/[0.08]">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-[#4a3528]/70 leading-relaxed">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#4a3528]/[0.08] flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4a3528" strokeWidth="3"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Custom Automations */}
        <div className="mt-5 rounded-3xl bg-[#4a3528] p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex items-center gap-4 md:flex-shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M14.7 6.3a4 4 0 0 1 0 5.6l-3 3a4 4 0 0 1-5.6-5.6l1.5-1.5M9.3 17.7a4 4 0 0 1 0-5.6l3-3a4 4 0 0 1 5.6 5.6l-1.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Plus</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Custom Automations</h3>
            <p className="text-[15px] text-white/60 leading-relaxed max-w-2xl">
              We connect your existing tools — CRM, sheets, calendars, payments, inventory — and wipe out
              the repetitive manual work in between. Tailored systems built around how you actually operate, not templates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
