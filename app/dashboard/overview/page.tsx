import { getStudents } from '@/lib/students'
import OverviewClient from '@/components/OverviewClient'

export const dynamic = 'force-dynamic'

export default async function OverviewPage() {
  const students = await getStudents()
  return <OverviewClient initialStudents={students} />
}
