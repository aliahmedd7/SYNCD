const pillars = [
  {
    number: '01',
    title: 'Speed without sacrifice',
    body: 'We move fast and ship real work. No endless back-and-forths. You see progress in days, not months.',
    highlight: false,
  },
  {
    number: '02',
    title: 'Built for fashion & lifestyle',
    body: 'We understand aesthetics. Our AI campaigns and sites feel native to your brand world — not like off-the-shelf tech.',
    highlight: false,
  },
  {
    number: '03',
    title: 'Owned, not rented',
    body: 'Everything we build belongs to you. Custom code, clean handoff, full control — no platform lock-in.',
    highlight: true,
  },
  {
    number: '04',
    title: 'One team, end to end',
    body: 'Strategy, design, development, and content under one roof. No juggling agencies or freelancers.',
    highlight: false,
  },
]

export default function WhySyncd() {
  return (
    <section id="why-us" className="relative py-20 md:py-44 px-6 border-t border-white/[0.06] overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Lime glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#c8ff00]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">

          {/* Left — sticky headline */}
          <div className="md:sticky md:top-28">
            <p className="text-xs text-white/25 uppercase tracking-[0.25em] mb-5">Why SYNCD</p>
            <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
              <span className="text-white">The agency</span>
              <br />
              <span className="text-white">built </span>
              <span className="text-[#c8ff00]">different.</span>
            </h2>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm">
              Most agencies sell you a process. We sell you outcomes. Here's what that actually looks like.
            </p>
          </div>

          {/* Right — 2×2 card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div
                key={p.number}
                className={`relative rounded-xl border p-6 flex flex-col gap-4 transition-all duration-300 group
                  hover:border-[#c8ff00]/40 hover:shadow-[0_0_30px_-6px_rgba(200,255,0,0.12)]
                  ${p.highlight
                    ? 'border-l-[3px] border-l-[#c8ff00] border-t-white/[0.08] border-r-white/[0.08] border-b-white/[0.08] bg-[#c8ff00]/[0.03]'
                    : 'border-white/[0.07] bg-[#0d0d0f]'
                  }`}
              >
                <span className={`text-3xl font-black leading-none ${p.highlight ? 'text-[#c8ff00]' : 'text-white/10 group-hover:text-[#c8ff00]/40 transition-colors duration-300'}`}>
                  {p.number}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#c8ff00] transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
