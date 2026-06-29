const services = [
  {
    number: '01',
    title: 'Custom Websites',
    description:
      'High-performance sites built from scratch — pixel-perfect design, fast load times, and built to convert. No templates, no compromises.',
    tags: ['Design', 'Development', 'CMS'],
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
    description:
      'Eliminate busywork. We wire up your tools so your business runs smoother — from order flows and CRM syncs to custom back-office workflows.',
    tags: ['Zapier', 'n8n', 'Custom APIs'],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'AI Visual Campaigns',
    description:
      'Editorial-quality visuals at scale. AI-generated imagery, campaign direction, and motion content tailored for fashion and lifestyle brands.',
    tags: ['AI Imagery', 'Campaign Direction', 'Social Content'],
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
              One focus — growth.
            </h2>
          </div>
          <p className="text-sm text-white/35 max-w-xs leading-relaxed">
            Everything your brand needs to show up, scale up, and stay ahead.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.number}
              className="relative overflow-hidden bg-[#0d0d0f] border border-white/[0.07] rounded-2xl p-10 flex flex-col gap-8
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
              <div className="relative w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.07] flex items-center justify-center
                              text-white/40 group-hover:text-[#c8ff00] group-hover:border-[#c8ff00]/20 group-hover:bg-[#c8ff00]/[0.06]
                              transition-all duration-300">
                {s.icon}
              </div>

              {/* Content */}
              <div className="relative flex-1">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#c8ff00] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.description}</p>
              </div>

              {/* Tags */}
              <div className="relative flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-white/40 px-3 py-1 rounded-full bg-white/[0.06] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Pricing */}
              <div className="relative pt-6 border-t border-white/[0.06]">
                <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Starting from</p>
                <p className="text-lg font-semibold text-white/50">— —</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
