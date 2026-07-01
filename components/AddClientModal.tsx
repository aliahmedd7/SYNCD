'use client'

import { useRef, useState, useTransition } from 'react'
import { addClient } from '@/app/dashboard/clients/actions'

const inputClass =
  'w-full bg-[#1a1a1c] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors'
const selectClass =
  'w-full bg-[#1a1a1c] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-white/25 transition-colors [&>option]:bg-[#1a1a1c] [&>option]:text-white'
const labelClass = 'text-xs text-white/30 uppercase tracking-widest'

export default function AddClientModal() {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      try {
        await addClient(formData)
        formRef.current?.reset()
        setOpen(false)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong.')
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full bg-[#c8ff00] text-black hover:bg-white transition-colors"
      >
        + Add Client
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative w-full max-w-lg bg-[#111113] border border-white/[0.08] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/[0.06]">
              <h2 className="text-base font-semibold text-white">Add Client</h2>
              <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white transition-colors" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-8 py-6">
              <form ref={formRef} id="add-client-form" action={handleSubmit} className="flex flex-col gap-4">

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className={labelClass}>Name *</label>
                    <input name="name" type="text" placeholder="Apex Brands" required className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Industry *</label>
                    <input name="industry" type="text" placeholder="Fashion & Apparel" required className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Contact Title</label>
                    <input name="title" type="text" placeholder="Marketing Director" className={inputClass} />
                  </div>
                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className={labelClass}>Contact Email *</label>
                    <input name="contact_email" type="email" placeholder="hello@brand.com" required className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Status</label>
                    <select name="status" required className={selectClass}>
                      <option value="prospect">Lead (not signed)</option>
                      <option value="active">Active (paying client)</option>
                      <option value="inactive">Inactive (past client)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Service</label>
                    <select name="service_type" className={selectClass}>
                      <option value="">Select…</option>
                      <option value="website">Website</option>
                      <option value="automation">Automation</option>
                      <option value="ai_campaign">AI Campaign</option>
                      <option value="full_service">Full Service</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Lead Source</label>
                    <select name="lead_source" className={selectClass}>
                      <option value="">Unknown</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Referral">Referral</option>
                      <option value="Website">Website</option>
                      <option value="Cold Outreach">Cold Outreach</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className={labelClass}>Deal Value ($)</label>
                    <input name="deal_value" type="number" min="0" step="0.01" placeholder="0" className={inputClass} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Next Follow-up Date</label>
                  <input name="next_follow_up" type="date" className={inputClass} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Notes</label>
                  <textarea
                    name="notes"
                    rows={3}
                    placeholder="Any notes about this client…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {error && <p className="text-xs text-red-400">{error}</p>}
              </form>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-white/[0.06] flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 py-3 rounded-lg border border-white/[0.08] text-sm text-white/40 hover:text-white hover:border-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                form="add-client-form"
                type="submit"
                disabled={pending}
                className="flex-1 py-3 rounded-lg bg-[#c8ff00] text-black text-sm font-semibold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pending ? 'Saving…' : 'Add Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
