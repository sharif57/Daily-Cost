// 'use client'

// import Link from 'next/link'
// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import {
//     Banknote,
//     Calendar,
//     CreditCard as IdentityCard,
//     FileText,
//     Mail,
//     Plus,
//     Phone,
//     Settings2,
//     Trash2,
//     X,
// } from 'lucide-react'
// import { toast } from 'sonner'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from '@/components/ui/select'
// import {
//     ECreditScore,
//     FinanceProfile,
//     useDeleteDocumentMutation,
//     useSingleUserQuery,
//     useUpdateDocumentMutation,
//     useUpdateFinanceProfileMutation,
//     useUpdateProfileMutation,
// } from '@/redux/feature/userSlice'

// const CREDIT_SCORE_OPTIONS = [
//     ECreditScore.AA,
//     ECreditScore.BB,
//     ECreditScore.CC,
//     ECreditScore.DD,
//     ECreditScore.EE,
//     ECreditScore.FF,
//     ECreditScore.GG,
//     ECreditScore.HH,
//     ECreditScore.HX,
//     ECreditScore.GX,
// ]

// interface FinanceFormState {
//     totalLoanAmount: string
//     loanTenure: string
//     monthlyRepaymentAmount: string
//     loanStartDate: string
//     monthlyDueDay: string
//     remainingTenure: string
// }

// const resolveImageUrl = (imagePath?: string | null): string => {
//     if (!imagePath) {
//         return ''
//     }

//     if (
//         imagePath.startsWith('http://') ||
//         imagePath.startsWith('https://') ||
//         imagePath.startsWith('data:') ||
//         imagePath.startsWith('blob:')
//     ) {
//         return imagePath
//     }

//     const imageBaseUrl = (process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? '').replace(/\/$/, '')
//     if (!imageBaseUrl) {
//         return imagePath
//     }

//     return imagePath.startsWith('/') ? `${imageBaseUrl}${imagePath}` : `${imageBaseUrl}/${imagePath}`
// }

// const normalizeDocuments = (documentValue?: string[] | string | null): string[] => {
//     if (Array.isArray(documentValue)) {
//         return documentValue
//     }

//     if (typeof documentValue === 'string' && documentValue.trim()) {
//         return [documentValue]
//     }

//     return []
// }

// const formatRole = (role?: string): string => {
//     if (!role) {
//         return 'N/A'
//     }

//     return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
// }

// const formatDate = (value?: string | null): string => {
//     if (!value) {
//         return 'N/A'
//     }

//     const date = new Date(value)
//     return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString()
// }

// const toInputDate = (value?: string | null): string => {
//     if (!value) {
//         return ''
//     }

//     const date = new Date(value)
//     if (Number.isNaN(date.getTime())) {
//         return ''
//     }

//     return date.toISOString().slice(0, 10)
// }

// const formatCurrency = (value?: string | number | null): string => {
//     if (value === null || value === undefined || value === '') {
//         return 'N/A'
//     }

//     const amount = Number(value)
//     if (Number.isNaN(amount)) {
//         return 'N/A'
//     }

//     return `S$${amount.toLocaleString('en-SG')}`
// }

// const formatCount = (value?: string | number | null): string => {
//     if (value === null || value === undefined || value === '') {
//         return 'N/A'
//     }

//     const amount = Number(value)
//     if (Number.isNaN(amount)) {
//         return 'N/A'
//     }

//     return `${amount}`
// }

// const getFinanceFormState = (financeProfile?: FinanceProfile | null): FinanceFormState => ({
//     totalLoanAmount: financeProfile?.total_loan_amount ?? '',
//     loanTenure: financeProfile?.loan_tenure?.toString() ?? '',
//     monthlyRepaymentAmount: financeProfile?.monthly_repayment_amount ?? '',
//     loanStartDate: toInputDate(financeProfile?.loan_start_date),
//     monthlyDueDay: financeProfile?.monthly_due_day?.toString() ?? '',
//     remainingTenure: financeProfile?.remaining_tenure?.toString() ?? '',
// })

