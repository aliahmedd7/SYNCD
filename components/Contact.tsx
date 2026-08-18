const WHATSAPP_NUMBER = '201016157981'
const WHATSAPP_MESSAGE = encodeURIComponent("Hey SYNCD, I'd like to start a project.")

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/[0.06] py-32 md:py-[160px] px-6 overflow-hidden">

      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.09) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-4xl mx-auto text-center">

        {/* Label */}
        <p className="text-xs text-white/25 uppercase tracking-[0.35em] mb-10">
          One message. We take it from there.
        </p>

        {/* Heading */}
        <h2 className="text-[3.2rem] sm:text-[5rem] md:text-[7rem] font-bold leading-[0.88] tracking-tight mb-14 md:mb-16">
          <span className="text-white">Let's build</span>
          <br />
          <span className="text-[#c8ff00]">something.</span>
        </h2>

        {/* Primary CTA */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-4 text-white text-base font-medium tracking-wide
                     border-b border-white/10 pb-3 hover:border-[#c8ff00] hover:text-[#c8ff00] transition-all duration-300 mb-6"
        >
          Message us on WhatsApp
          <span className="text-[#c8ff00] transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </a>

        {/* Secondary — Instagram */}
        <div className="mb-20">
          <a
            href="https://instagram.com/syncdd.site"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/25 hover:text-white/60 transition-colors"
          >
            or find us on Instagram ↗
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-10 md:gap-20">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">10+</p>
            <p className="text-[11px] text-white/25 uppercase tracking-widest">Projects</p>
          </div>
          <div className="w-px h-10 bg-white/[0.08]" />
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">3</p>
            <p className="text-[11px] text-white/25 uppercase tracking-widest">Services</p>
          </div>
          <div className="w-px h-10 bg-white/[0.08]" />
          <div className="text-center">
            <p className="text-3xl font-bold text-[#c8ff00] mb-1">24h</p>
            <p className="text-[11px] text-white/25 uppercase tracking-widest">Response</p>
          </div>
        </div>

      </div>
    </section>
  )
}
