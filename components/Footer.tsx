export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">SYNCD</span>
        <p className="text-xs text-white/20">© {new Date().getFullYear()} SYNCD. All rights reserved.</p>
        <div className="flex gap-6">
          {['Instagram', 'LinkedIn', 'WhatsApp'].map((s) => (
            <a key={s} href="#" className="text-xs text-white/25 hover:text-white/60 transition-colors">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
