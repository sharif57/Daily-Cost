'use client'

import React from 'react'
import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import UserProfileCard from '@/components/user-details/user-profile-card'
import RecentActivity from '@/components/user-details/recent-activity'

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - User Profile */}
            <div className="lg:col-span-1">
              <UserProfileCard  />
            </div>
            {/* Right Panel - Recent Activity */}
            {/* <div className="lg:col-span-2">
              <RecentActivity userId={params.id} />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  )
}
