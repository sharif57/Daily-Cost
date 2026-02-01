'use client'
import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import GenerateReportForm from '@/components/reports/RecentSummaries'

export default function Generate() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-background">
          <GenerateReportForm />
        </main>
      </div>
    </div>
  )
}
