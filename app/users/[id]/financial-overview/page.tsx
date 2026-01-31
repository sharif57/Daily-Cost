'use client'

import Sidebar from '@/components/dashboard/sidebar'
import Header from '@/components/dashboard/header'
import FinancialKPICards from '@/components/financial/financial-kpi-cards'
import RevenueChart from '@/components/financial/revenue-chart'
import ExpensesBreakdown from '@/components/financial/expenses-breakdown'
import RiskIndicators from '@/components/financial/risk-indicators'
import TransactionsTable from '@/components/financial/transactions-table'
import { Download } from 'lucide-react'

export default function FinancialOverviewPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8 ">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Financial Overview
              </h1>
              <button className="flex items-center gap-2 px-6 py-2.5  text-primary-foreground bg-[#090A58] rounded-full hover:bg-primary/90 transition-colors">
                <Download className="w-5 h-5" />
                <span className="text-sm font-semibold">Export Report</span>
              </button>
            </div>

            {/* KPI Cards */}
            <FinancialKPICards />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="lg:col-span-2">
                <RevenueChart />
              </div>
              <ExpensesBreakdown />
            </div>

            {/* Risk & Transactions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 mb-8">
              <RiskIndicators />
              <TransactionsTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
