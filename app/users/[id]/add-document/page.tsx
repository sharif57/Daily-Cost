'use client'

import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import { useParams } from 'next/navigation'
import { useFinancialOverviewQuery } from '@/redux/feature/userSlice'

export default function AddDocumentPage() {
  const params  = useParams()
  const userId  = params.id as string

  const { data } = useFinancialOverviewQuery(userId)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Financial Overview
              </h1>

              
            </div>

            
          </div>
        </main>
      </div>
    </div>
  )
}