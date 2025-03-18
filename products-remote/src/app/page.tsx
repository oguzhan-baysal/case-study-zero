import React from 'react';
import { Row, Col } from 'antd';
import ProductList from '@/components/product-list';
import ProductFilters from '@/components/product-filters';

export default function ProductsPage() {
  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={6}>
          <ProductFilters />
        </Col>
        <Col xs={24} md={18}>
          <ProductList />
        </Col>
      </Row>
    </div>
  );
}