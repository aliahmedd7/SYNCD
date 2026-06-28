const pillars = [
  {
    title: 'Speed without sacrifice',
    body: 'We move fast and ship real work. No endless back-and-forths. You see progress in days, not months.',
  },
  {
    title: 'Built for fashion & lifestyle',
    body: 'We understand aesthetics. Our AI campaigns and sites feel native to your brand world — not like off-the-shelf tech.',
  },
  {
    title: 'Owned, not rented',
    body: 'Everything we build belongs to you. Custom code, clean handoff, full control — no platform lock-in.',
  },
  {
    title: 'One team, end to end',
    body: 'Strategy, design, development, and content under one roof. No juggling agencies or freelancers.',
  },
]

export default function WhySyncd() {
  return (
    <section id="why-us" className="py-32 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div className="md:sticky md:top-28">
            <p className="text-xs text-white/25 uppercase tracking-[0.25em] mb-4">Why SYNCD</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              The agency
              <br />
              built different.
            </h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm">
              Most agencies sell you a process. We sell you outcomes. Here's what that actually looks like.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-white/[0.06]">
            {pillars.map((p, i) => (
              <div key={i} className="py-8 group">
                <div className="flex items-start gap-4">
                  <span className="text-[10px] text-white/20 font-mono mt-1 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#c8ff00] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
