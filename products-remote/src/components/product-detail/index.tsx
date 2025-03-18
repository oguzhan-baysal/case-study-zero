import React from 'react';
import { useGetProductQuery } from '@/services/api/products';
import {
  Card,
  Row,
  Col,
  Typography,
  Rate,
  Button,
  Spin,
  Alert,
  Breadcrumb,
} from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';

const { Title, Text } = Typography;

interface ProductDetailProps {
  productId: number;
  onAddToCart?: (productId: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  onAddToCart,
}) => {
  const { data: product, isLoading, error } = useGetProductQuery(productId);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <Alert
        message="Hata"
        description="Ürün detayları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link href="/">Ana Sayfa</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link href={`/category/${product.category}`}>{product.category}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Card>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <div style={{ position: 'relative', height: '400px' }}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Title level={2}>{product.title}</Title>
            <div style={{ marginBottom: 16 }}>
              <Rate disabled defaultValue={product.rating.rate} allowHalf />
              <Text type="secondary"> ({product.rating.count} değerlendirme)</Text>
            </div>
            <Title level={3} type="success">
              {product.price.toFixed(2)} TL
            </Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
              {product.description}
            </Text>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              onClick={() => onAddToCart?.(product.id)}
            >
              Sepete Ekle
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetail;