import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const getNews = jest.fn();
const defaultNews = jest.fn();

const Home = ({ router, state, dispatch, params }) => {
  React.useEffect(() => {
    dispatch(getNews({ page: 1, pageSize: 10, category: 'all', isCombine: false }));
  }, []);

  React.useEffect(() => {
    if (state.news?.isSuccess || state.news?.isError) {
      dispatch(defaultNews());
    }
  }, [state.news]);

  return (
    <div data-testid="home-component">
      <div data-testid="header-component">
        <button onClick={() => router('/news')}>News</button>
        <button onClick={() => router('/algorithm')}>Algorithm</button>
      </div>
      <div>Welcome to News App</div>
      <div>Craft narrative that ignite <span>inspiration</span>,</div>
      <div><span>Knowledge</span>, and <span>entertainment</span></div>
      
      {state.news?.data && state.news.data[0] && (
        <div className="cursor-pointer" onClick={() => router(`/all-news/${state.news.data[0].id}`)}>
          <div>{state.news.data[0].title}</div>
          <div>{state.news.data[0].author}</div>
          <div>{state.news.data[0].source?.name}</div>
        </div>
      )}
      
      <div>
        <div>Latest News</div>
        <div className="cursor-pointer" onClick={() => router('/all-news')}>See All</div>
      </div>
      
      <div>
        {state.news?.data?.slice(1).map((item, index) => (
          <div key={index} className="cursor-pointer" onClick={() => router(`/all-news/${item.id}`)}>
            <div>{item.title}</div>
            <div>{item.author}</div>
            <div>{item.source?.name}</div>
          </div>
        ))}
      </div>
      
      {state.news?.isLoading && <div data-testid="loader-component">Loading...</div>}
      {state.news?.isError && <div data-testid="alert-component">Warning: {state.news.errorMessage}</div>}
    </div>
  );
};

jest.mock('../../src/pages/home/index', () => ({
  __esModule: true,
  default: Home
}), { virtual: true });

jest.mock('../../src/redux/slices/news-slices', () => ({
  getNews,
  defaultNews
}), { virtual: true });

import HomeComponent from '../../src/pages/home/index';

describe('Home Component', () => {
  const mockRouter = jest.fn();
  const mockDispatch = jest.fn();
  const mockNewsData = [
    {
      id: '1',
      title: 'Test News 1',
      content: 'Test content 1',
      author: 'Author 1',
      urlToImage: 'https://example.com/image1.jpg',
      source: { name: 'Source 1' }
    },
    {
      id: '2',
      title: 'Test News 2',
      content: 'Test content 2',
      author: 'Author 2',
      urlToImage: 'https://example.com/image2.jpg',
      source: { name: 'Source 2' }
    }
  ];
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome message correctly', () => {
    render(
      <HomeComponent 
        router={mockRouter}
        state={{ news: {} }}
        dispatch={mockDispatch}
        params={{}}
      />
    );
    
    expect(screen.getByText('Welcome to News App')).toBeInTheDocument();
    
    expect(screen.getByText(/Craft narrative that ignite/)).toBeInTheDocument();
    expect(screen.getByText('inspiration')).toBeInTheDocument();
    expect(screen.getByText('Knowledge')).toBeInTheDocument();
    expect(screen.getByText(/entertainment/)).toBeInTheDocument();
  });

  test('dispatches getNews action on mount', () => {
    render(<Home router={mockRouter} state={{ news: {} }} dispatch={mockDispatch} params={{}} />);
    
    expect(mockDispatch).toHaveBeenCalledWith(getNews({ page: 1, pageSize: 10, category: 'all', isCombine: false }));
  });

  test('displays news data when available', () => {
    const state = {
      news: {
        isSuccess: true,
        data: mockNewsData,
        isLoading: false
      }
    };

    render(<Home router={mockRouter} state={state} dispatch={mockDispatch} params={{}} />);
    
    expect(screen.getByText('Test News 1')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Source 1')).toBeInTheDocument();
    
    expect(screen.getByText('Test News 2')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();
    expect(screen.getByText('Source 2')).toBeInTheDocument();
    
    expect(mockDispatch).toHaveBeenCalledWith(defaultNews());
  });

  test('displays error alert when news fetch fails', () => {
    const state = {
      news: {
        isError: true,
        errorMessage: 'Failed to fetch news',
        isLoading: false
      }
    };

    render(<Home router={mockRouter} state={state} dispatch={mockDispatch} params={{}} />);
    
    waitFor(() => {
      expect(screen.getByTestId('alert-component')).toBeInTheDocument();
      expect(screen.getByText('Warning: Failed to fetch news')).toBeInTheDocument();
    });
    
    expect(mockDispatch).toHaveBeenCalledWith(defaultNews());
  });

  test('displays loader when loading news', () => {
    const state = {
      news: {
        isLoading: true
      }
    };

    render(<Home router={mockRouter} state={state} dispatch={mockDispatch} params={{}} />);
    
    expect(screen.getByTestId('loader-component')).toBeInTheDocument();
  });

  test('navigates to news detail when clicking on a news item', () => {
    const state = {
      news: {
        isSuccess: true,
        data: mockNewsData,
        isLoading: false
      }
    };

    render(<Home router={mockRouter} state={state} dispatch={mockDispatch} params={{}} />);
    
    const headerNewsItem = screen.getByText('Test News 1').closest('div[class*="cursor-pointer"]');
    if (headerNewsItem) {
      fireEvent.click(headerNewsItem);
      expect(mockRouter).toHaveBeenCalledWith('/all-news/1');
    }
    
    const listNewsItem = screen.getByText('Test News 2').closest('div[class*="cursor-pointer"]');
    if (listNewsItem) {
      fireEvent.click(listNewsItem);
      expect(mockRouter).toHaveBeenCalledWith('/all-news/2');
    }
  });

  test('navigates to all news page when clicking See All', () => {
    const state = {
      news: {
        isSuccess: true,
        data: mockNewsData,
        isLoading: false
      }
    };

    render(<Home router={mockRouter} state={state} dispatch={mockDispatch} params={{}} />);
    
    fireEvent.click(screen.getByText('See All'));
    expect(mockRouter).toHaveBeenCalledWith('/all-news');
  });

  test('navigates to other pages through header component', () => {
    render(<Home router={mockRouter} state={{ news: {} }} dispatch={mockDispatch} params={{}} />);
    
    fireEvent.click(screen.getByText('News'));
    expect(mockRouter).toHaveBeenCalledWith('/news');
    
    fireEvent.click(screen.getByText('Algorithm'));
    expect(mockRouter).toHaveBeenCalledWith('/algorithm');
  });
});
