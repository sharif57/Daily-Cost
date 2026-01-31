import Link from 'next/link'

const expenses = [
  {
    category: 'Operational Costs',
    amount: '$420k',
    percentage: 50,
    color: 'bg-[#8491FF]',
  },
  {
    category: 'Payroll & Benefits',
    amount: '$210k',
    percentage: 25,
    color: 'bg-[#FFA71D]',
  },
  {
    category: 'Marketing',
    amount: '$126k',
    percentage: 15,
    color: 'bg-[#24E3F1]',
  },
  {
    category: 'Software / SaaS',
    amount: '$84k',
    percentage: 10,
    color: 'bg-[#55C790]',
  },
]

export default function ExpensesBreakdown() {
  return (
    <div className="bg-white rounded-lg p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-[#0D0C0C]">Expenses Breakdown</h2>
        <Link href="#" className="text-sm text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {expenses.map((expense, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[16px] font-medium text-foreground">
                {expense.category}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {expense.amount}
              </p>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${expense.color} transition-all`}
                style={{ width: `${expense.percentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {expense.percentage}%
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
