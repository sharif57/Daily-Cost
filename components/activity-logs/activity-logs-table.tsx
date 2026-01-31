'use client'

import React, { useState } from 'react'
import {
  LogIn,
  Send,
  Settings,
  AlertCircle,
  Check,
  Clock,
  Users,
  UserRoundCog,
} from 'lucide-react'

interface ActivityLog {
  id: string
  eventType: string
  icon: React.ReactNode
  description: string
  ipAddress: string
  dateTime: string
  status: 'Success' | 'Pending' | 'Failed'
}

const activityLogs: ActivityLog[] = [
  {
    id: '1',
    eventType: 'User Login',
    icon: <LogIn className="w-4 h-4" />,
    description: 'Successful login via web portal',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'Success',
  },
  {
    id: '2',
    eventType: 'User Login',
    icon: <LogIn className="w-4 h-4" />,
    description: 'Successful login via web portal',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'Success',
  },
  {
    id: '3',
    eventType: 'Wire Transfer',
    icon: <Send className="w-4 h-4" />,
    description: 'Outbound transfer to vendor LLC',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'Pending',
  },
  {
    id: '4',
    eventType: 'User Login',
    icon: <LogIn className="w-4 h-4" />,
    description: 'Successful login via web portal',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'Success',
  },
  {
    id: '5',
    eventType: 'Wire Transfer',
    icon: <Send className="w-4 h-4" />,
    description: 'Outbound transfer to vendor LLC',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'Pending',
  },
  {
    id: '6',
    eventType: 'User Login',
    icon: <LogIn className="w-4 h-4" />,
    description: 'Successful login via web portal',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'Success',
  },
  {
    id: '7',
    eventType: 'User Login',
    icon: <LogIn className="w-4 h-4" />,
    description: 'Successful login via web portal',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'Success',
  },
  {
    id: '8',
    eventType: 'Wire Transfer',
    icon: <Send className="w-4 h-4" />,
    description: 'Outbound transfer to vendor LLC',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'Pending',
  },
  {
    id: '9',
    eventType: 'Setting Changes',
    icon: <Settings className="w-4 h-4" />,
    description: 'Updated notification preferences',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'Success',
  },
]

interface ActivityLogsTableProps {
  searchTerm: string
}

export function ActivityLogsTable({ searchTerm }: ActivityLogsTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const filteredLogs = activityLogs.filter(
    (log) =>
      log.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm)
  )

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredLogs.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredLogs.map((log) => log.id))
    }
  }

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'text-green-600'
      case 'Pending':
        return 'text-amber-500'
      case 'Failed':
        return 'text-red-600'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-[#E8ECFF]">
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={
                  selectedRows.length === filteredLogs.length &&
                  filteredLogs.length > 0
                }
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Event Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              IP Address
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Date & Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log) => (
            <tr
              key={log.id}
              className="border-b border-border hover:bg-secondary/50 transition-colors"
            >
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(log.id)}
                  onChange={() => toggleRow(log.id)}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#F3F4F6] rounded-full">
                    <UserRoundCog />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {log.eventType}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-foreground">
                {log.description}
              </td>
              <td className="px-4 py-3 text-sm text-foreground">
                {log.ipAddress}
              </td>
              <td className="px-4 py-3 text-sm text-foreground">
                {log.dateTime}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`text-sm font-medium ${getStatusColor(log.status)}`}
                >
                  {log.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredLogs.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">No activity logs found</p>
        </div>
      )}
    </div>
  )
}
