const pillars = [
  {
    title: 'Built for Arabic + English',
    body: 'Your customers message in Arabic, English, or a mix of both. Our agents handle it naturally — the way your customers actually talk.',
  },
  {
    title: 'Official WhatsApp API',
    body: 'We build on the verified WhatsApp Business API — reliable and ban-proof. Not a risky hack on a personal number that can disappear overnight.',
  },
  {
    title: 'One system, not scattered tools',
    body: 'No stitching together five apps that don’t talk. We connect everything — chat, voice, CRM, calendar — into one system that runs itself.',
  },
  {
    title: 'Real humans behind the AI',
    body: 'The AI does the heavy lifting, but real people set it up, tune it, and stay on call. You’re never left alone with a bot that broke.',
  },
]

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function WhySyncd() {
  return (
    <section id="why-us" className="py-20 md:py-28 px-6 bg-[#eff4ff]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left — headline */}
          <div className="md:sticky md:top-28">
            <p className="text-xs font-semibold text-[#2563eb]/40 uppercase tracking-[0.2em] mb-4">Why SYNCD</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2563eb] leading-tight tracking-tight mb-5">
              Serious automation, built for MENA
            </h2>
            <p className="text-lg text-[#2563eb]/55 leading-relaxed max-w-sm">
              Plenty of people can wire up a chatbot. We build systems your business can actually run on —
              reliable, bilingual, and backed by real people.
            </p>
          </div>

          {/* Right — list */}
          <div className="grid grid-cols-1 gap-4">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="flex gap-4 rounded-2xl border border-[#2563eb]/[0.08] bg-white p-6 shadow-[0_4px_30px_-18px_rgba(37,99,235,0.22)]"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2563eb] mb-1.5">{p.title}</h3>
                  <p className="text-sm text-[#2563eb]/55 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
