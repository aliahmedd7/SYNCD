import { supabase } from '@/lib/supabase'
import AddProjectModal from '@/components/AddProjectModal'
import { getProjects } from './actions'

async function getClients() {
  const { data } = await supabase.from('clients').select('id, name').order('name')
  return data ?? []
}

const typeLabel: Record<string, string> = {
  website: 'Website',
  automation: 'Automation',
  ai_campaign: 'AI Campaign',
}

const statusStyles: Record<string, string> = {
  planning: 'bg-white/5 text-white/30 border-white/10',
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  completed: 'bg-[#c8ff00]/10 text-[#c8ff00] border-[#c8ff00]/20',
  paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

export default async function ProjectsPage() {
  const [projects, clients] = await Promise.all([getProjects(), getClients()])

  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Projects</p>
          <h1 className="text-2xl font-semibold text-white">All Projects</h1>
        </div>
        <AddProjectModal clients={clients} />
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <p className="text-white/25 text-sm">No projects yet. Click + New Project to add one.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                {['Project', 'Client', 'Type', 'Status', 'Start', 'End'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs text-white/25 uppercase tracking-widest font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((p: any, i: number) => (
                <tr
                  key={p.id}
                  className={`hover:bg-white/[0.02] transition-colors ${i < projects.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                >
                  <td className="px-5 py-4 text-white font-medium">{p.name}</td>
                  <td className="px-5 py-4 text-white/45">{p.clients?.name ?? '—'}</td>
                  <td className="px-5 py-4 text-white/45">{p.type ? typeLabel[p.type] : '—'}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border capitalize ${statusStyles[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white/25">
                    {p.start_date ? new Date(p.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                  </td>
                  <td className="px-5 py-4 text-white/25">
                    {p.end_date ? new Date(p.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
