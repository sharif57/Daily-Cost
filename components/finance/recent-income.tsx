'use client'

import React, { useState } from 'react'
import Sour from '../icon/sourch'

interface Activity {
  userId: string
  transactionId: string
  date: string
  source: {
    name: string
    desc: string
    icon: React.ReactNode
  }
  type: string
  amount: string
  status: 'Cleared' | 'Pending'
}

const activities: Activity[] = [
  {
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    source: {
      name: 'Global Real Estate Sukuk III',
      desc: 'Quality Profit Distribution',
      icon: <span className="text-2xl">🪙</span>, // Replace with your icon
    },
    type: 'Quarterly Yield',
    amount: '+$12,450.00',
    status: 'Cleared',
  },
  {
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    source: {
      name: 'Ethical Real Estate Trust',
      desc: 'Rental Income Payout',
      icon: <span className="text-2xl">🪙</span>,
    },
    type: 'Quarterly Yield',
    amount: '+$12,450.00',
    status: 'Pending',
  },
  {
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    source: {
      name: 'Halal Tech Growth ETF',
      desc: 'Equity Dividend',
      icon: <span className="text-2xl">🪙</span>,
    },
    type: 'Dividend',
    amount: '+$2,450.00',
    status: 'Cleared',
  },
  {
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    source: {
      name: 'Halal Tech Growth ETF',
      desc: 'Equity Dividend',
      icon: <span className="text-2xl">🪙</span>,
    },
    type: 'Dividend',
    amount: '+$2,450.00',
    status: 'Cleared',
  },
  {
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    source: {
      name: 'Ethical Real Estate Trust',
      desc: 'Rental Income Payout',
      icon: <span className="text-2xl">🪙</span>,
    },
    type: 'Quarterly Yield',
    amount: '+$12,450.00',
    status: 'Pending',
  },
]

export default function RecentIncomeTable() {
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
      setSelectedItems(new Set(activities.map((a, i) => a.userId + i)))
    }
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
                  checked={selectedItems.size === activities.length && activities.length > 0}
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
            {activities.map((activity, index) => (
              <tr
                key={index}
                className="border-b border-[#f0f0f0] hover:bg-[#f3f6fd] transition-colors"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(activity.userId + index)}
                    onChange={() => toggleSelect(activity.userId + index)}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium">{activity.userId}</td>
                <td className="px-4 py-3 text-sm">{activity.transactionId}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Sour />
                    <div>
                      <div className="font-semibold text-[15px] text-[#222]">{activity.source.name}</div>
                      <div className="text-xs text-[#888]">{activity.source.desc}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{activity.date}</td>
                <td className="px-4 py-3 text-sm">{activity.type}</td>
                <td className="px-4 py-3 text-sm font-medium text-green-600">{activity.amount}</td>
                <td className="px-4 py-3 text-sm">
                  {activity.status === 'Cleared' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 font-medium text-xs">
                      <span className="text-lg">•</span> Cleared
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 font-medium text-xs">
                      <span className="text-lg">•</span> Pending
                    </span>
                  )}
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