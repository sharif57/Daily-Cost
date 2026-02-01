'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import RecentIncomeTable from './recent-income'
import ExpenseCard from './expenCard'
import RecentExpenseTable from './recent-expense'
import LossCard from './loss-card'
import RevenueChart from '../financial/revenue-chart'
import ExpensesBreakdown from '../financial/expenses-breakdown'
import { ExpenseAllocationChart } from './chat'
import Statement from './statement'

export default function ProfitLossOverview() {
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

            {/* expense Cards */}
            <LossCard />
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
                <div className="lg:col-span-3">
                    <RevenueChart title={'Profit & Loss Overview'} description={'Income vs Expenses (This year)'} />
                </div>
                <ExpenseAllocationChart />
            </div>


            {/* Recent Activities */}
            <Statement />
        </div>
    )
}
