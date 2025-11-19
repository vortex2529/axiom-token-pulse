import { configureStore } from '@reduxjs/toolkit';
import tokenTableReducer from './slices/tokenTableSlice';

export const store = configureStore({
  reducer: {
    tokenTable: tokenTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
