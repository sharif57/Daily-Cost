'use client'

import React, { useState } from 'react'
import {
  LogIn,
  Send,
  Settings,
  FileText,
  ChevronRight,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ActivityLog {
  id: string
  type: 'login' | 'transfer' | 'settings' | 'other'
  description: string
  ipAddress: string
  dateTime: string
  status: 'success' | 'pending' | 'failed'
}

const activityData: ActivityLog[] = [
  {
    id: '1',
    type: 'login',
    description: 'Successful login via web portal',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'success',
  },
  {
    id: '2',
    type: 'login',
    description: 'Successful login via web portal',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'success',
  },
  {
    id: '3',
    type: 'transfer',
    description: 'Outbound transfer to vendor LLC',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'pending',
  },
  {
    id: '4',
    type: 'login',
    description: 'Successful login via web portal',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'success',
  },
  {
    id: '5',
    type: 'transfer',
    description: 'Outbound transfer to vendor LLC',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'pending',
  },
  {
    id: '6',
    type: 'login',
    description: 'Successful login via web portal',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'success',
  },
  {
    id: '7',
    type: 'login',
    description: 'Successful login via web portal',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'success',
  },
  {
    id: '8',
    type: 'transfer',
    description: 'Outbound transfer to vendor LLC',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'pending',
  },
  {
    id: '9',
    type: 'settings',
    description: 'Updated notification preferences',
    ipAddress: '192.168.1.45',
    dateTime: 'Oct 24,2024 - 10:42 AM',
    status: 'success',
  },
]

const activityTabs = [
  { id: 'all', label: 'All' },
  { id: 'logins', label: 'Logins' },
  { id: 'transfer', label: 'Transfer' },
  { id: 'settings', label: 'Settings' },
]

interface RecentActivityProps {
  userId: string
}

export default function RecentActivity({ userId }: RecentActivityProps) {
  const [activeTab, setActiveTab] = useState('all')

  const getIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <LogIn className="w-5 h-5 text-muted-foreground" />
      case 'transfer':
        return <Send className="w-5 h-5 text-muted-foreground" />
      case 'settings':
        return <Settings className="w-5 h-5 text-muted-foreground" />
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600'
      case 'pending':
        return 'text-orange-600'
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
        <Button
          variant="outline"
          className="bg-[#090A58] hover:bg-sidebar/90 text-white rounded-full border-0 font-semibold sm:w-auto w-full"
        >
          See All Activity log
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-6 pt-4 border-b border-border overflow-x-auto">
        {activityTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id
              ? 'text-sidebar border-b-sidebar'
              : 'text-muted-foreground border-b-transparent hover:text-foreground'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Activity Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  disabled
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Event Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                IP Address
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((activity) => (
              <tr key={activity.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-border"
                    disabled
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* {getIcon(activity.type)} */}
                    <div className="bg-[#F3F4F6] p-2 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-sidebar" />
                    </div>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {activity.type === 'login'
                        ? 'User Login'
                        : activity.type === 'transfer'
                          ? 'Wire Transfer'
                          : 'Setting Changes'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">{activity.description}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">{activity.ipAddress}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">{activity.dateTime}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-semibold capitalize ${getStatusColor(activity.status)}`}>
                    {activity.status}
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
