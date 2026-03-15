'use client'

import { IncomeRecentTransaction } from '@/redux/feature/userSlice'
import { useState } from 'react'

interface GlobalActivitiesTableProps {
  transactions: IncomeRecentTransaction[]
  isLoading?: boolean
}

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

const toDisplayUserId = (userId: string) => `#${userId.slice(0, 8).toUpperCase()}`
const toDisplayTransactionId = (id: string) => `#TRX-${id.slice(0, 8).toUpperCase()}`

const toImageUrl = (path?: string) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  const imageBaseUrl = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? '').replace(/\/$/, '')
  if (!imageBaseUrl) return path

  return path.startsWith('/') ? `${imageBaseUrl}${path}` : `${imageBaseUrl}/${path}`
}

export default function GlobalActivitiesTable({ transactions, isLoading }: GlobalActivitiesTableProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const toggleSelect = (rowId: string) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId)
    } else {
      newSelected.add(rowId)
    }
    setSelectedItems(newSelected)
  }

  const toggleSelectAll = () => {
    if (selectedItems.size === transactions.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(transactions.map((t) => t.id)))
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
                  checked={selectedItems.size === transactions.length && transactions.length > 0}
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
                Notes
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
            {isLoading && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                  Loading recent transactions...
                </td>
              </tr>
            )}

            {!isLoading && transactions.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                  No recent transactions available.
                </td>
              </tr>
            )}

            {!isLoading && transactions.map((activity) => (
              <tr
                key={activity.id}
                className="border-b border-border hover:bg-secondary/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(activity.id)}
                    onChange={() => toggleSelect(activity.id)}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-foreground">
                  {toDisplayUserId(activity.user_id)}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {toDisplayTransactionId(activity.id)}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {formatDate(activity.date)}
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    {activity.image ? (
                      <img
                        src={toImageUrl(activity.image)}
                        alt={activity.category}
                        className="w-6 h-6 rounded object-cover"
                      />
                    ) : null}
                    <span>{activity.notes || 'N/A'}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {activity.category}
                </td>
                <td className={`px-4 py-3 text-sm font-medium ${activity.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                  {formatAmount(activity.amount, activity.type)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span className={`inline-flex items-center gap-1 font-medium ${activity.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                    • {activity.type}
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
