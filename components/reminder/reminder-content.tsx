'use client';

import { useState } from 'react'
import { useReminderReportQuery } from '@/redux/feature/dashboardSlice'
import RemindersCard from './reminder-card'
import ReminderTable from './reminderT-table'


export default function RemindersContent() {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data, isLoading, isError } = useReminderReportQuery({ page: currentPage, limit: rowsPerPage })

  const reminders = data?.data?.reminders ?? []
  const meta = data?.data?.meta

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
      <RemindersCard items={data?.data} isLoading={isLoading} />

      {/* Tables */}
      <ReminderTable
        reminders={reminders}
        isLoading={isLoading}
        isError={isError}
        meta={meta}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(val) => { setRowsPerPage(val); setCurrentPage(1) }}
      />

    </div>
  )
}
