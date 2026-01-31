import { TrendingUp, TrendingDown } from 'lucide-react'

const kpis = [
  {
    label: 'Total Revenue (YTD)',
    value: '$1,250,000',
    trend: '+12%',
    comparison: 'vs last Year',
    icon: TrendingUp,
    positive: true,
  },
  {
    label: 'Total Expenses (YTD)',
    value: '$840,000',
    trend: '-5%',
    comparison: 'vs last Year',
    icon: TrendingDown,
    positive: false,
  },
  {
    label: 'Total Income',
    value: '$410,000',
    trend: '+18%',
    comparison: 'Profit Margin: 32%',
    icon: TrendingUp,
    positive: true,
  },
  {
    label: 'Risk Profile',
    value: 'Low',
    trend: '+12%',
    comparison: 'Score: 15/100',
    icon: TrendingUp,
    positive: true,
  },
]

export default function FinancialKPICards() {
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
                className={`flex items-center gap-1 text-sm font-semibold ${
                  kpi.positive ? 'text-green-600' : 'text-red-600'
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
