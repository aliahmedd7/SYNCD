'use client'

import { useMemo, useState } from 'react'
import {
  useStudents,
  deleteStudent,
  remaining,
  egp,
  STATUS_META,
  type Student,
} from '@/lib/students'
import StudentModal from './StudentModal'

function PayBar({ s }: { s: Student }) {
  const pct = s.budget > 0 ? Math.min(100, Math.round((s.paid / s.budget) * 100)) : 0
  const done = remaining(s) === 0 && s.budget > 0
  return (
    <div className="w-full">
      <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${done ? 'bg-emerald-400' : 'bg-[#c8ff00]'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[10px] text-white/30">{egp(s.paid)} paid</span>
        <span className={`text-[10px] ${done ? 'text-emerald-400' : 'text-white/40'}`}>
          {done ? 'Fully paid' : `${egp(remaining(s))} left`}
        </span>
      </div>
    </div>
  )
}

export default function StudentsClient() {
  const students = useStudents()
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Student | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return students
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.major.toLowerCase().includes(q) ||
        s.idea.toLowerCase().includes(q),
    )
  }, [students, query])

  function openAdd() {
    setEditing(null)
    setModalOpen(true)
  }
  function openEdit(s: Student) {
    setEditing(s)
    setModalOpen(true)
  }
  function confirmDelete(s: Student) {
    if (window.confirm(`Delete ${s.name}? This can’t be undone.`)) {
      deleteStudent(s.id)
    }
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs text-white/25 uppercase tracking-widest mb-1">Students</p>
          <h1 className="text-2xl font-semibold text-white">All Students</h1>
        </div>
        <div className="flex items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, major, idea…"
            className="w-full sm:w-56 bg-[#141416] border border-white/[0.08] rounded-lg px-3.5 py-2 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/25 transition-colors"
          />
          <button
            onClick={openAdd}
            className="whitespace-nowrap text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full bg-[#c8ff00] text-black hover:bg-white transition-colors"
          >
            + Add
          </button>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <p className="text-white/25 text-sm">No students yet. Click + Add to get started.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
          <p className="text-white/25 text-sm">No students match “{query}”.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] text-left">
                  <th className="px-5 py-3 text-[11px] font-medium text-white/30 uppercase tracking-widest">Student</th>
                  <th className="px-5 py-3 text-[11px] font-medium text-white/30 uppercase tracking-widest">Major</th>
                  <th className="px-5 py-3 text-[11px] font-medium text-white/30 uppercase tracking-widest">Budget</th>
                  <th className="px-5 py-3 text-[11px] font-medium text-white/30 uppercase tracking-widest w-52">Payment</th>
                  <th className="px-5 py-3 text-[11px] font-medium text-white/30 uppercase tracking-widest">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => {
                  const meta = STATUS_META[s.status]
                  const isOpen = expanded === s.id
                  return (
                    <>
                      <tr
                        key={s.id}
                        className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setExpanded(isOpen ? null : s.id)}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#c8ff00]/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs text-[#c8ff00] font-medium">{s.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <span className="text-white font-medium">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-white/50">{s.major || '—'}</td>
                        <td className="px-5 py-4 text-white/70 font-medium">{egp(s.budget)}</td>
                        <td className="px-5 py-4"><PayBar s={s} /></td>
                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                            <span className={`text-xs ${meta.text}`}>{meta.label}</span>
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => openEdit(s)} className="p-1.5 rounded-md text-white/30 hover:text-white hover:bg-white/[0.06] transition-colors" aria-label="Edit">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                            </button>
                            <button onClick={() => confirmDelete(s)} className="p-1.5 rounded-md text-white/30 hover:text-red-400 hover:bg-red-400/[0.08] transition-colors" aria-label="Delete">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isOpen && (
                        <tr className="bg-white/[0.015] border-b border-white/[0.04]">
                          <td colSpan={6} className="px-5 py-4">
                            <div className="grid sm:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-[11px] text-white/30 uppercase tracking-widest mb-1">Project Idea</p>
                                <p className="text-white/60 leading-relaxed">{s.idea || '—'}</p>
                              </div>
                              <div>
                                <p className="text-[11px] text-white/30 uppercase tracking-widest mb-1">Notes</p>
                                <p className="text-white/60 leading-relaxed">{s.notes || '—'}</p>
                              </div>
                              <div>
                                <p className="text-[11px] text-white/30 uppercase tracking-widest mb-1">Contact</p>
                                <p className="text-white/60">{s.phone || '—'}{s.email ? ` · ${s.email}` : ''}</p>
                              </div>
                              <div>
                                <p className="text-[11px] text-white/30 uppercase tracking-widest mb-1">Added</p>
                                <p className="text-white/60">{new Date(s.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden flex flex-col gap-3">
            {filtered.map((s) => {
              const meta = STATUS_META[s.status]
              return (
                <div key={s.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#c8ff00]/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm text-[#c8ff00] font-medium">{s.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate">{s.name}</p>
                        <p className="text-xs text-white/40 truncate">{s.major || '—'}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 flex-shrink-0">
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                      <span className={`text-xs ${meta.text}`}>{meta.label}</span>
                    </span>
                  </div>

                  {s.idea && <p className="text-xs text-white/45 leading-relaxed mb-3 line-clamp-2">{s.idea}</p>}

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/40">Budget</span>
                    <span className="text-sm text-white font-medium">{egp(s.budget)}</span>
                  </div>
                  <PayBar s={s} />

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.05]">
                    <button onClick={() => openEdit(s)} className="flex-1 py-2 rounded-lg border border-white/[0.08] text-xs text-white/50 hover:text-white hover:border-white/20 transition-colors">Edit</button>
                    <button onClick={() => confirmDelete(s)} className="flex-1 py-2 rounded-lg border border-white/[0.08] text-xs text-white/40 hover:text-red-400 hover:border-red-400/30 transition-colors">Delete</button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      <StudentModal open={modalOpen} onClose={() => setModalOpen(false)} student={editing} />
    </div>
  )
}
