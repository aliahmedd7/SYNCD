const sectors = ['E-commerce', 'Clinics', 'Salons', 'Real Estate', 'Restaurants']

export default function TrustStrip() {
  return (
    <section className="py-12 px-6 bg-gradient-to-b from-white to-[#f6f1ea]">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <p className="text-xs font-semibold text-[#4a3528]/40 uppercase tracking-[0.2em] text-center">
          Trusted by growing businesses across MENA
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
          {sectors.map((name) => (
            <span
              key={name}
              className="text-sm font-medium text-[#4a3528]/55 bg-white border border-[#4a3528]/10 rounded-full px-4 py-1.5 shadow-[0_1px_6px_-3px_rgba(74,53,40,0.2)] select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
