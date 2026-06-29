'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function updateClient(id: string, formData: FormData) {
  const payload = {
    name: formData.get('name') as string,
    industry: formData.get('industry') as string,
    contact_email: formData.get('contact_email') as string,
    status: formData.get('status') as string,
    service_type: (formData.get('service_type') as string) || null,
  }

  const { error } = await supabase.from('clients').update(payload).eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/clients')
}

export async function addClient(formData: FormData) {
  const payload = {
    name: formData.get('name') as string,
    industry: formData.get('industry') as string,
    contact_email: formData.get('contact_email') as string,
    status: formData.get('status') as string,
    service_type: (formData.get('service_type') as string) || null,
  }

  const { error } = await supabase.from('clients').insert(payload)
  if (error) throw new Error(error.message)

  revalidatePath('/dashboard/clients')
}
