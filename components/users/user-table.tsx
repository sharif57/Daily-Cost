'use client'

import Link from 'next/link'
import { AppUser } from '@/redux/feature/userSlice'
import { RotateCcw, Trash2 } from 'lucide-react'

interface UserTableProps {
  users: AppUser[]
  isLoading: boolean
  onToggleSuspend: (user: AppUser) => void
  onDeleteUser: (user: AppUser) => void
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
  const code = initials?.charCodeAt(0) ?? 0
  const index = Math.abs(code) % colors.length
  return colors[index]
}

function getInitials(name?: string | null): string {
  const safeName = (name ?? '').trim()
  if (!safeName) return 'U'
  const parts = safeName.split(/\s+/).filter(Boolean)
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
  onToggleSuspend,
  onDeleteUser,
}: UserTableProps) {

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ''

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
            <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                Loading users...
              </td>
            </tr>
          )}

          {!isLoading && users.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-10 text-center text-sm text-muted-foreground">
                No users found for the selected filters.
              </td>
            </tr>
          )}

          {!isLoading && users.map((user) => (
            <tr
              key={user.id}
              className={`border-b border-border transition-colors ${user.is_deleted ? 'bg-red-100 hover:bg-red-50' : 'hover:bg-secondary/50'}`}
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
                        src={IMAGE + user.image}
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
                <span className={`text-sm font-medium ${user.is_deleted ? 'text-red-600' : user.online ? 'text-green-600' : 'text-gray-500'}`}>
                  {user.is_deleted ? 'Suspended' : user.online ? 'Active' : 'Inactive'}
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
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onDeleteUser(user)}
                    className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleSuspend(user)}
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${user.is_deleted ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'border border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'}`}
                  >
                    {user.is_deleted ? <RotateCcw className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
                    {user.is_deleted ? 'Reactivate' : 'Suspend'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
