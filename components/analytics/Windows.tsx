'use client'

import React from 'react'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = ['8am', '12pm', '4pm', '8pm']

// Activity intensity levels (0-4, where 4 is highest)
const activityData = [
    // Mon
    [1, 1, 2, 2, 3, 3, 4, 4, 3, 2],
    // Tue
    [1, 2, 2, 4, 2, 3, 2, 3, 2, 1],
    // Wed
    [1, 2, 3, 2, 4, 3, 2, 3, 2, 1],
    // Thu
    [1, 2, 3, 2, 3, 2, 4, 3, 2, 1],
    // Fri
    [1, 2, 3, 4, 2, 3, 2, 3, 2, 1],
    // Sat
    [1, 2, 2, 2, 3, 2, 2, 2, 1, 1],
    // Sun
    [1, 2, 2, 2, 3, 2, 2, 2, 1, 1],
]

const getColorClass = (intensity: number): string => {
    const colors = [
        'bg-[#F5EDD8]', // Very light
        'bg-[#EDD9A8]', // Light
        'bg-[#E5C47B]', // Medium
        'bg-[#DDB04E]', // Strong
        'bg-[#D69D21]', // Very strong
    ]
    return colors[intensity] || colors[0]
}

export default function Windows() {
    return (
        <div className="bg-white w-1/3 rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
            <div className="mb-4">
                <h3 className="text-lg text-[#0D0C0C] font-normal mb-1">
                    Peak Activity Windows
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                    User session density by day and hour (GMT+3).
                </p>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
                <div className="">
                    {/* Grid Container */}
                    <div className="space-y-1.5 sm:space-y-2 ">
                        {days.map((day, dayIndex) => (
                            <div key={day} className="flex items-center gap-2 sm:gap-3">
                                {/* Day Label */}
                                <div className="w-[24px] h-[30px] text-xs sm:text-sm text-gray-600 font-medium">
                                    {day}
                                </div>

                                {/* Activity Blocks */}
                                <div className="flex gap-1 sm:gap-1.5 flex-1">
                                    {activityData[dayIndex].map((intensity, hourIndex) => (
                                        <div
                                            key={`${day}-${hourIndex}`}
                                            className={`rounded ${getColorClass(intensity)} hover:opacity-80 transition-opacity cursor-pointer`}
                                            style={{ width: '24px', height: '30px' }}
                                            title={`${day} - Activity level: ${intensity}/4`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Time Labels */}
                    <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
                        <div className="w-[24px] h-[30px]" /> {/* Spacer for day labels */}
                        <div className="flex justify-between flex-1 text-xs sm:text-sm text-gray-500">
                            {hours.map((hour) => (
                                <span key={hour} className="text-center">
                                    {hour}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
