'use client'

import React, { useMemo, useState } from 'react'
import { Download, Search } from 'lucide-react'
import UserTable from './user-table'
import { Button } from '@/components/ui/button'
import { useAllUsersQuery } from '@/redux/feature/userSlice'
import jsPDF from 'jspdf'

export default function UsersContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [isExporting, setIsExporting] = useState(false)

  const queryParams = useMemo(() => {
    const normalizedSearch = searchTerm.trim()

    return {
      search: normalizedSearch || undefined,
      role: roleFilter === 'ALL' ? undefined : roleFilter.toLowerCase(),
      status:
        statusFilter === 'Active'
          ? true
          : statusFilter === 'Inactive'
            ? false
            : undefined,
      page: currentPage,
      limit: rowsPerPage,
    }
  }, [currentPage, roleFilter, rowsPerPage, searchTerm, statusFilter])

  const { data, isLoading, isFetching, isError } = useAllUsersQuery(queryParams)

  const users = data?.data?.data ?? []
  const meta = data?.data?.meta

  const roles = ['ALL', 'ADMIN', 'USER']
  const statuses = ['All Status', 'Active', 'Inactive']

  const totalPages = meta?.totalPage ?? 1
  const totalUsers = meta?.total ?? 0

  const handleExportUsersPdf = () => {
    if (users.length === 0 || isExporting) {
      return
    }

    try {
      setIsExporting(true)
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 12
      const contentWidth = pageWidth - margin * 2
      const fileDate = new Date().toISOString().slice(0, 10)

      pdf.setTextColor(15, 23, 42)
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(14)
      pdf.text('Users Data', margin, 16)
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.text(`Page ${currentPage}`, pageWidth - margin - 18, 16)

      let y = 24

      const headerHeight = 8
      const rowHeight = 7
      const colX = {
        name: margin + 3,
        email: margin + 52,
        role: margin + 120,
        status: margin + 145,
        verified: margin + 170,
      }

      const drawTableHeader = () => {
        pdf.setFillColor(9, 10, 88)
        pdf.rect(margin, y, contentWidth, headerHeight, 'F')
        pdf.setTextColor(255, 255, 255)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(8)
        pdf.text('Name', colX.name, y + 5.2)
        pdf.text('Email', colX.email, y + 5.2)
        pdf.text('Role', colX.role, y + 5.2)
        pdf.text('Status', colX.status, y + 5.2)
        pdf.text('Verified', colX.verified, y + 5.2)
        y += headerHeight
      }

      drawTableHeader()

      users.forEach((user, index) => {
        if (y + rowHeight > pageHeight - 12) {
          pdf.addPage()
          y = 16
          drawTableHeader()
        }

        const isEven = index % 2 === 0
        pdf.setFillColor(isEven ? 248 : 255, isEven ? 250 : 255, isEven ? 252 : 255)
        pdf.rect(margin, y, contentWidth, rowHeight, 'F')

        pdf.setDrawColor(229, 231, 235)
        pdf.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight)

        pdf.setTextColor(30, 41, 59)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(7.5)

        const name = user.name.length > 24 ? `${user.name.slice(0, 24)}...` : user.name
        const email = user.email.length > 35 ? `${user.email.slice(0, 35)}...` : user.email

        pdf.text(name, colX.name, y + 4.7)
        pdf.text(email, colX.email, y + 4.7)
        pdf.text(user.role.toUpperCase(), colX.role, y + 4.7)
        pdf.text(user.online ? 'Active' : 'Inactive', colX.status, y + 4.7)
        pdf.text(user.is_verified ? 'Yes' : 'No', colX.verified, y + 4.7)

        y += rowHeight
      })

      pdf.save(`users-page-${currentPage}-data-${fileDate}.pdf`)
    } catch (error) {
      console.error('Failed to export users report as PDF', error)
    } finally {
      setIsExporting(false)
    }
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">All Users</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Monitor user activity, financial health, and risk assessment.
          </p>
        </div>
        {/* Export Button */}
        <Button
          onClick={handleExportUsersPdf}
          disabled={users.length === 0 || isExporting}
          className="flex items-center gap-2  border border-[#090A58] bg-transparent text-[#090A58] hover:bg-[#F7F4FD1A] rounded-full px-6 py-2.5 whitespace-nowrap disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">{isExporting ? 'Downloading PDF...' : 'Export Users PDF'}</span>
          <span className="sm:hidden">{isExporting ? 'PDF...' : 'Export'}</span>
        </Button>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search by UserName, Business or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 ">
          {/* Role Filter */}
          <div>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 bg-card border border-border rounded-full text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role === 'ALL' ? 'All Roles' : role}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 bg-card border border-border rounded-full text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mb-4">
        <p className="text-sm text-muted-foreground">
          {isFetching ? 'Updating results...' : `Showing ${users.length} of ${totalUsers} users`}
        </p>
      </div>

      {isError && (
        <p className="text-sm text-red-600 mb-4">
          Failed to load users. Please try again.
        </p>
      )}

      {/* Table Section */}
      <UserTable users={users} isLoading={isLoading} />

      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show rows:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value={5}>5 items</option>
            <option value={10}>10 items</option>
            <option value={25}>25 items</option>
            <option value={50}>50 items</option>
          </select>
        </div>

        {/* Page Numbers */}
        <div className="flex items-center justify-center gap-1 flex-wrap">
          <button
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1.5 hover:bg-secondary rounded text-sm disabled:opacity-50"
          >
            {'<'}
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1.5 rounded text-sm transition-colors ${currentPage === page
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-secondary'
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            className="px-2.5 py-1.5 hover:bg-secondary rounded text-sm disabled:opacity-50"
          >
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
