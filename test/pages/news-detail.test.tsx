import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewsDetail from '../../src/pages/news-detail';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' })
}));

describe('NewsDetail Component', () => {
  const mockRouter = jest.fn();
  
  const mockState = {
    news: {
      data: [
        {
          id: '1',
          title: 'Test News Title',
          content: 'Test News Content ...',
          description: 'Test Description',
          author: 'Test Author',
          urlToImage: 'test-image.jpg',
          publishedAt: '2025-05-27T15:00:00Z',
          source: { id: 'test-source', name: 'Test Source' },
          url: 'https://test-url.com'
        }
      ]
    }
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders news detail component correctly', () => {
    render(<NewsDetail router={mockRouter} state={mockState} dispatch={jest.fn()} params={{}} />);
    
    expect(screen.getByText('News App')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('All News')).toBeInTheDocument();
  });

  test('displays news detail data', () => {
    render(<NewsDetail router={mockRouter} state={mockState} dispatch={jest.fn()} params={{}} />);
    
    expect(screen.getByText('Test News Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText('Continue Reading...')).toBeInTheDocument();
  });

  test('navigates to home page when News App is clicked', () => {
    render(<NewsDetail router={mockRouter} state={mockState} dispatch={jest.fn()} params={{}} />);
    
    fireEvent.click(screen.getByText('News App'));
    
    expect(mockRouter).toHaveBeenCalledWith('/');
  });

  test('navigates to home page when Home is clicked', () => {
    render(<NewsDetail router={mockRouter} state={mockState} dispatch={jest.fn()} params={{}} />);
    
    fireEvent.click(screen.getByText('Home'));
    
    expect(mockRouter).toHaveBeenCalledWith('/news');
  });

  test('navigates to all news page when All News is clicked', () => {
    render(<NewsDetail router={mockRouter} state={mockState} dispatch={jest.fn()} params={{}} />);
    
    fireEvent.click(screen.getByText('All News'));
    
    expect(mockRouter).toHaveBeenCalledWith('/all-news');
  });

  test('displays not found message when news is not found', () => {
    const emptyState = {
      news: {
        data: []
      }
    };
    
    render(<NewsDetail router={mockRouter} state={emptyState} dispatch={jest.fn()} params={{}} />);
    
    expect(screen.getByText('News Not Found')).toBeInTheDocument();
  });
});
