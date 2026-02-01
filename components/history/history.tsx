import { Search, Calendar, ChevronDown, Filter, Plus, Eye, Download } from 'lucide-react'

const historyRows = [
    {
        id: '#00821',
        reportName: 'Q3 Shariah Compliance Audit Log - 2.4 MB',
        type: 'Audit Log',
        dateGenerated: 'Oct 24, 2023',
        generatedBy: { name: 'J. Deo', initial: 'J' },
        status: 'Ready',
    },
    {
        id: '#00821',
        reportName: 'Annual Sukuk Performance Report',
        type: 'Financial Stat',
        dateGenerated: 'Oct 22, 2023',
        generatedBy: { name: 'System', initial: 'S' },
        status: 'Ready',
    },
    {
        id: '#00821',
        reportName: 'October Portfolio Summary',
        type: 'Summary',
        dateGenerated: 'Oct 20, 2023',
        generatedBy: { name: 'Sarah I.', initial: 'S' },
        status: 'Processing',
    },
    {
        id: '#00821',
        reportName: 'Risk Assessment -Q3',
        type: 'Risk Analysis',
        dateGenerated: 'Oct 18, 2023',
        generatedBy: { name: 'Ali Hassan', initial: 'A' },
        status: 'Failed',
    },
    {
        id: '#00821',
        reportName: 'Transaction History - Sept 23',
        type: 'Raw Data',
        dateGenerated: 'Oct 01, 2023',
        generatedBy: { name: 'Sayem', initial: 'S' },
        status: 'Ready',
    },
    {
        id: '#00821',
        reportName: 'Transaction History - Sept 23',
        type: 'Raw Data',
        dateGenerated: 'Oct 01, 2023',
        generatedBy: { name: 'Sayem', initial: 'S' },
        status: 'Ready',
    },
    {
        id: '#00821',
        reportName: 'Transaction History - Sept 23',
        type: 'Raw Data',
        dateGenerated: 'Oct 01, 2023',
        generatedBy: { name: 'Sayem', initial: 'S' },
        status: 'Ready',
    },
    {
        id: '#00821',
        reportName: 'Transaction History - Sept 23',
        type: 'Raw Data',
        dateGenerated: 'Oct 01, 2023',
        generatedBy: { name: 'Sayem', initial: 'S' },
        status: 'Ready',
    },
    {
        id: '#00821',
        reportName: 'Transaction History - Sept 23',
        type: 'Raw Data',
        dateGenerated: 'Oct 01, 2023',
        generatedBy: { name: 'Sayem', initial: 'S' },
        status: 'Ready',
    },
]

const statusStyles: Record<string, string> = {
    Ready: 'bg-emerald-50 text-emerald-600',
    Processing: 'bg-amber-50 text-amber-600',
    Failed: 'bg-rose-50 text-rose-600',
}

export default function HistoryTable() {
    return (
        <section className="w-full  px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0D0C0C] mb-2">Report History</h2>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        View and manage your archive of generated financial statements, compliance audits, and portfolio summaries.
                    </p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#090A58] text-white text-sm font-medium hover:bg-[#070847] transition">
                    <Plus className="w-4 h-4" />
                    Generate New Report
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex flex-col  lg:flex-row lg:items-center justify-between gap-3 px-4 sm:px-6 py-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by report name..."
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#8491FF]"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button className="inline-flex items-center gap-2 px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            Date Range
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="inline-flex items-center gap-2 px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100">
                            All Types
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="inline-flex items-center gap-2 px-3 py-2 text-xs sm:text-sm border border-gray-200 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-100">
                            Status
                            <Filter className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left">
                        <thead className="text-xs text-gray-500 border-y border-gray-100 bg-white">
                            <tr>
                                <th className="py-3 px-4 sm:px-6 font-medium">
                                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                </th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">User ID</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">Report Name</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">Type</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">Date Generated</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">Generated By</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">Status</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            {historyRows.map((row, index) => (
                                <tr key={`${row.id}-${index}`} className="border-b border-gray-100 last:border-0">
                                    <td className="py-4 px-4 sm:px-6">
                                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                    </td>
                                    <td className="py-4 px-2 text-gray-500 font-medium">{row.id}</td>
                                    <td className="py-4 px-2 whitespace-pre-line text-gray-900 font-medium">
                                        {row.reportName}
                                    </td>
                                    <td className="py-4 px-2 text-gray-500">{row.type}</td>
                                    <td className="py-4 px-2 text-gray-500">{row.dateGenerated}</td>
                                    <td className="py-4 px-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center">
                                                {row.generatedBy.initial}
                                            </div>
                                            <span className="text-gray-700 text-sm">{row.generatedBy.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-2">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex items-center justify-center gap-3 text-gray-400">
                                            <button className="hover:text-gray-700" aria-label="View report">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="hover:text-gray-700" aria-label="Download report">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500">
                        <span>Show rows:</span>
                        <button className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700">
                            5
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-full border border-gray-200 text-gray-500">‹</button>
                        <button className="w-8 h-8 rounded-full bg-[#090A58] text-white">1</button>
                        <button className="w-8 h-8 rounded-full border border-gray-200 text-gray-500">2</button>
                        <button className="w-8 h-8 rounded-full border border-gray-200 text-gray-500">3</button>
                        <button className="w-8 h-8 rounded-full border border-gray-200 text-gray-500">…</button>
                        <button className="w-8 h-8 rounded-full border border-gray-200 text-gray-500">50</button>
                        <button className="w-8 h-8 rounded-full border border-gray-200 text-gray-500">›</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
