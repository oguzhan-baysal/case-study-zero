import React from 'react'
import ProductsList from '@/components/ProductsList'

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <ProductsList />
      </div>
    </main>
  )
}