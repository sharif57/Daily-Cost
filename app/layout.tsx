import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Providers from "@/Provider/Providers"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: 'Bespoke Capital - Dashboard',
  description: 'Singapore\'s First Islamic Fintech Dashboard',
  generator: 'Next.js',
  // icons: {
  //   icon: [
  //     {
  //       url: '/icon-light-32x32.png',
  //       media: '(prefers-color-scheme: light)',
  //     },
  //     {
  //       url: '/icon-dark-32x32.png',
  //       media: '(prefers-color-scheme: dark)',
  //     },
  //     {
  //       url: '/icon.svg',
  //       type: 'image/svg+xml',
  //     },
  //   ],
  //   apple: '/apple-icon.png',
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <Toaster  /> {/* Add Toaster for notifications */}
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
