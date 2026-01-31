import React, { useState } from 'react'

const expenses = [
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
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    counterparty: 'Outbound transfer to vendor LLC',
    category: 'Operational',
    amount: '-$12,450.00',
    status: 'Completed',
  },
  {
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    counterparty: 'Outbound transfer to vendor LLC',
    category: 'Operational',
    amount: '-$12,450.00',
    status: 'Completed',
  },
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
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    counterparty: 'Amazon Web Service',
    category: 'Software',
    amount: '-$12,450.00',
    status: 'Completed',
  },
  {
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    counterparty: 'Outbound transfer to vendor LLC',
    category: 'Operational',
    amount: '-$12,450.00',
    status: 'Completed',
  },
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
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    counterparty: 'Amazon Web Service',
    category: 'Software',
    amount: '-$12,450.00',
    status: 'Completed',
  },
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
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    counterparty: 'Outbound transfer to vendor LLC',
    category: 'Operational',
    amount: '-$12,450.00',
    status: 'Completed',
  },
  {
    userId: '#00821',
    transactionId: '#TRX-00821',
    date: 'Oct 24,2024',
    counterparty: 'Updated notification preferences',
    category: 'Payroll',
    amount: '-$12,450.00',
    status: 'Completed',
  },
]

export default function RecentExpenseTable() {
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const toggleSelect = (idx: number) => {
    const newSet = new Set(selected)
    if (newSet.has(idx)) newSet.delete(idx)
    else newSet.add(idx)
    setSelected(newSet)
  }

  const toggleSelectAll = () => {
    if (selected.size === expenses.length) setSelected(new Set())
    else setSelected(new Set(expenses.map((_, idx) => idx)))
  }

  return (
    <div className="bg-[#f7f8fa] rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium text-foreground">Recent Expenses</h2>
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl overflow-hidden text-sm bg-white">
          <thead className=''>
            <tr className="bg-[#f3f6fd] text-[#222] ">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selected.size === expenses.length && expenses.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold">User ID</th>
              <th className="px-4 py-3 text-left font-semibold">Transaction ID</th>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">Counterparty</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Amount</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, idx) => (
              <tr
                key={idx}
                className="border-b border-[#f0f0f0] hover:bg-[#f3f6fd] transition-colors"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(idx)}
                    onChange={() => toggleSelect(idx)}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3">{exp.userId}</td>
                <td className="px-4 py-3">{exp.transactionId}</td>
                <td className="px-4 py-3">{exp.date}</td>
                <td className="px-4 py-3">{exp.counterparty}</td>
                <td className="px-4 py-3">{exp.category}</td>
                <td className="px-4 py-3 font-medium text-red-600">{exp.amount}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 font-medium text-xs">
                    <span className="text-lg">•</span> Completed
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {/* View */}
                    <button className="p-1 rounded hover:bg-gray-100" title="View">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    {/* Edit */}
                    <button className="p-1 rounded hover:bg-gray-100" title="Edit">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
                    </button>
                    {/* Delete */}
                    <button className="p-1 rounded hover:bg-gray-100" title="Delete">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}