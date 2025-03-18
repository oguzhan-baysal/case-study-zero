import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, List, InputNumber, Typography, Card } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { RootState } from '../store/store'
import { removeItem, updateQuantity } from '../store/basketSlice'
import type { BasketItem as BasketItemType } from '../store/basketSlice'

const { Title } = Typography

const Basket: React.FC = () => {
  const { items, total } = useSelector((state: RootState) => state.basket)
  const dispatch = useDispatch()

  const handleRemove = (id: number) => {
    dispatch(removeItem(id))
  }

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  const renderItem = (item: BasketItemType) => (
    <List.Item
      key={item.id}
      actions={[
        <InputNumber
          key="quantity"
          min={1}
          value={item.quantity}
          onChange={(value) => handleQuantityChange(item.id, value || 1)}
        />,
        <Button
          key="remove"
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(item.id)}
        />
      ]}
    >
      <List.Item.Meta
        title={item.name}
        description={`${item.price} TL`}
      />
      <div>{(item.price * item.quantity).toFixed(2)} TL</div>
    </List.Item>
  )

  return (
    <Card title={<Title level={4}>Sepetim</Title>}>
      <List
        dataSource={items}
        renderItem={renderItem}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Title level={5}>Toplam: {total.toFixed(2)} TL</Title>
          </div>
        }
      />
    </Card>
  )
}

export default Basket