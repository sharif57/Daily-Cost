// import React from 'react'

// export default function RemindersContent() {
//   return (
//     <div>
      
//     </div>
//   )
// }
'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import GlobalKPICards from '../finance/global-kpi-cards'
import GlobalRevenueChart from '../finance/global-revenue-chart'
import GlobalActivitiesTable from '../finance/global-activities-table'
import RemindersCard from './reminder-card'


export default function RemindersContent() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-2xl font-bold text-[#0D0C0C]">
          Global Reminders
          </h1>
          <p className="text-sm sm:text-lg font-normal text-muted-foreground mt-1">
            Stay informed and on time with all your business commitments.
          </p>
        </div>
       
      </div>

      {/* KPI Cards */}
      <RemindersCard />

      {/* Charts */}
      <GlobalRevenueChart />

      {/* Recent Activities */}
      <GlobalActivitiesTable />
    </div>
  )
}
