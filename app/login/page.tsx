'use client'

import React, { useState } from 'react'
import LoginForm from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8 sm:py-12">
      <LoginForm />
    </div>
  )
}
