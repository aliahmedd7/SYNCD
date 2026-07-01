import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Client = {
  id: string
  name: string
  title: string | null
  industry: string
  contact_email: string
  status: 'active' | 'inactive' | 'prospect'
  service_type: 'website' | 'automation' | 'ai_campaign' | 'full_service' | null
  lead_source: 'Instagram' | 'Referral' | 'Website' | 'Cold Outreach' | 'Other' | null
  deal_value: number | null
  next_follow_up: string | null
  notes: string | null
  created_at: string
}

export type Activity = {
  id: string
  client_id: string
  type: 'call' | 'email' | 'meeting' | 'message' | 'note'
  description: string
  created_at: string
}

export type Lead = {
  id: string
  business_name: string
  category: string
  address: string
  website: string | null
  phone: string | null
  description: string | null
  email_draft: string | null
  status: 'draft' | 'reviewed' | 'sent' | 'skipped'
  created_at: string
}

export type Project = {
  id: string
  client_id: string
  name: string
  type: 'website' | 'automation' | 'ai_campaign' | null
  status: 'planning' | 'active' | 'completed' | 'paused'
  start_date: string | null
  end_date: string | null
  budget: number | null
  created_at: string
}
