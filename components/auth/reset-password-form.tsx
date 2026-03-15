'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useResetPasswordMutation } from '@/redux/feature/authSlice'
import AuthLogo from '../icon/authLogo'

export default function ResetPasswordForm() {
    const router = useRouter()
    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const verificationToken = localStorage.getItem('verificationToken')
        if (!verificationToken) {
            toast.error('Verification session expired. Please verify OTP again.')
            router.push('/verify-otp')
            return
        }

        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters.')
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error('Password and confirm password do not match.')
            return
        }

        try {
            const response = await resetPassword({ new_password: newPassword }).unwrap()
            toast.success(response?.message || 'Password reset successfully. Please login now.')
            localStorage.removeItem('verificationToken')
            router.push('/login')
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to reset password. Please try again.')
        }
    }

    return (
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
                <div className="flex justify-center mb-8">
                    <AuthLogo />
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Reset Password</h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Set a new password for your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-5 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all pr-12 text-sm sm:text-base"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-5 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all pr-12 text-sm sm:text-base"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                            aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-900 hover:bg-blue-950 disabled:bg-blue-900 disabled:opacity-75 text-white font-semibold py-3 sm:py-4 rounded-full transition-all text-sm sm:text-base mt-2 shadow-md hover:shadow-lg"
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        href="/verify-otp"
                        className="text-gray-900 font-semibold text-sm sm:text-base hover:text-blue-900 transition-colors"
                    >
                        Back to Verify OTP
                    </Link>
                </div>
            </div>
        </div>
    )
}