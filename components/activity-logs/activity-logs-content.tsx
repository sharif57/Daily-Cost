'use client'

import React, { useState } from 'react'
import { Search, Download, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ActivityLogsTable } from './activity-logs-table'

export function ActivityLogsContent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModule, setSelectedModule] = useState('All Modules')
  const [selectedActionType, setSelectedActionType] = useState('All Action Types')
  const [selectedSeverity, setSelectedSeverity] = useState('All')
  const [selectedDateRange, setSelectedDateRange] = useState('last 30 days')

  const modules = [
    'All Modules',
    'User Management',
    'Financial',
    'Security',
    'System',
    'Settings',
  ]

  const actionTypes = [
    'All Action Types',
    'Login',
    'Transfer',
    'Settings Changes',
    'Password Reset',
    'Logout',
  ]

  const severityLevels = ['All', 'Low', 'Medium', 'High', 'Critical']

  const dateRanges = ['last 30 days', 'last 7 days', 'Today', 'Custom']

  const handleReset = () => {
    setSearchTerm('')
    setSelectedModule('All Modules')
    setSelectedActionType('All Action Types')
    setSelectedSeverity('All')
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0D0C0C]">
            Activity Log: Global View
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Audit trail of chronological user actions for compliance and behavioral analysis. Review Security events, financial modifications, and system reports.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className=" rounded-full border border-[#090A58] hover:bg-secondary bg-transparent"
            >
              📅 {selectedDateRange}
            </Button>
          </div>
          <Button className="bg-[#090A58] rounded-full  hover:bg-sidebar/90 text-white w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="relative w-full md:max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by User ID, IP or specific Action..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full md:w-auto">
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="px-4 py-2 rounded-full text-[#090A58] bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-[16px] font-medium"
          >
            {modules.map((module) => (
              <option key={module} value={module}>
                {module}
              </option>
            ))}
          </select>

          <select
            value={selectedActionType}
            onChange={(e) => setSelectedActionType(e.target.value)}
            className="px-4 py-2 rounded-full text-[#090A58] bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-[16px] font-medium"
          >
            {actionTypes.map((actionType) => (
              <option key={actionType} value={actionType}>
                {actionType}
              </option>
            ))}
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2 rounded-full text-[#090A58] bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-[16px] font-medium"
          >
            {severityLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[#090A58] bg-input border border-border hover:bg-secondary transition-colors text-[16px] font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>
      {/* Activity Logs Table */}
      <ActivityLogsTable searchTerm={searchTerm} />
    </div>
  )
}
