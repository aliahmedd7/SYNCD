import StatCard from '@/components/StatCard'
import { supabase } from '@/lib/supabase'

async function getStats() {
  const [clientsRes, campaignsRes] = await Promise.all([
    supabase.from('clients').select('status'),
    supabase.from('campaigns').select('status, spend'),
  ])

  const clients = clientsRes.data ?? []
  const campaigns = campaignsRes.data ?? []

  const totalSpend = campaigns.reduce((sum, c) => sum + (c.spend ?? 0), 0)
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length
  const activeClients = clients.filter((c) => c.status === 'active').length

  return { totalClients: clients.length, activeClients, activeCampaigns, totalSpend }
}

const recentActivity = [
  { label: 'Apex Brands — Brand Refresh kicked off', time: '2h ago', dot: 'bg-[#c8ff00]' },
  { label: 'Meridian Health — Q3 campaign went live', time: '5h ago', dot: 'bg-emerald-500' },
  { label: 'Volta Motors added as prospect', time: '1d ago', dot: 'bg-amber-500' },
  { label: 'Orbit Studios — campaign paused', time: '2d ago', dot: 'bg-red-500' },
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

      <div className="grid grid-cols-2 gap-4 mb-10 lg:grid-cols-4">
        <StatCard label="Total Clients" value={stats.totalClients} sub={`${stats.activeClients} active`} />
        <StatCard label="Active Campaigns" value={stats.activeCampaigns} />
        <StatCard label="Total Spend" value={`$${stats.totalSpend.toLocaleString()}`} accent />
        <StatCard label="Projects" value="—" sub="Connect Supabase to load" />
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
