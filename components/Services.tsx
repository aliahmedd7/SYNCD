const services = [
  {
    number: '01',
    title: 'Custom Digital Builds',
    hook: 'Your site should be working while you sleep.',
    description: 'Custom-built sites and web apps — fast, sharp, and built to convert. No templates. No shortcuts.',
    outcomes: ['Fast & SEO-ready', 'You own the code', 'Scales with you'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M6 8h.01M9 8h6" strokeLinecap="round" />
        <path d="M6 11h12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Automations',
    hook: 'Stop doing manually what a system handles in milliseconds.',
    description: 'We automate what slows you down — lead intake, CRM syncs, follow-ups, and more. Runs 24/7.',
    outcomes: ['Hours back every week', 'Zero dropped leads', 'Grows without hiring'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'AI Visual Campaigns',
    hook: 'Editorial-quality content — without the production budget.',
    description: 'AI visuals for social — brand photography, ads, and video content. Studio quality without the shoot budget.',
    outcomes: ['Content every week', 'Studio-level quality', 'Every platform'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5V11h1a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1v-1a2 2 0 0 1 2-2h1V9.5A4 4 0 0 1 8 6a4 4 0 0 1 4-4z" />
        <circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-20">
          <div>
            <p className="text-xs text-white/25 uppercase tracking-[0.25em] mb-4">What we do</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              Three services.
              <br />
              <span className="text-[#c8ff00]">Zero</span> filler.
            </h2>
          </div>
          <p className="text-sm text-white/35 max-w-xs leading-relaxed">
            Web. Automation. AI visuals. Each one built to produce a measurable outcome.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 items-start">
          {services.map((s) => (
            <div
              key={s.number}
              className="relative overflow-hidden bg-[#0d0d0f] border border-white/[0.07] rounded-2xl p-8 flex flex-col
                         transition-all duration-300 group
                         hover:-translate-y-1.5 hover:border-[#c8ff00]/30 hover:shadow-[0_0_40px_-8px_rgba(200,255,0,0.15)]"
            >
              {/* Large background number */}
              <span
                className="absolute -top-4 -right-2 text-[9rem] font-black leading-none text-white/[0.03] select-none pointer-events-none
                           group-hover:text-[#c8ff00]/[0.06] transition-colors duration-300"
                aria-hidden="true"
              >
                {s.number}
              </span>

              {/* Icon */}
              <div className="relative w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center
                              text-white/40 group-hover:text-[#c8ff00] group-hover:border-[#c8ff00]/20 group-hover:bg-[#c8ff00]/[0.06]
                              transition-all duration-300 mb-6">
                {s.icon}
              </div>

              {/* Title + hook */}
              <h3 className="relative text-2xl font-semibold text-white mb-3 group-hover:text-[#c8ff00] transition-colors duration-300">
                {s.title}
              </h3>
              <p className="relative text-base text-[#c8ff00]/60 italic mb-5 leading-relaxed">{s.hook}</p>

              {/* Description */}
              <p className="relative text-base text-white/50 leading-[1.75] mb-8">{s.description}</p>

              {/* Outcomes */}
              <ul className="relative flex flex-col gap-4 pt-6 border-t border-white/[0.06]">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex items-center gap-3 text-base text-white/45">
                    <span className="text-[#c8ff00] font-bold flex-shrink-0">→</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
