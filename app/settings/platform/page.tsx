
import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import RemindersContent from '@/components/reminder/reminder-content'
import PlatformPage from '@/components/platform/platform-page'

export default function Platform() {
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
          <PlatformPage />
        </main>
      </div>
    </div>
  )
}
