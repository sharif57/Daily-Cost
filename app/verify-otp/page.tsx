'use client'

import { Suspense } from 'react'
import VerifyOtpForm from '@/components/auth/verify-otp-form'

export default function VerifyOtpPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8 sm:py-12">
            <Suspense fallback={<div className="text-sm text-gray-600">Loading verification...</div>}>
                <VerifyOtpForm />
            </Suspense>
        </div>
    )
}