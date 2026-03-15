'use client'

import { ProfitLossReportData } from '@/redux/feature/userSlice'
import { TrendingDown, TrendingUp } from 'lucide-react'

interface LossCardProps {
    report?: ProfitLossReportData
    isLoading?: boolean
    isError?: boolean
}

const formatCurrency = (value?: number): string => {
    return `$${(value ?? 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`
}

export default function LossCard({ report, isLoading, isError }: LossCardProps) {

    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Loading profit and loss summary...</p>
    }

    if (isError) {
        return <p className="text-sm text-red-600">Failed to load profit and loss summary.</p>
    }

    const netProfitPercentage = report?.net_profit_percentage ?? 0

    const cards = [
        {
            label: 'Total Revenue',
            value: formatCurrency(report?.total_revenue),
            trend: `${report?.recent_transactions?.length ?? 0} transactions`,
            direction: 'up',
            period: 'Revenue recognized',
        },
        {
            label: 'Total Expenses ',
            value: formatCurrency(report?.total_expense),
            trend: '',
            direction: '',
            period: 'Outgoing amount',
        },
        {
            label: 'Net Profit',
            value: formatCurrency(report?.total_income),
            trend: `${netProfitPercentage.toFixed(2)}%`,
            direction: netProfitPercentage >= 0 ? 'up' : 'down',
            period: 'Net profit percentage',
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
