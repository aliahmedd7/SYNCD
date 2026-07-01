import { supabase } from '@/lib/supabase'
import type { Lead } from '@/lib/supabase'
import OutreachClient from '@/components/OutreachClient'

async function getLeads(): Promise<Lead[]> {
  const { data } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function OutreachPage() {
  const leads = await getLeads()
  return <OutreachClient initialLeads={leads} />
}
