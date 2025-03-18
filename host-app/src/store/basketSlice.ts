import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BasketItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface BasketState {
  items: BasketItem[]
  total: number
}

const initialState: BasketState = {
  items: [],
  total: 0,
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
        state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    },
  },
})

export const { addToBasket, removeFromBasket, updateQuantity } = basketSlice.actions

export default basketSlice.reducer