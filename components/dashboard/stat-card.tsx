'use client'

import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'warning' | 'danger'
  color: string
  icon: React.ReactNode
}

export default function StatCard({
  title,
  value,
  change,
  trend,
  color,
  icon,
}: StatCardProps) {
  const trendColor =
    trend === 'up'
      ? 'text-green-600'
      : trend === 'down'
        ? 'text-red-600'
        : trend === 'warning'
          ? 'text-orange-600'
          : 'text-red-600'

  return (
    <div className="bg-card rounded-lg p-4 border border-border hover:border-border/50 transition-colors cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs sm:text-sm text-[#4B5563] font-medium">
            {title}
          </p>
          <p className="text-lg sm:text-2xl font-bold text-[#0B1220] mt-2">
            {value}
          </p>
          <div className="flex items-center gap-1 mt-3">
            {trend === 'up' && (
              <TrendingUp className={`w-4 h-4 ${trendColor}`} />
            )}
            {trend === 'down' && (
              <TrendingDown className={`w-4 h-4 ${trendColor}`} />
            )}
            <span className={`text-xs sm:text-sm font-semibold ${trendColor}`}>
              {change}
            </span>
          </div>
        </div>
        <div
          className={` ${color} flex items-center justify-center text-xl sm:text-2xl shrink-0`}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
