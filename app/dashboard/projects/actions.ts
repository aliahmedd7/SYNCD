'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function addProject(formData: FormData) {
  const payload = {
    client_id: formData.get('client_id') as string,
    name: formData.get('name') as string,
    type: formData.get('type') as string,
    status: formData.get('status') as string,
    start_date: (formData.get('start_date') as string) || null,
    end_date: (formData.get('end_date') as string) || null,
  }

  const { error } = await supabase.from('projects').insert(payload)
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard/overview')
}

export async function getProjects() {
  const { data } = await supabase
    .from('projects')
    .select('*, clients(name)')
    .order('created_at', { ascending: false })
  return data ?? []
}
