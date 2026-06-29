import StatCard from '@/components/StatCard'
import { supabase } from '@/lib/supabase'

async function getStats() {
  const [clientsRes, projectsRes] = await Promise.all([
    supabase.from('clients').select('status'),
    supabase.from('projects').select('status'),
  ])

  const clients = clientsRes.data ?? []
  const projects = projectsRes.data ?? []

  const activeClients = clients.filter((c) => c.status === 'active').length
  const activeProjects = projects.filter((p) => p.status === 'active').length
  const completedProjects = projects.filter((p) => p.status === 'completed').length

  return { totalClients: clients.length, activeClients, totalProjects: projects.length, activeProjects, completedProjects }
}

const recentActivity = [
  { label: 'Ritz Auto Salon — project created', time: 'Just now', dot: 'bg-[#c8ff00]' },
  { label: 'New client added', time: '1d ago', dot: 'bg-emerald-500' },
]

export default async function OverviewPage() {
  const stats = await getStats()

  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="mb-8">
        <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Overview</p>
        <h1 className="text-2xl font-semibold text-white">Good morning, Admin</h1>
        <p className="text-sm text-white/35 mt-1">Here's what's happening across your agency.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-3">
        <StatCard label="Total Clients" value={stats.totalClients} sub={`${stats.activeClients} active`} />
        <StatCard label="Total Projects" value={stats.totalProjects} sub={`${stats.activeProjects} active`} accent />
        <StatCard label="Completed" value={stats.completedProjects} sub="projects delivered" />
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h2 className="text-xs text-white/30 mb-5 uppercase tracking-widest">Recent Activity</h2>
        <ul className="space-y-4">
          {recentActivity.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
              <div className="flex-1 flex items-center justify-between gap-4">
                <span className="text-sm text-white/60">{item.label}</span>
                <span className="text-xs text-white/20 flex-shrink-0">{item.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
