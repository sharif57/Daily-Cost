
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
    Banknote,
    Calendar,
    CalendarDays,
    CreditCard as IdentityCard,
    FileText,
    Mail,
    Plus,
    Phone,
    RefreshCw,
    RotateCcw,
    Trash2,
    X,
    Edit,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    ECreditScore,
    FinanceProfile,
    useCreateFinanceProfileMutation,
    useDeleteDocumentMutation,
    useSingleUserQuery,
    useUpdateCreditScoreMutation,
    useUpdateDocumentMutation,
    useUpdateFinanceMutation,
    useUpdateFinanceProfileMutation,
    useUpdateProfileMutation,
} from '@/redux/feature/userSlice'

const CREDIT_SCORE_OPTIONS = [
    ECreditScore.AA, ECreditScore.BB, ECreditScore.CC,
    ECreditScore.DD, ECreditScore.EE, ECreditScore.FF,
    ECreditScore.GG, ECreditScore.HH, ECreditScore.HX, ECreditScore.GX,
]

interface FinanceFormState {
    id?: string
    bankName: string
    totalLoanAmount: string
    loanTenure: string
    monthlyRepaymentAmount: string
    loanStartDate: string
    monthlyDueDay: string
    remainingTenure: string
}

const resolveImageUrl = (imagePath?: string | null): string => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://') ||
        imagePath.startsWith('data:') || imagePath.startsWith('blob:')) return imagePath
    const imageBaseUrl = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? '').replace(/\/$/, '')
    if (!imageBaseUrl) return imagePath
    return imagePath.startsWith('/') ? `${imageBaseUrl}${imagePath}` : `${imageBaseUrl}/${imagePath}`
}

const normalizeDocuments = (documentValue?: string[] | string | null): string[] => {
    if (Array.isArray(documentValue)) return documentValue
    if (typeof documentValue === 'string' && documentValue.trim()) return [documentValue]
    return []
}

const formatRole = (role?: string): string => {
    if (!role) return 'N/A'
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
}

const formatDate = (value?: string | null): string => {
    if (!value) return 'N/A'
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    })
}

const toInputDate = (value?: string | null): string => {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return date.toISOString().slice(0, 10)
}

const formatCurrency = (value?: string | number | null): string => {
    if (value === null || value === undefined || value === '') return 'N/A'
    const amount = Number(value)
    if (Number.isNaN(amount)) return 'N/A'
    return `$${amount.toLocaleString('en-SG')}`
}

const getFinanceFormState = (financeProfile?: FinanceProfile | null): FinanceFormState => ({
    id: financeProfile?.id,
    bankName: financeProfile?.bank_name ?? '',
    totalLoanAmount: financeProfile?.total_loan_amount ?? '',
    loanTenure: financeProfile?.loan_tenure?.toString() ?? '',
    monthlyRepaymentAmount: financeProfile?.monthly_repayment_amount ?? '',
    loanStartDate: toInputDate(financeProfile?.loan_start_date),
    monthlyDueDay: toInputDate(financeProfile?.monthly_due_day as string),
    remainingTenure: financeProfile?.remaining_tenure?.toString() ?? '',
})

// Finance row icon map
const financeIcons: Record<string, React.ReactNode> = {
    'Bank Name': <Banknote className="h-4 w-4" />,
    'Total Loan Amount': <Banknote className="h-4 w-4" />,
    'Loan Tenure': <RefreshCw className="h-4 w-4" />,
    'Monthly Repayment Amount': <Banknote className="h-4 w-4" />,
    'Loan Start Date': <CalendarDays className="h-4 w-4" />,
    'Monthly Due Date': <RotateCcw className="h-4 w-4" />,
    'Remaining Tenure': <RotateCcw className="h-4 w-4" />,
}

