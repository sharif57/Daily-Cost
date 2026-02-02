'use client'

import { Book, CheckCircle2, MessageCircle, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

interface Notification {
    id: string
    type: 'signup' | 'update'
    title: string
    userId: string
    timeAgo: string
    avatar?: string
    icon?: 'check' | 'user'
}

const notifications: Notification[] = [
    {
        id: '1',
        type: 'signup',
        title: 'New User Sign Up Just Now',
        userId: 'User ID: #00821',
        timeAgo: '2 minutes ago',
        icon: 'check'
    },
    {
        id: '2',
        type: 'update',
        title: 'Yasin Ibrahim updated mailing address',
        userId: 'User ID: #00821',
        timeAgo: '2 hours ago',
        avatar: 'YI'
    }
]

export default function SystemCommunications() {
    const [markAll, setMarkAll] = useState(false)
    const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set())

    const handleMarkAllRead = () => {
        setMarkAll(!markAll)
        if (!markAll) {
            setReadNotifications(new Set(notifications.map(n => n.id)))
        } else {
            setReadNotifications(new Set())
        }
    }

    const handleMarkRead = (id: string) => {
        const updated = new Set(readNotifications)
        if (updated.has(id)) {
            updated.delete(id)
        } else {
            updated.add(id)
        }
        setReadNotifications(updated)
    }

    return (
        <div className="min-h-screen ">
            <div className=" px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                            System Communications
                        </h1>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Stay inform about platform maintenance, security updates and policy changes affecting your account.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center sm:whitespace-nowrap">

                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-[#090A58] border-gray-300 py-3 px-6 hover:bg-gray-50 sm:h-auto rounded-full bg-transparent hover:text-black"
                        >
                            <Book className="h-4 w-4" />
                            <span className="hidden sm:inline">Mark All as Read</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-[#090A58] border-gray-300 py-3 px-6 hover:bg-gray-50 sm:h-auto rounded-full bg-transparent hover:text-black"
                        >
                            <Settings className="h-4 w-4" />
                            <span className="hidden sm:inline">Preferences</span>
                        </Button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-3 sm:space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="group relative rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm sm:p-5"
                        >

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                                {/* Icon/Avatar and Content */}
                                <div className="flex gap-3 flex-1 sm:gap-4">
                                    {/* Icon or Avatar */}
                                    <div className="flex-shrink-0">
                                        {notification.icon === 'check' ? (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 sm:h-12 sm:w-12">
                                                <CheckCircle2 className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6" />
                                            </div>
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold sm:h-12 sm:w-12 sm:text-sm">
                                                {notification.avatar}
                                            </div>
                                        )}
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                                            {notification.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                            {notification.userId}
                                        </p>

                                    </div>
                                </div>

                                {/* View Profile Button */}
                                <div className="flex flex-col gap-2 sm:gap-3 items-center">
                                    <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                        {notification.timeAgo}
                                    </p>
                                    <Button
                                        size="sm"
                                        className="h-9 w-full rounded-full bg-blue-900 px-5 text-white hover:bg-blue-800 sm:w-auto sm:px-6 sm:h-8 text-xs sm:text-sm font-medium"
                                    >
                                        View Profile
                                    </Button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {notifications.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center sm:py-16">
                        <MessageCircle className="mx-auto h-12 w-12 text-gray-400 sm:h-16 sm:w-16" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900 sm:text-xl">
                            No notifications
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 sm:text-base">
                            You're all caught up! Check back soon for updates.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
