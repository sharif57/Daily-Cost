'use client'

import Link from 'next/link'
import { AppUser } from '@/redux/feature/userSlice'

interface UserTableProps {
  users: AppUser[]
  isLoading: boolean
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

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '').join('') || 'U'
}

function formatRole(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString()
}

export default function UserTable({
  users,
  isLoading,
}: UserTableProps) {
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
              User
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Role
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Phone
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Verified
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Joined
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">
                Loading users...
              </td>
            </tr>
          )}

          {!isLoading && users.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">
                No users found for the selected filters.
              </td>
            </tr>
          )}

          {!isLoading && users.map((user) => (
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
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full ${getAvatarColor(
                          getInitials(user.name)
                        )} flex items-center justify-center text-white text-xs font-semibold`}
                      >
                        {getInitials(user.name)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </Link>
              </td>
              <td className="px-4 py-3">
                <p className="text-sm font-medium text-foreground">
                  {formatRole(user.role)}
                </p>
              </td>
              <td className="px-4 py-3">
                <p className="text-sm text-muted-foreground">
                  {user.phone ?? 'N/A'}
                </p>
              </td>
              <td className="px-4 py-3">
                <span className={`text-sm font-medium ${user.online ? 'text-green-600' : 'text-gray-500'}`}>
                  {user.online ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`text-sm font-medium ${user.is_verified ? 'text-green-600' : 'text-red-600'}`}>
                  {user.is_verified ? 'Verified' : 'Unverified'}
                </span>
              </td>
              <td className="px-4 py-3">
                <p className="text-sm text-muted-foreground">{formatDate(user.created_at)}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
