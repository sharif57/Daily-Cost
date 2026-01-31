'use client'

import React from 'react'
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
  { month: 'Jan', users: 400000 },
  { month: 'Feb', users: 520000 },   // up
  { month: 'Mar', users: 480000 },   // down
  { month: 'Apr', users: 650000 },   // up
  { month: 'May', users: 620000 },   // down
  { month: 'Jun', users: 780000 },   // up
  { month: 'Jul', users: 750000 },   // down
  { month: 'Aug', users: 900000 },   // up
  { month: 'Sep', users: 870000 },   // down
  { month: 'Oct', users: 1020000 },  // up
  { month: 'Nov', users: 980000 },   // down
  { month: 'Dec', users: 1245095 },  // strong up
];


export default function GrowthChart() {
  return (
    <div className="bg-card rounded-lg p-4 sm:p-6 border border-border">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-medium text-[#0D0C0C] ">
            User Growth Trend
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Cumulative registered users over time
          </p>
        </div>
        <div className="mt-4 sm:mt-0 text-right">
          <p className="text-xs text-green-600 font-semibold">
            ↗ 15% vs last period
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-2xl sm:text-3xl font-bold text-foreground">
          1,245,095
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Total Registered Users
        </p>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8491FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#fff" stopOpacity={0.1} />
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
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#1f2937' }}
              formatter={(value) => {
                return [value.toLocaleString(), 'Users']
              }}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorUsers)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
