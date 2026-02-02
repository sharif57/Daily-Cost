
import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import RemindersContent from '@/components/reminder/reminder-content'
import Analysis from '@/components/analytics/analytics'

export default function Analytics() {
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
          <Analysis />
        </main>
      </div>
    </div>
  )
}
