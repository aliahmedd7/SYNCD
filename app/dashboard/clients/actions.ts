'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

function clientPayload(formData: FormData) {
  return {
    name: formData.get('name') as string,
    title: (formData.get('title') as string) || null,
    industry: formData.get('industry') as string,
    contact_email: formData.get('contact_email') as string,
    status: formData.get('status') as string,
    service_type: (formData.get('service_type') as string) || null,
    lead_source: (formData.get('lead_source') as string) || null,
    deal_value: formData.get('deal_value') ? Number(formData.get('deal_value')) : null,
    next_follow_up: (formData.get('next_follow_up') as string) || null,
    notes: (formData.get('notes') as string) || null,
  }
}

export async function addClient(formData: FormData) {
  const { error } = await supabase.from('clients').insert(clientPayload(formData))
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/clients')
  revalidatePath('/dashboard/overview')
}

export async function updateClient(id: string, formData: FormData) {
  const { error } = await supabase.from('clients').update(clientPayload(formData)).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/clients')
  revalidatePath(`/dashboard/clients/${id}`)
  revalidatePath('/dashboard/overview')
}

export async function addActivity(clientId: string, formData: FormData) {
  const { error } = await supabase.from('activities').insert({
    client_id: clientId,
    type: formData.get('type') as string,
    description: formData.get('description') as string,
  })
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/clients/${clientId}`)
}

export async function deleteActivity(activityId: string, clientId: string) {
  const { error } = await supabase.from('activities').delete().eq('id', activityId)
  if (error) throw new Error(error.message)
  revalidatePath(`/dashboard/clients/${clientId}`)
}

export async function updateClientStatus(id: string, status: string) {
  const { error } = await supabase.from('clients').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/clients')
  revalidatePath('/dashboard/pipeline')
  revalidatePath('/dashboard/overview')
}
