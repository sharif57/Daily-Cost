import { useFinancialOverviewQuery } from '@/redux/feature/userSlice'
import { TrendingUp, TrendingDown } from 'lucide-react'

const formatCurrency = (value?: number) => {
  return `$${(value ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function FinancialKPICards({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useFinancialOverviewQuery(userId)
  const report = data?.data
  const growthPercent = report?.growth_vs_previous_month?.percentage ?? 0
  const growthIncome = report?.growth_vs_previous_month?.income ?? 0

  const kpis = [
    {
      label: 'Total Income',
      value: formatCurrency(report?.total_income),
      trend: `${growthPercent >= 0 ? '+' : ''}${growthPercent.toFixed(2)}%`,
      comparison: 'vs previous month',
      icon: growthPercent >= 0 ? TrendingUp : TrendingDown,
      positive: growthPercent >= 0,
    },
    {
      label: 'Average Monthly Income',
      value: formatCurrency(report?.average_monthly_income),
      trend: `${growthPercent >= 0 ? '+' : ''}${growthPercent.toFixed(2)}%`,
      comparison: 'monthly average',
      icon: growthPercent >= 0 ? TrendingUp : TrendingDown,
      positive: growthPercent >= 0,
    },
    {
      label: 'Growth Income Amount',
      value: formatCurrency(growthIncome),
      trend: `${growthPercent >= 0 ? '+' : ''}${growthPercent.toFixed(2)}%`,
      comparison: 'growth income value',
      icon: growthPercent >= 0 ? TrendingUp : TrendingDown,
      positive: growthPercent >= 0,
    },
    {
      label: 'Recent Transactions',
      value: `${report?.recent_transactions?.length ?? 0}`,
      trend: `${report?.meta?.total ?? 0}`,
      comparison: 'total transaction records',
      icon: TrendingUp,
      positive: true,
    },
  ]

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading financial overview...</p>
  }

  if (isError) {
    return (
      <p className="text-sm text-red-600">
        Failed to load income report. Please refresh and try again.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon
        return (
          <div
            key={index}
            className="bg-white rounded-2xl p-6  shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-sm text-muted-foreground mb-3">{kpi.label}</p>
            <div className="mb-4">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {kpi.value}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-1 text-sm font-semibold ${kpi.positive ? 'text-green-600' : 'text-red-600'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{kpi.trend}</span>
              </div>
              <p className="text-xs text-muted-foreground">{kpi.comparison}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
