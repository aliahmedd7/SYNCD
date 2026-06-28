import { supabase } from '@/lib/supabase'
import type { Client } from '@/lib/supabase'

async function getClients(): Promise<Client[]> {
  const { data } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

const statusStyles: Record<Client['status'], string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  inactive: 'bg-white/5 text-white/30 border-white/10',
  prospect: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Clients</p>
          <h1 className="text-2xl font-semibold text-white">All Clients</h1>
        </div>
        <button className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full bg-[#c8ff00] text-black hover:bg-white transition-colors">
          + Add Client
        </button>
      </div>

      {clients.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <p className="text-white/25 text-sm">No clients yet. Connect Supabase and run the seed data.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.06] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                {['Name', 'Industry', 'Contact', 'Status', 'Added'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs text-white/25 uppercase tracking-widest font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clients.map((client, i) => (
                <tr
                  key={client.id}
                  className={`hover:bg-white/[0.02] transition-colors ${i < clients.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                >
                  <td className="px-5 py-4 text-white font-medium">{client.name}</td>
                  <td className="px-5 py-4 text-white/45">{client.industry}</td>
                  <td className="px-5 py-4 text-white/45">{client.contact_email}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border capitalize ${statusStyles[client.status]}`}>
                      {client.status}
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
      )}
    </div>
  )
}