// export default function UserProfileCard() {
//     const params = useParams()
//     const userId = typeof params.id === 'string' ? params.id : params.id?.[0] ?? ''

//     const { data, isLoading, isError } = useSingleUserQuery(userId)
//     const user = data?.data

//     const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation()
//     const [updateDocument, { isLoading: isUpdatingDocument }] = useUpdateDocumentMutation()
//     const [deleteDocument, { isLoading: isDeletingDocument }] = useDeleteDocumentMutation()
//     const [updateFinanceProfile, { isLoading: isUpdatingFinanceProfile }] = useUpdateFinanceProfileMutation()

//     const [selectedCreditScore, setSelectedCreditScore] = useState<ECreditScore | ''>('')
//     const [financeForm, setFinanceForm] = useState<FinanceFormState>(getFinanceFormState(null))
//     const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
//     const [selectedDocument, setSelectedDocument] = useState<File | null>(null)
//     const [deletingIndex, setDeletingIndex] = useState<number | null>(null)
//     const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false)

//     const profileImage = resolveImageUrl(user?.image)
//     const documents = normalizeDocuments(user?.document)
//     const financeProfile = user?.finance_profile ?? null
//     const hasDocuments = documents.length > 0

//     useEffect(() => {
//         setSelectedCreditScore((user?.creditScore as ECreditScore | null | undefined) ?? '')
//         setFinanceForm(getFinanceFormState(financeProfile))
//     }, [user, financeProfile])

//     const handleDocumentFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0] ?? null
//         setSelectedDocument(file)
//     }

//     const handleDocumentUpload = async () => {
//         if (!selectedDocument || !userId) {
//             toast.error('Please select a document file first.')
//             return
//         }

//         try {
//             const formData = new FormData()
//             formData.append('document', selectedDocument)

//             await updateDocument({
//                 id: userId,
//                 document: formData,
//             }).unwrap()

//             toast.success('Document added successfully.')
//             setIsDocumentModalOpen(false)
//             setSelectedDocument(null)
//         } catch (error: any) {
//             toast.error(error?.data?.message || 'Failed to upload document. Please try again.')
//         }
//     }

//     const handleDeleteDocument = async (documentIndex: number) => {
//         if (!userId) {
//             return
//         }

//         try {
//             setDeletingIndex(documentIndex)
//             await deleteDocument({
//                 id: userId,
//                 documentIndex,
//             }).unwrap()

//             toast.success('Document deleted successfully.')
//         } catch (error: any) {
//             toast.error(error?.data?.message || 'Failed to delete document. Please try again.')
//         } finally {
//             setDeletingIndex(null)
//         }
//     }

//     const handleCreditScoreChange = async (value: ECreditScore) => {
//         if (!userId) {
//             return
//         }

//         const previousScore = selectedCreditScore
//         setSelectedCreditScore(value)

//         try {
//             const formData = new FormData()
//             formData.append('creditScore', value)
//             await updateProfile(formData).unwrap()
//             toast.success('Credit score updated successfully.')
//         } catch (error: any) {
//             setSelectedCreditScore(previousScore)
//             toast.error(error?.data?.message || 'Failed to update credit score. Please try again.')
//         }
//     }

//     const handleFinanceInputChange = (field: keyof FinanceFormState, value: string) => {
//         setFinanceForm((previous) => ({
//             ...previous,
//             [field]: value,
//         }))
//     }

//     const handleFinanceSave = async () => {
//         if (!userId) {
//             return
//         }

