import { supabase } from '@/lib/supabase'
import type { Client } from '@/lib/supabase'
import AddClientModal from '@/components/AddClientModal'
import ClientsTable from '@/components/ClientsTable'

async function getClients(): Promise<Client[]> {
  const { data } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Clients</p>
          <h1 className="text-2xl font-semibold text-white">All Clients</h1>
        </div>
        <AddClientModal />
      </div>

      {clients.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <p className="text-white/25 text-sm">No clients yet. Click + Add Client to get started.</p>
        </div>
      ) : (
        <ClientsTable clients={clients} />
      )}
    </div>
  )
}
