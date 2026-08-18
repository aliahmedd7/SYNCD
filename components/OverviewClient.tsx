'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useStudents, remaining, egp, STATUS_META, type Student } from '@/lib/students'

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${accent ? 'border-[#c8ff00]/20 bg-[#c8ff00]/[0.04]' : 'border-white/[0.06] bg-white/[0.03]'}`}>
      <p className="text-xs text-white/30 uppercase tracking-widest mb-3">{label}</p>
      <p className={`text-3xl font-semibold ${accent ? 'text-[#c8ff00]' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-xs text-white/25 mt-1">{sub}</p>}
    </div>
  )
}

export default function OverviewClient() {
  const students = useStudents()

  const stats = useMemo(() => {
    const totalBudget = students.reduce((s, x) => s + x.budget, 0)
    const collected = students.reduce((s, x) => s + Math.min(x.paid, x.budget), 0)
    const outstanding = students.reduce((s, x) => s + remaining(x), 0)
    const collectRate = totalBudget > 0 ? Math.round((collected / totalBudget) * 100) : 0

    const byMajor = new Map<string, number>()
    for (const s of students) {
      const key = s.major.trim() || 'Unspecified'
      byMajor.set(key, (byMajor.get(key) ?? 0) + 1)
    }
    const majors = [...byMajor.entries()].sort((a, b) => b[1] - a[1])

    const owing = students
      .filter((s) => remaining(s) > 0)
      .sort((a, b) => remaining(b) - remaining(a))
      .slice(0, 6)

    return {
      total: students.length,
      active: students.filter((s) => s.status === 'active').length,
      completed: students.filter((s) => s.status === 'completed').length,
      onHold: students.filter((s) => s.status === 'on_hold').length,
      totalBudget,
      collected,
      outstanding,
      collectRate,
      majors,
      owing,
      recent: students.slice(0, 6),
    }
  }, [students])

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Overview</p>
          <h1 className="text-2xl font-semibold text-white">Grad Project Tracker</h1>
          <p className="text-sm text-white/35 mt-1">Students, budgets, and what’s still owed — at a glance.</p>
        </div>
        <Link
          href="/dashboard/students"
          className="whitespace-nowrap text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full bg-[#c8ff00] text-black hover:bg-white transition-colors self-start"
        >
          Manage Students →
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Students" value={stats.total} sub={`${stats.active} active · ${stats.completed} done`} />
        <StatCard label="Total Value" value={egp(stats.totalBudget)} sub="sum of all budgets" />
        <StatCard label="Collected" value={egp(stats.collected)} sub={`${stats.collectRate}% of total`} accent />
        <StatCard label="Outstanding" value={egp(stats.outstanding)} sub="still to be paid" />
      </div>

      {students.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <p className="text-white/25 text-sm mb-4">No students yet.</p>
          <Link href="/dashboard/students" className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full bg-[#c8ff00] text-black hover:bg-white transition-colors">
            + Add your first student
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Owes money */}
          <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs text-white/30 uppercase tracking-widest">Outstanding Balances</h2>
              <Link href="/dashboard/students" className="text-xs text-white/20 hover:text-white/50 transition-colors">All students →</Link>
            </div>

            {stats.owing.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-1">
                <p className="text-xs text-emerald-400">Everyone’s fully paid 🎉</p>
                <p className="text-xs text-white/20">No outstanding balances.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {stats.owing.map((s: Student) => {
                  const pct = s.budget > 0 ? Math.min(100, Math.round((s.paid / s.budget) * 100)) : 0
                  return (
                    <li key={s.id} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#c8ff00]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-[#c8ff00] font-medium">{s.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm text-white/70 truncate">{s.name}</span>
                          <span className="text-xs text-white/40 flex-shrink-0">{egp(remaining(s))} left</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                          <div className="h-full rounded-full bg-[#c8ff00]" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* By status */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">By Status</h2>
              <ul className="space-y-3">
                {(['active', 'completed', 'on_hold'] as const).map((st) => (
                  <li key={st} className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_META[st].dot}`} />
                      <span className="text-xs text-white/40">{STATUS_META[st].label}</span>
                    </span>
                    <span className="text-xs font-medium text-white">
                      {st === 'active' ? stats.active : st === 'completed' ? stats.completed : stats.onHold}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* By major */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <h2 className="text-xs text-white/30 uppercase tracking-widest mb-4">By Major</h2>
              {stats.majors.length === 0 ? (
                <p className="text-xs text-white/20 py-2 text-center">No data.</p>
              ) : (
                <ul className="space-y-2.5">
                  {stats.majors.slice(0, 6).map(([major, count]) => (
                    <li key={major} className="flex items-center justify-between">
                      <span className="text-xs text-white/40 truncate pr-2">{major}</span>
                      <span className="text-xs font-medium text-white flex-shrink-0">{count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
