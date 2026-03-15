'use client'

import { IncomeRecentTransaction, UsersMeta } from '@/redux/feature/userSlice'
import { useMemo, useState } from 'react'
import Sour from '../icon/sourch'

interface RecentIncomeTableProps {
  transactions: IncomeRecentTransaction[]
  meta?: UsersMeta
  isLoading?: boolean
  isError?: boolean
  page: number
  limit: number
  onPageChange: (nextPage: number) => void
  onLimitChange: (nextLimit: number) => void
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

export default function RecentIncomeTable({
  transactions,
  meta,
  isLoading,
  isError,
  page,
  limit,
  onPageChange,
  onLimitChange,
}: RecentIncomeTableProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const totalPages = Math.max(meta?.totalPage ?? 1, 1)
  const canPrev = page > 1
  const canNext = page < totalPages

  const pageButtons = useMemo(() => {
    const buttons: Array<number | '...'> = []
    const windowStart = Math.max(1, page - 1)
    const windowEnd = Math.min(totalPages, page + 1)

    if (windowStart > 1) {
      buttons.push(1)
      if (windowStart > 2) buttons.push('...')
    }

    for (let p = windowStart; p <= windowEnd; p += 1) {
      buttons.push(p)
    }

    if (windowEnd < totalPages) {
      if (windowEnd < totalPages - 1) buttons.push('...')
      buttons.push(totalPages)
    }

    return buttons
  }, [page, totalPages])

  const toggleSelect = (rowId: string) => {
    const next = new Set(selectedItems)

    if (next.has(rowId)) {
      next.delete(rowId)
    } else {
      next.add(rowId)
    }

    setSelectedItems(next)
  }

  const toggleSelectAll = () => {
    if (selectedItems.size === transactions.length) {
      setSelectedItems(new Set())
      return
    }

    setSelectedItems(new Set(transactions.map((t) => t.id)))
  }

  return (
    <div className="bg-[#f7f8fa] rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium text-foreground">Recent Incomes</h2>
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All History
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full rounded-xl overflow-hidden bg-white">
          <thead>
            <tr className="bg-[#f3f6fd] text-[#222]">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.size === transactions.length && transactions.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">User ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Transaction ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Source</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Amount (Profit)</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                  Loading incomes...
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-red-600">
                  Failed to load recent incomes.
                </td>
              </tr>
            )}

            {!isLoading && !isError && transactions.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                  No recent income records found.
                </td>
              </tr>
            )}

            {!isLoading && !isError &&
              transactions.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b border-[#f0f0f0] hover:bg-[#f3f6fd] transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(activity.id)}
                      onChange={() => toggleSelect(activity.id)}
                      className="w-4 h-4 rounded border-border cursor-pointer"
                    />
                  </td>

                  <td className="px-4 py-3 text-sm font-medium">{toDisplayUserId(activity.user_id)}</td>
                  <td className="px-4 py-3 text-sm">{toDisplayTransactionId(activity.id)}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {activity.image ? (
                        <img
                          src={toImageUrl(activity.image)}
                          alt={activity.category}
                          className="w-8 h-8 rounded object-cover shrink-0"
                        />
                      ) : (
                        <Sour />
                      )}

                      <div>
                        <div className="font-semibold text-[15px] text-[#222]">{activity.category}</div>
                        <div className="text-xs text-[#888]">{activity.notes || 'No note'}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm">{formatDate(activity.date)}</td>
                  <td className="px-4 py-3 text-sm">{activity.type}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">
                    {formatAmount(activity.amount, activity.type)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {activity.type === 'INCOME' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 font-medium text-xs">
                        <span className="text-lg">.</span> Cleared
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 font-medium text-xs">
                        <span className="text-lg">.</span> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#888]">Show rows:</span>
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="rounded-lg border px-2 py-1 text-sm"
          >
            <option value={5}>5 items</option>
            <option value={10}>10 items</option>
            <option value={25}>25 items</option>
            <option value={50}>50 items</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => canPrev && onPageChange(page - 1)}
            disabled={!canPrev}
            className="w-8 h-8 rounded-full bg-[#fafafa] text-[#bbb] disabled:opacity-50 flex items-center justify-center"
          >
            &lt;
          </button>

          {pageButtons.map((item, index) =>
            item === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 text-[#bbb]">
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange(item)}
                className={`w-8 h-8 rounded-full ${item === page ? 'bg-[#222] text-white font-bold' : 'bg-[#fafafa] text-[#222]'}`}
              >
                {item}
              </button>
            ),
          )}

          <button
            onClick={() => canNext && onPageChange(page + 1)}
            disabled={!canNext}
            className="w-8 h-8 rounded-full bg-[#fafafa] text-[#bbb] disabled:opacity-50 flex items-center justify-center"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}
