import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Client = {
  id: string
  name: string
  industry: string
  contact_email: string
  status: 'active' | 'inactive' | 'prospect'
  service_type: 'website' | 'automation' | 'ai_campaign' | 'full_service' | null
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

export type Campaign = {
  id: string
  project_id: string | null
  client_id: string | null
  name: string
  platform: string
  status: 'draft' | 'active' | 'paused' | 'completed'
  budget: number | null
  spend: number | null
  impressions: number | null
  clicks: number | null
  conversions: number | null
  start_date: string | null
  end_date: string | null
  created_at: string
}
