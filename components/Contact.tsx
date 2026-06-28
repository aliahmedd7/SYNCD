const WHATSAPP_NUMBER = '201016157981'
const WHATSAPP_MESSAGE = encodeURIComponent("Hey SYNCD, I'd like to start a project.")

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-white/[0.07] bg-[#0f0f11] overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left */}
            <div className="p-10 md:p-16 flex flex-col justify-between gap-12">
              <div>
                <p className="text-xs text-white/25 uppercase tracking-[0.25em] mb-6">Get in touch</p>
                <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
                  Ready to build
                  <br />
                  something real?
                </h2>
                <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                  Drop us a message on WhatsApp and we'll get back to you within 24 hours.
                  No forms, no waiting rooms — just a conversation.
                </p>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 self-start px-7 py-4 bg-[#c8ff00] text-black text-sm font-semibold rounded-full hover:bg-white transition-colors group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L0 24l6.308-1.506A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.798 9.798 0 01-5.017-1.38l-.36-.214-3.742.893.943-3.648-.235-.374A9.796 9.796 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/>
                </svg>
                Message us on WhatsApp
                <svg className="group-hover:translate-x-0.5 transition-transform" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Right */}
            <div className="border-t md:border-t-0 md:border-l border-white/[0.06] p-10 md:p-16 flex flex-col gap-8">
              <p className="text-xs text-white/25 uppercase tracking-widest">What to expect</p>
              <div className="flex flex-col gap-6">
                {[
                  ['01', 'Discovery call', 'We learn about your brand, goals, and timeline.'],
                  ['02', 'Proposal', 'A clear scope and price — no vague estimates.'],
                  ['03', 'Build & launch', 'Fast execution with regular updates along the way.'],
                ].map(([num, title, desc]) => (
                  <div key={num} className="flex gap-4">
                    <span className="text-xs text-white/20 font-mono mt-0.5 flex-shrink-0">{num}</span>
                    <div>
                      <p className="text-sm font-medium text-white mb-1">{title}</p>
                      <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