//         try {
//             const payload = {
//                 total_loan_amount: Number(financeForm.totalLoanAmount || 0),
//                 loan_tenure: Number(financeForm.loanTenure || 0),
//                 monthly_repayment_amount: Number(financeForm.monthlyRepaymentAmount || 0),
//                 loan_start_date: financeForm.loanStartDate
//                     ? new Date(`${financeForm.loanStartDate}T00:00:00.000Z`).toISOString()
//                     : null,
//                 monthly_due_day: Number(financeForm.monthlyDueDay || 0),
//                 remaining_tenure: Number(financeForm.remainingTenure || 0),
//             }

//             await updateFinanceProfile({
//                 id: userId,
//                 data: payload,
//             }).unwrap()

//             toast.success('Financial information updated successfully.')
//             setIsFinanceModalOpen(false)
//         } catch (error: any) {
//             toast.error(error?.data?.message || 'Failed to update financial information. Please try again.')
//         }
//     }

//     const closeDocumentModal = () => {
//         if (!isUpdatingDocument) {
//             setIsDocumentModalOpen(false)
//             setSelectedDocument(null)
//         }
//     }

//     const closeFinanceModal = () => {
//         if (!isUpdatingFinanceProfile) {
//             setIsFinanceModalOpen(false)
//         }
//     }

//     const financeRows = [
//         {
//             label: 'Total Loan Amount',
//             value: formatCurrency(financeProfile?.total_loan_amount),
//             action: 'Edit',
//         },
//         {
//             label: 'Loan Tenure',
//             value: financeProfile?.loan_tenure ? `${financeProfile.loan_tenure} months` : 'N/A',
//             action: 'Edit',
//         },
//         {
//             label: 'Monthly Repayment Amount',
//             value: formatCurrency(financeProfile?.monthly_repayment_amount),
//             action: 'Edit',
//         },
//         {
//             label: 'Loan Start Date',
//             value: formatDate(financeProfile?.loan_start_date),
//             action: 'Select',
//         },
//         {
//             label: 'Monthly Due Date',
//             value: financeProfile?.monthly_due_day ? `${financeProfile.monthly_due_day}th of each month` : 'N/A',
//             action: 'Select',
//         },
//         {
//             label: 'Remaining Tenure',
//             value: financeProfile?.remaining_tenure ? `${financeProfile.remaining_tenure} months` : 'N/A',
//             action: 'Edit',
//         },
//     ]

//     return (
//         <div className="space-y-6">
//             <div className="flex items-start justify-between gap-4">
//                 <div className="grid gap-6 ">
//                     <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
//                         <div className="flex flex-col items-center text-center">
//                             <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 text-3xl font-bold text-white">
//                                 {profileImage ? (
//                                     <img
//                                         src={profileImage}
//                                         alt={user?.name ?? 'User avatar'}
//                                         className="h-full w-full object-cover"
//                                     />
//                                 ) : (
//                                     <div className="flex h-full w-full items-center justify-center">
//                                         {user?.name?.trim()?.[0]?.toUpperCase() ?? 'U'}
//                                     </div>
//                                 )}
//                                 <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-card bg-green-500" />
//                             </div>

//                             <h2 className="text-2xl font-semibold text-foreground">
//                                 {isLoading ? 'Loading...' : user?.name ?? 'Unknown User'}
//                             </h2>
//                             <p className="mt-1 text-sm text-muted-foreground">{user?.email ?? 'N/A'}</p>
//                             <div className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1">
//                                 <span className="text-xs font-semibold text-primary">{formatRole(user?.role)}</span>
//                             </div>
//                         </div>

//                         {isError && (
//                             <p className="mt-4 text-center text-sm text-red-600">Failed to load user profile.</p>
//                         )}

