import React from 'react';
import ProductDetail from '@/components/product-detail';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.id, 10);

  return (
    <div style={{ padding: '24px' }}>
      <ProductDetail productId={productId} />
    </div>
  );
}