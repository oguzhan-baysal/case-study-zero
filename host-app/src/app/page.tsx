import React from 'react'
import dynamic from 'next/dynamic'

const ProductsList = dynamic(() => import('products/ProductsList'), {
  ssr: false,
})

const Basket = dynamic(() => import('basket/Basket'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">E-Commerce App</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <ProductsList />
          </div>
          <div>
            <Basket />
          </div>
        </div>
      </div>
    </main>
  )
}