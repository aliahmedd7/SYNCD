import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>
}) {
  const { from = '/dashboard', error } = await searchParams

  return (
    <div className="min-h-screen bg-[#080809] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">SYNCD</span>
          <h1 className="text-2xl font-semibold text-white mt-4 mb-2">Dashboard access</h1>
          <p className="text-sm text-white/35">Enter your password to continue.</p>
        </div>

        <form action={login} className="flex flex-col gap-4">
          <input type="hidden" name="from" value={from} />

          <div className="flex flex-col gap-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoFocus
              required
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/20 transition-colors"
            />
            {error && (
              <p className="text-xs text-red-400 px-1">Incorrect password. Try again.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#c8ff00] text-black text-sm font-semibold rounded-xl hover:bg-white transition-colors"
          >
            Enter
          </button>
        </form>

        <p className="text-center text-xs text-white/15 mt-8">
          <a href="/" className="hover:text-white/40 transition-colors">← Back to site</a>
        </p>
      </div>
    </div>
  )
}
