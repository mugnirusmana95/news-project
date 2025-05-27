import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '../../src/redux/store';

export const createMockStore = (initialState: Partial<RootState>) => {
  return configureStore({
    reducer: (state = initialState) => state,
    preloadedState: initialState
  });
};

export const mockDispatch = jest.fn();
