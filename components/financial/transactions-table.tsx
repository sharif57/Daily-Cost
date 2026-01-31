'use client'

import { useState } from 'react'

const transactions = [
  {
    date: 'Oct 24,2024',
    description: 'Successful login via web portal',
    category: 'Software',
    amount: '-$12,450.00',
    status: 'Cleared',
    statusColor: 'text-green-600',
  },
  {
    date: 'Oct 24,2024',
    description: 'Outbound transfer to vendor LLC',
    category: 'Software',
    amount: '-$12,450.00',
    status: 'Cleared',
    statusColor: 'text-green-600',
  },
  {
    date: 'Oct 24,2024',
    description: 'Updated notification preferences',
    category: 'Software',
    amount: '-$12,450.00',
    status: 'Cleared',
    statusColor: 'text-green-600',
  },
]

export default function TransactionsTable() {
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
            {transactions.map((transaction, index) => (
              <tr
                key={index}
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
                  {transaction.date}
                </td>
                <td className="px-4 py-3 text-foreground">
                  {transaction.description}
                </td>
                <td className="px-4 py-3 text-foreground">
                  {transaction.category}
                </td>
                <td className="px-4 py-3 font-semibold text-foreground">
                  {transaction.amount}
                </td>
                <td
                  className={`px-4 py-3 font-medium ${transaction.statusColor}`}
                >
                  {transaction.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
