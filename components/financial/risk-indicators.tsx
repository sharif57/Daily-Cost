import { AlertTriangle, TrendingDown } from 'lucide-react'

const risks = [
  {
    title: 'Negative Cash Flow',
    description: 'Detected in Nov 2023. Expenses exceeded revenue by 15%.',
    icon: TrendingDown,
    severity: 'high',
  },
  {
    title: 'Unusual Expense Spike',
    description: 'Detected in Nov 2023. Expenses exceeded revenue by 15%.',
    icon: TrendingDown,
    severity: 'high',
  },
]

export default function RiskIndicators() {
  return (
    <div className="bg-white rounded-2xl p-6  shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-medium text-foreground">Risk Indicators</h2>
      </div>

      <div className="space-y-4">
        {risks.map((risk, index) => {
          const Icon = risk.icon
          return (
            <div key={index} className="p-4 bg-secondary/50 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">
                    {risk.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {risk.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
