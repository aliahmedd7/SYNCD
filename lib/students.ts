'use client'

import { useSyncExternalStore } from 'react'

export type StudentStatus = 'active' | 'completed' | 'on_hold'

export type Student = {
  id: string
  name: string
  major: string
  idea: string
  phone: string
  email: string
  budget: number   // total the student is paying
  paid: number     // amount collected so far (deposit + installments)
  status: StudentStatus
  notes: string
  createdAt: string
}

export type NewStudent = Omit<Student, 'id' | 'createdAt'>

const KEY = 'syncd:students'
const listeners = new Set<() => void>()
let cache: Student[] | null = null

function read(): Student[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Student[]) : []
  } catch {
    return []
  }
}

function commit(list: Student[]) {
  cache = list
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(list))
  }
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = read()
      cb()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot(): Student[] {
  if (cache === null) cache = read()
  return cache
}

function getServerSnapshot(): Student[] {
  return []
}

/** React hook — re-renders any component when the student list changes. */
export function useStudents(): Student[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function addStudent(s: NewStudent) {
  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)
  commit([{ ...s, id, createdAt: new Date().toISOString() }, ...getSnapshot()])
}

export function updateStudent(id: string, patch: Partial<Student>) {
  commit(getSnapshot().map((s) => (s.id === id ? { ...s, ...patch } : s)))
}

export function deleteStudent(id: string) {
  commit(getSnapshot().filter((s) => s.id !== id))
}

export function remaining(s: Student): number {
  return Math.max(0, s.budget - s.paid)
}

/** Format a number as Egyptian Pounds, e.g. 12000 -> "E£12,000". */
export function egp(n: number): string {
  return 'E£' + Math.round(n).toLocaleString('en-US')
}

export const STATUS_META: Record<StudentStatus, { label: string; dot: string; text: string }> = {
  active:    { label: 'Active',    dot: 'bg-[#c8ff00]',   text: 'text-[#c8ff00]' },
  completed: { label: 'Completed', dot: 'bg-emerald-400', text: 'text-emerald-400' },
  on_hold:   { label: 'On Hold',   dot: 'bg-amber-400',   text: 'text-amber-400' },
}
