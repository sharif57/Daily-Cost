'use client'

import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import UsersContent from '@/components/users/users-content'
import SystemCommunications from '@/components/alertaPage'

export default function AlertsPage() {
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
          <SystemCommunications />
        </main>
      </div>
    </div>
  )
}
