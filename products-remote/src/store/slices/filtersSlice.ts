import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  category: string | null;
  searchTerm: string;
  priceRange: {
    min: number | null;
    max: number | null;
  };
  sortBy: 'price-asc' | 'price-desc' | 'rating' | null;
}

const initialState: FiltersState = {
  category: null,
  searchTerm: '',
  priceRange: {
    min: null,
    max: null,
  },
  sortBy: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.category = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPriceRange: (
      state,
      action: PayloadAction<{ min: number | null; max: number | null }>
    ) => {
      state.priceRange = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<'price-asc' | 'price-desc' | 'rating' | null>
    ) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.category = null;
      state.searchTerm = '';
      state.priceRange = {
        min: null,
        max: null,
      };
      state.sortBy = null;
    },
  },
});

export const {
  setCategory,
  setSearchTerm,
  setPriceRange,
  setSortBy,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;