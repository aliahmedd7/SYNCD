import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Client, Activity } from '@/lib/supabase'
import ClientDetail from '@/components/ClientDetail'

async function getClient(id: string): Promise<Client | null> {
  const { data } = await supabase.from('clients').select('*').eq('id', id).single()
  return data ?? null
}

async function getActivities(clientId: string): Promise<Activity[]> {
  const { data } = await supabase
    .from('activities')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  return data ?? []
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [client, activities] = await Promise.all([getClient(id), getActivities(id)])

  if (!client) notFound()

  return <ClientDetail client={client} activities={activities} />
}
