'use client'

import React, { useMemo, useState } from 'react'
import { Download, Search } from 'lucide-react'
import UserTable from './user-table'
import { Button } from '@/components/ui/button'
import { useAllUsersQuery } from '@/redux/feature/userSlice'

export default function UsersContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

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

  const handleExportCsv = () => {
    const header = ['ID', 'Name', 'Email', 'Phone', 'Role', 'Status', 'Verified', 'Gender', 'Created At']
    const rows = users.map((user) => [
      user.id,
      user.name,
      user.email,
      user.phone ?? '',
      user.role,
      user.online ? 'Active' : 'Inactive',
      user.is_verified ? 'Verified' : 'Unverified',
      user.gender,
      new Date(user.created_at).toLocaleString(),
    ])

    const csv = [header, ...rows]
      .map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'users-export.csv'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
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
          onClick={handleExportCsv}
          disabled={users.length === 0}
          className="flex items-center gap-2  border border-[#090A58] bg-transparent text-[#090A58] hover:bg-[#F7F4FD1A] rounded-full px-6 py-2.5 whitespace-nowrap disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">Export</span>
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
