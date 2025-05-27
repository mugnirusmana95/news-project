import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AllNews from '../../src/pages/all-news';
import { getNews, defaultNews } from '../../src/redux/slices/news-slices';

jest.mock('../../src/redux/slices/news-slices', () => ({
  getNews: jest.fn(),
  defaultNews: jest.fn()
}));

describe('AllNews Component', () => {
  const mockRouter = jest.fn();
  const mockDispatch = jest.fn();
  
  const mockState = {
    news: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: [],
      errorMessage: '',
      page: 1
    }
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('dispatches getNews action on component mount', () => {
    render(<AllNews router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
    expect(mockDispatch).toHaveBeenCalled();
    expect(getNews).toHaveBeenCalled();
  });

  test('navigates to home page when News App is clicked', () => {
    render(<AllNews router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
    const links = screen.getAllByText('News App');
    if (links.length > 0) {
      fireEvent.click(links[0]);
      expect(mockRouter).toHaveBeenCalledWith('/');
    }
  });

  test('navigates to home page when Home is clicked', () => {
    render(<AllNews router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
    const links = screen.getAllByText('Home');
    if (links.length > 0) {
      fireEvent.click(links[0]);
      expect(mockRouter).toHaveBeenCalledWith('/news');
    }
  });

  test('handles API error state', () => {
    const errorState = {
      news: {
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: [],
        errorMessage: 'API Error',
        page: 1
      }
    };
    
    render(<AllNews router={mockRouter} state={errorState} dispatch={mockDispatch} params={{}} />);
    
    expect(mockDispatch).toHaveBeenCalled();
    expect(defaultNews).toHaveBeenCalled();
  });
});
