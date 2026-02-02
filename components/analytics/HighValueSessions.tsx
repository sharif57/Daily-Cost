'use client'

import React, { useState } from 'react'
import { Eye } from 'lucide-react'

type Session = {
    id: string
    user: {
        name: string
        avatar: string
    }
    eventType: string
    sessionStart: string
    duration: string
    topAction: string
}

const sessions: Session[] = [
    {
        id: '1',
        user: {
            name: 'Ahmed K.',
            avatar: '/avatars/ahmed.jpg',
        },
        eventType: 'Login',
        sessionStart: 'Today, 10:23 AM',
        duration: '24m 12s',
        topAction: 'View Details',
    },
    {
        id: '2',
        user: {
            name: 'Sara M.',
            avatar: '/avatars/sara.jpg',
        },
        eventType: 'Transaction',
        sessionStart: 'Today, 10:23 AM',
        duration: '18m 05s',
        topAction: 'Assign Consultant',
    },
    {
        id: '3',
        user: {
            name: 'Farhad K.',
            avatar: '/avatars/farhad.jpg',
        },
        eventType: 'Report',
        sessionStart: 'Today, 10:23 AM',
        duration: '05m 30s',
        topAction: 'Export Session (PDF / CSV)',
    },
    {
        id: '4',
        user: {
            name: 'Farhad K.',
            avatar: '/avatars/farhad2.jpg',
        },
        eventType: 'Update',
        sessionStart: 'Today, 10:23 AM',
        duration: '05m 30s',
        topAction: 'Session status update',
    },
    {
        id: '5',
        user: {
            name: 'Usman Y.',
            avatar: '/avatars/usman.jpg',
        },
        eventType: 'View',
        sessionStart: 'Yesterday, 10:23 AM',
        duration: '42m 10s',
        topAction: 'View Session',
    },
]

export default function HighValueSessions() {
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())

    const toggleRow = (id: string) => {
        const newSelected = new Set(selectedRows)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedRows(newSelected)
    }

    const toggleAll = () => {
        if (selectedRows.size === sessions.length) {
            setSelectedRows(new Set())
        } else {
            setSelectedRows(new Set(sessions.map((s) => s.id)))
        }
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
    }

    return (
        <div className="bg-white rounded-2xl  w-2/3 border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg text-[#0D0C0C] font-normal">
                    Recent High-Value Sessions
                </h3>
                <button className="text-sm text-[#8491FF] hover:text-[#6B7DFF] font-medium transition-colors">
                    View All
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                            <th className="py-3 px-4 sm:px-6 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.size === sessions.length}
                                    onChange={toggleAll}
                                    className="w-4 h-4 rounded border-gray-300 text-[#8491FF] focus:ring-[#8491FF]"
                                />
                            </th>
                            <th className="py-3 px-2 text-left text-xs sm:text-sm font-medium text-gray-600">
                                Event Type
                            </th>
                            <th className="py-3 px-2 text-left text-xs sm:text-sm font-medium text-gray-600">
                                Session Start
                            </th>
                            <th className="py-3 px-2 text-left text-xs sm:text-sm font-medium text-gray-600">
                                Duration
                            </th>
                            <th className="py-3 px-2 text-left text-xs sm:text-sm font-medium text-gray-600">
                                Top Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session) => (
                            <tr
                                key={session.id}
                                className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-4 px-4 sm:px-6">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.has(session.id)}
                                        onChange={() => toggleRow(session.id)}
                                        className="w-4 h-4 rounded border-gray-300 text-[#8491FF] focus:ring-[#8491FF]"
                                    />
                                </td>
                                <td className="py-4 px-2">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#8491FF] to-[#6B7DFF] flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0">
                                            {getInitials(session.user.name)}
                                        </div>
                                        <span className="text-sm sm:text-base text-gray-900 font-medium">
                                            {session.user.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-2 text-xs sm:text-sm text-gray-600">
                                    {session.sessionStart}
                                </td>
                                <td className="py-4 px-2 text-xs sm:text-sm text-gray-600">
                                    {session.duration}
                                </td>
                                <td className="py-4 px-2 text-xs sm:text-sm text-gray-900">
                                    {session.topAction}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
