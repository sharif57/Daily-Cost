'use client'

import { Button } from '@/components/ui/button'
import { Eye, Download } from 'lucide-react'
import StatCard from './stat-card'
import MonthlyChart from './monthly-chart'
import GrowthChart from './growth-chart'
import Users from '../icon/users'
import Active from '../icon/active'
import DateIcon from '../icon/date'
import Revenue from '../icon/revenu'
import Expense from '../icon/expense'
import Profit from '../icon/profit'
import Negative from '../icon/negative'
import { useDashboardReportQuery } from '@/redux/feature/dashboardSlice'
import Link from 'next/link'
import { useState } from 'react'
import jsPDF from 'jspdf'

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function MainContent() {
  const { data, isLoading, isError } = useDashboardReportQuery(undefined)
  const [isExporting, setIsExporting] = useState(false)

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

  const handleExportGlobalReport = async () => {
    if (!report || isExporting) {
      return
    }

    try {
      setIsExporting(true)
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const margin = 12
      const contentWidth = pageWidth - margin * 2

      const now = new Date()
      const fileDate = now.toISOString().slice(0, 10)
      const formattedDate = now.toLocaleDateString()

      // Header band
      pdf.setFillColor(9, 10, 88)
      pdf.rect(0, 0, pageWidth, 34, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(16)
      pdf.text('Global Dashboard Invoice Report', margin, 14)
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(10)
      pdf.text(`Generated: ${formattedDate}`, margin, 21)
      pdf.text(`Invoice ID: INV-${fileDate.replace(/-/g, '')}`, margin, 27)

      // Overview section
      let y = 44
      pdf.setTextColor(15, 23, 42)
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(12)
      pdf.text('Summary Overview', margin, y)

      const cards = [
        { label: 'Total Users', value: formatNumber(report.totalUsers) },
        { label: 'Active Users', value: formatNumber(report.activeUsers) },
        { label: 'Inactive Users', value: formatNumber(report.inactiveUsers) },
        { label: 'Upcoming Deadlines', value: formatNumber(report.upcomingReminders) },
        { label: 'Total Income', value: formatCurrency(report.totalIncome) },
        { label: 'Total Expense', value: formatCurrency(report.totalExpense) },
        { label: 'Total Revenue', value: formatCurrency(report.totalRevenue) },
        { label: 'Negative Cash Flow', value: formatCurrency(report.negativeCashFlow) },
      ]

      const cardWidth = (contentWidth - 6) / 2
      const cardHeight = 14
      y += 4

      cards.forEach((card, index) => {
        const column = index % 2
        const row = Math.floor(index / 2)
        const x = margin + column * (cardWidth + 6)
        const boxY = y + row * (cardHeight + 4)

        pdf.setDrawColor(220, 226, 236)
        pdf.setFillColor(248, 250, 252)
        pdf.roundedRect(x, boxY, cardWidth, cardHeight, 2, 2, 'FD')

        pdf.setTextColor(71, 85, 105)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(8)
        pdf.text(card.label, x + 3, boxY + 5)

        pdf.setTextColor(15, 23, 42)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(10)
        pdf.text(card.value, x + 3, boxY + 10.5)
      })

      // Monthly table
      y += Math.ceil(cards.length / 2) * (cardHeight + 4) + 8
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(12)
      pdf.setTextColor(15, 23, 42)
      pdf.text('Monthly Active Users Breakdown', margin, y)

      const monthCounts = new Array<number>(12).fill(0)
      report.currentYearUserCount?.forEach((item) => {
        const monthIndex = item.month - 1
        if (monthIndex >= 0 && monthIndex < 12) {
          monthCounts[monthIndex] += item.count
        }
      })

      y += 5
      const tableMonthX = margin
      const tableUsersX = pageWidth - margin - 40

      pdf.setFillColor(9, 10, 88)
      pdf.rect(margin, y, contentWidth, 8, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(9)
      pdf.text('Month', tableMonthX + 3, y + 5.2)
      pdf.text('Users', tableUsersX + 3, y + 5.2)

      y += 8
      MONTH_LABELS.forEach((label, index) => {
        const isEven = index % 2 === 0
        pdf.setFillColor(isEven ? 248 : 255, isEven ? 250 : 255, isEven ? 252 : 255)
        pdf.rect(margin, y, contentWidth, 7, 'F')

        pdf.setDrawColor(229, 231, 235)
        pdf.line(margin, y + 7, pageWidth - margin, y + 7)

        pdf.setTextColor(30, 41, 59)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(9)
        pdf.text(label, tableMonthX + 3, y + 4.8)
        pdf.text(monthCounts[index].toLocaleString(), tableUsersX + 3, y + 4.8)

        y += 7
      })

      // Footer
      const pageHeight = pdf.internal.pageSize.getHeight()
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(8)
      pdf.setTextColor(100, 116, 139)
      pdf.text('This is an auto-generated invoice-style dashboard report.', margin, pageHeight - 8)

      pdf.save(`global-dashboard-report-${fileDate}.pdf`)
    } catch (error) {
      console.error('Failed to export global report as PDF', error)
    } finally {
      setIsExporting(false)
    }
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
          <Button
            onClick={handleExportGlobalReport}
            disabled={isExporting || !report}
            className="flex items-center rounded-full text-[16px] gap-2 bg-[#090A58] text-white p-4 hover:bg-sidebar/90"
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Downloading Invoice...' : 'Export Invoice PDF'}
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
          icon={<DateIcon />}
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
        {/* <StatCard
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
        /> */}
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
