import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  totalAmount: number;
}

const initialState: BasketState = {
  items: [],
  totalAmount: 0,
};

const calculateTotalAmount = (items: BasketItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount = calculateTotalAmount(state.items);
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalAmount = calculateTotalAmount(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },
    clearBasket: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity, clearBasket } = basketSlice.actions;

export default basketSlice.reducer;