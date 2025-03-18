import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Rate, Typography, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Product } from '@/services/api/products';

const { Meta } = Card;
const { Text } = Typography;

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(product);
  };

  return (
    <Link href={`/products/${product.id}`} passHref>
      <Card
        hoverable
        cover={
          <div style={{ position: 'relative', height: '200px' }}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          </div>
        }
        actions={[
          <Button
            key="addToCart"
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
          >
            Sepete Ekle
          </Button>
        ]}
      >
        <Meta
          title={product.title}
          description={
            <>
              <Text strong>{product.price.toFixed(2)} TL</Text>
              <div>
                <Rate disabled defaultValue={product.rating.rate} allowHalf />
                <Text type="secondary"> ({product.rating.count})</Text>
              </div>
            </>
          }
        />
      </Card>
    </Link>
  );
};

export default ProductCard;