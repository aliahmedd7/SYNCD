const niches = [
  {
    name: 'E-commerce',
    blurb: 'Answer product & order questions, recover carts, and close sales right in the DMs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeLinejoin="round" />
        <path d="M3 6h18M16 10a4 4 0 0 1-8 0" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Clinics & Dentists',
    blurb: 'Book appointments and answer patient questions automatically, 24/7.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M11 2h2a1 1 0 0 1 1 1v6h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h6V3a1 1 0 0 1 1-1z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Salons & Spas',
    blurb: 'Fill the calendar — bookings, reminders, and follow-ups on autopilot.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
        <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Real Estate',
    blurb: 'Qualify leads and schedule viewings the moment someone messages.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" strokeLinejoin="round" />
        <path d="M9.5 21v-6h5v6" />
      </svg>
    ),
  },
  {
    name: 'Restaurants & Cafés',
    blurb: 'Take reservations and answer menu, delivery & hours questions instantly.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 3c-1.7 0-3 2-3 5s1.3 4 3 4v9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Gyms & Fitness',
    blurb: 'Turn inquiries into memberships and class bookings without the back-and-forth.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M6.5 6.5 17.5 17.5M4 8l-1 1a2 2 0 0 0 0 3l1 1M8 4 7 5M20 16l-1 1M16 20l1-1a2 2 0 0 0 0-3l-1-1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function TrustStrip() {
  return (
    <section id="industries" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-xs font-semibold text-[#2563eb]/40 uppercase tracking-[0.2em] mb-4">Who we work with</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2563eb] leading-tight tracking-tight">
            Built for the businesses that live in the DMs
          </h2>
          <p className="text-lg text-[#2563eb]/55 mt-5 leading-relaxed">
            If customers message you to buy, book, or ask — SYNCD was built for your niche.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {niches.map((n) => (
            <div
              key={n.name}
              className="flex items-start gap-4 rounded-2xl border border-[#2563eb]/[0.08] bg-white p-6
                         shadow-[0_4px_30px_-18px_rgba(37,99,235,0.22)] transition-all duration-300
                         hover:-translate-y-1 hover:shadow-[0_18px_45px_-20px_rgba(37,99,235,0.28)]"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center">
                {n.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2563eb] mb-1">{n.name}</h3>
                <p className="text-sm text-[#2563eb]/55 leading-relaxed">{n.blurb}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#2563eb]/45 mt-10">
          Not on the list? If your customers message you, we can help. Let’s talk.
        </p>
      </div>
    </section>
  )
}
