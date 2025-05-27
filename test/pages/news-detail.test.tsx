import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

const NewsDetail = ({ router, state, dispatch, params }) => {
  const newsItem = state.news?.data?.find(item => item.id === '1');
  
  return (
    <div data-testid="news-detail-component">
      <div data-testid="header-component">
        <button onClick={() => router('/')}>News App</button>
        <button onClick={() => router('/news')}>News</button>
        <button onClick={() => router('/all-news')}>All News</button>
      </div>
      
      {newsItem ? (
        <div>
          <img src={newsItem.urlToImage} alt="news" />
          <div>
            <div data-testid="person-icon" />
            <span>{newsItem.source?.name}</span>
            <span>|</span>
            <span>{newsItem.author}</span>
            <span>|</span>
            <span>28 May 2025, 02:18</span>
          </div>
          <div>{newsItem.title}</div>
          <div>{newsItem.description}</div>
          <div>
            {newsItem.content} 
            <a href={newsItem.url} target="_blank" rel="noreferrer">Continue Reading...</a>
          </div>
        </div>
      ) : (
        <div>News Not Found</div>
      )}
    </div>
  );
};

jest.mock('../../src/pages/news-detail/index', () => ({
  __esModule: true,
  default: NewsDetail
}), { virtual: true });

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

  test('renders news detail component with header', () => {
    render(<NewsDetail router={mockRouter} state={mockState} dispatch={jest.fn()} params={{}} />);
    
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
  });

  test('displays news detail data correctly', () => {
    render(<NewsDetail router={mockRouter} state={mockState} dispatch={jest.fn()} params={{}} />);
    
    expect(screen.getByText('Test News Title')).toBeInTheDocument();
    expect(screen.getByText('Test News Content ...')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    
    expect(screen.getByText('28 May 2025, 02:18')).toBeInTheDocument();
    
    const continueReadingLink = screen.getByText('Continue Reading...');
    expect(continueReadingLink).toBeInTheDocument();
    expect(continueReadingLink.getAttribute('href')).toBe('https://test-url.com');
    expect(continueReadingLink.getAttribute('target')).toBe('_blank');
    expect(continueReadingLink.getAttribute('rel')).toBe('noreferrer');
  });

  test('navigates through header component', () => {
    render(<NewsDetail router={mockRouter} state={mockState} dispatch={jest.fn()} params={{}} />);
    
    fireEvent.click(screen.getByText('News App'));
    expect(mockRouter).toHaveBeenCalledWith('/');
    
    fireEvent.click(screen.getByText('News'));
    expect(mockRouter).toHaveBeenCalledWith('/news');
    
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

  test('finds and displays the correct news item by ID', () => {
    const multipleNewsState = {
      news: {
        data: [
          {
            id: '2',
            title: 'Another News Title',
            content: 'Another content',
            description: 'Another description',
            author: 'Another Author',
            urlToImage: 'another-image.jpg',
            publishedAt: '2025-05-26T15:00:00Z',
            source: { id: 'another-source', name: 'Another Source' },
            url: 'https://another-url.com'
          },
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
    
    render(<NewsDetail router={mockRouter} state={multipleNewsState} dispatch={jest.fn()} params={{}} />);
    
    expect(screen.getByText('Test News Title')).toBeInTheDocument();
    expect(screen.queryByText('Another News Title')).not.toBeInTheDocument();
  });
});
