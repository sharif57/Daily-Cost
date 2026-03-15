'use client'

import { GlobalMonthlyData } from '@/redux/feature/userSlice'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface GlobalRevenueChartProps {
  data: GlobalMonthlyData[]
  isLoading?: boolean
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function GlobalRevenueChart({ data, isLoading }: GlobalRevenueChartProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading monthly overview...</p>
  }

  const chartData = data.map((item) => ({
    month: monthNames[item.month - 1] ?? `M${item.month}`,
    Revenue: item.income,
    Expenses: item.expense,
  }))

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-foreground mb-2">
          Financial Overview
        </h2>
        <p className="text-sm text-muted-foreground">
          Revenue vs Expenses (This year)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ADFFDF" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE8C4" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.8} />
            </linearGradient>
          </defs>
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
              borderRadius: '0.5rem',
            }}
            formatter={(value) => `$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Area
            type="monotone"
            dataKey="Revenue"
            stroke="#4F46E5"
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
          <Area
            type="monotone"
            dataKey="Expenses"
            stroke="#F59E42"
            fillOpacity={1}
            fill="url(#colorExpenses)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}