import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '../../src/redux/store';

// Create a mock store for testing
export const createMockStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: (state = initialState) => state,
    preloadedState: initialState
  });
};

// Create a mock dispatch function
export const mockDispatch = jest.fn();
