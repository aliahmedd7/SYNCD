'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Client } from '@/lib/supabase'
import { updateClientStatus } from '@/app/dashboard/clients/actions'

type Status = Client['status']

const COLS: { id: Status; label: string; dot: string; valueColor: string }[] = [
  { id: 'prospect', label: 'Leads',  dot: 'bg-amber-400',   valueColor: 'text-amber-400' },
  { id: 'active',   label: 'Active', dot: 'bg-[#c8ff00]',   valueColor: 'text-[#c8ff00]' },
  { id: 'inactive', label: 'Closed', dot: 'bg-white/20',    valueColor: 'text-white/30' },
]

const serviceLabel: Record<string, string> = {
  website:      'Website',
  automation:   'Automation',
  ai_campaign:  'AI Campaign',
  full_service: 'Full Service',
}

function fuStatus(dateStr: string | null) {
  if (!dateStr) return null
  const d = new Date(dateStr); d.setHours(0,0,0,0)
  const t = new Date();       t.setHours(0,0,0,0)
  if (d < t) return 'overdue'
  if (d.getTime() === t.getTime()) return 'today'
  return 'upcoming'
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function ClientCard({
  client,
  onDragStart,
  onDragEnd,
  isDragging,
}: {
  client: Client
  onDragStart: () => void
  onDragEnd: () => void
  isDragging: boolean
}) {
  const fu = fuStatus(client.next_follow_up)

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`bg-[#111113] border rounded-xl p-4 cursor-grab active:cursor-grabbing select-none transition-all ${
        isDragging ? 'opacity-30 scale-95 border-white/10' : 'border-white/[0.07] hover:border-white/[0.15]'
      }`}
    >
      {client.service_type && (
        <span className="inline-flex mb-2.5 text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-white/35 border border-white/[0.07]">
          {serviceLabel[client.service_type]}
        </span>
      )}

      <Link
        href={`/dashboard/clients/${client.id}`}
        onClick={e => e.stopPropagation()}
        className="block text-sm font-medium text-white hover:text-[#c8ff00] transition-colors leading-snug"
      >
        {client.name}
      </Link>

      {client.industry && (
        <p className="text-xs text-white/25 mt-0.5 mb-3">{client.industry}</p>
      )}

      <div className="flex items-center justify-between border-t border-white/[0.05] pt-3 mt-1">
        <span className={`text-sm font-semibold ${client.deal_value ? 'text-white' : 'text-white/15'}`}>
          {client.deal_value != null ? `$${client.deal_value.toLocaleString()}` : 'No value'}
        </span>

        {client.next_follow_up && (
          <span className={`text-[10px] font-medium ${
            fu === 'overdue' ? 'text-red-400' :
            fu === 'today'   ? 'text-orange-400' :
                               'text-white/25'
          }`}>
            {fu === 'overdue' && '⚠ '}
            {fu === 'today'   && '● '}
            {fmt(client.next_follow_up)}
          </span>
        )}
      </div>

      {client.lead_source && (
        <p className="text-[10px] text-white/20 mt-1.5">{client.lead_source}</p>
      )}
    </div>
  )
}

export default function PipelineBoard({ clients: initial }: { clients: Client[] }) {
  const [clients, setClients] = useState(initial)
  const [draggingId, setDraggingId]   = useState<string | null>(null)
  const [dragOverCol, setDragOverCol] = useState<Status | null>(null)

  function handleDrop(colId: Status) {
    if (!draggingId) return
    const client = clients.find(c => c.id === draggingId)
    if (!client || client.status === colId) {
      setDraggingId(null); setDragOverCol(null); return
    }
    setClients(prev => prev.map(c => c.id === draggingId ? { ...c, status: colId } : c))
    setDraggingId(null); setDragOverCol(null)
    updateClientStatus(draggingId, colId)
  }

  return (
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
    <div className="grid grid-cols-3 gap-4 min-w-[640px]" style={{ minHeight: 480 }}>
      {COLS.map(col => {
        const colClients = clients.filter(c => c.status === col.id)
        const colValue   = colClients.reduce((s, c) => s + (c.deal_value ?? 0), 0)
        const isOver     = dragOverCol === col.id && draggingId !== null

        return (
          <div
            key={col.id}
            onDragOver={e => { e.preventDefault(); if (dragOverCol !== col.id) setDragOverCol(col.id) }}
            onDragLeave={e => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragOverCol(null)
            }}
            onDrop={() => handleDrop(col.id)}
            className={`flex flex-col rounded-xl border transition-colors duration-150 ${
              isOver ? 'border-white/25 bg-white/[0.04]' : 'border-white/[0.06] bg-white/[0.01]'
            }`}
          >
            {/* Column header */}
            <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    {col.label}
                  </span>
                </div>
                <span className="text-xs bg-white/[0.05] text-white/30 rounded-full px-2 py-0.5">
                  {colClients.length}
                </span>
              </div>
              <p className={`text-sm font-semibold ${col.valueColor}`}>
                {colValue > 0 ? `$${colValue.toLocaleString()}` : <span className="text-white/15 font-normal text-xs">No value</span>}
              </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2.5 p-3 flex-1 overflow-y-auto">
              {colClients.length === 0 ? (
                <div className={`flex items-center justify-center rounded-xl border border-dashed transition-colors h-24 ${
                  isOver ? 'border-white/30 bg-white/[0.03]' : 'border-white/[0.06]'
                }`}>
                  <p className="text-xs text-white/20">Drop here</p>
                </div>
              ) : (
                colClients.map(c => (
                  <ClientCard
                    key={c.id}
                    client={c}
                    onDragStart={() => setDraggingId(c.id)}
                    onDragEnd={() => { setDraggingId(null); setDragOverCol(null) }}
                    isDragging={draggingId === c.id}
                  />
                ))
              )}

              {/* Extra drop zone when column has cards */}
              {colClients.length > 0 && isOver && (
                <div className="h-16 rounded-xl border border-dashed border-white/25 bg-white/[0.03] flex items-center justify-center">
                  <p className="text-xs text-white/30">Drop here</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
    </div>
  )
}
