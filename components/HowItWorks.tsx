import Reveal from './Reveal'

const steps = [
  {
    number: '01',
    title: 'Free audit',
    body: 'We map exactly where you lose time and customers today — the missed messages, the slow replies, the manual busywork.',
  },
  {
    number: '02',
    title: 'We build & connect',
    body: 'We set up your AI agents and wire them into your existing tools — WhatsApp, Instagram, phone, CRM, calendar — as one system.',
  },
  {
    number: '03',
    title: 'It runs 24/7',
    body: 'Your system handles customers and busywork around the clock. You watch leads, bookings, and replies roll in — on autopilot.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <p className="text-xs font-semibold text-[#2563eb]/40 uppercase tracking-[0.2em] mb-4">How it works</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2563eb] leading-[1.05] tracking-tight">
            Live in weeks, not months
          </h2>
        </div>

        <Reveal className="grid md:grid-cols-3 gap-5" stagger={90}>
          {steps.map((s) => (
            <div
              key={s.number}
              className="rounded-3xl border border-[#2563eb]/[0.08] bg-white p-8 shadow-[0_4px_30px_-16px_rgba(37,99,235,0.22)]
                         transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_-20px_rgba(37,99,235,0.28)]"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#2563eb] flex items-center justify-center mb-6">
                <span className="text-lg font-bold text-white">{s.number}</span>
              </div>
              <h3 className="text-xl font-bold text-[#2563eb] mb-3">{s.title}</h3>
              <p className="text-[15px] text-[#2563eb]/55 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
