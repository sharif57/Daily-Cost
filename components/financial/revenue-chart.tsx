'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', Revenue: 85000, Expenses: 45000 },
  { month: 'Feb', Revenue: 92000, Expenses: 48000 },
  { month: 'Mar', Revenue: 88000, Expenses: 52000 },
  { month: 'Apr', Revenue: 105000, Expenses: 58000 },
  { month: 'May', Revenue: 118000, Expenses: 62000 },
  { month: 'Jun', Revenue: 115000, Expenses: 60000 },
  { month: 'Jul', Revenue: 125000, Expenses: 65000 },
  { month: 'Aug', Revenue: 130000, Expenses: 68000 },
  { month: 'Sep', Revenue: 128000, Expenses: 6000 },
  { month: 'Oct', Revenue: 135000, Expenses: 70000 },
  { month: 'Nov', Revenue: 140000, Expenses: 72000 },
  { month: 'Dec', Revenue: 145000, Expenses: 75000 },
]

export default function RevenueChart({title, description}: {title?: string | null, description?: string | null}) {
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
          data={data}
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
          <Tooltip />
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