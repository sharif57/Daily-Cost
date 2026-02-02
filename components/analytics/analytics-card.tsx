import React from 'react'

export default function AnalyticsCard() {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Reminders Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center  gap-8">
                        <div>
                            <p className="text-[#4B5563] text-sm font-medium mb-2">Total Active User</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-[#0B1220]">2,450</span>
                            </div>
                            <span className="text-sm text-blue-500">+2% vs last month</span>
                        </div>

                    </div>
                </div>

                {/* Due This Week Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-8">

                        <div>
                            <p className="text-[#4B5563] text-sm font-medium mb-2">Avg. Session Duration</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-[#0B1220]">14m 20s</span>
                            </div>
                            <span className="text-sm ">Highly engaged sessions</span>
                        </div>

                    </div>
                </div>

                {/* Overdue Obligations Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-8">

                        <div>
                            <p className="text-[#4B5563] text-sm font-medium mb-2">Daily Usage Rate</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-[#0B1220]">68%</span>
                            </div>
                            <span className="text-sm ">Returning user per day</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
