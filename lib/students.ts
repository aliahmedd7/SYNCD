import { supabase } from './supabase'

export type StudentStatus = 'active' | 'completed' | 'on_hold'

export type Student = {
  id: string
  name: string
  major: string
  idea: string
  phone: string
  email: string
  budget: number
  paid: number
  status: StudentStatus
  notes: string
  created_at: string
}

export type NewStudent = Omit<Student, 'id' | 'created_at'>

export async function getStudents(): Promise<Student[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function addStudent(s: NewStudent): Promise<void> {
  const { error } = await supabase.from('students').insert(s)
  if (error) throw new Error(error.message)
}

export async function updateStudent(id: string, patch: Partial<NewStudent>): Promise<void> {
  const { error } = await supabase.from('students').update(patch).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteStudent(id: string): Promise<void> {
  const { error } = await supabase.from('students').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export function remaining(s: Student): number {
  return Math.max(0, s.budget - s.paid)
}

export function egp(n: number): string {
  return 'E£' + Math.round(n).toLocaleString('en-US')
}

export const STATUS_META: Record<StudentStatus, { label: string; dot: string; text: string }> = {
  active:    { label: 'Active',    dot: 'bg-[#c8ff00]',   text: 'text-[#c8ff00]' },
  completed: { label: 'Completed', dot: 'bg-emerald-400', text: 'text-emerald-400' },
  on_hold:   { label: 'On Hold',   dot: 'bg-amber-400',   text: 'text-amber-400' },
}
