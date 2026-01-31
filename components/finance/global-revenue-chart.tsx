'use client'

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

const data = [
  { month: 'Jan', Revenue: 100000, Expenses: 800000 },
  { month: 'Feb', Revenue: 1280000, Expenses: 850000 },   // up, up
  { month: 'Mar', Revenue: 1230000, Expenses: 830000 },   // down, down
  { month: 'Apr', Revenue: 1350000, Expenses: 870000 },   // up, up
  { month: 'May', Revenue: 1300000, Expenses: 900000 },   // down, up
  { month: 'Jun', Revenue: 1400000, Expenses: 880000 },   // up, down
  { month: 'Jul', Revenue: 1380000, Expenses: 910000 },   // down, up
  { month: 'Aug', Revenue: 1450000, Expenses: 890000 },   // up, down
  { month: 'Sep', Revenue: 1420000, Expenses: 930000 },   // down, up
  { month: 'Oct', Revenue: 1500000, Expenses: 920000 },   // up, down
  { month: 'Nov', Revenue: 1480000, Expenses: 950000 },   // down, up
  { month: 'Dec', Revenue: 1550000, Expenses: 940000 },   // up, down
]

export default function GlobalRevenueChart() {
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
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            formatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
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