import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BasketItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface BasketState {
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
    addItem: (state, action: PayloadAction<BasketItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    removeItem: (state, action: PayloadAction<number>) => {
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
    clearBasket: (state) => {
      state.items = []
      state.total = 0
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearBasket } = basketSlice.actions

export default basketSlice.reducer