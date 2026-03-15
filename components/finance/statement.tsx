import { IncomeRecentTransaction, UsersMeta } from '@/redux/feature/userSlice'
import { useMemo, useState } from 'react'

interface StatementProps {
    transactions: IncomeRecentTransaction[]
    meta?: UsersMeta
    isLoading?: boolean
    isError?: boolean
    page: number
    limit: number
    onPageChange: (nextPage: number) => void
    onLimitChange: (nextLimit: number) => void
}

const formatCurrency = (value: string, type: string) => {
    const amount = Number(value || 0)
    const prefix = type === 'INCOME' ? '+' : '-'
    return `${prefix}$${amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`
}

const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    })
}

const toDisplayUserId = (userId: string) => `#${userId.slice(0, 8).toUpperCase()}`
const toDisplayTransactionId = (id: string) => `#TRX-${id.slice(0, 8).toUpperCase()}`

export default function Statement({
    transactions,
    meta,
    isLoading,
    isError,
    page,
    limit,
    onPageChange,
    onLimitChange,
}: StatementProps) {
    const [selected, setSelected] = useState<Set<string>>(new Set())
    const totalPages = Math.max(meta?.totalPage ?? 1, 1)
    const canPrev = page > 1
    const canNext = page < totalPages

    const pageButtons = useMemo(() => {
        const buttons: Array<number | '...'> = []
        const start = Math.max(1, page - 1)
        const end = Math.min(totalPages, page + 1)

        if (start > 1) {
            buttons.push(1)
            if (start > 2) buttons.push('...')
        }

        for (let current = start; current <= end; current += 1) {
            buttons.push(current)
        }

        if (end < totalPages) {
            if (end < totalPages - 1) buttons.push('...')
            buttons.push(totalPages)
        }

        return buttons
    }, [page, totalPages])

    const toggleSelect = (rowId: string) => {
        const next = new Set(selected)
        if (next.has(rowId)) next.delete(rowId)
        else next.add(rowId)
        setSelected(next)
    }

    const toggleSelectAll = () => {
        if (selected.size === transactions.length) {
            setSelected(new Set())
            return
        }

        setSelected(new Set(transactions.map((item) => item.id)))
    }

    return (
        <div className="w-full   rounded-xl ">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                <h2 className="text-lg md:text-xl font-medium text-gray-800">Detailed Statement</h2>
                <div>
                    <select
                        value={limit}
                        onChange={(e) => onLimitChange(Number(e.target.value))}
                        className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 text-sm"
                    >
                        <option value={5}>5 items</option>
                        <option value={10}>10 items</option>
                        <option value={25}>25 items</option>
                        <option value={50}>50 items</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                <table className="min-w-full text-sm md:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="w-10 p-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selected.size === transactions.length && transactions.length > 0}
                                    onChange={toggleSelectAll}
                                    className="accent-primary h-4 w-4"
                                />
                            </th>
                            <th className="p-3 text-left font-semibold text-gray-700">User ID</th>
                            <th className="p-3 text-left font-semibold text-gray-700">Transaction ID</th>
                            <th className="p-3 text-left font-semibold text-gray-700">Date</th>
                            <th className="p-3 text-left font-semibold text-gray-700">Category</th>
                            <th className="p-3 text-left font-semibold text-gray-700">Notes</th>
                            <th className="p-3 text-right font-semibold text-gray-700 whitespace-nowrap">Amount</th>
                            <th className="p-3 text-right font-semibold text-gray-700 whitespace-nowrap">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={8} className="p-6 text-center text-muted-foreground">Loading statement...</td>
                            </tr>
                        )}
                        {isError && (
                            <tr>
                                <td colSpan={8} className="p-6 text-center text-red-600">Failed to load statement.</td>
                            </tr>
                        )}
                        {!isLoading && !isError && transactions.length === 0 && (
                            <tr>
                                <td colSpan={8} className="p-6 text-center text-muted-foreground">No statement rows found.</td>
                            </tr>
                        )}
                        {!isLoading && !isError && transactions.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="p-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selected.has(item.id)}
                                        onChange={() => toggleSelect(item.id)}
                                        className="accent-primary h-4 w-4"
                                    />
                                </td>
                                <td className="p-3 text-gray-700">{toDisplayUserId(item.user_id)}</td>
                                <td className="p-3 text-gray-700">{toDisplayTransactionId(item.id)}</td>
                                <td className="p-3 text-gray-700">{formatDate(item.date)}</td>
                                <td className="p-3 text-gray-700">{item.category}</td>
                                <td className="p-3 text-gray-700">{item.notes || 'N/A'}</td>
                                <td className="p-3 text-right font-semibold">{formatCurrency(item.amount, item.type)}</td>
                                <td className={`p-3 text-right font-semibold ${item.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.type}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                    Page {page} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => canPrev && onPageChange(page - 1)}
                        disabled={!canPrev}
                        className="w-8 h-8 rounded-full bg-[#fafafa] text-[#bbb] disabled:opacity-50 flex items-center justify-center"
                    >
                        &lt;
                    </button>
                    {pageButtons.map((item, index) =>
                        item === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-[#bbb]">...</span>
                        ) : (
                            <button
                                key={item}
                                onClick={() => onPageChange(item)}
                                className={`w-8 h-8 rounded-full ${item === page ? 'bg-[#222] text-white font-bold' : 'bg-[#fafafa] text-[#222]'}`}
                            >
                                {item}
                            </button>
                        ),
                    )}
                    <button
                        onClick={() => canNext && onPageChange(page + 1)}
                        disabled={!canNext}
                        className="w-8 h-8 rounded-full bg-[#fafafa] text-[#bbb] disabled:opacity-50 flex items-center justify-center"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}
