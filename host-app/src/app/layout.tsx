import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { Providers } from '@/store/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-Commerce App',
  description: 'Micro Frontend E-Commerce Application',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
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