import Link from 'next/link'
import StatCard from '@/components/StatCard'
import { supabase } from '@/lib/supabase'

const activityDots: Record<string, string> = {
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

function followUpStatus(dateStr: string) {
  const d = new Date(dateStr); d.setHours(0,0,0,0)
  const today = new Date(); today.setHours(0,0,0,0)
  if (d < today) return 'overdue'
  if (d.getTime() === today.getTime()) return 'today'
  return 'upcoming'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const fuColors = {
  overdue:  { dot: 'bg-red-400',    text: 'text-red-400' },
  today:    { dot: 'bg-orange-400', text: 'text-orange-400' },
  upcoming: { dot: 'bg-white/20',   text: 'text-white/40' },
}

async function getStats() {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [clientsRes, projectsRes, pipelineRes, followUpsRes, recentActRes, newThisMonthRes] =
    await Promise.all([
      supabase.from('clients').select('status'),
      supabase.from('projects').select('status'),
      supabase.from('clients').select('deal_value, status').in('status', ['active', 'prospect']),
      supabase
        .from('clients')
        .select('id, name, status, next_follow_up')
        .not('next_follow_up', 'is', null)
        .order('next_follow_up', { ascending: true })
        .limit(5),
      supabase
        .from('activities')
        .select('id, type, description, created_at, clients(id, name)')
        .order('created_at', { ascending: false })
        .limit(8),
      supabase
        .from('clients')
        .select('id', { count: 'exact', head: true })
        .gte('created_at', startOfMonth),
    ])

  const clients  = clientsRes.data ?? []
  const projects = projectsRes.data ?? []
  const pipeline = pipelineRes.data ?? []

  const totalPipeline = pipeline.reduce((s, c) => s + (c.deal_value ?? 0), 0)
  const activeClients = clients.filter(c => c.status === 'active').length
  const prospects = clients.filter(c => c.status === 'prospect').length
  const winRate = (activeClients + prospects) > 0
    ? Math.round((activeClients / (activeClients + prospects)) * 100)
    : 0

  return {
    totalClients:     clients.length,
    activeClients,
    prospects,
    winRate,
    totalProjects:    projects.length,
    activeProjects:   projects.filter(p => p.status === 'active').length,
    completedProjects:projects.filter(p => p.status === 'completed').length,
    totalPipeline,
    followUps:        followUpsRes.data ?? [],
    recentActivities: recentActRes.data ?? [],
    newThisMonth:     newThisMonthRes.count ?? 0,
  }
}

export default async function OverviewPage() {
  const stats = await getStats()

  const pipelineFormatted = stats.totalPipeline >= 1000
    ? `$${(stats.totalPipeline / 1000).toFixed(1)}k`
    : `$${stats.totalPipeline.toLocaleString()}`

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-6xl">
      {/* Header + quick actions */}
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Overview</p>
          <h1 className="text-2xl font-semibold text-white">Good morning, Admin</h1>
          <p className="text-sm text-white/35 mt-1">Here's what's happening across your agency.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/dashboard/pipeline"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-xs text-white/50 hover:text-white hover:border-white/20 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="5" height="18" rx="1" /><rect x="9.5" y="3" width="5" height="13" rx="1" /><rect x="17" y="3" width="5" height="8" rx="1" />
            </svg>
            Pipeline
          </Link>
          <Link
            href="/dashboard/clients"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-xs text-white/50 hover:text-white hover:border-white/20 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
            Clients
          </Link>
          <Link
            href="/dashboard/projects"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-xs text-white/50 hover:text-white hover:border-white/20 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            </svg>
            Projects
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Clients"   value={stats.totalClients}    sub={`${stats.activeClients} active · ${stats.prospects} leads`} />
        <StatCard label="Pipeline Value"  value={pipelineFormatted}     sub="active + leads" accent />
        <StatCard label="Active Projects" value={stats.activeProjects}  sub={`${stats.completedProjects} completed`} />
        <StatCard label="New This Month"  value={stats.newThisMonth}    sub={`${stats.winRate}% lead-to-client rate`} />
      </div>

      {/* Two-col lower section */}
      <div className="grid lg:grid-cols-5 gap-4">

        {/* Recent Activity — wider */}
        <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs text-white/30 uppercase tracking-widest">Recent Activity</h2>
            <Link href="/dashboard/clients" className="text-xs text-white/20 hover:text-white/50 transition-colors">
              All clients →
            </Link>
          </div>

          {stats.recentActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <p className="text-xs text-white/20">No activity logged yet.</p>
              <p className="text-xs text-white/15">Open a client and log a call, email, or note.</p>
            </div>
          ) : (
            <ul className="relative flex flex-col gap-0">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/[0.05]" />
              {stats.recentActivities.map((act: any) => (
                <li key={act.id} className="relative flex gap-4 pb-4 last:pb-0">
                  <span className={`relative z-10 mt-1 w-3.5 h-3.5 rounded-full flex-shrink-0 border-2 border-[#111113] ${activityDots[act.type] ?? 'bg-white/20'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <Link
                        href={`/dashboard/clients/${act.clients?.id}`}
                        className="text-xs font-medium text-white/60 hover:text-white transition-colors truncate"
                      >
                        {act.clients?.name ?? 'Unknown'}
                      </Link>
                      <span className="text-[10px] text-white/20 flex-shrink-0">{timeAgo(act.created_at)}</span>
                    </div>
                    <p className="text-xs text-white/35 leading-relaxed line-clamp-2">{act.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right column: Follow-ups + stats */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Upcoming follow-ups */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs text-white/30 uppercase tracking-widest">Follow-ups</h2>
              <Link href="/dashboard/clients" className="text-xs text-white/20 hover:text-white/50 transition-colors">
                View all →
              </Link>
            </div>

            {stats.followUps.length === 0 ? (
              <p className="text-xs text-white/20 py-3 text-center">None scheduled.</p>
            ) : (
              <ul className="space-y-2.5">
                {stats.followUps.map((client: any) => {
                  const status = followUpStatus(client.next_follow_up)
                  const c = fuColors[status]
                  return (
                    <li key={client.id}>
                      <Link href={`/dashboard/clients/${client.id}`} className="flex items-center justify-between gap-3 group">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.dot}`} />
                          <span className="text-xs text-white/55 group-hover:text-white transition-colors truncate">
                            {client.name}
                          </span>
                        </div>
                        <span className={`text-[10px] flex-shrink-0 ${c.text}`}>
                          {status === 'overdue' && '⚠ '}
                          {formatDate(client.next_follow_up)}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Agency snapshot */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">Snapshot</h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-xs text-white/40">Active clients</span>
                <span className="text-xs font-medium text-white">{stats.activeClients}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xs text-white/40">Open leads</span>
                <span className="text-xs font-medium text-amber-400">{stats.prospects}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xs text-white/40">Running projects</span>
                <span className="text-xs font-medium text-white">{stats.activeProjects}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-xs text-white/40">Delivered</span>
                <span className="text-xs font-medium text-[#c8ff00]">{stats.completedProjects}</span>
              </li>
              <li className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="text-xs text-white/40">Lead→client rate</span>
                <span className="text-xs font-semibold text-white">{stats.winRate}%</span>
              </li>
            </ul>
          </div>

          {/* Pipeline shortcut */}
          <Link
            href="/dashboard/pipeline"
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 flex items-center justify-between group hover:border-white/[0.12] hover:bg-white/[0.04] transition-all"
          >
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Deal Pipeline</p>
              <p className="text-sm font-medium text-white">{pipelineFormatted} open</p>
            </div>
            <span className="text-white/20 group-hover:text-white/60 transition-colors text-lg">→</span>
          </Link>

        </div>
      </div>
    </div>
  )
}
