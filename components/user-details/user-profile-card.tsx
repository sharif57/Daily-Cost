'use client'

import Link from 'next/link'
import { Mail, Phone, CreditCard as IdentityCard, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reset from '../icon/reset'
import Suspend from '../icon/suspend'
import { useSingleUserQuery } from '@/redux/feature/userSlice'
import { useParams } from 'next/navigation'

interface UserProfileCardProps {
  userId: string
}

const getInitials = (name?: string): string => {
  if (!name) return 'U'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

const formatRole = (role?: string): string => {
  if (!role) return 'N/A'
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
}

const formatDate = (value?: string): string => {
  if (!value) return 'N/A'
  return new Date(value).toLocaleDateString()
}

export default function UserProfileCard() {
const params = useParams()
const userId = params.id

  const { data, isLoading, isError } = useSingleUserQuery(userId as string)
  const user = data?.data


  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL
  const profileImage = user?.image
    ? user.image.startsWith('http')
      ? user.image
      : `${IMAGE ?? ''}${user.image}`
    : ''


  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-6">
      {/* User Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-cyan-300 to-cyan-500 flex items-center justify-center text-white font-bold text-3xl mb-2 relative overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt={user?.name ?? 'User avatar'}
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials(user?.name)
          )}
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card"></div>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {isLoading ? 'Loading...' : user?.name ?? 'Unknown User'}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">{user?.email ?? 'N/A'}</p>
        <div className="inline-block bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-primary">{formatRole(user?.role)}</span>
        </div>
      </div>

      {isError && (
        <p className="text-sm text-red-600 text-center mb-4">
          Failed to load user profile.
        </p>
      )}

      {/* Account Information */}
      <div className="mb-6 pb-6 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Account Informations
        </h3>
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Email Address</p>
              <p className="text-sm font-medium text-foreground">
                {user?.email ?? 'N/A'}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Phone Number</p>
              <p className="text-sm font-medium text-foreground">{user?.phone ?? 'N/A'}</p>
            </div>
          </div>

          {/* User ID */}
          <div className="flex items-start gap-3">
            <IdentityCard className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">User ID</p>
              <p className="text-sm font-medium text-foreground break-all">{user?.id ?? 'N/A'}</p>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Member Since</p>
              <p className="text-sm font-medium text-foreground">{formatDate(user?.created_at)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Online Status</p>
              <p className={`text-sm font-medium ${user?.online ? 'text-green-600' : 'text-gray-500'}`}>
                {user?.online ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Link href={`/users/${userId}/financial-overview`} className="block">
          <Button
            variant="default"
            className="w-full bg-[#090A58] hover:bg-[#090A58] rounded-full text-white text-[16px] font-medium p-6"
          >
            View Financial Overview
          </Button>
        </Link>

        <Link href={`/users/${userId}/activity-logs`} className="block">
          <Button
            variant="outline"
            className="w-full bg-[#B68F24] hover:bg-[#B68F24] rounded-full text-white text-[16px] font-medium p-6"
          >
            View Activity Logs
          </Button>
        </Link>

        <Button
          variant="outline"
          className="w-full bg-transparent border border-[#090A58] hover:bg-transparent/90 hover:text-[#090A58]  rounded-full text-black text-[16px] font-medium p-6"
        >
          <Reset />
          Reset Password
        </Button>

        <Button
          variant="outline"
          className="w-full bg-transparent border border-[#E64462] hover:bg-transparent/90 hover:text-[#E64462]  rounded-full text-[#E64462] text-[16px] font-medium p-6"
        >
          <Suspend />
          Suspend User
        </Button>
      </div>
    </div>
  )
}
