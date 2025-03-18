import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'
import { Providers } from '@/store/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Products App',
  description: 'Products Micro Frontend',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}