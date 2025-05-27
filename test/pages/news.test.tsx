import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import News from '../../src/pages/news';
import { getNews } from '../../src/redux/slices/news-slices';

jest.mock('../../src/redux/slices/news-slices', () => ({
  getNews: jest.fn(),
  defaultNews: jest.fn()
}));

describe('News Component', () => {
  const mockRouter = jest.fn();
  const mockDispatch = jest.fn();
  
  const mockState = {
    news: {
      isLoading: false,
      isSuccess: false,
      isError: false,
      data: [],
      errorMessage: ''
    }
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders news component correctly', () => {
    render(<News router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
    expect(screen.getByText('News App')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('All News')).toBeInTheDocument();
  });

  test('dispatches getNews action on component mount', () => {
    render(<News router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(getNews).toHaveBeenCalledWith({ page: 1, pageSize: 10, category: 'all', isCombine: false });
  });

  test('navigates to home page when News App is clicked', () => {
    render(<News router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
    fireEvent.click(screen.getByText('News App'));
    
    expect(mockRouter).toHaveBeenCalledWith('/');
  });

  test('navigates to all news page when All News is clicked', () => {
    render(<News router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
    fireEvent.click(screen.getByText('All News'));
    
    expect(mockRouter).toHaveBeenCalledWith('/all-news');
  });

  test('displays news data when API call is successful', async () => {
    const successState = {
      news: {
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: [
          {
            id: '1',
            title: 'Test News Title',
            content: 'Test News Content',
            author: 'Test Author',
            urlToImage: 'test-image.jpg',
            publishedAt: '2025-05-27T15:00:00Z',
            source: { id: 'test-source', name: 'Test Source' }
          }
        ],
        errorMessage: ''
      }
    };
    
    render(<News router={mockRouter} state={successState} dispatch={mockDispatch} params={{}} />);
    
    await waitFor(() => {
      expect(screen.getByText('Test News Title')).toBeInTheDocument();
      expect(screen.getByText('Test News Content')).toBeInTheDocument();
      expect(screen.getByText('Test Author')).toBeInTheDocument();
    });
  });

  test('displays error alert when API call fails', async () => {
    const errorState = {
      news: {
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: [],
        errorMessage: 'API Error'
      }
    };
    
    render(<News router={mockRouter} state={errorState} dispatch={mockDispatch} params={{}} />);
    
    await waitFor(() => {
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });
});
