import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, List, InputNumber, Typography, Card, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { RootState } from '../store/provider';
import { removeFromBasket, updateQuantity, clearBasket } from '../store/basketSlice';

const { Text } = Typography;

const Basket: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.basket);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromBasket(id));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromBasket(id));
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
  };

  if (items.length === 0) {
    return (
      <Card>
        <Text>Sepetiniz boş</Text>
      </Card>
    );
  }

  return (
    <Card
      title="Sepetim"
      extra={
        <Button type="link" danger onClick={handleClearBasket}>
          Sepeti Temizle
        </Button>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveItem(item.id)}
              />,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`Birim Fiyat: ${item.price.toFixed(2)} TL`}
            />
            <Space>
              <InputNumber
                min={0}
                value={item.quantity}
                onChange={(value) => handleQuantityChange(item.id, value || 0)}
              />
              <Text>{(item.price * item.quantity).toFixed(2)} TL</Text>
            </Space>
          </List.Item>
        )}
      />
      <div style={{ textAlign: 'right', marginTop: 16 }}>
        <Text strong>Toplam: {totalAmount.toFixed(2)} TL</Text>
      </div>
    </Card>
  );
};

export default Basket;