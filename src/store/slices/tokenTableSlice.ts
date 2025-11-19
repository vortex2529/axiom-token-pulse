import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenCategory, SortField, SortDirection } from '@/types/token';

interface FilterState {
  minPrice: number;
  maxPrice: number;
  minVolume: number;
  maxVolume: number;
  minMarketCap: number;
  maxMarketCap: number;
  minLiquidity: number;
  maxLiquidity: number;
}

interface TokenTableState {
  selectedCategory: TokenCategory;
  sortField: SortField;
  sortDirection: SortDirection;
  searchQuery: string;
  filters: FilterState;
  selectedTokenId: string | null;
}

const initialState: TokenTableState = {
  selectedCategory: 'new-pairs',
  sortField: 'volume24h',
  sortDirection: 'desc',
  searchQuery: '',
  filters: {
    minPrice: 0,
    maxPrice: Infinity,
    minVolume: 0,
    maxVolume: Infinity,
    minMarketCap: 0,
    maxMarketCap: Infinity,
    minLiquidity: 0,
    maxLiquidity: Infinity,
  },
  selectedTokenId: null,
};

const tokenTableSlice = createSlice({
  name: 'tokenTable',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<TokenCategory>) => {
      state.selectedCategory = action.payload;
    },
    setSort: (state, action: PayloadAction<{ field: SortField; direction: SortDirection }>) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
    },
    toggleSortDirection: (state) => {
      state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSelectedToken: (state, action: PayloadAction<string | null>) => {
      state.selectedTokenId = action.payload;
    },
  },
});

export const { 
  setCategory, 
  setSort, 
  toggleSortDirection, 
  setSearchQuery, 
  setFilters, 
  resetFilters,
  setSelectedToken 
} = tokenTableSlice.actions;
export default tokenTableSlice.reducer;
