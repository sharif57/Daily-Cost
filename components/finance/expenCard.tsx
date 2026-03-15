'use client'

import { ExpenseReportData } from '@/redux/feature/userSlice'
import { TrendingDown, TrendingUp } from 'lucide-react'

interface ExpenseCardProps {
    report?: ExpenseReportData
    isLoading?: boolean
    isError?: boolean
}

const formatCurrency = (value?: number): string => {
    return `$${(value ?? 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`
}

export default function ExpenseCard({ report, isLoading, isError }: ExpenseCardProps) {
    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Loading expense summary...</p>
    }

    if (isError) {
        return <p className="text-sm text-red-600">Failed to load expense summary.</p>
    }

    const growthPercent = report?.growth_vs_previous_month?.percentage ?? 0
    const growthExpense = report?.growth_vs_previous_month?.expense ?? 0

    const cards = [
        {
            label: 'Total Expenses',
            value: formatCurrency(report?.total_expense),
            trend: `${growthPercent >= 0 ? '+' : ''}${growthPercent.toFixed(2)}%`,
            direction: growthPercent >= 0 ? 'up' : 'down',
            period: 'vs previous month',
        },
        {
            label: 'Monthly Average',
            value: formatCurrency(report?.average_monthly_expense),
            trend: '',
            direction: '',
            period: 'Calculated over all available months',
        },
        {
            label: 'Growth Expense Amount',
            value: formatCurrency(growthExpense),
            trend: `${growthPercent >= 0 ? '+' : ''}${growthPercent.toFixed(2)}%`,
            direction: growthPercent >= 0 ? 'up' : 'down',
            period: 'Compared with previous month',
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
                        {card.direction === 'up' ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : card.direction === 'down' ? (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                        ) : null}

                        {card.trend ? (
                            <span
                                className={`text-sm font-medium ${card.direction === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {card.trend}
                            </span>
                        ) : null}

                        <span className="text-xs text-muted-foreground ml-1">
                            {card.period}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}
