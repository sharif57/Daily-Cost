'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import LossCard from './loss-card'
import RevenueChart from '../financial/revenue-chart'
import { ExpenseAllocationChart } from './chat'
import Statement from './statement'
import { useSearchParams } from 'next/navigation'
import { useProfitLossQuery } from '@/redux/feature/userSlice'
import { Suspense, useMemo, useState } from 'react'

 function ProfitLossOverview() {

    const searchParams = useSearchParams()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const queryUserId = searchParams.get('userId')
    
    const userId = queryUserId  || ''

    const { data, isLoading, isError } = useProfitLossQuery(
        { id: userId, page, limit },
        { skip: !userId },
    )

    const report = data?.data
    const meta = useMemo(() => report?.meta ?? data?.meta, [data?.meta, report?.meta])

    const handleLimitChange = (nextLimit: number) => {
        setLimit(nextLimit)
        setPage(1)
    }


    return (
        <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-2xl font-bold text-[#0D0C0C]">
                        Profit & Loss Summary
                    </h1>
                    <p className="text-sm sm:text-lg font-normal text-muted-foreground mt-1">
                        Detailed breakdown of revenue, expenses and net purification.
                    </p>
                </div>
                <div className="flex gap-3 flex-col sm:flex-row">
                    <Button
                        variant="outline"
                        className="border-foreground rounded-full hover:text-[#090A58] hover:bg-transparent text-[#090A58] bg-transparent"
                    >
                        Monthly
                    </Button>
                    <Button className="bg-[#090A58] rounded-full hover:bg-sidebar/90 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                </div>
            </div>

            {!userId && (
                <p className="text-sm text-muted-foreground">
                    User ID not found. Add `?userId=...` in URL or login first.
                </p>
            )}

            {isError && (
                <p className="text-sm text-red-600">Failed to load profit and loss report.</p>
            )}

            {/* expense Cards */}
            <LossCard report={report} isLoading={isLoading} isError={isError} />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
                <div className="lg:col-span-3">
                    <RevenueChart
                        title={'Profit & Loss Overview'}
                        description={'Income vs Expenses (This year)'}
                        data={report?.yearly_monthly_data ?? []}
                        isLoading={isLoading}
                    />
                </div>
                <ExpenseAllocationChart
                    categoryWiseExpense={report?.category_wise_expense ?? {}}
                    totalExpense={report?.total_expense ?? 0}
                    isLoading={isLoading}
                />
            </div>


            {/* Recent Activities */}
            <Statement
                transactions={report?.recent_transactions ?? []}
                meta={meta}
                isLoading={isLoading}
                isError={isError}
                page={page}
                limit={limit}
                onPageChange={setPage}
                onLimitChange={handleLimitChange}
            />
        </div>
    )
}

export default function ProfitLossOverviewPage() {
    return (
        <>
        <Suspense fallback={<div>Loading...</div>}>
            <ProfitLossOverview />
        </Suspense>
        </>
    )
}