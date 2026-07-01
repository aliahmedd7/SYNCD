'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { Lead } from '@/lib/supabase'
import { updateLeadStatus, updateLeadDraft, deleteLead } from '@/app/dashboard/outreach/actions'

const inputClass =
  'w-full bg-[#0d0d0f] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors'
const labelClass = 'text-[11px] text-white/30 uppercase tracking-widest'

const statusStyles: Record<Lead['status'], string> = {
  draft:    'bg-white/5 text-white/40 border-white/10',
  reviewed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  sent:     'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  skipped:  'bg-red-500/10 text-red-400 border-red-500/20',
}
const STATUS_ORDER: Lead['status'][] = ['draft', 'reviewed', 'sent', 'skipped']

const CATEGORIES = [
  'Clothing Store', 'Boutique', 'Fashion Brand', 'Automotive', 'Auto Detailing',
  'Car Dealership', 'Coffee Shop', 'Restaurant', 'Salon', 'Gym', 'Real Estate',
  'Jewelry Store', 'Furniture Store', 'Bakery',
]

export default function OutreachClient({ initialLeads }: { initialLeads: Lead[] }) {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [selected, setSelected] = useState<Lead | null>(null)

  // search form
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchMsg, setSearchMsg] = useState<string | null>(null)

  // bulk drafting
  const [bulkRunning, setBulkRunning] = useState(false)
  const [draftingId, setDraftingId] = useState<string | null>(null)

  const ungenerated = leads.filter((l) => !l.email_draft)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!location.trim() || !category.trim()) return
    setSearching(true)
    setSearchMsg(null)
    try {
      const res = await fetch('/api/search-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, category }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Search failed.')
      if (data.inserted === 0) {
        setSearchMsg('No new businesses found for that search.')
      } else {
        setLeads((prev) => [...data.leads, ...prev])
        setSearchMsg(`Added ${data.inserted} new lead${data.inserted === 1 ? '' : 's'}.`)
        setLocation(''); setCategory('')
      }
    } catch (err) {
      setSearchMsg(err instanceof Error ? err.message : 'Search failed.')
    } finally {
      setSearching(false)
    }
  }

  async function draftOne(leadId: string) {
    setDraftingId(leadId)
    try {
      const res = await fetch('/api/draft-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Draft failed.')
      router.refresh()
      // optimistic: refetch single lead from server response not provided, so soft-refresh
      await refreshLeads()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Draft failed.')
    } finally {
      setDraftingId(null)
    }
  }

  async function draftAll() {
    if (ungenerated.length === 0) return
    setBulkRunning(true)
    try {
      const res = await fetch('/api/draft-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadIds: ungenerated.map((l) => l.id) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Bulk draft failed.')
      await refreshLeads()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Bulk draft failed.')
    } finally {
      setBulkRunning(false)
    }
  }

  // Pull fresh leads after server-side mutations (drafts written by the API route)
  async function refreshLeads() {
    const res = await fetch('/api/leads', { cache: 'no-store' }).catch(() => null)
    if (res?.ok) {
      const data = await res.json()
      setLeads(data.leads)
      if (selected) {
        const updated = data.leads.find((l: Lead) => l.id === selected.id)
        if (updated) setSelected(updated)
      }
    } else {
      router.refresh()
    }
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-6xl">
      <div className="mb-8">
        <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Outreach</p>
        <h1 className="text-2xl font-semibold text-white">Lead Finder</h1>
        <p className="text-sm text-white/35 mt-1">
          Search nearby businesses, then auto-draft a personalized cold email for each.
        </p>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 mb-6">
        <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-end">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)}
              placeholder="Cairo, Egypt" className={inputClass} />
          </div>
          <CategoryCombobox value={category} onChange={setCategory} />

          <button type="submit" disabled={searching || !location.trim() || !category.trim()}
            className="py-3 px-6 rounded-lg bg-[#c8ff00] text-black text-sm font-semibold hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap">
            {searching ? 'Searching…' : 'Search'}
          </button>
        </div>
        {searchMsg && <p className="text-xs text-white/40 mt-3">{searchMsg}</p>}
      </form>

      {/* Bulk actions */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-white/30">
          {leads.length} lead{leads.length === 1 ? '' : 's'}
          {ungenerated.length > 0 && ` · ${ungenerated.length} without a draft`}
        </p>
        <button onClick={draftAll} disabled={bulkRunning || ungenerated.length === 0}
          className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          {bulkRunning ? `Generating ${ungenerated.length}…` : `Bulk Generate Drafts (${ungenerated.length})`}
        </button>
      </div>

      {/* Leads table */}
      {leads.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <p className="text-white/25 text-sm">No leads yet. Run a search above to get started.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block rounded-xl border border-white/[0.06] overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  {['Business', 'Category', 'Draft', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs text-white/25 uppercase tracking-widest font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={lead.id}
                    className={`hover:bg-white/[0.03] transition-colors ${i < leads.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                    <td className="px-5 py-3.5 cursor-pointer" onClick={() => setSelected(lead)}>
                      <p className="text-white font-medium leading-snug">{lead.business_name}</p>
                      {lead.website && <p className="text-[11px] text-white/25 truncate max-w-[220px]">{lead.website.replace(/^https?:\/\//, '')}</p>}
                    </td>
                    <td className="px-5 py-3.5 text-white/40 text-xs">{lead.category}</td>
                    <td className="px-5 py-3.5">
                      {lead.email_draft ? (
                        <span className="text-xs text-emerald-400/70">● Drafted</span>
                      ) : (
                        <span className="text-xs text-white/20">Not yet</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border capitalize ${statusStyles[lead.status]}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {lead.email_draft ? (
                        <button onClick={() => setSelected(lead)}
                          className="text-xs text-white/40 hover:text-white transition-colors">View →</button>
                      ) : (
                        <button onClick={() => draftOne(lead.id)} disabled={draftingId === lead.id || bulkRunning}
                          className="text-xs font-medium text-[#c8ff00] hover:text-white transition-colors disabled:opacity-40">
                          {draftingId === lead.id ? 'Generating…' : 'Generate Draft'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden flex flex-col gap-2">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="text-sm text-white font-medium leading-snug truncate">{lead.business_name}</p>
                    <p className="text-xs text-white/30 mt-0.5">{lead.category}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border capitalize flex-shrink-0 ${statusStyles[lead.status]}`}>
                    {lead.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                  <span className={`text-xs ${lead.email_draft ? 'text-emerald-400/70' : 'text-white/20'}`}>
                    {lead.email_draft ? '● Drafted' : 'No draft'}
                  </span>
                  {lead.email_draft ? (
                    <button onClick={() => setSelected(lead)}
                      className="text-xs text-white/40 hover:text-white transition-colors">View →</button>
                  ) : (
                    <button onClick={() => draftOne(lead.id)} disabled={draftingId === lead.id || bulkRunning}
                      className="text-xs font-medium text-[#c8ff00] hover:text-white transition-colors disabled:opacity-40">
                      {draftingId === lead.id ? 'Generating…' : 'Generate'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selected && (
        <LeadDetail
          lead={selected}
          onClose={() => setSelected(null)}
          onChange={(updated) => {
            setSelected(updated)
            setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))
          }}
          onDelete={(id) => {
            setLeads((prev) => prev.filter((l) => l.id !== id))
            setSelected(null)
          }}
          onGenerate={() => draftOne(selected.id)}
          generating={draftingId === selected.id}
        />
      )}
    </div>
  )
}

function CategoryCombobox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)

  const q = value.trim().toLowerCase()
  const matches = q
    ? CATEGORIES.filter((c) => c.toLowerCase().includes(q) && c.toLowerCase() !== q)
    : CATEGORIES

  function select(category: string) {
    onChange(category)
    setOpen(false)
    setHighlight(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || matches.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => (h + 1) % matches.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => (h <= 0 ? matches.length - 1 : h - 1))
    } else if (e.key === 'Enter' && highlight >= 0) {
      e.preventDefault()
      select(matches[highlight])
    } else if (e.key === 'Escape') {
      setOpen(false)
      setHighlight(-1)
    }
  }

  return (
    <div className="relative flex flex-col gap-1.5">
      <label className={labelClass}>Category</label>
      <input
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); setHighlight(-1) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={handleKeyDown}
        placeholder="clothing boutiques"
        autoComplete="off"
        className={inputClass}
      />

      {open && matches.length > 0 && (
        <ul className="absolute z-20 top-full left-0 right-0 mt-1.5 max-h-60 overflow-y-auto rounded-lg border border-white/[0.1] bg-[#111113] shadow-2xl py-1">
          {matches.map((c, i) => (
            <li key={c}>
              <button
                type="button"
                onMouseDown={(e) => { e.preventDefault(); select(c) }}
                onMouseEnter={() => setHighlight(i)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  highlight === i ? 'bg-[#c8ff00]/10 text-[#c8ff00]' : 'text-white/60 hover:text-white'
                }`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function LeadDetail({
  lead, onClose, onChange, onDelete, onGenerate, generating,
}: {
  lead: Lead
  onClose: () => void
  onChange: (l: Lead) => void
  onDelete: (id: string) => void
  onGenerate: () => void
  generating: boolean
}) {
  const [draft, setDraft] = useState(lead.email_draft ?? '')
  const [pending, startTransition] = useTransition()
  const [copied, setCopied] = useState(false)
  const [savedMsg, setSavedMsg] = useState<string | null>(null)

  // keep textarea synced when a generation completes and parent passes a fresh lead
  if (lead.email_draft && lead.email_draft !== draft && draft === '') {
    // only auto-fill if user hasn't typed
  }

  function handleStatus(status: Lead['status']) {
    onChange({ ...lead, status })
    startTransition(async () => {
      try { await updateLeadStatus(lead.id, status) } catch {}
    })
  }

  function handleSave() {
    setSavedMsg(null)
    startTransition(async () => {
      try {
        await updateLeadDraft(lead.id, draft)
        onChange({ ...lead, email_draft: draft })
        setSavedMsg('Saved.')
        setTimeout(() => setSavedMsg(null), 2500)
      } catch {
        setSavedMsg('Save failed.')
      }
    })
  }

  function handleCopy() {
    navigator.clipboard.writeText(draft)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDelete() {
    if (!confirm('Delete this lead?')) return
    startTransition(async () => {
      try { await deleteLead(lead.id); onDelete(lead.id) } catch {}
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#111113] border border-white/[0.08] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-7 pb-5 border-b border-white/[0.06]">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-white truncate">{lead.business_name}</h2>
            <p className="text-xs text-white/35 mt-0.5">{lead.category}</p>
            {lead.address && <p className="text-xs text-white/25 mt-1">{lead.address}</p>}
            <div className="flex items-center gap-3 mt-2 text-xs">
              {lead.website && (
                <a href={lead.website} target="_blank" rel="noreferrer" className="text-[#c8ff00]/70 hover:text-[#c8ff00] transition-colors">
                  Website ↗
                </a>
              )}
              {lead.phone && <span className="text-white/30">{lead.phone}</span>}
            </div>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors flex-shrink-0 ml-4" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-7 py-5 flex flex-col gap-4">
          {/* Status pills */}
          <div className="flex items-center gap-2">
            <span className={labelClass}>Status</span>
            <div className="flex gap-1">
              {STATUS_ORDER.map((s) => (
                <button key={s} onClick={() => handleStatus(s)}
                  className={`px-3 py-1 rounded-md text-xs border capitalize transition-colors ${
                    lead.status === s ? statusStyles[s] : 'border-white/[0.06] text-white/30 hover:text-white/60'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Draft */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Email Draft</label>
            {lead.email_draft || draft ? (
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={12}
                className={`${inputClass} resize-none font-mono text-[13px] leading-relaxed`} />
            ) : (
              <div className="rounded-lg border border-dashed border-white/[0.1] p-8 text-center">
                <p className="text-sm text-white/30 mb-3">No draft generated yet.</p>
                <button onClick={onGenerate} disabled={generating}
                  className="py-2 px-5 rounded-lg bg-[#c8ff00] text-black text-sm font-semibold hover:bg-white transition-colors disabled:opacity-40">
                  {generating ? 'Generating…' : 'Generate Draft'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {(lead.email_draft || draft) && (
          <div className="px-7 py-5 border-t border-white/[0.06] flex items-center gap-3">
            <button onClick={handleDelete} disabled={pending}
              className="text-xs text-white/30 hover:text-red-400 transition-colors mr-auto">
              Delete lead
            </button>
            {savedMsg && <span className="text-xs text-emerald-400">{savedMsg}</span>}
            <button onClick={handleCopy}
              className="py-2.5 px-5 rounded-lg border border-white/[0.08] text-sm text-white/60 hover:text-white hover:border-white/20 transition-colors">
              {copied ? 'Copied!' : 'Copy Email'}
            </button>
            <button onClick={handleSave} disabled={pending}
              className="py-2.5 px-5 rounded-lg bg-[#c8ff00] text-black text-sm font-semibold hover:bg-white transition-colors disabled:opacity-50">
              {pending ? 'Saving…' : 'Save'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
