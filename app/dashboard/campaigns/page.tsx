import { supabase } from '@/lib/supabase'
import type { Campaign } from '@/lib/supabase'

async function getCampaigns(): Promise<Campaign[]> {
  const { data } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

const statusStyles: Record<Campaign['status'], string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  draft: 'bg-white/5 text-white/30 border-white/10',
  paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  completed: 'bg-[#c8ff00]/10 text-[#c8ff00] border-[#c8ff00]/20',
}

function ctr(clicks: number | null, impressions: number | null): string {
  if (!clicks || !impressions || impressions === 0) return '—'
  return ((clicks / impressions) * 100).toFixed(2) + '%'
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns()

  const totalSpend = campaigns.reduce((s, c) => s + (c.spend ?? 0), 0)
  const totalImpressions = campaigns.reduce((s, c) => s + (c.impressions ?? 0), 0)
  const totalConversions = campaigns.reduce((s, c) => s + (c.conversions ?? 0), 0)

  return (
    <div className="px-8 py-8 max-w-6xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Campaigns</p>
          <h1 className="text-2xl font-semibold text-white">All Campaigns</h1>
        </div>
        <button className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full bg-[#c8ff00] text-black hover:bg-white transition-colors">
          + New Campaign
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Spend', value: `$${totalSpend.toLocaleString()}` },
          { label: 'Impressions', value: totalImpressions.toLocaleString() },
          { label: 'Conversions', value: totalConversions.toLocaleString(), accent: true },
        ].map(({ label, value, accent }) => (
          <div key={label} className={`rounded-xl border p-5 ${accent ? 'border-[#c8ff00]/20 bg-[#c8ff00]/[0.04]' : 'border-white/[0.06] bg-white/[0.03]'}`}>
            <p className="text-xs text-white/25 uppercase tracking-widest mb-2">{label}</p>
            <p className={`text-2xl font-semibold ${accent ? 'text-[#c8ff00]' : 'text-white'}`}>{value}</p>
          </div>
        ))}
      </div>

      {campaigns.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <p className="text-white/25 text-sm">No campaigns yet. Connect Supabase and run the seed data.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                {['Campaign', 'Platform', 'Status', 'Budget', 'Spend', 'CTR', 'Conversions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs text-white/25 uppercase tracking-widest font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr
                  key={c.id}
                  className={`hover:bg-white/[0.02] transition-colors ${i < campaigns.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                >
                  <td className="px-5 py-4 text-white font-medium">{c.name}</td>
                  <td className="px-5 py-4 text-white/45">{c.platform}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border capitalize ${statusStyles[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white/45">{c.budget ? `$${c.budget.toLocaleString()}` : '—'}</td>
                  <td className="px-5 py-4 text-white/45">{c.spend ? `$${c.spend.toLocaleString()}` : '—'}</td>
                  <td className="px-5 py-4 text-white/45">{ctr(c.clicks, c.impressions)}</td>
                  <td className="px-5 py-4 text-white/45">{c.conversions?.toLocaleString() ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
