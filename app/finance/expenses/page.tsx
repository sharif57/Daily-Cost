import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import ExpenseOverview from '@/components/finance/expense'

export default function Expense() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <ExpenseOverview />
        </main>
      </div>
    </div>
  )
}
