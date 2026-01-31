import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import ProfitLossOverview from '@/components/finance/profit-loss'

export default function ProfitLoss() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <ProfitLossOverview />
        </main>
      </div>
    </div>
  )
}
