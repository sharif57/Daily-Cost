'use client'

import { useFinancialOverviewQuery } from '@/redux/feature/userSlice'
import { useState } from 'react'

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

const formatAmount = (value: string, type: string) => {
  const amount = Number(value || 0)
  const prefix = type === 'INCOME' ? '+' : '-'
  return `${prefix}$${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export default function TransactionsTable({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useFinancialOverviewQuery(userId)
  const transactions = data?.data?.recent_transactions ?? []
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

  const [selectedRows, setSelectedRows] = useState<boolean[]>([])

  const toggleRow = (index: number) => {
    const updated = [...selectedRows]
    updated[index] = !updated[index]
    setSelectedRows(updated)
  }

  return (
    <div className="bg-white rounded-2xl p-6  shadow-sm">
      <h2 className="text-lg font-medium text-[#0D0C0C] mb-6">
        Large Transactions (Last 30 Days)
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Description
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Category
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Amount
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Loading transactions...
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-red-600">
                  Failed to load transactions.
                </td>
              </tr>
            )}

            {!isLoading && !isError && transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No transactions found.
                </td>
              </tr>
            )}

            {!isLoading && !isError && transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="border-b border-border hover:bg-secondary/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows[index] || false}
                    onChange={() => toggleRow(index)}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-foreground font-medium">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-4 py-3 text-foreground">
                  <div className="flex items-center gap-3">
                    {transaction.image && (
                      <img
                        src={transaction.image.startsWith('http') ? transaction.image : `${imageBaseUrl}${transaction.image}`}
                        alt={transaction.category}
                        className="w-8 h-8 rounded object-cover shrink-0"
                      />
                    )}
                    <span>{transaction.notes || 'N/A'}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground">
                  {transaction.category}
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">
                  {formatAmount(transaction.amount, transaction.type)}
                </td>
                <td
                  className={`px-4 py-3 font-medium ${transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {transaction.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
