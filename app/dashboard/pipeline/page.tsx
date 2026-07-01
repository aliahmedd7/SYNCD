import { supabase } from '@/lib/supabase'
import type { Client } from '@/lib/supabase'
import PipelineBoard from '@/components/PipelineBoard'
import Link from 'next/link'
import AddClientModal from '@/components/AddClientModal'

async function getClients(): Promise<Client[]> {
  const { data } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function PipelinePage() {
  const clients = await getClients()

  const totalPipeline = clients
    .filter(c => c.status === 'prospect' || c.status === 'active')
    .reduce((s, c) => s + (c.deal_value ?? 0), 0)

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 flex flex-col" style={{ minHeight: '100%' }}>
      <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Pipeline</p>
          <h1 className="text-2xl font-semibold text-white">Deal Pipeline</h1>
          <p className="text-sm text-white/35 mt-1">
            Drag cards between columns to move clients through the pipeline.
            {totalPipeline > 0 && (
              <span className="ml-2 text-[#c8ff00]/70">
                ${totalPipeline.toLocaleString()} total open value
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/clients"
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            List view →
          </Link>
          <AddClientModal />
        </div>
      </div>

      <PipelineBoard clients={clients} />
    </div>
  )
}