//                         <div className="mt-6 rounded-2xl border border-border bg-background/60 p-4">
//                             <div className="flex items-center justify-between gap-3">
//                                 <div>
//                                     <p className="text-xs uppercase tracking-wide text-muted-foreground">Credit Score</p>
//                                     <p className="text-lg font-semibold text-foreground">
//                                         {selectedCreditScore || 'Select'}
//                                     </p>
//                                 </div>
//                                 <Select
//                                     value={selectedCreditScore || undefined}
//                                     onValueChange={(value) => handleCreditScoreChange(value as ECreditScore)}
//                                     disabled={isUpdatingProfile}
//                                 >
//                                     <SelectTrigger className="h-10 w-36 rounded-full border-border bg-background">
//                                         <SelectValue placeholder={isUpdatingProfile ? 'Saving...' : 'Select'} />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         {CREDIT_SCORE_OPTIONS.map((score) => (
//                                             <SelectItem key={score} value={score}>
//                                                 {score}
//                                             </SelectItem>
//                                         ))}
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </div>

//                         <div className="mt-6 space-y-4">
//                             <h3 className="text-sm font-semibold text-foreground">Account Information</h3>

//                             <div className="space-y-4 rounded-2xl border border-border bg-card p-4">
//                                 <div className="flex items-start gap-3">
//                                     <Mail className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
//                                     <div>
//                                         <p className="text-xs text-muted-foreground">Email Address</p>
//                                         <p className="text-sm font-medium text-foreground">{user?.email ?? 'N/A'}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Phone className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
//                                     <div>
//                                         <p className="text-xs text-muted-foreground">Phone Number</p>
//                                         <p className="text-sm font-medium text-foreground">{user?.phone ?? 'N/A'}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <IdentityCard className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
//                                     <div>
//                                         <p className="text-xs text-muted-foreground">User ID</p>
//                                         <p className="break-all text-sm font-medium text-foreground">{user?.id ?? 'N/A'}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
//                                     <div>
//                                         <p className="text-xs text-muted-foreground">Member Since</p>
//                                         <p className="text-sm font-medium text-foreground">{formatDate(user?.created_at)}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <div className="mt-0.5 h-5 w-5 shrink-0" />
//                                     <div>
//                                         <p className="text-xs text-muted-foreground">Online Status</p>
//                                         <p className={`text-sm font-medium ${user?.online ? 'text-green-600' : 'text-gray-500'}`}>
//                                             {user?.online ? 'Active' : 'Inactive'}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
//                                 <p className="text-sm font-semibold text-foreground">Documents ({documents.length})</p>
//                                 {hasDocuments ? (
//                                     <div className="space-y-2">
//                                         {documents.map((docPath, index) => {
//                                             const isDeleting = isDeletingDocument && deletingIndex === index
//                                             const documentUrl = docPath.startsWith('http')
//                                                 ? docPath
//                                                 : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''}${docPath}`
//                                             const documentName = docPath.split('/').pop() ?? docPath

