import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import GlobalFinancialContent from '@/components/finance/global-financial-content'

export default function GlobalFinancialDashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <GlobalFinancialContent />
        </main>
      </div>
    </div>
  )
}
