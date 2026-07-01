'use client'

import { useTransition, useState } from 'react'
import Link from 'next/link'
import { updateClient, addActivity, deleteActivity } from '@/app/dashboard/clients/actions'
import type { Client, Activity } from '@/lib/supabase'

const inputClass =
  'w-full bg-[#0d0d0f] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors'
const selectClass =
  'w-full bg-[#0d0d0f] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-white/25 transition-colors [&>option]:bg-[#111113] [&>option]:text-white'
const labelClass = 'text-[11px] text-white/30 uppercase tracking-widest'

const statusStyles: Record<Client['status'], string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  inactive: 'bg-white/5 text-white/30 border-white/10',
  prospect: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}
const statusLabel: Record<Client['status'], string> = {
  prospect: 'Lead', active: 'Active', inactive: 'Inactive',
}

const activityColors: Record<Activity['type'], string> = {
  call:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
  email:   'bg-violet-500/10 text-violet-400 border-violet-500/20',
  meeting: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  message: 'bg-[#c8ff00]/10 text-[#c8ff00] border-[#c8ff00]/20',
  note:    'bg-white/5 text-white/40 border-white/10',
}

const activityDots: Record<Activity['type'], string> = {
  call:    'bg-blue-400',
  email:   'bg-violet-400',
  meeting: 'bg-emerald-400',
  message: 'bg-[#c8ff00]',
  note:    'bg-white/30',
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function followUpStatus(dateStr: string | null) {
  if (!dateStr) return null
  const d = new Date(dateStr); d.setHours(0,0,0,0)
  const today = new Date(); today.setHours(0,0,0,0)
  if (d < today) return 'overdue'
  if (d.getTime() === today.getTime()) return 'today'
  return 'upcoming'
}

export default function ClientDetail({
  client: initial,
  activities: initialActivities,
}: {
  client: Client
  activities: Activity[]
}) {
  const [savePending, startSave] = useTransition()
  const [actPending, startAct] = useTransition()
  const [saveError, setSaveError] = useState<string | null>(null)
  const [actError, setActError] = useState<string | null>(null)
  const [saveOk, setSaveOk] = useState(false)
  const [activities, setActivities] = useState(initialActivities)
  const [actDesc, setActDesc] = useState('')
  const [actType, setActType] = useState<Activity['type']>('call')

  const fuStatus = followUpStatus(initial.next_follow_up)

  function handleSave(formData: FormData) {
    setSaveError(null); setSaveOk(false)
    startSave(async () => {
      try {
        await updateClient(initial.id, formData)
        setSaveOk(true)
        setTimeout(() => setSaveOk(false), 3000)
      } catch (e) {
        setSaveError(e instanceof Error ? e.message : 'Save failed.')
      }
    })
  }

  function handleAddActivity() {
    if (!actDesc.trim()) return
    setActError(null)
    const fd = new FormData()
    fd.set('type', actType)
    fd.set('description', actDesc.trim())
    startAct(async () => {
      try {
        await addActivity(initial.id, fd)
        const newAct: Activity = {
          id: crypto.randomUUID(),
          client_id: initial.id,
          type: actType,
          description: actDesc.trim(),
          created_at: new Date().toISOString(),
        }
        setActivities((prev) => [newAct, ...prev])
        setActDesc('')
      } catch (e) {
        setActError(e instanceof Error ? e.message : 'Failed to log activity.')
      }
    })
  }

  function handleDeleteActivity(id: string) {
    startAct(async () => {
      try {
        await deleteActivity(id, initial.id)
        setActivities((prev) => prev.filter((a) => a.id !== id))
      } catch {}
    })
  }

  return (
    <div className="px-8 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard/clients" className="text-xs text-white/30 hover:text-white transition-colors">
          ← Clients
        </Link>
        <span className="text-white/15 text-xs">/</span>
        <span className="text-xs text-white/50">{initial.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">{initial.name}</h1>
          <p className="text-sm text-white/35 mt-1">{initial.industry}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs border ${statusStyles[initial.status]}`}>
          {statusLabel[initial.status]}
        </span>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">

        {/* Left: Client info form */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h2 className="text-xs text-white/30 uppercase tracking-widest mb-5">Client Info</h2>

            <form action={handleSave} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className={labelClass}>Name</label>
                  <input name="name" defaultValue={initial.name} required className={inputClass} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Industry</label>
                  <input name="industry" defaultValue={initial.industry} required className={inputClass} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Contact Title</label>
                  <input name="title" defaultValue={initial.title ?? ''} placeholder="Marketing Director" className={inputClass} />
                </div>

                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className={labelClass}>Contact Email</label>
                  <input name="contact_email" type="email" defaultValue={initial.contact_email} required className={inputClass} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Status</label>
                  <select name="status" defaultValue={initial.status} className={selectClass}>
                    <option value="prospect">Lead (not signed)</option>
                    <option value="active">Active (paying)</option>
                    <option value="inactive">Inactive (past)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Service</label>
                  <select name="service_type" defaultValue={initial.service_type ?? ''} className={selectClass}>
                    <option value="">None</option>
                    <option value="website">Website</option>
                    <option value="automation">Automation</option>
                    <option value="ai_campaign">AI Campaign</option>
                    <option value="full_service">Full Service</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Lead Source</label>
                  <select name="lead_source" defaultValue={initial.lead_source ?? ''} className={selectClass}>
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
                  <input name="deal_value" type="number" min="0" step="0.01"
                    defaultValue={initial.deal_value ?? ''} placeholder="0" className={inputClass} />
                </div>

                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className={labelClass}>
                    Next Follow-up
                    {fuStatus === 'overdue' && <span className="ml-2 text-red-400">⚠ Overdue</span>}
                    {fuStatus === 'today' && <span className="ml-2 text-orange-400">● Today</span>}
                  </label>
                  <input name="next_follow_up" type="date"
                    defaultValue={initial.next_follow_up ?? ''}
                    className={`${inputClass} ${fuStatus === 'overdue' ? 'border-red-500/30' : fuStatus === 'today' ? 'border-orange-500/30' : ''}`} />
                </div>

                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className={labelClass}>Notes</label>
                  <textarea name="notes" rows={4} defaultValue={initial.notes ?? ''}
                    placeholder="General notes about this client…"
                    className={`${inputClass} resize-none`} />
                </div>
              </div>

              {saveError && <p className="text-xs text-red-400">{saveError}</p>}
              {saveOk && <p className="text-xs text-emerald-400">Saved successfully.</p>}

              <button
                type="submit"
                disabled={savePending}
                className="py-3 rounded-lg bg-[#c8ff00] text-black text-sm font-semibold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savePending ? 'Saving…' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Activity timeline */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Add activity */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">Log Activity</h2>

            <div className="flex flex-col gap-3">
              <select
                value={actType}
                onChange={(e) => setActType(e.target.value as Activity['type'])}
                className={selectClass}
              >
                <option value="call">📞 Call</option>
                <option value="email">✉️ Email</option>
                <option value="meeting">📅 Meeting</option>
                <option value="message">💬 Message</option>
                <option value="note">📝 Note</option>
              </select>

              <textarea
                value={actDesc}
                onChange={(e) => setActDesc(e.target.value)}
                rows={3}
                placeholder="Describe the interaction…"
                className={`${inputClass} resize-none`}
                onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleAddActivity() }}
              />

              {actError && <p className="text-xs text-red-400">{actError}</p>}

              <button
                onClick={handleAddActivity}
                disabled={actPending || !actDesc.trim()}
                className="py-2.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-sm text-white font-medium hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {actPending ? 'Logging…' : '+ Log Activity'}
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">
              Activity Timeline
              {activities.length > 0 && <span className="ml-2 text-white/15">({activities.length})</span>}
            </h2>

            {activities.length === 0 ? (
              <p className="text-xs text-white/20 text-center py-6">No activity logged yet.</p>
            ) : (
              <ul className="relative flex flex-col gap-0">
                {/* Vertical line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.06]" />

                {activities.map((act) => (
                  <li key={act.id} className="relative flex gap-4 pb-5 last:pb-0 group">
                    {/* Dot */}
                    <span className={`relative z-10 mt-1 w-3.5 h-3.5 rounded-full flex-shrink-0 border-2 border-[#111113] ${activityDots[act.type]}`} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className={`inline-flex text-[10px] px-2 py-0.5 rounded-full border ${activityColors[act.type]}`}>
                          {act.type}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/20 flex-shrink-0">{timeAgo(act.created_at)}</span>
                          <button
                            onClick={() => handleDeleteActivity(act.id)}
                            className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all text-xs"
                            aria-label="Delete activity"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed">{act.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
