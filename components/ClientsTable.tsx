'use client'

import { useRef, useState, useTransition } from 'react'
import { updateClient } from '@/app/dashboard/clients/actions'
import type { Client } from '@/lib/supabase'

const inputClass =
  'w-full bg-[#1a1a1c] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors'
const selectClass =
  'w-full bg-[#1a1a1c] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-white/25 transition-colors [&>option]:bg-[#1a1a1c] [&>option]:text-white'

const statusStyles: Record<Client['status'], string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  inactive: 'bg-white/5 text-white/30 border-white/10',
  prospect: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

const statusLabel: Record<Client['status'], string> = {
  prospect: 'Lead',
  active: 'Active',
  inactive: 'Inactive',
}

const serviceLabel: Record<string, string> = {
  website: 'Website',
  automation: 'Automation',
  ai_campaign: 'AI Campaign',
  full_service: 'Full Service',
}

export default function ClientsTable({ clients }: { clients: Client[] }) {
  const [selected, setSelected] = useState<Client | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(formData: FormData) {
    if (!selected) return
    setError(null)
    startTransition(async () => {
      try {
        await updateClient(selected.id, formData)
        setSelected(null)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong.')
      }
    })
  }

  return (
    <>
      <div className="rounded-xl border border-white/[0.06] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              {['Name', 'Industry', 'Contact', 'Service', 'Status', 'Added'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-xs text-white/25 uppercase tracking-widest font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients.map((client, i) => (
              <tr
                key={client.id}
                onClick={() => { setSelected(client); setError(null) }}
                className={`cursor-pointer hover:bg-white/[0.03] transition-colors ${i < clients.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
              >
                <td className="px-5 py-4 text-white font-medium">{client.name}</td>
                <td className="px-5 py-4 text-white/45">{client.industry}</td>
                <td className="px-5 py-4 text-white/45">{client.contact_email}</td>
                <td className="px-5 py-4 text-white/35">{client.service_type ? serviceLabel[client.service_type] : '—'}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border ${statusStyles[client.status]}`}>
                    {statusLabel[client.status]}
                  </span>
                </td>
                <td className="px-5 py-4 text-white/25">
                  {new Date(client.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />

          <div className="relative w-full max-w-md bg-[#111113] border border-white/[0.08] rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="text-base font-semibold text-white">Edit Client</h2>
                <p className="text-xs text-white/30 mt-0.5">{selected.name}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition-colors" aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form ref={formRef} action={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/30 uppercase tracking-widest">Name</label>
                <input name="name" type="text" defaultValue={selected.name} required className={inputClass} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/30 uppercase tracking-widest">Industry</label>
                <input name="industry" type="text" defaultValue={selected.industry} required className={inputClass} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/30 uppercase tracking-widest">Contact Email</label>
                <input name="contact_email" type="email" defaultValue={selected.contact_email} required className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/30 uppercase tracking-widest">Status</label>
                  <select name="status" defaultValue={selected.status} className={selectClass}>
                    <option value="prospect">Lead (not signed)</option>
                    <option value="active">Active (paying client)</option>
                    <option value="inactive">Inactive (past client)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/30 uppercase tracking-widest">Service</label>
                  <select name="service_type" defaultValue={selected.service_type ?? ''} className={selectClass}>
                    <option value="">None</option>
                    <option value="website">Website</option>
                    <option value="automation">Automation</option>
                    <option value="ai_campaign">AI Campaign</option>
                    <option value="full_service">Full Service</option>
                  </select>
                </div>
              </div>

              {error && <p className="text-xs text-red-400">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="flex-1 py-3 rounded-lg border border-white/[0.08] text-sm text-white/40 hover:text-white hover:border-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="flex-1 py-3 rounded-lg bg-[#c8ff00] text-black text-sm font-semibold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {pending ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