//                                             return (
//                                                 <div
//                                                     key={`${docPath}-${index}`}
//                                                     className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2"
//                                                 >
//                                                     <div className="flex min-w-0 items-center gap-2">
//                                                         <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
//                                                         <a
//                                                             href={documentUrl}
//                                                             target="_blank"
//                                                             rel="noreferrer"
//                                                             title={documentName}
//                                                             className="truncate text-xs font-medium text-[#090A58] hover:underline"
//                                                         >
//                                                             {documentName}
//                                                         </a>
//                                                     </div>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleDeleteDocument(index)}
//                                                         disabled={isDeleting}
//                                                         className="shrink-0 text-red-500 transition-colors hover:text-red-700 disabled:opacity-50"
//                                                         title="Delete document"
//                                                     >
//                                                         {isDeleting ? (
//                                                             <span className="text-xs">...</span>
//                                                         ) : (
//                                                             <Trash2 className="h-4 w-4" />
//                                                         )}
//                                                     </button>
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 ) : (
//                                     <p className="text-xs text-muted-foreground">No documents uploaded yet.</p>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="mt-6 space-y-3">
//                             <Link href={`/finance/profit-loss?userId=${userId}`} className="block">
//                                 <Button
//                                     variant="outline"
//                                     className="w-full rounded-full bg-[#090A58] p-6 text-[16px] font-medium text-white hover:bg-[#090A58]/90"
//                                 >
//                                     Profit & Loss Overview
//                                 </Button>
//                             </Link>

//                             <button type="button" onClick={() => setIsDocumentModalOpen(true)} className="block w-full">
//                                 <Button
//                                     variant="outline"
//                                     className="w-full rounded-full bg-[#B68F24] p-6 text-[16px] font-medium text-white hover:bg-[#B68F24]/90"
//                                 >
//                                     <Plus className="mr-2 h-4 w-4" />
//                                     Add Document
//                                 </Button>
//                             </button>
//                         </div>
//                     </section>
//                 </div>
//                 <section className="rounded-3xl border border-border bg-card p-6 w-full shadow-sm">
//                     <div className="flex items-center justify-between gap-3">
//                         <div>
//                             <p className="text-sm text-muted-foreground">Financial Information</p>
//                             <h3 className="text-xl font-semibold text-foreground">Loan profile</h3>
//                         </div>
//                         <button
//                             type="button"
//                             onClick={() => setIsFinanceModalOpen(true)}
//                             className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-[#B68F24] transition-colors hover:bg-[#B68F24]/10"
//                         >
//                             <Settings2 className="h-4 w-4" />
//                             Edit
//                         </button>
//                     </div>

//                     <div className="mt-6 space-y-0 overflow-hidden rounded-2xl border border-border bg-background/60">
//                         {financeRows.map((row, index) => (
//                             <div
//                                 key={row.label}
//                                 className={`flex items-center justify-between gap-4 px-4 py-4 ${index !== financeRows.length - 1 ? 'border-b border-border' : ''
//                                     }`}
//                             >
//                                 <div className="flex items-start gap-3">
//                                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
//                                         <Banknote className="h-4 w-4" />
//                                     </div>
//                                     <div>
//                                         <p className="text-xs text-muted-foreground">{row.label}</p>
//                                         <p className="text-sm font-medium text-foreground">{row.value}</p>
//                                     </div>
//                                 </div>

//                                 <button
//                                     type="button"
//                                     onClick={() => setIsFinanceModalOpen(true)}
//                                     className="shrink-0 text-sm font-semibold text-[#B68F24] transition-colors hover:text-[#977316]"
//                                 >
//                                     {row.action}
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </section>
//             </div>
//             {isDocumentModalOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//                     <div className="absolute inset-0 bg-black/50" onClick={closeDocumentModal} />

//                     <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-lg">
//                         <div className="mb-6 flex items-center justify-between gap-4">
//                             <div>
//                                 <h3 className="text-xl font-semibold text-foreground">Add New Document</h3>
//                                 <p className="text-sm text-muted-foreground">Upload a file for this user profile.</p>
//                             </div>
//                             <button type="button" className="text-muted-foreground hover:text-foreground" onClick={closeDocumentModal}>
//                                 <X className="h-5 w-5" />
//                             </button>
//                         </div>

//                         <div className="space-y-4">
//                             <div className="space-y-3">
//                                 <Label htmlFor="document-upload">Select File</Label>
//                                 <Input
//                                     id="document-upload"
//                                     type="file"
//                                     accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
//                                     onChange={handleDocumentFileChange}
//                                 />
//                                 {selectedDocument && (
//                                     <p className="break-all text-xs text-muted-foreground">
//                                         Selected: <span className="font-medium text-foreground">{selectedDocument.name}</span>
//                                     </p>
//                                 )}
//                             </div>

//                             {hasDocuments && (
//                                 <div className="space-y-2">
//                                     <p className="text-sm font-medium text-foreground">Existing Documents ({documents.length})</p>
//                                     <div className="max-h-48 space-y-2 overflow-y-auto">
//                                         {documents.map((docPath, index) => {
//                                             const isDeleting = isDeletingDocument && deletingIndex === index
//                                             const documentUrl = docPath.startsWith('http')
//                                                 ? docPath
//                                                 : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''}${docPath}`
//                                             const documentName = docPath.split('/').pop() ?? docPath

//                                             return (
//                                                 <div
//                                                     key={`${docPath}-${index}-modal`}
//                                                     className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2"
//                                                 >
//                                                     <div className="flex min-w-0 items-center gap-2">
//                                                         <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
//                                                         <a
//                                                             href={documentUrl}
//                                                             target="_blank"
//                                                             rel="noreferrer"
//                                                             className="truncate text-xs font-medium text-[#090A58] hover:underline"
//                                                             title={documentName}
//                                                         >
//                                                             {documentName}
//                                                         </a>
//                                                     </div>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleDeleteDocument(index)}
//                                                         disabled={isDeleting}
//                                                         className="shrink-0 text-red-500 transition-colors hover:text-red-700 disabled:opacity-50"
//                                                         title="Delete document"
//                                                     >
//                                                         {isDeleting ? (
//                                                             <span className="text-xs text-muted-foreground">Deleting...</span>
//                                                         ) : (
//                                                             <Trash2 className="h-4 w-4" />
//                                                         )}
//                                                     </button>
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="mt-6 flex justify-end gap-3">
//                             <Button variant="outline" onClick={closeDocumentModal} disabled={isUpdatingDocument} className="rounded-full">
//                                 Cancel
//                             </Button>
//                             <Button
//                                 onClick={handleDocumentUpload}
//                                 disabled={!selectedDocument || isUpdatingDocument}
//                                 className="rounded-full bg-[#090A58] text-white hover:bg-[#090A58]/90"
//                             >
//                                 {isUpdatingDocument ? 'Uploading...' : 'Upload Document'}
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {isFinanceModalOpen && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//                     <div className="absolute inset-0 bg-black/50" onClick={closeFinanceModal} />

//                     <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-border bg-card p-6 shadow-lg">
//                         <div className="mb-6 flex items-center justify-between gap-4">
//                             <div>
//                                 <h3 className="text-xl font-semibold text-foreground">Edit Financial Information</h3>
//                                 <p className="text-sm text-muted-foreground">Update the loan details shown on the profile.</p>
//                             </div>
//                             <button type="button" className="text-muted-foreground hover:text-foreground" onClick={closeFinanceModal}>
//                                 <X className="h-5 w-5" />
//                             </button>
//                         </div>

//                         <div className="grid gap-4 md:grid-cols-2">
//                             <div className="space-y-2">
//                                 <Label htmlFor="totalLoanAmount">Total Loan Amount</Label>
//                                 <Input
//                                     id="totalLoanAmount"
//                                     type="number"
//                                     min="0"
//                                     value={financeForm.totalLoanAmount}
//                                     onChange={(event) => handleFinanceInputChange('totalLoanAmount', event.target.value)}
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="loanTenure">Loan Tenure</Label>
//                                 <Input
//                                     id="loanTenure"
//                                     type="number"
//                                     min="0"
//                                     value={financeForm.loanTenure}
//                                     onChange={(event) => handleFinanceInputChange('loanTenure', event.target.value)}
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="monthlyRepaymentAmount">Monthly Repayment Amount</Label>
//                                 <Input
//                                     id="monthlyRepaymentAmount"
//                                     type="number"
//                                     min="0"
//                                     value={financeForm.monthlyRepaymentAmount}
//                                     onChange={(event) => handleFinanceInputChange('monthlyRepaymentAmount', event.target.value)}
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="loanStartDate">Loan Start Date</Label>
//                                 <Input
//                                     id="loanStartDate"
//                                     type="date"
//                                     value={financeForm.loanStartDate}
//                                     onChange={(event) => handleFinanceInputChange('loanStartDate', event.target.value)}
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="monthlyDueDay">Monthly Due Day</Label>
//                                 <Input
//                                     id="monthlyDueDay"
//                                     type="number"
//                                     min="1"
//                                     max="31"
//                                     value={financeForm.monthlyDueDay}
//                                     onChange={(event) => handleFinanceInputChange('monthlyDueDay', event.target.value)}
//                                 />
//                             </div>

//                             <div className="space-y-2">
//                                 <Label htmlFor="remainingTenure">Remaining Tenure</Label>
//                                 <Input
//                                     id="remainingTenure"
//                                     type="number"
//                                     min="0"
//                                     value={financeForm.remainingTenure}
//                                     onChange={(event) => handleFinanceInputChange('remainingTenure', event.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         <div className="mt-6 flex justify-end gap-3">
//                             <Button variant="outline" onClick={closeFinanceModal} disabled={isUpdatingFinanceProfile} className="rounded-full">
//                                 Cancel
//                             </Button>
//                             <Button
//                                 onClick={handleFinanceSave}
//                                 disabled={isUpdatingFinanceProfile}
//                                 className="rounded-full bg-[#090A58] text-white hover:bg-[#090A58]/90"
//                             >
//                                 {isUpdatingFinanceProfile ? 'Saving...' : 'Save Changes'}
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
    Banknote,
    Calendar,
    CalendarDays,
    ChevronDown,
    CreditCard as IdentityCard,
    FileText,
    Mail,
    Plus,
    Phone,
    RefreshCw,
    RotateCcw,
    Settings2,
    Trash2,
    X,
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
    useDeleteDocumentMutation,
    useSingleUserQuery,
    useUpdateDocumentMutation,
    useUpdateFinanceProfileMutation,
    useUpdateProfileMutation,
} from '@/redux/feature/userSlice'

const CREDIT_SCORE_OPTIONS = [
    ECreditScore.AA, ECreditScore.BB, ECreditScore.CC,
    ECreditScore.DD, ECreditScore.EE, ECreditScore.FF,
    ECreditScore.GG, ECreditScore.HH, ECreditScore.HX, ECreditScore.GX,
]

interface FinanceFormState {
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
    totalLoanAmount: financeProfile?.total_loan_amount ?? '',
    loanTenure: financeProfile?.loan_tenure?.toString() ?? '',
    monthlyRepaymentAmount: financeProfile?.monthly_repayment_amount ?? '',
    loanStartDate: toInputDate(financeProfile?.loan_start_date),
    monthlyDueDay: financeProfile?.monthly_due_day?.toString() ?? '',
    remainingTenure: financeProfile?.remaining_tenure?.toString() ?? '',
})

