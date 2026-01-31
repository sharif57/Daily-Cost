import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import IncomeOverview from '@/components/finance/Income-overview'

export default function Income() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <IncomeOverview />
        </main>
      </div>
    </div>
  )
}
