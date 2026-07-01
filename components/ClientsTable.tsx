'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Client } from '@/lib/supabase'

const statusStyles: Record<Client['status'], string> = {
  active:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  inactive: 'bg-white/5 text-white/30 border-white/10',
  prospect: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}
const statusLabel: Record<Client['status'], string> = {
  prospect: 'Lead', active: 'Active', inactive: 'Inactive',
}
const serviceLabel: Record<string, string> = {
  website:      'Website',
  automation:   'Automation',
  ai_campaign:  'AI Campaign',
  full_service: 'Full Service',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function followUpStatus(dateStr: string | null): 'overdue' | 'today' | 'upcoming' | 'none' {
  if (!dateStr) return 'none'
  const d = new Date(dateStr); const today = new Date()
  today.setHours(0, 0, 0, 0); d.setHours(0, 0, 0, 0)
  if (d < today) return 'overdue'
  if (d.getTime() === today.getTime()) return 'today'
  return 'upcoming'
}

const LEAD_SOURCES = ['Instagram', 'Referral', 'Website', 'Cold Outreach', 'Other']
const STATUSES: { value: Client['status'] | 'all'; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'prospect', label: 'Leads' },
  { value: 'active',   label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(' ')
  const init = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : name.slice(0, 2)
  return (
    <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
      <span className="text-[11px] font-semibold text-white/50 uppercase">{init}</span>
    </div>
  )
}

type SortKey = 'recent' | 'value_desc' | 'value_asc'

export default function ClientsTable({ clients }: { clients: Client[] }) {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<Client['status'] | 'all'>('all')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [sort, setSort] = useState<SortKey>('recent')
  const [search, setSearch] = useState('')

  const filtered = clients
    .filter((c) => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false
      if (sourceFilter !== 'all' && (c.lead_source ?? 'Unknown') !== sourceFilter) return false
      if (search) {
        const q = search.toLowerCase()
        if (!c.name.toLowerCase().includes(q) && !c.industry.toLowerCase().includes(q) && !c.contact_email.toLowerCase().includes(q)) return false
      }
      return true
    })
    .sort((a, b) => {
      if (sort === 'value_desc') return (b.deal_value ?? -1) - (a.deal_value ?? -1)
      if (sort === 'value_asc')  return (a.deal_value ??  Infinity) - (b.deal_value ?? Infinity)
      return 0 // 'recent' — preserve incoming order (created_at desc from the query)
    })

  return (
    <div className="flex flex-col gap-4">
      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search clients…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white placeholder:text-white/20 outline-none focus:border-white/20 transition-colors w-full"
          />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-lg p-1">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                statusFilter === s.value ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Lead source filter */}
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white/50 outline-none focus:border-white/20 [&>option]:bg-[#111113] transition-colors"
        >
          <option value="all">All Sources</option>
          {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white/50 outline-none focus:border-white/20 [&>option]:bg-[#111113] transition-colors"
        >
          <option value="recent">Sort: Recent</option>
          <option value="value_desc">Deal Value · High → Low</option>
          <option value="value_asc">Deal Value · Low → High</option>
        </select>

        {(search || statusFilter !== 'all' || sourceFilter !== 'all' || sort !== 'recent') && (
          <button
            onClick={() => { setSearch(''); setStatusFilter('all'); setSourceFilter('all'); setSort('recent') }}
            className="text-xs text-white/20 hover:text-white/50 transition-colors"
          >
            Clear
          </button>
        )}

        {filtered.length !== clients.length && (
          <span className="text-xs text-white/25">{filtered.length} of {clients.length}</span>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center">
          <p className="text-white/25 text-sm">No clients match the current filters.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                    {['Client', 'Industry', 'Source', 'Service', 'Deal Value', 'Next Follow-up', 'Status'].map((h) => (
                      <th key={h} className="text-left px-5 py-3.5 text-xs text-white/25 uppercase tracking-widest font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((client, i) => {
                    const fuStatus2 = followUpStatus(client.next_follow_up)
                    return (
                      <tr
                        key={client.id}
                        onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                        className={`cursor-pointer hover:bg-white/[0.03] transition-colors ${i < filtered.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <Initials name={client.name} />
                            <div>
                              <p className="text-sm text-white font-medium leading-snug">{client.name}</p>
                              <p className="text-[11px] text-white/25 leading-snug">{client.contact_email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-white/45 text-xs">{client.industry}</td>
                        <td className="px-5 py-3.5 text-white/35 text-xs">
                          {client.lead_source ?? <span className="text-white/15">—</span>}
                        </td>
                        <td className="px-5 py-3.5 text-white/35 text-xs">
                          {client.service_type ? serviceLabel[client.service_type] : <span className="text-white/15">—</span>}
                        </td>
                        <td className="px-5 py-3.5 text-white/50 text-xs">
                          {client.deal_value != null ? `$${client.deal_value.toLocaleString()}` : <span className="text-white/15">—</span>}
                        </td>
                        <td className="px-5 py-3.5">
                          {client.next_follow_up ? (
                            <span className={`text-xs font-medium ${
                              fuStatus2 === 'overdue' ? 'text-red-400' :
                              fuStatus2 === 'today'   ? 'text-orange-400' : 'text-white/40'
                            }`}>
                              {fuStatus2 === 'overdue' && '⚠ '}
                              {fuStatus2 === 'today'   && '● '}
                              {formatDate(client.next_follow_up)}
                            </span>
                          ) : <span className="text-white/15">—</span>}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border ${statusStyles[client.status]}`}>
                            {statusLabel[client.status]}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden flex flex-col gap-2">
            {filtered.map((client) => {
              const fuStatus2 = followUpStatus(client.next_follow_up)
              return (
                <div
                  key={client.id}
                  onClick={() => router.push(`/dashboard/clients/${client.id}`)}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 cursor-pointer active:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <Initials name={client.name} />
                      <div className="min-w-0">
                        <p className="text-sm text-white font-medium leading-snug truncate">{client.name}</p>
                        <p className="text-[11px] text-white/25 leading-snug truncate">{client.industry}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border flex-shrink-0 ${statusStyles[client.status]}`}>
                      {statusLabel[client.status]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-white/[0.05]">
                    <span className="text-white/40">
                      {client.deal_value != null ? `$${client.deal_value.toLocaleString()}` : <span className="text-white/15">No value</span>}
                    </span>
                    {client.next_follow_up ? (
                      <span className={`font-medium ${
                        fuStatus2 === 'overdue' ? 'text-red-400' :
                        fuStatus2 === 'today'   ? 'text-orange-400' : 'text-white/30'
                      }`}>
                        {fuStatus2 === 'overdue' && '⚠ '}
                        {formatDate(client.next_follow_up)}
                      </span>
                    ) : <span className="text-white/15">No follow-up</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
