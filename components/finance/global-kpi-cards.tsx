'use client'

import { GlobalFinancialOverviewData } from '@/redux/feature/userSlice'
import { TrendingUp, TrendingDown, CheckCircle } from 'lucide-react'

interface GlobalKPICardsProps {
  data?: GlobalFinancialOverviewData
  isLoading?: boolean
}

const formatCurrency = (value?: number): string => {
  return `$${(value ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function GlobalKPICards({ data, isLoading }: GlobalKPICardsProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading KPI data...</p>
  }

  const totalRevenue = data?.total_revenue ?? 0
  const totalExpense = data?.total_expense ?? 0
  const totalIncome = data?.total_income ?? 0
  const zakatExpense = data?.zakat_expense ?? 0

  const profitMargin = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0

  const cards = [
    {
      label: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      trend: totalRevenue >= 0 ? 'In positive' : 'Negative balance',
      direction: totalRevenue >= 0 ? 'up' : 'down',
      period: 'Net balance overview',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(totalExpense),
      trend: `${totalExpense.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      direction: 'down',
      period: 'All tracked expenses',
    },
    {
      label: 'Total Income',
      value: formatCurrency(totalIncome),
      trend: `${profitMargin.toFixed(2)}%`,
      direction: 'up',
      period: 'Estimated profit margin',
    },
    {
      label: 'Zakat Expense',
      value: formatCurrency(zakatExpense),
      trend: zakatExpense > 0 ? 'Recorded' : 'No zakat expense',
      direction: 'success',
      period: '',
      badge: true,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-card rounded-2xl  p-6 hover:shadow-md transition-shadow"
        >
          <p className="text-sm font-medium text-muted-foreground mb-2">
            {card.label}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {card.value}
          </p>
          <div className="flex items-center gap-2">
            {card.badge ? (
              <div className="flex items-center gap-1.5 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{card.trend}</span>
              </div>
            ) : (
              <>
                {card.direction === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span
                  className={`text-sm font-medium ${card.direction === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                  {card.trend}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  {card.period}
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
