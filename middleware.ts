import { NextRequest, NextResponse } from 'next/server'

const AUTH_COOKIE = 'syncd_auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/dashboard')) {
    const auth = request.cookies.get(AUTH_COOKIE)
    if (auth?.value !== 'true') {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
