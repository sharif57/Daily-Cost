'use client'

import Reminder from '../icon/reminder'
import Week from '../icon/week'
import Overdue from '../icon/overdue'

export default function RemindersCard() {


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Reminders Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center  gap-8">
                    <div >
                        <Reminder />
                    </div>
                    <div>
                        <p className="text-[#4B5563] text-sm font-medium mb-2">Total Reminders</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-[#0B1220]">48</span>
                            <span className="text-sm text-blue-500">+2 this week</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Due This Week Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-8">
                    <div>
                        <Week />
                    </div>
                    <div>
                        <p className="text-[#4B5563] text-sm font-medium mb-2">Due This Week</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-[#0B1220]">12</span>
                            <span className="text-sm text-orange-500">Action required</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Overdue Obligations Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-8">
                    <div >
                        <Overdue />
                    </div>
                    <div>
                        <p className="text-[#4B5563] text-sm font-medium mb-2">Overdue Obligations</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-[#0B1220]">2</span>
                            <span className="text-sm text-rose-500">Need attention</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
