'use client'

import {
  type DashboardYearUserCount,
  useDashboardReportQuery,
} from '@/redux/feature/dashboardSlice'
import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const buildMonthlyChartData = (usersByMonth?: DashboardYearUserCount[]) => {
  const counts = new Array<number>(12).fill(0)

  usersByMonth?.forEach((item) => {
    const monthIndex = item.month - 1
    if (monthIndex >= 0 && monthIndex < 12) {
      // Sum repeated month entries from API into one month bucket.
      counts[monthIndex] += item.count
    }
  })

  return MONTH_LABELS.map((label, index) => ({
    month: label,
    users: counts[index],
  }))
}

export default function MonthlyChart() {
  const { data, isLoading, isError } = useDashboardReportQuery(undefined)

  const chartData = useMemo(() => {
    return buildMonthlyChartData(data?.data?.currentYearUserCount)
  }, [data?.data?.currentYearUserCount])

  return (
    <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-medium text-[#0D0C0C] ">
          Monthly Active Users (MAU) Trend
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Monitoring user activity across all global regions.
        </p>
      </div>

      {isLoading && (
        <p className="text-xs sm:text-sm text-muted-foreground mb-3">
          Loading monthly chart data...
        </p>
      )}

      {isError && (
        <p className="text-xs sm:text-sm text-red-600 mb-3">
          Failed to load chart data. Showing default monthly values.
        </p>
      )}

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#1f2937' }}
              formatter={(value) => [`${value}`, 'Users']}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8491FF"
              dot={{ fill: '#ffff', r: 4 }}
              activeDot={{ r: 6 }}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
