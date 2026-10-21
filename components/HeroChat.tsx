'use client'

import { useEffect, useRef, useState } from 'react'

type Msg = { from: 'them' | 'ai'; text: string; rtl?: boolean }

const SCRIPT: Msg[] = [
  { from: 'them', text: 'هو عندكم توصيل لإسكندرية؟', rtl: true },
  { from: 'ai', text: 'Yes! We deliver to Alexandria in 2–3 days 🚚 Shipping is 60 EGP.' },
  { from: 'them', text: 'Great — how do I order?' },
  { from: 'ai', text: 'I can take it right here. What size are you after? 😊' },
]

export default function HeroChat() {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const schedule = (fn: () => void, ms: number) => { timers.current.push(setTimeout(fn, ms)) }

    function run() {
      setShown(0)
      setTyping(false)
      let t = 700
      SCRIPT.forEach((m, i) => {
        if (m.from === 'ai') {
          schedule(() => setTyping(true), t)
          t += 1300
          schedule(() => { setTyping(false); setShown(i + 1) }, t)
          t += 700
        } else {
          schedule(() => setShown(i + 1), t)
          t += 1100
        }
      })
      schedule(run, t + 2600)
    }

    run()
    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      {/* Phone frame */}
      <div className="relative rounded-[2rem] border border-[#4a3528]/10 bg-white shadow-[0_30px_70px_-25px_rgba(74,53,40,0.35)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#4a3528]/[0.07] bg-[#f7f2ec]">
          <div className="w-9 h-9 rounded-full bg-[#4a3528] flex items-center justify-center text-[11px] font-bold text-white">SY</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#4a3528] leading-tight">SYNCD Store</p>
            <p className="text-[11px] text-[#4a3528]/45 leading-tight">{typing ? 'typing…' : 'AI agent · online'}</p>
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-[#4a3528]/40 border border-[#4a3528]/15 rounded px-1.5 py-0.5">WhatsApp</span>
        </div>

        {/* Messages */}
        <div className="px-3.5 py-4 flex flex-col gap-2.5 min-h-[300px] justify-end bg-white">
          {SCRIPT.slice(0, shown).map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === 'ai' ? 'justify-end' : 'justify-start'}`}
              style={{ animation: 'syncd-msg-in 0.35s ease-out both' }}
            >
              <div
                dir={m.rtl ? 'rtl' : 'ltr'}
                className={`max-w-[80%] px-3.5 py-2 text-[13px] leading-relaxed rounded-2xl ${
                  m.from === 'ai'
                    ? 'bg-[#4a3528] text-white rounded-br-sm'
                    : 'bg-[#f1ebe3] text-[#4a3528] rounded-bl-sm'
                }`}
              >
                {m.from === 'ai' && (
                  <span className="block text-[9px] font-semibold uppercase tracking-wider text-white/55 mb-0.5">AI reply</span>
                )}
                {m.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-end">
              <div className="flex items-center gap-1 bg-[#4a3528] rounded-2xl rounded-br-sm px-3.5 py-3">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full bg-white" style={{ animation: 'syncd-typing 1.1s ease-in-out infinite', animationDelay: `${d * 0.18}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating voice-call card */}
      <div className="absolute -bottom-6 -left-5 sm:-left-10 w-[210px] rounded-2xl border border-[#4a3528]/10 bg-white p-3.5 shadow-[0_20px_45px_-15px_rgba(74,53,40,0.3)]">
        <div className="flex items-center gap-2.5 mb-2.5">
          <div className="w-8 h-8 rounded-full bg-[#4a3528] flex items-center justify-center text-white">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-[#4a3528] leading-tight">AI Receptionist</p>
            <p className="text-[10px] text-[#4a3528]/45 leading-tight">Call handled · 00:42</p>
          </div>
        </div>
        <div className="flex items-center gap-[3px] h-6">
          {[0.5, 0.8, 0.35, 1, 0.6, 0.9, 0.45, 0.75, 0.55, 0.95, 0.4, 0.7, 0.85, 0.5].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-full bg-[#4a3528]/50 origin-center"
              style={{ height: `${h * 100}%`, animation: 'syncd-bars 1s ease-in-out infinite', animationDelay: `${i * 0.07}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
