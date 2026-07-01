const projects = [
  {
    label: 'Ritz Auto Salon',
    sub: 'Website Build',
    type: 'Website',
    img: '/api/screenshot?url=https://ritz-livid.vercel.app',
    portrait: false,
  },
  {
    label: 'Brew Buzz',
    sub: 'Website Build',
    type: 'Website',
    img: '/api/screenshot?url=https://brew-buzz-eight.vercel.app',
    portrait: false,
  },
  {
    label: 'Verse Drop',
    sub: 'Limited Edition Campaign',
    type: 'AI Visual',
    // streetwear / clothing drop
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=540&auto=format&fit=crop&q=80',
    portrait: false,
  },
  {
    label: 'BackOffice Suite',
    sub: 'CRM & Order Automation',
    type: 'Automation',
    // analytics dashboard / data UI
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=800&auto=format&fit=crop&q=80',
    portrait: true,
  },
  {
    label: 'Eden Coastal',
    sub: 'Resort Editorial Series',
    type: 'AI Visual',
    // editorial fashion model, moody
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=540&auto=format&fit=crop&q=80',
    portrait: false,
  },
  {
    label: 'Masri Jewelry',
    sub: 'Brand Site',
    type: 'Website',
    // clean laptop/website design mockup
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=800&auto=format&fit=crop&q=80',
    portrait: true,
  },
]

const typeColor: Record<string, string> = {
  'AI Visual':   'text-[#c8ff00] border-[#c8ff00]/30 bg-black/40',
  'Website':     'text-indigo-300 border-indigo-400/30 bg-black/40',
  'Automation':  'text-sky-300 border-sky-400/30 bg-black/40',
}

export default function Portfolio() {
  return (
    <section id="work" className="py-20 md:py-32 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-xs text-white/25 uppercase tracking-[0.25em] mb-4">Our Work</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              Selected projects
            </h2>
          </div>
          <p className="text-sm text-white/35 max-w-xs leading-relaxed">
            A few things we've made. More on the way.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl border border-white/[0.07] group cursor-pointer
                          transition-all duration-300 hover:border-white/20
                          ${p.portrait ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
            >
              {/* Photo */}
              <img
                src={p.img}
                alt={p.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />

              {/* Permanent dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10" />

              {/* Category badge — top left */}
              <span className={`absolute top-3 left-3 text-[10px] font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${typeColor[p.type]}`}>
                {p.type}
              </span>

              {/* Arrow — top right, hover only */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>

              {/* Label — always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm leading-snug">{p.label}</p>
                <p className="text-white/50 text-xs mt-0.5">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/20 mt-10 tracking-widest uppercase">
          Full portfolio coming soon
        </p>
      </div>
    </section>
  )
}
