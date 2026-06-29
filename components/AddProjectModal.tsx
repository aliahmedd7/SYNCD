'use client'

import { useRef, useState, useTransition } from 'react'
import { addProject } from '@/app/dashboard/projects/actions'
import type { Client } from '@/lib/supabase'

const inputClass =
  'w-full bg-[#1a1a1c] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors'
const selectClass =
  'w-full bg-[#1a1a1c] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-white/25 transition-colors [&>option]:bg-[#1a1a1c] [&>option]:text-white'

export default function AddProjectModal({ clients }: { clients: Pick<Client, 'id' | 'name'>[] }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      try {
        await addProject(formData)
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
        + New Project
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative w-full max-w-md bg-[#111113] border border-white/[0.08] rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-7">
              <h2 className="text-base font-semibold text-white">New Project</h2>
              <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white transition-colors" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/30 uppercase tracking-widest">Client</label>
                <select name="client_id" required className={selectClass}>
                  <option value="">Select a client…</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/30 uppercase tracking-widest">Project Name</label>
                <input name="name" type="text" placeholder="Ritz Auto Salon — Website Build" required className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/30 uppercase tracking-widest">Type</label>
                  <select name="type" required className={selectClass}>
                    <option value="">Select…</option>
                    <option value="website">Website</option>
                    <option value="automation">Automation</option>
                    <option value="ai_campaign">AI Campaign</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/30 uppercase tracking-widest">Status</label>
                  <select name="status" required className={selectClass}>
                    <option value="planning">Planning</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/30 uppercase tracking-widest">Start Date</label>
                  <input name="start_date" type="date" className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/30 uppercase tracking-widest">End Date</label>
                  <input name="end_date" type="date" className={inputClass} />
                </div>
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-3 rounded-lg border border-white/[0.08] text-sm text-white/40 hover:text-white hover:border-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex-1 py-3 rounded-lg bg-[#c8ff00] text-black text-sm font-semibold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {pending ? 'Saving…' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
