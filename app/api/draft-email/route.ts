import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { supabase } from '@/lib/supabase'
import type { Lead } from '@/lib/supabase'

const GEMINI_MODEL = 'gemini-2.0-flash'

// Pull a short description of the business from its homepage — meta
// description first, then the first meaningful paragraph as a fallback.
async function describeFromWebsite(url: string): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SYNCDBot/1.0)' },
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!res.ok) return null

    const html = await res.text()

    const metaMatch =
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)
    if (metaMatch?.[1]) return decodeEntities(metaMatch[1]).slice(0, 500)

    const pMatch = html.match(/<p[^>]*>(.*?)<\/p>/is)
    if (pMatch?.[1]) {
      const text = decodeEntities(pMatch[1].replace(/<[^>]+>/g, '')).trim()
      if (text.length > 30) return text.slice(0, 500)
    }
    return null
  } catch {
    return null
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

const SYSTEM_PROMPT = `You are a business development writer for SYNCD, a creative tech agency in Egypt. SYNCD offers three services:
- Custom digital builds (websites, web apps)
- Intelligent automations (CRMs, order/workflow automation)
- AI-crafted visual campaigns (AI-generated brand imagery and ad creative)

Write a short, personalized cold outreach email to a prospective client. Rules:
- Address the business by name and reference what they actually do.
- Introduce SYNCD briefly and pitch the ONE service that best fits this business.
- Friendly and human, never salesy or generic. No buzzword soup.
- 100-150 words.
- End with a soft call to action inviting a quick chat.
- Output ONLY the email body (with a subject line on the first line as "Subject: ..."). No commentary.`

async function generateEmail(
  client: GoogleGenerativeAI,
  lead: Lead,
  description: string | null,
): Promise<string> {
  const context = [
    `Business name: ${lead.business_name}`,
    `Category: ${lead.category}`,
    lead.address ? `Location: ${lead.address}` : null,
    description ? `What they do (from their website): ${description}` : `No website description available.`,
  ]
    .filter(Boolean)
    .join('\n')

  const model = client.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: { maxOutputTokens: 1024 },
  })

  const result = await model.generateContent(
    `Write the outreach email for this business:\n\n${context}`,
  )

  return result.response.text().trim()
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('[draft-email] GEMINI_API_KEY is not set')
    return NextResponse.json({ error: 'GEMINI_API_KEY is not set.' }, { status: 500 })
  }
  console.log('[draft-email] GEMINI_API_KEY present, starts with:', apiKey.slice(0, 6))

  let body: { leadId?: string; leadIds?: string[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const ids = body.leadIds ?? (body.leadId ? [body.leadId] : [])
  if (ids.length === 0) {
    return NextResponse.json({ error: 'No lead id provided.' }, { status: 400 })
  }

  const { data: leads, error: fetchError } = await supabase.from('leads').select('*').in('id', ids)
  if (fetchError) {
    console.error('[draft-email] Supabase fetch error:', fetchError.message)
    return NextResponse.json({ error: fetchError.message }, { status: 500 })
  }
  if (!leads || leads.length === 0) {
    console.error('[draft-email] No leads found for ids:', ids)
    return NextResponse.json({ error: 'Lead(s) not found.' }, { status: 404 })
  }
  console.log('[draft-email] Found leads:', leads.length)

  const geminiClient = new GoogleGenerativeAI(apiKey)
  const results: { id: string; ok: boolean; error?: string }[] = []

  for (const lead of leads as Lead[]) {
    console.log('[draft-email] Processing lead:', lead.id, lead.business_name)
    try {
      const description = lead.website ? await describeFromWebsite(lead.website) : null
      console.log('[draft-email] Website description length:', description?.length ?? 0)

      const email = await generateEmail(geminiClient, lead, description)
      console.log('[draft-email] Generated email length:', email.length)

      if (!email) {
        throw new Error('Gemini returned an empty response.')
      }

      const { data: updateData, error: updateError } = await supabase
        .from('leads')
        .update({ email_draft: email, description: description ?? lead.description })
        .eq('id', lead.id)
        .select('id, email_draft')

      if (updateError) {
        console.error('[draft-email] Supabase update error:', updateError.message, updateError.code)
        throw new Error(updateError.message)
      }

      console.log('[draft-email] Supabase update result:', JSON.stringify(updateData))
      if (!updateData || updateData.length === 0) {
        console.error('[draft-email] Update matched 0 rows — RLS may be blocking writes for lead:', lead.id)
        throw new Error('Supabase update matched 0 rows. Check RLS policies on the leads table.')
      }

      results.push({ id: lead.id, ok: true })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Draft failed.'
      console.error('[draft-email] Error for lead', lead.id, ':', msg)
      results.push({ id: lead.id, ok: false, error: msg })
    }
  }

  return NextResponse.json({
    drafted: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
    results,
  })
}
