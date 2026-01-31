'use client'

import React, { useState } from 'react'
import { Download, Search, ChevronDown } from 'lucide-react'
import UserTable from './user-table'
import { Button } from '@/components/ui/button'

export default function UsersContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [riskFilter, setRiskFilter] = useState('All Risk Levels')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const roles = ['All Roles', 'Accountant', 'Manager', 'Analyst']
  const riskLevels = ['All Risk Levels', 'Critical', 'At Risk', 'Overspeeded', 'Healthy']
  const statuses = ['All Status', 'Active', 'Inactive', 'Blocked', 'Normal', 'Watch']

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
        <Button className="flex items-center gap-2  border border-[#090A58] bg-transparent text-[#090A58] hover:bg-[#F7F4FD1A] rounded-full px-6 py-2.5 whitespace-nowrap">
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
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-full text-foreground text-sm font-medium hover:bg-secondary transition-colors">
              Role
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg hidden hover:block">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleFilter(role)}
                  className="w-full text-left px-4 py-2.5 hover:bg-secondary text-sm first:rounded-t-lg last:rounded-b-lg"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Level Filter */}
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-full text-foreground text-sm font-medium hover:bg-secondary transition-colors">
              Risk Level
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg hidden hover:block">
              {riskLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setRiskFilter(level)}
                  className="w-full text-left px-4 py-2.5 hover:bg-secondary text-sm first:rounded-t-lg last:rounded-b-lg"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-full text-foreground text-sm font-medium hover:bg-secondary transition-colors">
              Status
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg hidden hover:block">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className="w-full text-left px-4 py-2.5 hover:bg-secondary text-sm first:rounded-t-lg last:rounded-b-lg"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}


      {/* Table Section */}
      <UserTable searchTerm={searchTerm} currentPage={currentPage} rowsPerPage={rowsPerPage} />

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
          <button className="px-2.5 py-1.5 hover:bg-secondary rounded text-sm">
            {'<'}
          </button>
          {[1, 2, 3].map((page) => (
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
          <span className="px-2 py-1.5 text-sm">...</span>
          <button className="px-3 py-1.5 hover:bg-secondary rounded text-sm">
            50
          </button>
          <button className="px-2.5 py-1.5 hover:bg-secondary rounded text-sm">
            {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
