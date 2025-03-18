'use client'

import React from 'react'
import { useGetProductsQuery } from '@/services/api'
import { Card, List, Button, message } from 'antd'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addToBasket } from '@/store/basketSlice'

const { Meta } = Card

export default function ProductsList() {
  const { data: products, isLoading, error } = useGetProductsQuery()
  const dispatch = useDispatch()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading products</div>
  }

  const handleAddToBasket = (product: any) => {
    dispatch(addToBasket({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
    }))
    message.success('Product added to basket')
  }

  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
      dataSource={products}
      renderItem={(product) => (
        <List.Item>
          <Card
            hoverable
            cover={
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
            }
            actions={[
              <Button key="add" type="primary" onClick={() => handleAddToBasket(product)}>
                Add to Basket
              </Button>
            ]}
          >
            <Meta
              title={product.title}
              description={`$${product.price}`}
            />
          </Card>
        </List.Item>
      )}
    />
  )
}