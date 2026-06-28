'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const password = formData.get('password') as string
  const from = (formData.get('from') as string) || '/dashboard'

  if (password !== process.env.DASHBOARD_PASSWORD) {
    redirect(`/login?error=1&from=${encodeURIComponent(from)}`)
  }

  const cookieStore = await cookies()
  cookieStore.set('syncd_auth', 'true', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  redirect(from)
}
