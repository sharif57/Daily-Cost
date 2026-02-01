
import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import RemindersContent from '@/components/reminder/reminder-content'
import HistoryTable from '@/components/history/history'

export default function History() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-background">
          <HistoryTable />
        </main>
      </div>
    </div>
  )
}
