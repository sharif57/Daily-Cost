'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import GlobalKPICards from './global-kpi-cards'
import GlobalRevenueChart from './global-revenue-chart'
import GlobalActivitiesTable from './global-activities-table'
import { useGlobalTransactionDashboardQuery } from '@/redux/feature/userSlice'
import { Suspense, useMemo, useState } from 'react'
import { exportGlobalFinancePDF } from '@/lib/exportGlobalFinancePDF'

function GlobalFinancialContent() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, isError } = useGlobalTransactionDashboardQuery(undefined)
  const overview = data?.data
  const allTransactions = overview?.recent_transactions ?? []
  const totalTransactions = overview?.meta?.total ?? allTransactions.length

  const totalPages = Math.max(Math.ceil(allTransactions.length / limit), 1)
  const canPrev = page > 1
  const canNext = page < totalPages

  const paginatedTransactions = useMemo(() => {
    const start = (page - 1) * limit
    return allTransactions.slice(start, start + limit)
  }, [allTransactions, page, limit])

  const displayDate = useMemo(() => new Date().toLocaleDateString(), [])

  const exportReport = () => {
    if (!overview) return

    void exportGlobalFinancePDF(overview, paginatedTransactions, {
      page,
      totalTransactions,
    })
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-2xl font-bold text-[#0D0C0C]">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-lg font-normal text-muted-foreground mt-1">
            {displayDate}, Global Financial Overview
          </p>
        </div>
        <div className="flex gap-3 flex-col sm:flex-row">
          <Button
            variant="outline"
            className="border-foreground rounded-full hover:text-[#090A58] hover:bg-transparent text-[#090A58] bg-transparent"
            onClick={exportReport}
            disabled={isLoading || !overview}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {isError && (
        <p className="text-sm text-red-600">Failed to load global financial overview.</p>
      )}

      {/* KPI Cards */}
      <GlobalKPICards data={overview} isLoading={isLoading} />

      {/* Charts */}
      <GlobalRevenueChart data={overview?.monthly_data ?? []} isLoading={isLoading} />

      {/* Recent Activities */}
      <GlobalActivitiesTable transactions={paginatedTransactions} isLoading={isLoading} />

      <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows:</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value))
              setPage(1)
            }}
            className="rounded border border-border px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="text-sm text-muted-foreground">
            Showing {paginatedTransactions.length} of {totalTransactions}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => canPrev && setPage((prev) => prev - 1)}
            disabled={!canPrev}
            className="rounded border border-border px-3 py-1 text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-muted-foreground">
            Page {page} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => canNext && setPage((prev) => prev + 1)}
            disabled={!canNext}
            className="rounded border border-border px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
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