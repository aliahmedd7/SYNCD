import { WHATSAPP_AUDIT_URL } from '@/lib/site'

export default function CtaBand() {
  return (
    <section id="book" className="px-6 py-16 md:py-24 bg-white">
      <div className="relative max-w-5xl mx-auto overflow-hidden rounded-[2rem] bg-[#2563eb] px-6 py-16 md:py-20 text-center">
        {/* Soft glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(600px 300px at 50% 0%, rgba(37,99,235,0.25) 0%, transparent 60%)' }}
        />

        <div className="relative">
          <h2 className="font-display text-[2.4rem] sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-white mb-5">
            Stop missing customers.
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed mb-10">
            Book your free audit. We’ll map where your business is leaking time and leads —
            and exactly what to automate first. No cost, no pressure.
          </p>

          <a
            href={WHATSAPP_AUDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#2563eb] text-[15px] font-semibold hover:bg-white/90 transition-colors"
          >
            Book Your Audit
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          <p className="text-sm text-white/40 mt-5">Replies within 24 hours · WhatsApp</p>
        </div>
      </div>
    </section>
  )
}
