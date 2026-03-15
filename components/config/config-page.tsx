'use client';
import { useState } from 'react'
import { useGetGuestsQuery } from '@/redux/feature/adminSlice'

export default function ConfigPage() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const { data, isLoading, isError } = useGetGuestsQuery({ page, limit })

    const applications = data?.data ?? []
    const meta = data?.meta

    const totalPages = Math.max(meta?.totalPage ?? 1, 1)
    const canPrev = page > 1
    const canNext = page < totalPages

    const formatDate = (value: string) => {
        return new Date(value).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        })
    }

    const yesNo = (value: boolean) => (value ? 'Yes' : 'No')

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-full">
            <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
                <h1 className="text-2xl font-bold text-foreground">Capital Applications</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Retrieve and review submitted capital application requests.
                </p>
            </div>

            <div className="bg-white border border-border rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">Application List</h2>
                    <span className="text-sm text-muted-foreground">Total: {meta?.total ?? 0}</span>
                </div>

                {isLoading && <p className="text-sm text-muted-foreground">Loading applications...</p>}
                {isError && <p className="text-sm text-red-600">Failed to load applications.</p>}

                {!isLoading && !isError && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-3 py-2 text-left">Name</th>
                                    <th className="px-3 py-2 text-left">Email</th>
                                    <th className="px-3 py-2 text-left">Phone</th>
                                    <th className="px-3 py-2 text-left">Capital Range</th>
                                    <th className="px-3 py-2 text-left">Status</th>
                                    <th className="px-3 py-2 text-left">Documents</th>
                                    <th className="px-3 py-2 text-left">Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.id} className="border-b border-border/50">
                                        <td className="px-3 py-3">
                                            <div>
                                                <p className="font-medium text-foreground">{app.name}</p>
                                                <p className="text-xs text-muted-foreground">{app.id}</p>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3">{app.email}</td>
                                        <td className="px-3 py-3">{app.phone}</td>
                                        <td className="px-3 py-3">{app.capital_range}</td>
                                        <td className="px-3 py-3">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-xs">
                                            <div className="space-y-1">
                                                <p>NOA: {yesNo(app.has_noa)}</p>
                                                <p>CBS: {yesNo(app.has_cbs_report)}</p>
                                                <p>ACRA: {yesNo(app.has_acra_record)}</p>
                                                <p>Bank: {yesNo(app.has_bank_statement)}</p>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3">{formatDate(app.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {!applications.length && (
                            <div className="text-center py-8 text-sm text-muted-foreground">
                                No capital applications found.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Rows:</span>
                        <select
                            value={limit}
                            onChange={(e) => {
                                setLimit(Number(e.target.value))
                                setPage(1)
                            }}
                            className="rounded border border-border px-2 py-1 text-sm"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => canPrev && setPage((prev) => prev - 1)}
                            disabled={!canPrev}
                            className="px-3 py-1 rounded border border-border text-sm disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span className="text-sm text-muted-foreground">
                            Page {page} / {totalPages}
                        </span>
                        <button
                            onClick={() => canNext && setPage((prev) => prev + 1)}
                            disabled={!canNext}
                            className="px-3 py-1 rounded border border-border text-sm disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
