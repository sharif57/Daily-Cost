
'use client'

import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import UserProfileCard from '@/components/user-details/user-profile-card'

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <UserProfileCard />
        </main>
      </div>
    </div>
  )
}