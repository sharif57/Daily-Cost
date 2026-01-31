'use client'

import React, { useState } from 'react'

interface Activity {
  userId: string
  transactionId: string
  date: string
  counterparty: string
  category: string
  amount: string
  status: string
}

const activities: Activity[] = [
  {
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    counterparty: 'Amazon Web Service',
    category: 'Software',
    amount: '-$12,450.00',
    status: 'Completed',
  },
  {
    userId: '#00858',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    counterparty: 'Outbound transfer to vendor LLC',
    category: 'Software',
    amount: '-$12,450.00',
    status: 'Completed',
  },
  {
    userId: '#00827',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    counterparty: 'Updated notification perferences',
    category: 'Software',
    amount: '-$12,450.00',
    status: 'Completed',
  },
]

export default function GlobalActivitiesTable() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const toggleSelect = (userId: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(userId)) {
      newSelected.delete(userId)
    } else {
      newSelected.add(userId)
    }
    setSelectedItems(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedItems.size === activities.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(activities.map((a) => a.userId)))
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-medium text-foreground">Recent Activities</h2>
        </div>
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.size === activities.length && activities.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                User ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Transaction ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Counterparty
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr
                key={index}
                className="border-b border-border hover:bg-secondary/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(activity.userId)}
                    onChange={() => toggleSelect(activity.userId)}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {activity.userId}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {activity.transactionId}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {activity.date}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {activity.counterparty}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {activity.category}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-red-600">
                  {activity.amount}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                    • {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
