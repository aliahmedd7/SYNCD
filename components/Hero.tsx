export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c8ff00]/[0.04] rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs text-white/50 tracking-widest uppercase mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff00] animate-pulse" />
          Creative Tech Agency
        </div>

        <h1 className="text-6xl md:text-8xl font-semibold leading-[0.95] tracking-tight text-white mb-8">
          We build
          <br />
          <span className="text-[#c8ff00]">brands</span> that
          <br />
          move.
        </h1>

        <p className="text-lg text-white/40 max-w-xl mx-auto leading-relaxed mb-12">
          Custom websites, intelligent automations, and AI-crafted visual campaigns
          — for brands ready to stand out.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="px-8 py-4 bg-[#c8ff00] text-black text-sm font-semibold rounded-full hover:bg-white transition-colors"
          >
            Start a project
          </a>
          <a
            href="#services"
            className="px-8 py-4 border border-white/10 text-white/60 text-sm rounded-full hover:border-white/30 hover:text-white transition-all"
          >
            See what we do
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/20 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}
