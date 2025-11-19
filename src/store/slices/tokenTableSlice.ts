import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenCategory, SortField, SortDirection } from '@/types/token';

interface TokenTableState {
  selectedCategory: TokenCategory;
  sortField: SortField;
  sortDirection: SortDirection;
  searchQuery: string;
}

const initialState: TokenTableState = {
  selectedCategory: 'new-pairs',
  sortField: 'volume24h',
  sortDirection: 'desc',
  searchQuery: '',
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
  },
});

export const { setCategory, setSort, toggleSortDirection, setSearchQuery } = tokenTableSlice.actions;
export default tokenTableSlice.reducer;
