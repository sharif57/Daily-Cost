'use client'

import React from 'react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  title: string
  email: string
  avatar: string
  business: string
  businessType: string
  lastActive: string
  revenue: string
  expenseStatus: string
  expenseStatusColor: string
  riskFlag: string
  riskFlagColor: string
}

const users: User[] = [
  {
    id: '1',
    name: 'Sr. Accountant',
    title: 'Michelle Rivera',
    email: 'michelle.rivera@example.com',
    avatar: 'MR',
    business: 'TechFlow Solutions',
    businessType: 'SaaS / Enterprise',
    lastActive: '2 mins ago',
    revenue: '$124,400.00',
    expenseStatus: 'Critical',
    expenseStatusColor: 'text-red-500',
    riskFlag: 'Blocked',
    riskFlagColor: 'text-red-500',
  },
  {
    id: '2',
    name: 'Sr. Accountant',
    title: 'Dolores Chambers',
    email: 'dolores.chambers@example.com',
    avatar: 'DC',
    business: 'SkyNet Systems',
    businessType: 'AI / Defense',
    lastActive: '3 days ago',
    revenue: '$124,400.00',
    expenseStatus: 'Healthy',
    expenseStatusColor: 'text-green-500',
    riskFlag: 'Normal',
    riskFlagColor: 'text-gray-500',
  },
  {
    id: '3',
    name: 'Sr. Accountant',
    title: 'Debbie Baker',
    email: 'debbie.baker@example.com',
    avatar: 'DB',
    business: 'Apex Global',
    businessType: 'Logistics',
    lastActive: 'Yesterday',
    revenue: '$124,400.00',
    expenseStatus: 'At Risk',
    expenseStatusColor: 'text-orange-500',
    riskFlag: 'Watch',
    riskFlagColor: 'text-orange-500',
  },
  {
    id: '4',
    name: 'Sr. Accountant',
    title: 'Debra Holt',
    email: 'debra.holt@example.com',
    avatar: 'DH',
    business: 'DesignCo',
    businessType: 'Creative Agency',
    lastActive: '1 hour ago',
    revenue: '$124,400.00',
    expenseStatus: 'Overspeeded',
    expenseStatusColor: 'text-purple-500',
    riskFlag: 'High Risk',
    riskFlagColor: 'text-red-500',
  },
  {
    id: '5',
    name: 'Sr. Accountant',
    title: 'Dolores Chambers',
    email: 'dolores.chambers@example.com',
    avatar: 'DC',
    business: 'SkyNet Systems',
    businessType: 'AI / Defense',
    lastActive: '3 days ago',
    revenue: '$124,400.00',
    expenseStatus: 'Healthy',
    expenseStatusColor: 'text-green-500',
    riskFlag: 'Normal',
    riskFlagColor: 'text-gray-500',
  },
  {
    id: '6',
    name: 'Sr. Accountant',
    title: 'Michelle Rivera',
    email: 'michelle.rivera@example.com',
    avatar: 'MR',
    business: 'TechFlow Solutions',
    businessType: 'SaaS / Enterprise',
    lastActive: '2 mins ago',
    revenue: '$124,400.00',
    expenseStatus: 'Critical',
    expenseStatusColor: 'text-red-500',
    riskFlag: 'Blocked',
    riskFlagColor: 'text-red-500',
  },
  {
    id: '7',
    name: 'Sr. Accountant',
    title: 'Dolores Chambers',
    email: 'dolores.chambers@example.com',
    avatar: 'DC',
    business: 'SkyNet Systems',
    businessType: 'AI / Defense',
    lastActive: '3 days ago',
    revenue: '$124,400.00',
    expenseStatus: 'Healthy',
    expenseStatusColor: 'text-green-500',
    riskFlag: 'Normal',
    riskFlagColor: 'text-gray-500',
  },
  {
    id: '8',
    name: 'Sr. Accountant',
    title: 'Debbie Baker',
    email: 'debbie.baker@example.com',
    avatar: 'DB',
    business: 'Apex Global',
    businessType: 'Logistics',
    lastActive: 'Yesterday',
    revenue: '$124,400.00',
    expenseStatus: 'At Risk',
    expenseStatusColor: 'text-orange-500',
    riskFlag: 'Watch',
    riskFlagColor: 'text-orange-500',
  },
  {
    id: '9',
    name: 'Sr. Accountant',
    title: 'Michelle Rivera',
    email: 'michelle.rivera@example.com',
    avatar: 'MR',
    business: 'TechFlow Solutions',
    businessType: 'SaaS / Enterprise',
    lastActive: '2 mins ago',
    revenue: '$124,400.00',
    expenseStatus: 'Critical',
    expenseStatusColor: 'text-red-500',
    riskFlag: 'Blocked',
    riskFlagColor: 'text-red-500',
  },
  {
    id: '10',
    name: 'Sr. Accountant',
    title: 'Debra Holt',
    email: 'debra.holt@example.com',
    avatar: 'DH',
    business: 'DesignCo',
    businessType: 'Creative Agency',
    lastActive: '1 hour ago',
    revenue: '$124,400.00',
    expenseStatus: 'Overspeeded',
    expenseStatusColor: 'text-purple-500',
    riskFlag: 'High Risk',
    riskFlagColor: 'text-red-500',
  },
]

interface UserTableProps {
  searchTerm: string
  currentPage: number
  rowsPerPage: number
}

function getAvatarColor(initials: string): string {
  const colors = [
    'bg-orange-400',
    'bg-blue-400',
    'bg-yellow-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-green-400',
  ]
  const index = initials.charCodeAt(0) % colors.length
  return colors[index]
}

export default function UserTable({
  searchTerm,
  currentPage,
  rowsPerPage,
}: UserTableProps) {
  const filteredUsers = users.filter((user) =>
    user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.business.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="overflow-x-auto border border-border rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-secondary border-b border-border">
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-border cursor-pointer"
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              User Details
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Business
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Last Active
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Revenue (MO)
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Expenses Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Risk Flag
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr
              key={user.id}
              className="border-b border-border hover:bg-secondary/50 transition-colors"
            >
              <td className="px-4 py-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
              </td>
              <td className="px-4 py-3">
                <Link href={`/users/${user.id}`}>
                  <div className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-10 h-10 rounded-full ${getAvatarColor(
                        user.avatar
                      )} flex items-center justify-center text-white text-xs font-semibold`}
                    >
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                        {user.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {user.business}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.businessType}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3">
                <p className="text-sm text-muted-foreground">{user.lastActive}</p>
              </td>
              <td className="px-4 py-3">
                <p className="text-sm font-medium text-foreground">
                  {user.revenue}
                </p>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`text-sm font-medium ${user.expenseStatusColor}`}
                >
                  {user.expenseStatus}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${user.riskFlagColor}`}
                  >
                    {user.riskFlag}
                  </span>
                  {user.riskFlag === 'Blocked' && (
                    <span className="text-red-500 text-sm">✕</span>
                  )}
                  {user.riskFlag === 'Watch' && (
                    <span className="text-orange-500 text-sm">👁</span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
