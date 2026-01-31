'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Phone, CreditCard as IdentityCard, Calendar, Eye, LogOut, Lock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Reset from '../icon/reset'
import Suspend from '../icon/suspend'

interface UserProfileCardProps {
  userId: string
}

export default function UserProfileCard({ userId }: UserProfileCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-6">
      {/* User Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 flex items-center justify-center text-white font-bold text-3xl mb-2 relative">
          AB
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card"></div>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">Alex Baker</h2>
        <p className="text-sm text-muted-foreground mb-3">Acme Corp Global</p>
        <div className="inline-block bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-primary">Finance Admin</span>
        </div>
      </div>

      {/* Account Information */}
      <div className="mb-6 pb-6 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Account Informations
        </h3>
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Email Address</p>
              <p className="text-sm font-medium text-foreground">
                deanna.curtis@example.com
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Phone Number</p>
              <p className="text-sm font-medium text-foreground">(319) 555-0115</p>
            </div>
          </div>

          {/* User ID */}
          <div className="flex items-start gap-3">
            <IdentityCard className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">User ID</p>
              <p className="text-sm font-medium text-foreground">#88392 - AB</p>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Member Since</p>
              <p className="text-sm font-medium text-foreground">Oct 12, 2022</p>
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
