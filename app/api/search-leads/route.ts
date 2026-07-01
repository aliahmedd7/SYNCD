import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Google Places API (legacy) — Text Search returns name, address, and
// category; phone + website come from a per-result Place Details call.
const TEXT_SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
const DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json'

const MAX_RESULTS = 15

type TextResult = {
  name?: string
  formatted_address?: string
  place_id?: string
  types?: string[]
}

type Details = {
  formatted_phone_number?: string
  international_phone_number?: string
  website?: string
}

function prettyType(types?: string[]): string {
  const skip = new Set(['point_of_interest', 'establishment', 'store'])
  const t = types?.find((x) => !skip.has(x)) ?? types?.[0]
  if (!t) return ''
  return t.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

async function getDetails(placeId: string, apiKey: string): Promise<Details> {
  try {
    const url = `${DETAILS_URL}?place_id=${placeId}&fields=formatted_phone_number,international_phone_number,website&key=${apiKey}`
    const res = await fetch(url)
    const data = await res.json()
    return (data.result as Details) ?? {}
  } catch {
    return {}
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'GOOGLE_PLACES_API_KEY is not set.' }, { status: 500 })
  }

  let body: { location?: string; category?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const location = body.location?.trim()
  const category = body.category?.trim()
  if (!location || !category) {
    return NextResponse.json({ error: 'Both location and category are required.' }, { status: 400 })
  }

  const query = `${category} in ${location}`

  let results: TextResult[] = []
  try {
    const url = `${TEXT_SEARCH_URL}?query=${encodeURIComponent(query)}&key=${apiKey}`
    const res = await fetch(url)
    const data = await res.json()

    if (data.status && data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      const message = data.error_message ?? `Places API status: ${data.status}`
      return NextResponse.json({ error: message }, { status: 502 })
    }
    results = (data.results as TextResult[]) ?? []
  } catch {
    return NextResponse.json({ error: 'Failed to reach the Places API.' }, { status: 502 })
  }

  results = results.slice(0, MAX_RESULTS)
  if (results.length === 0) {
    return NextResponse.json({ inserted: 0, leads: [] })
  }

  // Fetch phone + website for each result in parallel.
  const detailsList = await Promise.all(
    results.map((r) => (r.place_id ? getDetails(r.place_id, apiKey) : Promise.resolve({}))),
  )

  const rows = results.map((r, i) => {
    const d = detailsList[i]
    return {
      business_name: r.name ?? 'Unknown',
      category: prettyType(r.types) || category,
      address: r.formatted_address ?? '',
      website: d.website ?? null,
      phone: d.formatted_phone_number ?? d.international_phone_number ?? null,
      status: 'draft' as const,
    }
  })

  const { data: inserted, error } = await supabase.from('leads').insert(rows).select()
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ inserted: inserted?.length ?? 0, leads: inserted ?? [] })
}
