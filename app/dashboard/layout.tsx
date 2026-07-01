import Sidebar from '@/components/Sidebar'
import MobileHeader from '@/components/MobileHeader'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#080809] text-white overflow-hidden">
      <MobileHeader />
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
