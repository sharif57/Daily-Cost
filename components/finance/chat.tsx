'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ExpenseAllocationChartProps {
  categoryWiseExpense: Record<string, number>
  totalExpense: number
  isLoading?: boolean
}

const COLORS = ['#D7C038', '#BD47FB', '#30E0A1', '#4F46E5', '#F59E42', '#14B8A6']

export function ExpenseAllocationChart({ categoryWiseExpense, totalExpense, isLoading }: ExpenseAllocationChartProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading expense allocation...</p>
  }

  const entries = Object.entries(categoryWiseExpense)
  const data = entries.length
    ? entries.map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    }))
    : [{ name: 'No Expenses', value: 100, color: '#E5E7EB' }]

  return (
    <div className="rounded-xl border border-border bg-white p-6 ">
      <h2 className="text-lg font-medium text-black">Expense Allocation</h2>
      <hr className="my-3 border-gray-200" />
      <div className="relative flex items-center justify-center">
        <ResponsiveContainer width={220} height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, idx) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <span className="text-2xl font-bold text-black">${totalExpense.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          <span className="text-gray-400 text-sm">Total</span>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-black">{item.name}</span>
            </div>
            <span className="text-sm text-black font-semibold">
              {entries.length ? `${((item.value / Math.max(totalExpense, 1)) * 100).toFixed(1)}%` : '0%'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}