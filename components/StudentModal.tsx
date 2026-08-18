'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { addStudent, updateStudent, type Student, type StudentStatus } from '@/lib/students'

const inputClass =
  'w-full bg-[#1a1a1c] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors'
const selectClass =
  'w-full bg-[#1a1a1c] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-white/25 transition-colors [&>option]:bg-[#1a1a1c] [&>option]:text-white'
const labelClass = 'text-xs text-white/30 uppercase tracking-widest'

export default function StudentModal({
  open,
  onClose,
  student,
}: {
  open: boolean
  onClose: () => void
  student?: Student | null
}) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const isEdit = !!student

  useEffect(() => {
    if (!open) setError(null)
  }, [open])

  if (!open) return null

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)

    const name = (fd.get('name') as string)?.trim()
    if (!name) { setError('Student name is required.'); return }

    const budget = Number(fd.get('budget') || 0)
    const paid = Number(fd.get('paid') || 0)
    if (paid > budget) { setError("Amount paid can't exceed the total budget."); return }

    const payload = {
      name,
      major: (fd.get('major') as string)?.trim() || '',
      idea: (fd.get('idea') as string)?.trim() || '',
      phone: (fd.get('phone') as string)?.trim() || '',
      email: (fd.get('email') as string)?.trim() || '',
      budget,
      paid,
      status: (fd.get('status') as StudentStatus) || 'active',
      notes: (fd.get('notes') as string)?.trim() || '',
    }

    startTransition(async () => {
      try {
        if (isEdit && student) {
          await updateStudent(student.id, payload)
        } else {
          await addStudent(payload)
        }
        router.refresh()
        onClose()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.')
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#111113] border border-white/[0.08] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/[0.06]">
          <h2 className="text-base font-semibold text-white">{isEdit ? 'Edit Student' : 'Add Student'}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-8 py-6">
          <form ref={formRef} id="student-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Student Name *</label>
              <input name="name" type="text" defaultValue={student?.name} placeholder="Ahmed Ali" required className={inputClass} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Major</label>
                <input name="major" type="text" defaultValue={student?.major} placeholder="Computer Science" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Status</label>
                <select name="status" defaultValue={student?.status ?? 'active'} className={selectClass}>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on_hold">On Hold</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Project Idea</label>
              <textarea name="idea" rows={2} defaultValue={student?.idea} placeholder="AI-powered attendance system…" className={`${inputClass} resize-none`} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Total Budget (E£)</label>
                <input name="budget" type="number" min="0" step="1" defaultValue={student?.budget} placeholder="12000" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Paid so far (E£)</label>
                <input name="paid" type="number" min="0" step="1" defaultValue={student?.paid} placeholder="4000" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Phone</label>
                <input name="phone" type="tel" defaultValue={student?.phone} placeholder="010…" className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelClass}>Email</label>
                <input name="email" type="email" defaultValue={student?.email} placeholder="student@mail.com" className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Notes</label>
              <textarea name="notes" rows={2} defaultValue={student?.notes} placeholder="Anything else to remember…" className={`${inputClass} resize-none`} />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-white/[0.06] flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-3 rounded-lg border border-white/[0.08] text-sm text-white/40 hover:text-white hover:border-white/20 transition-colors">
            Cancel
          </button>
          <button form="student-form" type="submit" disabled={pending} className="flex-1 py-3 rounded-lg bg-[#c8ff00] text-black text-sm font-semibold hover:bg-white transition-colors disabled:opacity-50">
            {pending ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Student'}
          </button>
        </div>
      </div>
    </div>
  )
}
