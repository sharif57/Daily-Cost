'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useVerifyEmailMutation } from '@/redux/feature/authSlice'
import AuthLogo from '../icon/authLogo'

const OTP_LENGTH = 5

export default function VerifyOtpForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation()

    const prefilledEmail = useMemo(() => searchParams.get('email') ?? '', [searchParams])

    const [email, setEmail] = useState(prefilledEmail)
    const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
    const otpRefs = useRef<Array<HTMLInputElement | null>>([])

    const focusOtpInput = (index: number) => {
        if (index < 0 || index >= OTP_LENGTH) {
            return
        }

        otpRefs.current[index]?.focus()
    }

    const handleOtpChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, '').slice(-1)
        const next = [...otpDigits]
        next[index] = digit
        setOtpDigits(next)

        if (digit && index < OTP_LENGTH - 1) {
            focusOtpInput(index + 1)
        }
    }

    const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
            const next = [...otpDigits]
            next[index - 1] = ''
            setOtpDigits(next)
            focusOtpInput(index - 1)
            return
        }

        if (event.key === 'ArrowLeft' && index > 0) {
            event.preventDefault()
            focusOtpInput(index - 1)
            return
        }

        if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
            event.preventDefault()
            focusOtpInput(index + 1)
        }
    }

    const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault()
        const pastedDigits = event.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, OTP_LENGTH)
            .split('')

        if (!pastedDigits.length) {
            return
        }

        const next = Array(OTP_LENGTH).fill('')
        pastedDigits.forEach((digit, index) => {
            next[index] = digit
        })
        setOtpDigits(next)

        focusOtpInput(Math.min(pastedDigits.length, OTP_LENGTH) - 1)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const oneTimeCode = otpDigits.join('')
        if (oneTimeCode.length !== OTP_LENGTH) {
            toast.error('Please enter the 6-digit OTP code.')
            return
        }

        try {
            const payload = {
                email: email.trim().toLowerCase(),
                one_time_code: Number(oneTimeCode),
            }

            const response = await verifyEmail(payload).unwrap()
            const verificationToken = response?.data?.access_token

            if (!verificationToken) {
                toast.error('Verification token not found in response.')
                return
            }

            localStorage.setItem('verificationToken', verificationToken)
            toast.success(response?.message || 'Verification successful.')
            router.push('/reset-password')
        } catch (error: any) {
            toast.error(error?.data?.message || 'OTP verification failed. Please try again.')
        }
    }

    return (
        <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
                <div className="flex justify-center mb-8">
                    <AuthLogo />
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Verify OTP</h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Enter your email and one-time code to verify your identity.
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

                    <div>
                        <div className="flex items-center justify-between gap-2 sm:gap-3">
                            {otpDigits.map((digit, index) => (
                                <input
                                    key={`otp-${index}`}
                                    ref={(element) => {
                                        otpRefs.current[index] = element
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete={index === 0 ? 'one-time-code' : 'off'}
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    onPaste={handleOtpPaste}
                                    className="h-12 w-12 sm:h-14 sm:w-14 text-center text-lg font-semibold bg-gray-100 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
                                    aria-label={`OTP digit ${index + 1}`}
                                />
                            ))}
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Enter the 5-digit OTP code</p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-900 hover:bg-blue-950 disabled:bg-blue-900 disabled:opacity-75 text-white font-semibold py-3 sm:py-4 rounded-full transition-all text-sm sm:text-base mt-2 shadow-md hover:shadow-lg"
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link
                        href="/forgot-password"
                        className="text-gray-900 font-semibold text-sm sm:text-base hover:text-blue-900 transition-colors"
                    >
                        Back to Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    )
}