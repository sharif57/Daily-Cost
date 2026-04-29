'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { useLoginMutation } from '@/redux/feature/authSlice'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getTokenExpiryMs } from '@/lib/jwt'
import AuthLogo from '../icon/authLogo'

export default function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { isLoading }] = useLoginMutation();


  // {
  //   "email": "abdul@gmail.com",
  //     "password": "12345678"
  // }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // TODO: Add authentication logic here
      console.log('Login attempt:', { email, password })

      const response = await login({ email, password }).unwrap()
      const accessToken = response?.data?.access_token || ''
      const expiryMs = getTokenExpiryMs(accessToken)
      const maxAgeInSeconds = expiryMs
        ? Math.max(0, Math.floor((expiryMs - Date.now()) / 1000))
        : 0

      toast.success(response?.message || 'Login successful! Redirecting to dashboard...')
      localStorage.setItem('accessToken', accessToken)
      document.cookie = `token=${accessToken}; path=/; max-age=${maxAgeInSeconds}; samesite=lax`
      window.location.href = '/'
      router.refresh()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Invalid email or password. Please try again.')
    } finally {
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <AuthLogo />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Super Admin Portal
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Please sign in to access the secure dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
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

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all pr-12 text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-gray-900 font-semibold text-sm sm:text-base hover:text-blue-900 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 hover:bg-blue-950 disabled:bg-blue-900 disabled:opacity-75 text-white font-semibold py-3 sm:py-4 rounded-full transition-all text-sm sm:text-base mt-8 shadow-md hover:shadow-lg"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Security Warning */}
        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          <h3 className="text-gray-900 font-bold text-sm sm:text-base mb-2">
            Authorized Personnel Only
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Access to this system is monitored and recorded. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}
