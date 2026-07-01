import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse('Missing url param', { status: 400 })

  try {
    const screenshotUrl = `https://image.thum.io/get/width/1280/crop/800/${url}`
    const res = await fetch(screenshotUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SYNCDBot/1.0)' },
      next: { revalidate: 86400 },
    })

    if (!res.ok) throw new Error(`thum.io ${res.status}`)

    const buffer = await res.arrayBuffer()
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': res.headers.get('content-type') ?? 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      },
    })
  } catch (err) {
    return new NextResponse('Screenshot unavailable', { status: 502 })
  }
}
