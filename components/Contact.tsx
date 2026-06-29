const WHATSAPP_NUMBER = '201016157981'
const WHATSAPP_MESSAGE = encodeURIComponent("Hey SYNCD, I'd like to start a project.")

export default function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/[0.06] py-24 md:py-[200px] px-6 flex flex-col items-center text-center overflow-hidden">

      {/* Lime radial glow behind heading */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.07) 0%, transparent 70%)' }}
      />

      {/* Thin line + label */}
      <div className="relative w-16 h-px bg-white/20 mb-8 md:mb-10" />
      <p className="relative text-xs text-white/30 uppercase tracking-[0.3em] mb-8 md:mb-10">
        Ready to grow?
      </p>

      {/* Heading */}
      <h2 className="relative text-[2.4rem] sm:text-[3.5rem] md:text-[72px] font-bold text-white leading-tight mb-10 md:mb-14">
        Let's build something<span className="text-[#c8ff00]">.</span>
      </h2>

      {/* WhatsApp button — full width on mobile, auto on larger */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full sm:w-auto flex sm:inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/25 text-white text-sm font-medium
                   transition-all duration-300
                   hover:border-[#c8ff00] hover:text-[#c8ff00] hover:shadow-[0_0_30px_-4px_rgba(200,255,0,0.35)]"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L0 24l6.308-1.506A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.798 9.798 0 01-5.017-1.38l-.36-.214-3.742.893.943-3.648-.235-.374A9.796 9.796 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
        </svg>
        Message us on WhatsApp
      </a>

      {/* Stats row */}
      <div className="relative mt-10 md:mt-12 flex items-center gap-4 text-xs text-white/25 tracking-wide">
        <span>10+ Projects</span>
        <span className="text-white/10">·</span>
        <span>3 Services</span>
        <span className="text-white/10">·</span>
        <span>24h Response</span>
      </div>

      {/* 3-step inline */}
      <p className="relative mt-8 md:mt-10 text-xs text-white/15 tracking-wide">
        Discovery&nbsp;&nbsp;→&nbsp;&nbsp;Proposal&nbsp;&nbsp;→&nbsp;&nbsp;Build &amp; Launch
      </p>

    </section>
  )
}
