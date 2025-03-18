import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  category: string;
  searchTerm: string;
  minPrice: number | null;
  maxPrice: number | null;
  sortOrder: 'price-asc' | 'price-desc' | 'rating-desc' | null;
}

const initialState: FiltersState = {
  category: '',
  searchTerm: '',
  minPrice: null,
  maxPrice: null,
  sortOrder: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ minPrice: number; maxPrice: number }>
    ) => {
      state.minPrice = action.payload.minPrice;
      state.maxPrice = action.payload.maxPrice;
    },
    setSortOrder: (
      state,
      action: PayloadAction<'price-asc' | 'price-desc' | 'rating-desc'>
    ) => {
      state.sortOrder = action.payload;
    },
    resetFilters: (state) => {
      state.category = initialState.category;
      state.searchTerm = initialState.searchTerm;
      state.minPrice = initialState.minPrice;
      state.maxPrice = initialState.maxPrice;
      state.sortOrder = initialState.sortOrder;
    },
  },
});

export const {
  setCategory,
  setSearchTerm,
  setPriceRange,
  setSortOrder,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;