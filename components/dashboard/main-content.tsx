'use client'

import { Button } from '@/components/ui/button'
import { Eye, Download } from 'lucide-react'
import StatCard from './stat-card'
import MonthlyChart from './monthly-chart'
import GrowthChart from './growth-chart'
import Users from '../icon/users'
import Active from '../icon/active'
import Date from '../icon/date'
import Revenue from '../icon/revenu'
import Expense from '../icon/expense'
import Profit from '../icon/profit'
import Negative from '../icon/negative'
import { useDashboardReportQuery } from '@/redux/feature/dashboardSlice'
import Link from 'next/link'

export default function MainContent() {
  const { data, isLoading, isError } = useDashboardReportQuery(undefined)

  const report = data?.data

  const formatNumber = (value: number | undefined): string => {
    return (value ?? 0).toLocaleString()
  }

  const formatCurrency = (value: number | undefined): string => {
    return `$${(value ?? 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0D0C0C]">
            Global Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Key insights on users, revenue, expenses, and risk
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link href="/users" className="w-full">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-2 border-[#090A58] rounded-full text-[#0D0C0C] hover:text-black hover:bg-[#F7F4FD1A] bg-transparent"
            >
              <Eye className="w-4 h-4" />
              View All Users
            </Button>
          </Link>
          <Button className="flex items-center rounded-full text-[16px] gap-2 bg-[#090A58] text-white p-4 hover:bg-sidebar/90">
            <Download className="w-4 h-4" />
            Export Global Report
          </Button>
        </div>
      </div>

      {isLoading && (
        <p className="text-sm text-muted-foreground">Loading dashboard report...</p>
      )}

      {isError && (
        <p className="text-sm text-red-600">
          Failed to load dashboard report. Please try again.
        </p>
      )}

      {/* Stats Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={formatNumber(report?.totalUsers)}
          change={`${formatNumber(report?.activeUsers)} active`}
          trend="up"
          color=""
          icon={<Users />}
        />
        <StatCard
          title="Active Users"
          value={formatNumber(report?.activeUsers)}
          change={`${formatNumber(report?.inactiveUsers)} inactive`}
          trend="up"
          color=""
          icon={<Active />}
        />
        <StatCard
          title="Inactive Users"
          value={formatNumber(report?.inactiveUsers)}
          change={`${formatNumber(report?.totalUsers)} total`}
          trend="down"
          color=""
          icon={<Users />}
        />
        <StatCard
          title="Upcoming Deadlines"
          value={formatNumber(report?.upcomingReminders)}
          change="Action REQD"
          trend="warning"
          color=""
          icon={<Date />}
        />
      </div>

      {/* Second Row Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(report?.totalRevenue)}
          change={report && report.totalRevenue < 0 ? 'Negative trend' : 'Positive trend'}
          trend={report && report.totalRevenue < 0 ? 'down' : 'up'}
          color=""
          icon={<Revenue />}
        />
        <StatCard
          title="Total Expense"
          value={formatCurrency(report?.totalExpense)}
          change={formatCurrency(report?.totalIncome)}
          trend="up"
          color=""
          icon={<Expense />}
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(report?.totalRevenue)}
          change={report && report.totalRevenue < 0 ? 'Loss' : 'Profit'}
          trend={report && report.totalRevenue < 0 ? 'down' : 'up'}
          color=""
          icon={<Profit />}
        />
        <StatCard
          title="Negative Cash Flow"
          value={formatCurrency(report?.negativeCashFlow)}
          change="High Risk"
          trend="danger"
          color=""
          icon={<Negative />}
        />
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        {/* Monthly Active Users Chart */}
        <MonthlyChart />

        {/* User Growth Trend Chart */}
        {/* <GrowthChart /> */}
      </div>
    </div>
  )
}
