'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import IncomeCard from './incomeCard'
import RecentIncomeTable from './recent-income'
import { useUserIncomeOverviewQuery } from '@/redux/feature/userSlice'
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo, useState } from 'react'

 function IncomeOverview() {
    const searchParams = useSearchParams()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const queryUserId = searchParams.get('userId')
   
    const userId = queryUserId  || ''

    const { data, isLoading, isError } = useUserIncomeOverviewQuery(
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
                        Income Overview
                    </h1>
                    <p className="text-sm sm:text-lg font-normal text-muted-foreground mt-1">
                        Shariah-compliant earnings summary for your global assets
                    </p>
                </div>
                <div className="flex gap-3 flex-col sm:flex-row">
                    <Button
                        variant="outline"
                        className="border-foreground rounded-full hover:text-[#090A58] hover:bg-transparent text-[#090A58] bg-transparent"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                    <Button className="bg-[#090A58] rounded-full hover:bg-sidebar/90 text-white">
                        + Add Funds
                    </Button>
                </div>
            </div>

            {!userId && (
                <p className="text-sm text-muted-foreground">
                    User ID not found. Add `?userId=...` in URL or login first.
                </p>
            )}

            {/* income Cards */}
            <IncomeCard report={report} isLoading={isLoading} isError={isError} />


            {/* Recent Activities */}
            <RecentIncomeTable
                transactions={report?.recent_transactions ?? []}
                isLoading={isLoading}
                isError={isError}
                meta={meta}
                page={page}
                limit={limit}
                onPageChange={setPage}
                onLimitChange={handleLimitChange}
            />
        </div>
    )
}

export default function IncomeOverviewPage() {
    return (
        <>
        <Suspense fallback={<div>Loading...</div>}>
            <IncomeOverview />
        </Suspense>
        </>
    )
}