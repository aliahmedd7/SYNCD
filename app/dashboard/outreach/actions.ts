'use server'

import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

export async function updateLeadStatus(id: string, status: string) {
  const { error } = await supabase.from('leads').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/outreach')
}

export async function updateLeadDraft(id: string, emailDraft: string) {
  const { error } = await supabase.from('leads').update({ email_draft: emailDraft }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/outreach')
}

export async function deleteLead(id: string) {
  const { error } = await supabase.from('leads').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/dashboard/outreach')
}
