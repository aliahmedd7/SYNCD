type StatCardProps = {
  label: string
  value: string | number
  sub?: string
  accent?: boolean
}

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${accent ? 'border-[#c8ff00]/20 bg-[#c8ff00]/[0.04]' : 'border-white/[0.06] bg-white/[0.03]'}`}>
      <p className="text-xs text-white/30 uppercase tracking-widest mb-3">{label}</p>
      <p className={`text-3xl font-semibold ${accent ? 'text-[#c8ff00]' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-white/25 mt-1">{sub}</p>}
    </div>
  )
}
