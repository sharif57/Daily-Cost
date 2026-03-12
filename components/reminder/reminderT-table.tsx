'use client'

import { useState } from 'react'
import Tax from '../icon/tax'
import { ReminderItem, ReminderMeta } from '@/redux/feature/dashboardSlice'

interface ReminderTableProps {
    reminders: ReminderItem[]
    isLoading: boolean
    isError: boolean
    meta?: ReminderMeta
    currentPage: number
    rowsPerPage: number
    onPageChange: (page: number) => void
    onRowsPerPageChange: (limit: number) => void
}

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const formatAmount = (value: string) => {
    const num = parseFloat(value)
    if (isNaN(num)) return '$0.00'
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
        case 'PAID':
            return 'bg-green-50 text-green-600'
        case 'UNPAID':
            return 'bg-red-50 text-red-600'
        case 'UPCOMING':
            return 'bg-blue-50 text-blue-600'
        case 'OVERDUE':
            return 'bg-red-50 text-red-600'
        default:
            return 'bg-gray-50 text-gray-600'
    }
}

export default function ReminderTable({
    reminders,
    isLoading,
    isError,
    meta,
    currentPage,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
}: ReminderTableProps) {
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedItems)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedItems(newSelected)
    }

    const toggleSelectAll = () => {
        if (selectedItems.size === reminders.length && reminders.length > 0) {
            setSelectedItems(new Set())
        } else {
            setSelectedItems(new Set(reminders.map((r) => r.id)))
        }
    }

    const totalPages = meta?.totalPage ?? 1

    return (
        <div className="bg-[#f7f8fa] rounded-xl">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium text-foreground">Global Reminders</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full rounded-xl overflow-hidden bg-white">
                    <thead>
                        <tr className="bg-[#f3f6fd] text-[#222]">
                            <th className="px-4 py-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.size === reminders.length && reminders.length > 0}
                                    onChange={toggleSelectAll}
                                    className="w-4 h-4 rounded border-border cursor-pointer"
                                />
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Title</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Category</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Notes</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Due Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Repeat</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                                    Loading reminders...
                                </td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td colSpan={8} className="px-4 py-10 text-center text-sm text-red-500">
                                    Failed to load reminders.
                                </td>
                            </tr>
                        ) : reminders.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                                    No reminders found.
                                </td>
                            </tr>
                        ) : (
                            reminders.map((reminder) => (
                                <tr
                                    key={reminder.id}
                                    className="border-b border-[#f0f0f0] hover:bg-[#f3f6fd] transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.has(reminder.id)}
                                            onChange={() => toggleSelect(reminder.id)}
                                            className="w-4 h-4 rounded border-border cursor-pointer"
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium">{reminder.title}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Tax />
                                            <span>{reminder.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{reminder.notes || '—'}</td>
                                    <td className="px-4 py-3 text-sm font-medium">{formatAmount(reminder.amount)}</td>
                                    <td className="px-4 py-3 text-sm">{formatDate(reminder.due_date)}</td>
                                    <td className="px-4 py-3 text-sm capitalize">{reminder.repeat.toLowerCase()}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${getStatusColor(reminder.status)} font-medium text-xs`}>
                                            <span className="text-lg">•</span> {reminder.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination and Show rows UI */}
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#888]">Show rows:</span>
                    <select
                        className="rounded-lg border px-2 py-1 text-sm"
                        value={rowsPerPage}
                        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                    >
                        <option value={5}>5 items</option>
                        <option value={10}>10 items</option>
                        <option value={25}>25 items</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="w-8 h-8 rounded-full bg-[#fafafa] text-[#bbb] flex items-center justify-center disabled:opacity-40"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`w-8 h-8 rounded-full font-bold text-sm ${currentPage === page ? 'bg-[#222] text-white' : 'bg-[#fafafa] text-[#222]'}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="w-8 h-8 rounded-full bg-[#fafafa] text-[#bbb] flex items-center justify-center disabled:opacity-40"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    )
}