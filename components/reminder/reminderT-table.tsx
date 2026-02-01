'use client'

import React, { useState } from 'react'
import Sour from '../icon/sourch'
import Tax from '../icon/tax'

interface Reminder {
    userId: string
    type: 'Tax Filing' | 'Installment' | 'Subscription' | 'Compliance' | 'Zakat'
    description: string
    amount: string
    dueDate: string
    status: 'Upcoming' | 'Snoozed' | 'Overdue' | 'Cancelled' | 'Completed'
}

const reminders: Reminder[] = [
    {
        userId: '#00821',
        type: 'Tax Filing',
        description: 'Q3 Corporate Tax Filing - Entity A',
        amount: '$450',
        dueDate: 'Oct 24,2024',
        status: 'Upcoming',
    },
    {
        userId: '#00821',
        type: 'Installment',
        description: 'Salah Monthly Installment',
        amount: '$2,450',
        dueDate: 'Oct 24,2024',
        status: 'Snoozed',
    },
    {
        userId: '#00821',
        type: 'Subscription',
        description: 'Market Data Feed Renewal',
        amount: '$30',
        dueDate: 'Oct 24,2024',
        status: 'Overdue',
    },
    {
        userId: '#00821',
        type: 'Tax Filing',
        description: 'Q3 Corporate Tax Filing - Entity A',
        amount: '$450',
        dueDate: 'Oct 24,2024',
        status: 'Upcoming',
    },
    {
        userId: '#00821',
        type: 'Compliance',
        description: 'KYC Refresh for Entity A',
        amount: '$899',
        dueDate: 'Oct 24,2024',
        status: 'Cancelled',
    },
    {
        userId: '#00821',
        type: 'Installment',
        description: 'Salah Monthly Installment',
        amount: '$2,450',
        dueDate: 'Oct 24,2024',
        status: 'Snoozed',
    },
    {
        userId: '#00821',
        type: 'Installment',
        description: 'Salary Monthly Installment',
        amount: '-----',
        dueDate: 'Oct 24,2024',
        status: 'Completed',
    },
    {
        userId: '#00821',
        type: 'Subscription',
        description: 'Market Data Feed Renewal',
        amount: '$30',
        dueDate: 'Oct 24,2024',
        status: 'Overdue',
    },
    {
        userId: '#00821',
        type: 'Zakat',
        description: 'Annual Zakat Calculation',
        amount: '-----',
        dueDate: 'Oct 24,2024',
        status: 'Upcoming',
    },
    {
        userId: '#00821',
        type: 'Compliance',
        description: 'KYC Refresh for Entity A',
        amount: '$899',
        dueDate: 'Oct 24,2024',
        status: 'Cancelled',
    },
]

export default function ReminderTable() {
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
        if (selectedItems.size === reminders.length) {
            setSelectedItems(new Set())
        } else {
            setSelectedItems(new Set(reminders.map((a, i) => a.userId + i)))
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Upcoming':
                return 'bg-blue-50 text-blue-600'
            case 'Snoozed':
                return 'bg-purple-50 text-purple-600'
            case 'Overdue':
                return 'bg-red-50 text-red-600'
            case 'Cancelled':
                return 'bg-orange-50 text-orange-600'
            case 'Completed':
                return 'bg-green-50 text-green-600'
            default:
                return 'bg-gray-50 text-gray-600'
        }
    }

    const getTypeIcon = (type: string) => {
        const icons: { [key: string]: string } = {
            'Tax Filing': '📋',
            'Installment': '💳',
            'Subscription': '🔄',
            'Compliance': '✅',
            'Zakat': '🕌',
        }
        return icons[type] || '📌'
    }

    return (
        <div className="bg-[#f7f8fa] rounded-xl ">
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
                            <th className="px-4 py-3 text-left text-sm font-semibold">User ID</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Due Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reminders.map((reminder, index) => (
                            <tr
                                key={index}
                                className="border-b border-[#f0f0f0] hover:bg-[#f3f6fd] transition-colors"
                            >
                                <td className="px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.has(reminder.userId + index)}
                                        onChange={() => toggleSelect(reminder.userId + index)}
                                        className="w-4 h-4 rounded border-border cursor-pointer"
                                    />
                                </td>
                                <td className="px-4 py-3 text-sm font-medium">{reminder.userId}</td>
                                <td className="px-4 py-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Tax />
                                        <span>{reminder.type}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{reminder.description}</td>
                                <td className="px-4 py-3 text-sm font-medium">{reminder.amount}</td>
                                <td className="px-4 py-3 text-sm">{reminder.dueDate}</td>
                                <td className="px-4 py-3 text-sm">
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${getStatusColor(reminder.status)} font-medium text-xs`}>
                                        <span className="text-lg">•</span> {reminder.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination and Show rows UI */}
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#888]">Show rows:</span>
                    <select className="rounded-lg border px-2 py-1 text-sm">
                        <option>5 items</option>
                        <option>10 items</option>
                        <option>25 items</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-[#fafafa] text-[#bbb] flex items-center justify-center">&lt;</button>
                    <button className="w-8 h-8 rounded-full bg-[#222] text-white font-bold">1</button>
                    <button className="w-8 h-8 rounded-full bg-[#fafafa] text-[#222]">2</button>
                    <button className="w-8 h-8 rounded-full bg-[#fafafa] text-[#222]">3</button>
                    <span className="px-2 text-[#bbb]">...</span>
                    <button className="w-8 h-8 rounded-full bg-[#fafafa] text-[#222]">50</button>
                    <button className="w-8 h-8 rounded-full bg-[#fafafa] text-[#bbb] flex items-center justify-center">&gt;</button>
                </div>
            </div>
        </div>
    )
}