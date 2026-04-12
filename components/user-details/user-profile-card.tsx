'use client'

import Link from 'next/link'
import { Mail, Phone, CreditCard as IdentityCard, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSingleUserQuery, useUpdateDocumentMutation } from '@/redux/feature/userSlice'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const getInitials = (name?: string): string => {
  if (!name) return 'U'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

const formatRole = (role?: string): string => {
  if (!role) return 'N/A'
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
}

const formatDate = (value?: string): string => {
  if (!value) return 'N/A'
  return new Date(value).toLocaleDateString()
}

export default function UserProfileCard() {
  const params = useParams()
  const userId = typeof params.id === 'string' ? params.id : params.id?.[0] ?? ''
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null)

  const { data, isLoading, isError } = useSingleUserQuery(userId)
  const user = data?.data
  const [updateDocument, { isLoading: isUpdatingDocument }] = useUpdateDocumentMutation()

  const IMAGE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL
  const API_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''
  const profileImage = user?.image
    ? user.image.startsWith('http')
      ? user.image
      : `${IMAGE ?? ''}${user.image}`
    : ''

  const documentPath = user?.document ?? ''
  const hasDocument = documentPath.trim().length > 0
  const documentUrl = hasDocument
    ? documentPath.startsWith('http')
      ? documentPath
      : `${API_BASE}${documentPath}`
    : ''
  const isPdfDocument = documentPath.toLowerCase().endsWith('.pdf')

  const handleDocumentFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setSelectedDocument(file)
  }

  const handleDocumentUpdate = async () => {
    if (!selectedDocument || !userId) {
      toast.error('Please select a document file first.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('document', selectedDocument)

      await updateDocument({
        id: userId,
        document: formData,
      }).unwrap()

      toast.success(hasDocument ? 'Document updated successfully.' : 'Document added successfully.')
      setIsDocumentModalOpen(false)
      setSelectedDocument(null)
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update document. Please try again.')
    }
  }


  return (
    <div className="bg-card rounded-lg border border-border p-6 sticky top-6">
      {/* User Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-cyan-300 to-cyan-500 flex items-center justify-center text-white font-bold text-3xl mb-2 relative overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt={user?.name ?? 'User avatar'}
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials(user?.name)
          )}
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card"></div>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {isLoading ? 'Loading...' : user?.name ?? 'Unknown User'}
        </h2>
        <p className="text-sm text-muted-foreground mb-3">{user?.email ?? 'N/A'}</p>
        <div className="inline-block bg-primary/10 px-3 py-1 rounded-full">
          <span className="text-xs font-semibold text-primary">{formatRole(user?.role)}</span>
        </div>
      </div>

      {isError && (
        <p className="text-sm text-red-600 text-center mb-4">
          Failed to load user profile.
        </p>
      )}

      {/* Account Information */}
      <div className="mb-6 pb-6 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">
          Account Informations
        </h3>
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Email Address</p>
              <p className="text-sm font-medium text-foreground">
                {user?.email ?? 'N/A'}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Phone Number</p>
              <p className="text-sm font-medium text-foreground">{user?.phone ?? 'N/A'}</p>
            </div>
          </div>

          {/* User ID */}
          <div className="flex items-start gap-3">
            <IdentityCard className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">User ID</p>
              <p className="text-sm font-medium text-foreground break-all">{user?.id ?? 'N/A'}</p>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Member Since</p>
              <p className="text-sm font-medium text-foreground">{formatDate(user?.created_at)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Online Status</p>
              <p className={`text-sm font-medium ${user?.online ? 'text-green-600' : 'text-gray-500'}`}>
                {user?.online ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Current Document</p>
            {documentPath ? (
              <>
                <p className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground break-all">
                  <span className="font-semibold text-foreground">document:</span> {documentPath}
                </p>
                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-sm font-medium text-[#090A58] hover:underline"
                >
                  View current document
                </a>

                {/* {isPdfDocument && (
                      <div className="mt-2 overflow-hidden rounded-lg border border-border bg-background">
                        <iframe
                          src={documentUrl}
                          title="Current document preview"
                          className="h-56 w-full"
                        />
                      </div>
                    )} */}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">No document uploaded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Link href={`/users/${userId}/financial-overview`} className="block">
          <Button
            variant="default"
            className="w-full bg-[#090A58] hover:bg-[#090A58] rounded-full text-white text-[16px] font-medium p-6"
          >
            View Financial Overview
          </Button>
        </Link>

        {/* <Link href={`/finance/income?userId=${userId}`} className="block">
          <Button
            variant="outline"
            className="w-full bg-[#B68F24] hover:bg-[#B68F24] rounded-full text-white text-[16px] font-medium p-6"
          >
            Income Overview
          </Button>
        </Link>
        <Link href={`/finance/dashboard?userId=${userId}`} className="block">
          <Button
            variant="outline"
            className="w-full bg-[#B68F24] hover:bg-[#B68F24] rounded-full text-white text-[16px] font-medium p-6"
          >
            Global Financial Dashboard
          </Button>
        </Link>
        <Link href={`/finance/expenses?userId=${userId}`} className="block">
          <Button
            variant="outline"
            className="w-full bg-[#B68F24] hover:bg-[#B68F24] rounded-full text-white text-[16px] font-medium p-6"
          >
            Expense Overview
          </Button>
        </Link> */}
        <Link href={`/finance/profit-loss?userId=${userId}`} className="block">
          <Button
            variant="outline"
            className="w-full bg-[#B68F24] hover:bg-[#B68F24] rounded-full text-white text-[16px] font-medium p-6"
          >
            Profit & Loss Overview
          </Button>
        </Link>
        <button
          type="button"
          onClick={() => setIsDocumentModalOpen(true)}
          className="block w-full"
        >
          <Button
            variant="outline"
            className="w-full bg-[#B68F24] hover:bg-[#B68F24] rounded-full text-white text-[16px] font-medium p-6"
          >
            {hasDocument ? 'Update Document' : 'Add Document'}
          </Button>
        </button>

        {/* <Button
          variant="outline"
          className="w-full bg-transparent border border-[#090A58] hover:bg-transparent/90 hover:text-[#090A58]  rounded-full text-black text-[16px] font-medium p-6"
        >
          <Reset />
          Reset Password
        </Button>

        <Button
          variant="outline"
          className="w-full bg-transparent border border-[#E64462] hover:bg-transparent/90 hover:text-[#E64462]  rounded-full text-[#E64462] text-[16px] font-medium p-6"
        >
          <Suspend />
          Suspend User
        </Button> */}
      </div>

      {isDocumentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              if (!isUpdatingDocument) {
                setIsDocumentModalOpen(false)
                setSelectedDocument(null)
              }
            }}
          />

          <div className="relative z-10 w-full max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">
                {hasDocument ? 'Update Document' : 'Add Document'}
              </h3>
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => {
                  if (!isUpdatingDocument) {
                    setIsDocumentModalOpen(false)
                    setSelectedDocument(null)
                  }
                }}
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">
                  {hasDocument ? 'Choose New Document' : 'Choose Document'}
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleDocumentFileChange}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                />
                {selectedDocument && (
                  <p className="text-xs text-muted-foreground break-all">
                    Selected: {selectedDocument.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Current Document</p>
                {documentPath ? (
                  <>
                    <p className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground break-all">
                      <span className="font-semibold text-foreground">document:</span> {documentPath}
                    </p>
                    <a
                      href={documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-sm font-medium text-[#090A58] hover:underline"
                    >
                      View current document
                    </a>

                    {/* {isPdfDocument && (
                      <div className="mt-2 overflow-hidden rounded-lg border border-border bg-background">
                        <iframe
                          src={documentUrl}
                          title="Current document preview"
                          className="h-56 w-full"
                        />
                      </div>
                    )} */}
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">No document uploaded yet.</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  if (!isUpdatingDocument) {
                    setIsDocumentModalOpen(false)
                    setSelectedDocument(null)
                  }
                }}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDocumentUpdate}
                disabled={!selectedDocument || isUpdatingDocument}
                className="rounded-full bg-[#090A58] text-white hover:bg-[#090A58]/90"
              >
                {isUpdatingDocument
                  ? hasDocument
                    ? 'Updating...'
                    : 'Adding...'
                  : hasDocument
                    ? 'Update Document'
                    : 'Add Document'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
