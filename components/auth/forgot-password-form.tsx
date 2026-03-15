'use client'

import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { useForgotPasswordMutation } from '@/redux/feature/authSlice'
import AuthLogo from '../icon/authLogo'

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await forgotPassword({ email }).unwrap()
            toast.success(response?.message || 'OTP sent successfully. Please check your email.')
            setEmail('')
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to send reset code. Please try again.')
        }
    }

    return (
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
                <div className="flex justify-center mb-8">
                    <AuthLogo />
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                        Forgot Password
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Enter your email address and we will send you an OTP to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-5 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all text-sm sm:text-base"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-900 hover:bg-blue-950 disabled:bg-blue-900 disabled:opacity-75 text-white font-semibold py-3 sm:py-4 rounded-full transition-all text-sm sm:text-base mt-2 shadow-md hover:shadow-lg"
                    >
                        {isLoading ? 'Sending...' : 'Send OTP'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="text-gray-900 font-semibold text-sm sm:text-base hover:text-blue-900 transition-colors"
                    >
                        Back to Sign in
                    </Link>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                    <h3 className="text-gray-900 font-bold text-sm sm:text-base mb-2">
                        Secure Recovery
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        Reset instructions are sent only to verified accounts for security purposes.
                    </p>
                </div>
            </div>
        </div>
    )
}