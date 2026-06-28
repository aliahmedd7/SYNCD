const placeholders = [
  { label: 'AI Campaign — Womenswear FW25', type: 'AI Visual', aspect: 'tall' },
  { label: 'E-commerce Rebuild — Streetwear Brand', type: 'Website', aspect: 'wide' },
  { label: 'Drop Campaign — Limited Edition', type: 'AI Visual', aspect: 'square' },
  { label: 'Order Automation Suite', type: 'Automation', aspect: 'square' },
  { label: 'Editorial Series — Resort Collection', type: 'AI Visual', aspect: 'wide' },
  { label: 'Brand Site — Luxury Accessories', type: 'Website', aspect: 'tall' },
]

const typeColor: Record<string, string> = {
  'AI Visual': 'text-[#c8ff00] border-[#c8ff00]/20 bg-[#c8ff00]/[0.06]',
  'Website': 'text-indigo-400 border-indigo-500/20 bg-indigo-500/[0.06]',
  'Automation': 'text-sky-400 border-sky-500/20 bg-sky-500/[0.06]',
}

export default function Portfolio() {
  return (
    <section id="work" className="py-32 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholders.map((item, i) => (
            <div
              key={i}
              className={`relative rounded-xl border border-white/[0.07] bg-[#0f0f11] overflow-hidden group cursor-pointer ${
                item.aspect === 'tall' ? 'row-span-2' : item.aspect === 'wide' ? 'col-span-2 md:col-span-1' : ''
              }`}
              style={{ minHeight: item.aspect === 'tall' ? '400px' : '180px' }}
            >
              {/* Noise texture overlay */}
              <div className="absolute inset-0 opacity-[0.15]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border mb-2 ${typeColor[item.type]}`}>
                  {item.type}
                </span>
                <p className="text-sm font-medium text-white leading-snug">{item.label}</p>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
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
