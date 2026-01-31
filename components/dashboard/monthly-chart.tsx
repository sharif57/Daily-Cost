'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const data = [
  { month: 'Jan', users: 9000 },
  { month: 'Feb', users: 10500 },
  { month: 'Mar', users: 11200 },
  { month: 'Apr', users: 12000 },
  { month: 'May', users: 13500 },
  { month: 'Jun', users: 14800 },
  { month: 'Jul', users: 15200 },
  { month: 'Aug', users: 15900 },
  { month: 'Sep', users: 16200 },
  { month: 'Oct', users: 15500 },
  { month: 'Nov', users: 16100 },
  { month: 'Dec', users: 16200 },
]

export default function MonthlyChart() {
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

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