export default function UserProfileCard() {
    const params = useParams()
    const userId = typeof params.id === 'string' ? params.id : params.id?.[0] ?? ''

    const { data, isLoading, isError } = useSingleUserQuery(userId)
    const user = data?.data

    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation()
    const [updateDocument, { isLoading: isUpdatingDocument }] = useUpdateDocumentMutation()
    const [deleteDocument, { isLoading: isDeletingDocument }] = useDeleteDocumentMutation()
    const [updateFinanceProfile, { isLoading: isUpdatingFinanceProfile }] = useUpdateFinanceProfileMutation()

    // new api
    const [createFinanceProfile, { isLoading: isCreatingFinanceProfile }] = useCreateFinanceProfileMutation();
    const [updateCreditScore, { isLoading: isUpdatingCreditScore }] = useUpdateCreditScoreMutation();
    const [updateFinance, { isLoading: isUpdatingFinance }] = useUpdateFinanceMutation();

    const [selectedCreditScore, setSelectedCreditScore] = useState<ECreditScore | ''>('')
    const [financeForm, setFinanceForm] = useState<FinanceFormState>(getFinanceFormState(null))
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
    const [selectedDocument, setSelectedDocument] = useState<File | null>(null)
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null)
    const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false)
    const [isCreateFinanceModalOpen, setIsCreateFinanceModalOpen] = useState(false)

    const profileImage = resolveImageUrl(user?.image)
    const documents = normalizeDocuments(user?.document)
    const financeProfiles = Array.isArray(user?.finance_profile)
        ? user.finance_profile
        : (user?.finance_profile ? [user.finance_profile] : [])
    const hasDocuments = documents.length > 0

    useEffect(() => {
        setSelectedCreditScore((user?.creditScore as ECreditScore | null | undefined) ?? '')
    }, [user])

    const handleDocumentFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDocument(event.target.files?.[0] ?? null)
    }

    const handleDocumentUpload = async () => {
        if (!selectedDocument || !userId) {
            toast.error('Please select a document file first.')
            return
        }
        try {
            const formData = new FormData()
            formData.append('document', selectedDocument)
            await updateDocument({ id: userId, document: formData }).unwrap()
            toast.success('Document added successfully.')
            setIsDocumentModalOpen(false)
            setSelectedDocument(null)
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to upload document.')
        }
    }

    const handleDeleteDocument = async (documentIndex: number) => {
        if (!userId) return
        try {
            setDeletingIndex(documentIndex)
            await deleteDocument({ id: userId, documentIndex }).unwrap()
            toast.success('Document deleted successfully.')
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to delete document.')
        } finally {
            setDeletingIndex(null)
        }
    }

    const handleCreditScoreChange = async (value: ECreditScore) => {
        if (!userId) return
        const previousScore = selectedCreditScore
        setSelectedCreditScore(value)
        try {
            await updateCreditScore({ id: userId, data: { creditScore: value } }).unwrap()
            toast.success('Credit score updated successfully.')
        } catch (error: any) {
            setSelectedCreditScore(previousScore)
            toast.error(error?.data?.message || 'Failed to update credit score.')
        }
    }

    const handleFinanceInputChange = (field: keyof FinanceFormState, value: string) => {
        setFinanceForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleFinanceSave = async () => {
        if (!userId || !financeForm.id) return
        try {
            const payload = {
                bank_name: financeForm.bankName,
                total_loan_amount: Number(financeForm.totalLoanAmount || 0),
                loan_tenure: Number(financeForm.loanTenure || 0),
                monthly_repayment_amount: Number(financeForm.monthlyRepaymentAmount || 0),
                loan_start_date: financeForm.loanStartDate
                    ? new Date(`${financeForm.loanStartDate}T00:00:00.000Z`).toISOString()
                    : null,
                monthly_due_day: financeForm.monthlyDueDay
                    ? new Date(`${financeForm.monthlyDueDay}T00:00:00.000Z`).toISOString()
                    : null,
                remaining_tenure: Number(financeForm.remainingTenure || 0),
            }
            await updateFinance({ id: userId, financeId: financeForm.id, data: payload }).unwrap()
            toast.success('Financial information updated successfully.')
            setIsFinanceModalOpen(false)
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update financial information.')
        }
    }

    const handleCreateFinanceSave = async () => {
        if (!userId) return
        try {
            const payload = {
                bank_name: financeForm.bankName,
                total_loan_amount: Number(financeForm.totalLoanAmount || 0),
                loan_tenure: Number(financeForm.loanTenure || 0),
                monthly_repayment_amount: Number(financeForm.monthlyRepaymentAmount || 0),
                loan_start_date: financeForm.loanStartDate
                    ? new Date(`${financeForm.loanStartDate}T00:00:00.000Z`).toISOString()
                    : null,
                monthly_due_day: financeForm.monthlyDueDay
                    ? new Date(`${financeForm.monthlyDueDay}T00:00:00.000Z`).toISOString()
                    : null,
                remaining_tenure: Number(financeForm.remainingTenure || 0),
            }
            await createFinanceProfile({ id: userId, data: payload }).unwrap()
            toast.success('Financial profile created successfully.')
            setIsCreateFinanceModalOpen(false)
            setFinanceForm(getFinanceFormState(null))
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to create financial profile.')
        }
    }

    const closeDocumentModal = () => {
        if (!isUpdatingDocument) { setIsDocumentModalOpen(false); setSelectedDocument(null) }
    }
    const closeFinanceModal = () => {
        if (!isUpdatingFinance) setIsFinanceModalOpen(false)
    }
    const closeCreateFinanceModal = () => {
        if (!isCreatingFinanceProfile) setIsCreateFinanceModalOpen(false)
    }

    const openEditModal = (profile: FinanceProfile) => {
        setFinanceForm(getFinanceFormState(profile))
        setIsFinanceModalOpen(true)
    }

    const openCreateModal = () => {
        setFinanceForm(getFinanceFormState(null))
        setIsCreateFinanceModalOpen(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">

                {/* ── LEFT CARD ── */}
                <section className="w-[500px] shrink-0 rounded-3xl border border-border bg-card p-6 shadow-sm">

                    {/* Avatar + name */}
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-3 h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 text-3xl font-bold text-white">
                            {profileImage ? (
                                <img src={profileImage} alt={user?.name ?? 'User'} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    {user?.name?.trim()?.[0]?.toUpperCase() ?? 'U'}
                                </div>
                            )}
                            <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-card bg-green-500" />
                        </div>

                        <h2 className="text-xl font-semibold text-foreground">
                            {isLoading ? 'Loading...' : user?.name ?? 'Unknown User'}
                        </h2>

                        {/* Company / org name */}
                        {user?.company && (
                            <p className="mt-0.5 text-xs text-muted-foreground">{user.company}</p>
                        )}

                        {/* Credit Score row */}
                        <div className="mt-4 flex w-full items-center justify-between rounded-2xl border border-border bg-background/60 px-4 py-3">
                            <div>
                                <p className="text-xs text-muted-foreground">Credit Score</p>
                                <p className="text-base font-semibold text-foreground">
                                    {selectedCreditScore || '—'}
                                </p>
                            </div>
                            <Select
                                value={selectedCreditScore || undefined}
                                onValueChange={(v) => handleCreditScoreChange(v as ECreditScore)}
                                disabled={isUpdatingProfile}
                            >
                                <SelectTrigger className="h-9 w-28 rounded-full border-border bg-background text-sm">
                                    <SelectValue placeholder={isUpdatingProfile ? 'Saving…' : 'Select'} />
                                </SelectTrigger>
                                <SelectContent>
                                    {CREDIT_SCORE_OPTIONS.map((score) => (
                                        <SelectItem key={score} value={score}>{score}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Role badge */}
                        <div className="mt-3 inline-flex rounded-full border border-border bg-background px-4 py-1">
                            <span className="text-xs font-medium text-foreground">{formatRole(user?.role)}</span>
                        </div>
                    </div>

                    {isError && (
                        <p className="mt-4 text-center text-sm text-red-600">Failed to load user profile.</p>
                    )}

                    {/* Account info */}
                    <div className="mt-6 space-y-4">
                        <h3 className="text-sm font-semibold text-foreground">Account Informations</h3>

                        <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
                            {[
                                { Icon: Mail, label: 'Email Address', value: user?.email },
                                { Icon: Phone, label: 'Phone Number', value: user?.phone },
                                { Icon: IdentityCard, label: 'User ID', value: user?.id },
                                { Icon: Calendar, label: 'Member Since', value: formatDate(user?.created_at) },
                            ].map(({ Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">{label}</p>
                                        <p className="break-all text-sm font-medium text-foreground">{value ?? 'N/A'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="mt-4 space-y-3 rounded-2xl border border-border bg-card p-4">
                        <p className="text-sm font-semibold text-foreground">Documents ({documents.length})</p>
                        {hasDocuments ? (
                            <div className="space-y-2">
                                {documents.map((docPath, index) => {
                                    const isDeleting = isDeletingDocument && deletingIndex === index
                                    const documentUrl = docPath.startsWith('http')
                                        ? docPath
                                        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''}${docPath}`
                                    const documentName = docPath.split('/').pop() ?? docPath
                                    return (
                                        <div
                                            key={`${docPath}-${index}`}
                                            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2"
                                        >
                                            <div className="flex min-w-0 items-center gap-2">
                                                <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                                                <a href={documentUrl} target="_blank" rel="noreferrer" title={documentName}
                                                    className="truncate text-xs font-medium text-[#090A58] hover:underline">
                                                    {documentName}
                                                </a>
                                            </div>
                                            <button type="button" onClick={() => handleDeleteDocument(index)}
                                                disabled={isDeleting}
                                                className="shrink-0 text-red-500 hover:text-red-700 disabled:opacity-50">
                                                {isDeleting ? <span className="text-xs">…</span> : <Trash2 className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className="text-xs text-muted-foreground">No documents uploaded yet.</p>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 space-y-3">
                        <Link href={`/finance/profit-loss?userId=${userId}`} className="block">
                            <Button className="w-full rounded-full bg-[#090A58] py-6 text-base font-medium text-white hover:bg-[#090A58]/90">
                                View Financial Overview
                            </Button>
                        </Link>

                        <button type="button" onClick={() => setIsDocumentModalOpen(true)} className="block w-full">
                            <Button variant="outline"
                                className="w-full rounded-full bg-[#B68F24] py-6 text-base font-medium text-white hover:bg-[#B68F24]/90">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Document
                            </Button>
                        </button>

                    </div>
                </section>

                {/* ── RIGHT CARD ── */}
                <section className="flex-1 rounded-3xl border border-border bg-card p-6 shadow-sm">
                    <div className="mb-4 flex justify-between items-center gap-3">
                        <p className="text-sm font-semibold text-foreground">Financial Information</p>
                        <Button
                            variant="outline"
                            onClick={openCreateModal}
                            className="rounded-full bg-[#090A58] text-sm font-medium text-white hover:bg-[#090A58]/90"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Loan Details
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {financeProfiles.length > 0 ? financeProfiles.map((profile, idx) => (
                            <div key={profile.id} className="overflow-hidden rounded-2xl border border-border bg-background/60">
                                <div className="flex justify-between items-center bg-muted/30 px-4 py-3 border-b border-border">
                                    <h4 className="font-semibold text-sm">Loan information {idx + 1} {profile.bank_name && `- ${profile.bank_name}`}</h4>
                                    <Button
                                        type="button"
                                        onClick={() => openEditModal(profile)}
                                        variant="outline"
                                        size="sm"
                                        className="h-8 rounded-full bg-[#B68F24] text-xs font-medium text-white hover:bg-[#B68F24]/90"
                                    >
                                        <Edit className="mr-1 h-3 w-3" />
                                        Edit
                                    </Button>
                                </div>
                                <div className="space-y-0">
                                    {[
                                        { label: 'Bank Name', value: profile.bank_name || 'N/A' },
                                        { label: 'Total Loan Amount', value: formatCurrency(profile.total_loan_amount) },
                                        { label: 'Loan Tenure', value: profile.loan_tenure ? `${profile.loan_tenure} months` : 'N/A' },
                                        { label: 'Monthly Repayment Amount', value: formatCurrency(profile.monthly_repayment_amount) },
                                        { label: 'Loan Start Date', value: formatDate(profile.loan_start_date) },
                                        { label: 'Monthly Due Date', value: formatDate(profile.monthly_due_day as string) },
                                        { label: 'Remaining Tenure', value: profile.remaining_tenure ? `${profile.remaining_tenure} Months` : 'N/A' },
                                    ].map((row, index, arr) => (
                                        <div
                                            key={row.label}
                                            className={`flex items-center justify-between gap-4 px-4 py-4 ${index !== arr.length - 1 ? 'border-b border-border' : ''
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                                    {financeIcons[row.label] || <Banknote className="h-4 w-4" />}
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground">{row.label}</p>
                                                    <p className="text-sm font-semibold text-foreground">{row.value}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )) : (
                            <p className="text-sm text-muted-foreground bg-background/60 p-4 rounded-2xl border border-border">No financial profiles found.</p>
                        )}
                    </div>
                </section>
            </div>

            {/* ── DOCUMENT MODAL ── */}
            {isDocumentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={closeDocumentModal} />
                    <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-lg">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground">Add New Document</h3>
                                <p className="text-sm text-muted-foreground">Upload a file for this user profile.</p>
                            </div>
                            <button type="button" className="text-muted-foreground hover:text-foreground" onClick={closeDocumentModal}>
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-3">
                                <Label htmlFor="document-upload">Select File</Label>
                                <Input id="document-upload" type="file"
                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                    onChange={handleDocumentFileChange} />
                                {selectedDocument && (
                                    <p className="break-all text-xs text-muted-foreground">
                                        Selected: <span className="font-medium text-foreground">{selectedDocument.name}</span>
                                    </p>
                                )}
                            </div>

                            {hasDocuments && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-foreground">Existing Documents ({documents.length})</p>
                                    <div className="max-h-48 space-y-2 overflow-y-auto">
                                        {documents.map((docPath, index) => {
                                            const isDeleting = isDeletingDocument && deletingIndex === index
                                            const documentUrl = docPath.startsWith('http')
                                                ? docPath : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''}${docPath}`
                                            const documentName = docPath.split('/').pop() ?? docPath
                                            return (
                                                <div key={`${docPath}-${index}-modal`}
                                                    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2">
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                                                        <a href={documentUrl} target="_blank" rel="noreferrer" title={documentName}
                                                            className="truncate text-xs font-medium text-[#090A58] hover:underline">
                                                            {documentName}
                                                        </a>
                                                    </div>
                                                    <button type="button" onClick={() => handleDeleteDocument(index)}
                                                        disabled={isDeleting}
                                                        className="shrink-0 text-red-500 hover:text-red-700 disabled:opacity-50">
                                                        {isDeleting
                                                            ? <span className="text-xs text-muted-foreground">Deleting…</span>
                                                            : <Trash2 className="h-4 w-4" />}
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="outline" onClick={closeDocumentModal} disabled={isUpdatingDocument} className="rounded-full">
                                Cancel
                            </Button>
                            <Button onClick={handleDocumentUpload} disabled={!selectedDocument || isUpdatingDocument}
                                className="rounded-full bg-[#090A58] text-white hover:bg-[#090A58]/90">
                                {isUpdatingDocument ? 'Uploading…' : 'Upload Document'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── EDIT FINANCE MODAL ── */}
            {isFinanceModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={closeFinanceModal} />
                    <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-lg">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground">Edit Financial Information</h3>
                                <p className="text-sm text-muted-foreground">Update the loan details shown on the profile.</p>
                            </div>
                            <button type="button" className="text-muted-foreground hover:text-foreground" onClick={closeFinanceModal}>
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {[
                                { id: 'bankName', label: 'Bank Name', type: 'text', min: '' },
                                { id: 'totalLoanAmount', label: 'Total Loan Amount', type: 'number', min: '0' },
                                { id: 'loanTenure', label: 'Loan Tenure (months)', type: 'number', min: '0' },
                                { id: 'monthlyRepaymentAmount', label: 'Monthly Repayment Amount', type: 'number', min: '0' },
                                { id: 'loanStartDate', label: 'Loan Start Date', type: 'date', min: '' },
                                { id: 'monthlyDueDay', label: 'Monthly Due Date', type: 'date', min: '' },
                                { id: 'remainingTenure', label: 'Remaining Tenure (months)', type: 'number', min: '0' },
                            ].map(({ id, label, type, min }) => (
                                <div key={id} className="space-y-2">
                                    <Label htmlFor={id}>{label}</Label>
                                    <Input
                                        id={id}
                                        type={type}
                                        min={min}
                                        value={financeForm[id as keyof FinanceFormState]}
                                        onChange={(e) => handleFinanceInputChange(id as keyof FinanceFormState, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="outline" onClick={closeFinanceModal} disabled={isUpdatingFinance} className="rounded-full">
                                Cancel
                            </Button>
                            <Button onClick={handleFinanceSave} disabled={isUpdatingFinance}
                                className="rounded-full bg-[#090A58] text-white hover:bg-[#090A58]/90">
                                {isUpdatingFinance ? 'Saving…' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── CREATE FINANCE MODAL ── */}
            {isCreateFinanceModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={closeCreateFinanceModal} />
                    <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-lg">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-foreground">Create Financial Profile</h3>
                                <p className="text-sm text-muted-foreground">Add new loan details to the user profile.</p>
                            </div>
                            <button type="button" className="text-muted-foreground hover:text-foreground" onClick={closeCreateFinanceModal}>
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {[
                                { id: 'bankName', label: 'Bank Name', type: 'text', min: '' },
                                { id: 'totalLoanAmount', label: 'Total Loan Amount', type: 'number', min: '0' },
                                { id: 'loanTenure', label: 'Loan Tenure (months)', type: 'number', min: '0' },
                                { id: 'monthlyRepaymentAmount', label: 'Monthly Repayment Amount', type: 'number', min: '0' },
                                { id: 'loanStartDate', label: 'Loan Start Date', type: 'date', min: '' },
                                { id: 'monthlyDueDay', label: 'Monthly Due Date', type: 'date', min: '' },
                                { id: 'remainingTenure', label: 'Remaining Tenure (months)', type: 'number', min: '0' },
                            ].map(({ id, label, type, min }) => (
                                <div key={id} className="space-y-2">
                                    <Label htmlFor={`create-${id}`}>{label}</Label>
                                    <Input
                                        id={`create-${id}`}
                                        type={type}
                                        min={min}
                                        value={financeForm[id as keyof FinanceFormState]}
                                        onChange={(e) => handleFinanceInputChange(id as keyof FinanceFormState, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="outline" onClick={closeCreateFinanceModal} disabled={isCreatingFinanceProfile} className="rounded-full">
                                Cancel
                            </Button>
                            <Button onClick={handleCreateFinanceSave} disabled={isCreatingFinanceProfile}
                                className="rounded-full bg-[#090A58] text-white hover:bg-[#090A58]/90">
                                {isCreatingFinanceProfile ? 'Creating…' : 'Create Profile'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}