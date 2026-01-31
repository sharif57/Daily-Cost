'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import GlobalKPICards from './global-kpi-cards'
import GlobalRevenueChart from './global-revenue-chart'
import GlobalActivitiesTable from './global-activities-table'

export default function GlobalFinancialContent() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-2xl font-bold text-[#0D0C0C]">
            Welcome Back, Alex
          </h1>
          <p className="text-sm sm:text-lg font-normal text-muted-foreground mt-1">
            Oct 24 2025, Global Financial Overview
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

      {/* KPI Cards */}
      <GlobalKPICards />

      {/* Charts */}
      <GlobalRevenueChart />

      {/* Recent Activities */}
      <GlobalActivitiesTable />
    </div>
  )
}
