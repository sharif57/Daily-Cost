
import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import Profile from '@/components/profile-page'
import SecurityPage from '@/components/Security'
import UnifiedAccessContent from '@/components/access-management/unified-access-content'

export default function Security() {
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
          <UnifiedAccessContent />
        </main>
      </div>
    </div>
  )
}
