'use client'
import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', value: 4000 },
    { month: 'Feb', value: 3000 },
    { month: 'Mar', value: 5000 },
    { month: 'Apr', value: 4500 },
    { month: 'May', value: 6000 },
    { month: 'Jun', value: 5500 },
    { month: 'Jul', value: 7000 },
    { month: 'Aug', value: 6500 },
    { month: 'Sep', value: 8000 },
    { month: 'Oct', value: 7500 },
    { month: 'Nov', value: 9000 },
    { month: 'Dec', value: 8500 },
];

export default function AnalysisChart() {
    return (
        <div className="w-full h-full  rounded-2xl bg-white p-6 shadow-sm">
            <h1 className='text-lg text-[#0D0C0C] font-normal mb-4'>Users Overview</h1>
            <ResponsiveContainer width="100%" height="100%" minHeight={400}>
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#E1C67B" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.1} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        width={50}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            padding: '8px 12px'
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#E1C67B"
                        strokeWidth={2}
                        fill="url(#colorGradient)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
