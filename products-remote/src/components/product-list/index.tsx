import React from 'react';
import { Row, Col, Spin, Alert } from 'antd';
import { useGetProductsQuery } from '@/services/api/products';
import ProductCard from '../product-card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProductList: React.FC = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Hata"
        description="Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        type="error"
        showIcon
      />
    );
  }

  const filteredProducts = products?.filter((product) => {
    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesSearch =
      !filters.searchTerm ||
      product.title.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesPriceRange =
      (!filters.minPrice || product.price >= filters.minPrice) &&
      (!filters.maxPrice || product.price <= filters.maxPrice);
    return matchesCategory && matchesSearch && matchesPriceRange;
  });

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (filters.sortOrder) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating.rate - a.rating.rate;
      default:
        return 0;
    }
  });

  return (
    <Row gutter={[16, 16]}>
      {sortedProducts?.map((product) => (
        <Col
          key={product.id}
          xs={24}
          sm={12}
          md={8}
          lg={6}
          style={{ display: 'flex' }}
        >
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;