'use client'

import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import { ActivityLogsContent } from '@/components/activity-logs/activity-logs-content'

export default function ActivityLogsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto">
          <ActivityLogsContent />
        </div>
      </div>
    </div>
  )
}
