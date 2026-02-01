'use client'
import { useMemo, useState } from 'react'
import { Search, Calendar, ChevronDown, Filter, Download, DownloadIcon, MoreVertical } from 'lucide-react'

type DownloadRow = {
    id: string
    fileName: string
    fileType: string
    category: string
    dateAdded: string
    size: string
}

const downloadRows: DownloadRow[] = [
    {
        id: '#00821',
        fileName: 'October 2023 Portfolio Performance',
        fileType: 'PDF Document',
        category: 'Monthly Reports',
        dateAdded: 'Oct 24, 2023',
        size: '2.4 MB',
    },
    {
        id: '#00821',
        fileName: 'Q3 Transaction History',
        fileType: 'CSV Spreadsheet',
        category: 'Transactions',
        dateAdded: 'Oct 22, 2023',
        size: '845 KB',
    },
    {
        id: '#00821',
        fileName: 'September 2023 Portfolio Performance',
        fileType: 'PDF Document',
        category: 'Legal & Compliance',
        dateAdded: 'Oct 20, 2023',
        size: '5.1 MB',
    },
    {
        id: '#00821',
        fileName: 'Investment Policy Statement',
        fileType: 'DOC Document',
        category: 'Monthly Reports',
        dateAdded: 'Oct 18, 2023',
        size: '2.3 MB',
    },
    {
        id: '#00821',
        fileName: 'September 2023 Portfolio Performance',
        fileType: 'PDF Document',
        category: 'Legal & Compliance',
        dateAdded: 'Oct 01, 2023',
        size: '1.8 MB',
    },
]

export default function DownloadPage() {
    const [query, setQuery] = useState('')

    const filteredRows = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return downloadRows
        return downloadRows.filter((row) => row.fileName.toLowerCase().includes(q))
    }, [query])

    const downloadBlob = (content: string, filename: string, mime = 'text/plain') => {
        const blob = new Blob([content], { type: mime })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)
    }

    const handleDownloadAll = () => {
        const header = ['File Name', 'File Type', 'User ID', 'Category', 'Date Added', 'Size']
        const rows = filteredRows.map((row) => [
            row.fileName,
            row.fileType,
            row.id,
            row.category,
            row.dateAdded,
            row.size,
        ])
        const csv = [header, ...rows]
            .map((line) => line.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
            .join('\n')
        downloadBlob(csv, 'download-center.csv', 'text/csv')
    }

    const handleRowDownload = (row: DownloadRow) => {
        const content = `File Name: ${row.fileName}\nType: ${row.fileType}\nUser ID: ${row.id}\nCategory: ${row.category}\nDate Added: ${row.dateAdded}\nSize: ${row.size}`
        downloadBlob(content, `${row.fileName.replace(/\s+/g, '_')}.txt`)
    }

    return (
        <section className="w-full  px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0D0C0C] mb-2">Download Center</h2>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        Access your monthly statements, audit reports, and transaction histories. All documents are encrypted and securely stored.                    </p>
                </div>
                <button
                    onClick={handleDownloadAll}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#090A58] text-white text-sm font-medium hover:bg-[#070847] transition"
                >
                    <DownloadIcon className="w-4 h-4" />
                    Download All
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex flex-col  lg:flex-row lg:items-center justify-between gap-3 px-4 sm:px-6 py-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by report name..."
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
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
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">File Name</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">User ID</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">Category</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">Date Added</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626]">Size</th>
                                <th className="py-3 px-2 text-[16px] font-medium text-[#262626] text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            {filteredRows.map((row, index) => (
                                <tr key={`${row.id}-${index}`} className="border-b border-gray-100 last:border-0">
                                    <td className="py-4 px-4 sm:px-6">
                                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="text-gray-900 font-medium">{row.fileName}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{row.fileType}</div>
                                    </td>
                                    <td className="py-4 px-2 text-gray-500 font-medium">{row.id}</td>
                                    <td className="py-4 px-2 text-gray-500">{row.category}</td>
                                    <td className="py-4 px-2 text-gray-500">{row.dateAdded}</td>
                                    <td className="py-4 px-2 text-gray-500">{row.size}</td>
                                    <td className="py-4 px-2">
                                        <div className="flex items-center justify-center gap-3 text-gray-600">
                                            <button
                                                onClick={() => handleRowDownload(row)}
                                                className="hover:text-gray-900"
                                                aria-label="Download file"
                                            >
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button className="hover:text-gray-900" aria-label="More actions">
                                                <MoreVertical className="w-4 h-4" />
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
