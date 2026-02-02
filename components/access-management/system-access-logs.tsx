'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LogEntry {
    id: string;
    user: string;
    userInitial: string;
    userColor: string;
    timestamp: string;
    ipAddress: string;
    location: string;
    action: string;
    status: 'Success' | 'Failed' | 'Flagged';
    details: string;
}

interface SystemAccessLogsProps {
    data: LogEntry[];
}

export default function SystemAccessLogs({ data }: SystemAccessLogsProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [dateRange, setDateRange] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const itemsPerPage = 5;

    const filteredData = data.filter((log) => {
        if (dateRange && !log.timestamp.includes(dateRange)) return false;
        if (roleFilter && !log.action.includes(roleFilter)) return false;
        if (statusFilter && log.status !== statusFilter) return false;
        return true;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Success':
                return 'bg-green-100 text-green-700';
            case 'Failed':
                return 'bg-red-100 text-red-700';
            case 'Flagged':
                return 'bg-orange-100 text-orange-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 lg:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-[#090A58] mb-4 sm:mb-6">
                System Access Logs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div>
                    <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block tracking-wide">
                        Date Range
                    </label>
                    <input
                        type="month"
                        value={dateRange}
                        onChange={(e) => {
                            setDateRange(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8491FF] bg-white"
                    />
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block tracking-wide">
                        Role
                    </label>
                    <select
                        value={roleFilter}
                        onChange={(e) => {
                            setRoleFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8491FF] bg-white"
                    >
                        <option value="">All Roles</option>
                        <option value="Login Attempt">Login Attempt</option>
                        <option value="Link Backup">Link Backup</option>
                        <option value="Password Reset">Password Reset</option>
                        <option value="User Login">User Login</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block tracking-wide">
                        Status
                    </label>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8491FF] bg-white"
                    >
                        <option value="">All Status</option>
                        <option value="Success">Success</option>
                        <option value="Failed">Failed</option>
                        <option value="Flagged">Flagged</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-700 uppercase mb-2 block tracking-wide">
                        Action
                    </label>
                    <select className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8491FF] bg-white">
                        <option value="">All Actions</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm min-w-max">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                User
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Timestamp
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                IP Address
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Location
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Action
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Status
                            </th>
                            <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((log) => (
                            <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors last:border-0">
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${log.userColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                                        >
                                            {log.userInitial}
                                        </div>
                                        <span className="font-medium text-gray-900 text-xs sm:text-sm whitespace-nowrap">
                                            {log.user}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-600 text-xs whitespace-nowrap">
                                    {log.timestamp}
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-600 text-xs font-mono whitespace-nowrap">
                                    {log.ipAddress}
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-600 text-xs whitespace-nowrap">
                                    {log.location}
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-700 font-medium text-xs sm:text-sm whitespace-nowrap">
                                    {log.action}
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4">
                                    <span
                                        className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                                            log.status
                                        )}`}
                                    >
                                        {log.status}
                                    </span>
                                </td>
                                <td className="px-3 sm:px-4 py-3 sm:py-4 text-gray-600 text-xs whitespace-nowrap">
                                    {log.details}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {paginatedData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No logs found</p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
                <span className="text-xs text-gray-600 order-2 sm:order-1">
                    Show rows: <span className="font-semibold">1 rows</span>
                </span>
                <div className="flex items-center justify-between sm:justify-center gap-1 order-1 sm:order-2">
                    <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={18} className="text-gray-600" />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium transition-colors ${currentPage === pageNum
                                        ? 'bg-[#090A58] text-white'
                                        : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    <span className="text-gray-400 px-1">—</span>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">{totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={18} className="text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}