// Finance row icon map
const financeIcons: Record<string, React.ReactNode> = {
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

    const [selectedCreditScore, setSelectedCreditScore] = useState<ECreditScore | ''>('')
    const [financeForm, setFinanceForm] = useState<FinanceFormState>(getFinanceFormState(null))
    const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
    const [selectedDocument, setSelectedDocument] = useState<File | null>(null)
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null)
    const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false)

    const profileImage = resolveImageUrl(user?.image)
    const documents = normalizeDocuments(user?.document)
    const financeProfile = user?.finance_profile ?? null
    const hasDocuments = documents.length > 0

    useEffect(() => {
        setSelectedCreditScore((user?.creditScore as ECreditScore | null | undefined) ?? '')
        setFinanceForm(getFinanceFormState(financeProfile))
    }, [user, financeProfile])

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
            const formData = new FormData()
            formData.append('creditScore', value)
            await updateFinanceProfile({ id: userId, data: formData }).unwrap()
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
        if (!userId) return
        try {
            const payload = {
                total_loan_amount: Number(financeForm.totalLoanAmount || 0),
                loan_tenure: Number(financeForm.loanTenure || 0),
                monthly_repayment_amount: Number(financeForm.monthlyRepaymentAmount || 0),
                loan_start_date: financeForm.loanStartDate
                    ? new Date(`${financeForm.loanStartDate}T00:00:00.000Z`).toISOString()
                    : null,
                monthly_due_day: Number(financeForm.monthlyDueDay || 0),
                remaining_tenure: Number(financeForm.remainingTenure || 0),
            }
            await updateFinanceProfile({ id: userId, data: payload }).unwrap()
            toast.success('Financial information updated successfully.')
            setIsFinanceModalOpen(false)
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to update financial information.')
        }
    }

    const closeDocumentModal = () => {
        if (!isUpdatingDocument) { setIsDocumentModalOpen(false); setSelectedDocument(null) }
    }
    const closeFinanceModal = () => {
        if (!isUpdatingFinanceProfile) setIsFinanceModalOpen(false)
    }

    const financeRows = [
        { label: 'Total Loan Amount', value: formatCurrency(financeProfile?.total_loan_amount), action: 'Edit' },
        { label: 'Loan Tenure', value: financeProfile?.loan_tenure ? `${financeProfile.loan_tenure} months` : 'N/A', action: 'Edit' },
        { label: 'Monthly Repayment Amount', value: formatCurrency(financeProfile?.monthly_repayment_amount), action: 'Edit' },
        { label: 'Loan Start Date', value: formatDate(financeProfile?.loan_start_date), action: 'Select' },
        { label: 'Monthly Due Date', value: financeProfile?.monthly_due_day ? `${financeProfile.monthly_due_day}th date of each month` : 'N/A', action: 'Select' },
        { label: 'Remaining Tenure', value: financeProfile?.remaining_tenure ? `${financeProfile.remaining_tenure} Months` : 'N/A', action: 'Edit' },
    ]

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
                    <div className="mb-2">
                        <p className="text-sm text-muted-foreground">Financial Information</p>
                    </div>

                    <div className="space-y-0 overflow-hidden rounded-2xl border border-border bg-background/60">
                        {financeRows.map((row, index) => (
                            <div
                                key={row.label}
                                className={`flex items-center justify-between gap-4 px-4 py-4 ${index !== financeRows.length - 1 ? 'border-b border-border' : ''
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                        {financeIcons[row.label]}
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">{row.label}</p>
                                        <p className="text-sm font-semibold text-foreground">{row.value}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsFinanceModalOpen(true)}
                                    className="shrink-0 text-sm font-semibold text-[#B68F24] hover:text-[#977316]"
                                >
                                    {row.action}
                                </button>
                            </div>
                        ))}
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

            {/* ── FINANCE MODAL ── */}
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
                                { id: 'totalLoanAmount', label: 'Total Loan Amount', type: 'number', min: '0' },
                                { id: 'loanTenure', label: 'Loan Tenure (months)', type: 'number', min: '0' },
                                { id: 'monthlyRepaymentAmount', label: 'Monthly Repayment Amount', type: 'number', min: '0' },
                                { id: 'loanStartDate', label: 'Loan Start Date', type: 'date', min: '' },
                                { id: 'monthlyDueDay', label: 'Monthly Due Day', type: 'number', min: '1', max: '31' },
                                { id: 'remainingTenure', label: 'Remaining Tenure (months)', type: 'number', min: '0' },
                            ].map(({ id, label, type, min, max }) => (
                                <div key={id} className="space-y-2">
                                    <Label htmlFor={id}>{label}</Label>
                                    <Input
                                        id={id}
                                        type={type}
                                        min={min}
                                        max={max}
                                        value={financeForm[id as keyof FinanceFormState]}
                                        onChange={(e) => handleFinanceInputChange(id as keyof FinanceFormState, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="outline" onClick={closeFinanceModal} disabled={isUpdatingFinanceProfile} className="rounded-full">
                                Cancel
                            </Button>
                            <Button onClick={handleFinanceSave} disabled={isUpdatingFinanceProfile}
                                className="rounded-full bg-[#090A58] text-white hover:bg-[#090A58]/90">
                                {isUpdatingFinanceProfile ? 'Saving…' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}