'use client'

import ForgotPasswordForm from '@/components/auth/forgot-password-form'

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8 sm:py-12">
            <ForgotPasswordForm />
        </div>
    )
}