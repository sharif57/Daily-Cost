'use client';
import { useState } from 'react'
import type { CapitalApplication } from '@/redux/feature/adminSlice'
import { useGetGuestsQuery } from '@/redux/feature/adminSlice'
import { useApproveGuestMutation, useRejectGuestMutation } from '@/redux/feature/userSlice';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export default function ConfigPage() {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [selectedApplication, setSelectedApplication] = useState<CapitalApplication | null>(null)
    const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [actionError, setActionError] = useState<string | null>(null)

    const { data, isLoading, isError, refetch } = useGetGuestsQuery({ page, limit });

    const [approveGuest, { isLoading: isApproving }] = useApproveGuestMutation();
    const [rejectGuest, { isLoading: isRejecting }] = useRejectGuestMutation();


    const applications = data?.data ?? []
    const meta = data?.meta
    const isActionLoading = isApproving || isRejecting

    const totalPages = Math.max(meta?.totalPage ?? 1, 1)
    const canPrev = page > 1
    const canNext = page < totalPages

    const openActionConfirm = (application: CapitalApplication, type: 'approve' | 'reject') => {
        setSelectedApplication(application)
        setActionType(type)
        setActionError(null)
        setIsConfirmOpen(true)
    }

    const closeActionConfirm = () => {
        if (isActionLoading) return

        setIsConfirmOpen(false)
        setSelectedApplication(null)
        setActionType(null)
        setActionError(null)
    }

    const getErrorMessage = (error: unknown) => {
        if (typeof error === 'object' && error !== null && 'data' in error) {
            const data = (error as { data?: { message?: string } }).data
            if (data?.message) return data.message
        }

        return 'Failed to update application status. Please try again.'
    }

    const handleConfirmAction = async () => {
        if (!selectedApplication || !actionType) return

        setActionError(null)

        try {
            if (actionType === 'approve') {
                await approveGuest(selectedApplication.id).unwrap()
            } else {
                await rejectGuest(selectedApplication.id).unwrap()
            }

            closeActionConfirm()
            refetch()
        } catch (error) {
            setActionError(getErrorMessage(error))
        }
    }

    const getStatusClasses = (status: string) => {
        if (status === 'APPROVED') return 'bg-emerald-50 text-emerald-700'
        if (status === 'REJECTED') return 'bg-red-50 text-red-700'
        return 'bg-blue-50 text-blue-700'
    }

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
                                    <th className="px-3 py-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => {
                                    const isSubmitted = app.status === 'SUBMITTED'

                                    return (
                                        <tr key={app.id} className="border-b border-border/50">
                                            <td className="px-3 py-3">
                                                <div>
                                                    <p className="font-medium text-foreground">{app.name}</p>
                                                    {/* <p className="text-xs text-muted-foreground">{app.id}</p> */}
                                                </div>
                                            </td>
                                            <td className="px-3 py-3">{app.email}</td>
                                            <td className="px-3 py-3">{app.phone}</td>
                                            <td className="px-3 py-3">{app.capital_range}</td>
                                            <td className="px-3 py-3">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusClasses(app.status)}`}>
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
                                            <td className="px-3 py-3">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => openActionConfirm(app, 'approve')}
                                                        disabled={!isSubmitted || isActionLoading}
                                                        className="rounded bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => openActionConfirm(app, 'reject')}
                                                        disabled={!isSubmitted || isActionLoading}
                                                        className="rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
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

            <AlertDialog
                open={isConfirmOpen}
                onOpenChange={(open) => {
                    if (open) {
                        setIsConfirmOpen(true)
                    } else {
                        closeActionConfirm()
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {actionType === 'approve' ? 'Approve Application' : 'Reject Application'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {selectedApplication
                                ? `Are you sure you want to ${actionType} ${selectedApplication.name}'s application?`
                                : 'Are you sure you want to continue?'}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {actionError && (
                        <p className="text-sm text-red-600">{actionError}</p>
                    )}

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={closeActionConfirm}
                            disabled={isActionLoading}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmAction}
                            disabled={isActionLoading}
                            className={actionType === 'reject' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}
                        >
                            {isActionLoading
                                ? 'Processing...'
                                : actionType === 'approve'
                                    ? 'Yes, Approve'
                                    : 'Yes, Reject'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
