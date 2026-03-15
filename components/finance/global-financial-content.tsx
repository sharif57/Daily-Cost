'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import GlobalKPICards from './global-kpi-cards'
import GlobalRevenueChart from './global-revenue-chart'
import GlobalActivitiesTable from './global-activities-table'
import { useGlobalTransactionOverviewQuery } from '@/redux/feature/userSlice'
import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

 function GlobalFinancialContent() {

  const searchParams = useSearchParams()

  const queryUserId = searchParams.get('userId')
  const { data, isLoading, isError } = useGlobalTransactionOverviewQuery(queryUserId as string)

  const overview = data?.data
  const displayDate = useMemo(() => new Date().toLocaleDateString(), [])

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-2xl font-bold text-[#0D0C0C]">
            Welcome Back, {overview?.user?.name ?? 'User'}
          </h1>
          <p className="text-sm sm:text-lg font-normal text-muted-foreground mt-1">
            {displayDate}, Global Financial Overview
          </p>
        </div>
        <div className="flex gap-3 flex-col sm:flex-row">
          <Button
            variant="outline"
            className="border-foreground rounded-full hover:text-[#090A58] hover:bg-transparent text-[#090A58] bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-[#090A58] rounded-full hover:bg-sidebar/90 text-white">
            + Add Funds
          </Button>
        </div>
      </div>

      {!queryUserId && (
        <p className="text-sm text-muted-foreground">No logged in user found.</p>
      )}

      {isError && (
        <p className="text-sm text-red-600">Failed to load global financial overview.</p>
      )}

      {/* KPI Cards */}
      <GlobalKPICards data={overview} isLoading={isLoading} />

      {/* Charts */}
      <GlobalRevenueChart data={overview?.monthly_data ?? []} isLoading={isLoading} />

      {/* Recent Activities */}
      <GlobalActivitiesTable transactions={overview?.recent_transactions ?? []} isLoading={isLoading} />
    </div>
  )
}

export default function GlobalFinancialContentWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GlobalFinancialContent />
        </Suspense>
    )
}