import { getStudents } from '@/lib/students'
import StudentsClient from '@/components/StudentsClient'

export const dynamic = 'force-dynamic'

export default async function StudentsPage() {
  const students = await getStudents()
  return <StudentsClient initialStudents={students} />
}
