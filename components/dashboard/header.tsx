'use client'

import { useUserProfileQuery } from '@/redux/feature/userSlice'
import { Search } from 'lucide-react'
import Link from 'next/link';

export default function Header() {
  const imageBaseUrl = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? '').replace(/\/$/, '')

  const { data } = useUserProfileQuery(undefined);

  const user = data?.data;
  const initials = user?.name?.split(' ').map((n: string) => n[0]).join('') ?? 'U'
  const profileImage = user?.image
    ? user.image.startsWith('http://') || user.image.startsWith('https://')
      ? user.image
      : `${imageBaseUrl}${user.image.startsWith('/') ? user.image : `/${user.image}`}`
    : ''

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#F2F4FF] border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <Link href="/settings/profile" className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={user?.name ?? 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}
