'use client'

import { TrendingUp, TrendingDown, CheckCircle } from 'lucide-react'

export default function ExpenseCard() {
    const cards = [
        {
            label: 'Total Expenses',
            value: '$1,250,000',
            trend: '+12%',
            direction: 'up',
            period: 'vs last period',
            badge: false,
        },
        {
            label: 'Monthly Average',
            value: '$840,000',
            trend: '',
            direction: '',
            period: 'Calculated over last 3 months',
            badge: false,
        },
        {
            label: 'Expense Change (1%)',
            value: 'Reduced',
            trend: '2.4%',
            direction: 'up',
            period: 'Decrease in platform fees this month',
            badge: false,
        },

    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-card rounded-2xl  p-6 hover:shadow-md transition-shadow"
                >
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                        {card.label}
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                        {card.value}
                    </p>
                    <div className="flex items-center gap-2">
                        {card.badge ? (
                            <div className="flex items-center gap-1.5 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">{card.trend}</span>
                            </div>
                        ) : (
                            <>
                                {card.direction === 'up' ? (
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                ) : (
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                )}
                                <span
                                    className={`text-sm font-medium ${card.direction === 'up' ? 'text-green-600' : 'text-red-600'
                                        }`}
                                >
                                    {card.trend}
                                </span>
                                <span className="text-xs text-muted-foreground ml-1">
                                    {card.period}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
