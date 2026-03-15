'use client'

import { ProfitLossYearlyMonthlyData } from '@/redux/feature/userSlice'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface RevenueChartProps {
  title?: string | null
  description?: string | null
  data?: ProfitLossYearlyMonthlyData[]
  isLoading?: boolean
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function RevenueChart({ title, description, data = [], isLoading }: RevenueChartProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading chart data...</p>
  }

  const chartData = data.map((item) => ({
    month: monthNames[item.month - 1] ?? `M${item.month}`,
    Revenue: item.income,
    Expenses: item.expense,
  }))

  return (
    <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-[#0D0C0C]">{title}</h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ADFFDF" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE8C4" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`} />
          <Area
            type="monotone"
            dataKey="Revenue"
            stroke="#4F46E5"
            fill="url(#revenueGradient)"
          />
          <Area
            type="monotone"
            dataKey="Expenses"
            stroke="#F59E42"
            fill="url(#expensesGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}