const services = [
  {
    number: '01',
    title: 'Custom Websites',
    description:
      'High-performance sites built from scratch — pixel-perfect design, fast load times, and built to convert. No templates, no compromises.',
    tags: ['Design', 'Development', 'CMS'],
  },
  {
    number: '02',
    title: 'Automations',
    description:
      'Eliminate busywork. We wire up your tools so your business runs smoother — from order flows and CRM syncs to custom back-office workflows.',
    tags: ['Zapier', 'n8n', 'Custom APIs'],
  },
  {
    number: '03',
    title: 'AI Visual Campaigns',
    description:
      'Editorial-quality visuals at scale. AI-generated imagery, campaign direction, and motion content tailored for fashion and lifestyle brands.',
    tags: ['AI Imagery', 'Campaign Direction', 'Social Content'],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
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

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
          {services.map((s) => (
            <div key={s.number} className="bg-[#080809] p-8 md:p-10 flex flex-col gap-6 hover:bg-[#0f0f11] transition-colors group">
              <span className="text-xs text-white/20 font-mono">{s.number}</span>
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#c8ff00] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/[0.06]">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-white/30 px-2.5 py-1 rounded-full border border-white/[0.08]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
