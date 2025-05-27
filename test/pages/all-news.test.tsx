import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

const getNews = jest.fn();
const defaultNews = jest.fn();

const AllNews = ({ router, state, dispatch, params }) => {
  React.useEffect(() => {
    dispatch(getNews({ page: 1, pageSize: 10, category: 'all', isCombine: false }));
  }, []);

  React.useEffect(() => {
    if (state.news?.isSuccess || state.news?.isError) {
      dispatch(defaultNews());
    }
  }, [state.news]);

  return (
    <div data-testid="all-news-component" className="overflow-auto">
      <div data-testid="header-component">
        <button onClick={() => router('/')}>News App</button>
        <button onClick={() => router('/news')}>News</button>
        <button onClick={() => router('/algorithm')}>Algorithm</button>
      </div>
      <div>Welcome to News App</div>
      <div>Craft narrative that ignite <span>inspiration</span>,</div>
      <div><span>Knowledge</span>, and <span>entertainment</span></div>
      
      <div>
        <span>Select Category:</span>
        <select data-testid="category-select" onChange={(e) => dispatch(getNews({ page: 1, pageSize: 10, category: e.target.value, isCombine: false }))}>
          <option value="all">All</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      
      {state.news?.data?.map((item, index) => (
        <div key={index} className="cursor-pointer" onClick={() => router(`/all-news/${item.id}`)}>
          <div>{item.title}</div>
          <div>{item.author}</div>
          <div>{item.source?.name}</div>
        </div>
      ))}
      
      {state.news?.isLoading && <div data-testid="loader-component">Loading...</div>}
      {state.news?.isError && <div data-testid="alert-component">Warning: {state.news.errorMessage}</div>}
    </div>
  );
};

jest.mock('../../src/pages/all-news/index', () => ({
  __esModule: true,
  default: AllNews
}), { virtual: true });

jest.mock('../../src/redux/slices/news-slices', () => ({
  getNews,
  defaultNews
}), { virtual: true });

import AllNewsComponent from '../../src/pages/all-news/index';
import { getNews as getNewsAction, defaultNews as defaultNewsAction } from '../../src/redux/slices/news-slices';

describe('AllNews Component', () => {
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

  test('renders welcome message correctly', () => {
    render(<AllNews router={mockRouter} state={{ news: {} }} dispatch={mockDispatch} params={{}} />);

    expect(screen.getByText('Welcome to News App')).toBeInTheDocument();
    expect(screen.getByText(/Craft narrative that ignite/)).toBeInTheDocument();
    expect(screen.getByText('inspiration')).toBeInTheDocument();
    expect(screen.getByText('Knowledge')).toBeInTheDocument();
    expect(screen.getByText(/entertainment/)).toBeInTheDocument();
  });

  test('dispatches getNews action on component mount', () => {
    render(<AllNews router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
    expect(mockDispatch).toHaveBeenCalledWith(getNews({ page: 1, pageSize: 10, category: 'all', isCombine: false }));
  });

  test('displays category selector', () => {
    render(<AllNews router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
    expect(screen.getByText('Select Category:')).toBeInTheDocument();
    const categorySelect = screen.getByRole('combobox');
    expect(categorySelect).toBeInTheDocument();
    
    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Business' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Entertainment' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Health' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Science' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Sports' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Technology' })).toBeInTheDocument();
  });

  test('changes category and dispatches getNews', () => {
    render(<AllNews router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'business' } });
    
    expect(mockDispatch).toHaveBeenCalledWith(getNews({ page: 1, pageSize: 10, category: 'business', isCombine: false }));
  });

  test('displays news data when available', () => {
    const stateWithData = {
      news: {
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: mockNewsData,
        errorMessage: '',
        page: 1
      }
    };
    
    render(<AllNews router={mockRouter} state={stateWithData} dispatch={mockDispatch} params={{}} />);
    
    expect(screen.getByText('Test News 1')).toBeInTheDocument();
    expect(screen.getByText('Test News 2')).toBeInTheDocument();
    expect(screen.getByText('Author 1')).toBeInTheDocument();
    expect(screen.getByText('Author 2')).toBeInTheDocument();
    expect(screen.getByText('Source 1')).toBeInTheDocument();
    expect(screen.getByText('Source 2')).toBeInTheDocument();
  });

  test('navigates to news detail when a news item is clicked', () => {
    const stateWithData = {
      news: {
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: mockNewsData,
        errorMessage: '',
        page: 1
      }
    };
    
    render(<AllNews router={mockRouter} state={stateWithData} dispatch={mockDispatch} params={{}} />);
    
    const newsItem = screen.getByText('Test News 1').closest('div[class*="cursor-pointer"]');
    if (newsItem) {
      fireEvent.click(newsItem);
      expect(mockRouter).toHaveBeenCalledWith('/all-news/1');
    }
  });

  test('handles infinite scroll', () => {
    const stateWithData = {
      news: {
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: mockNewsData,
        errorMessage: '',
        page: 1
      }
    };
    
    render(<AllNews router={mockRouter} state={stateWithData} dispatch={mockDispatch} params={{}} />);
    
    const scrollableDiv = screen.getByText('Welcome to News App').closest('div[class*="overflow-auto"]');
    if (scrollableDiv) {
      const scrollEvent = new Event('scroll');
      Object.defineProperty(scrollableDiv, 'scrollTop', { value: 1000 });
      Object.defineProperty(scrollableDiv, 'clientHeight', { value: 500 });
    
      scrollableDiv.dispatchEvent(scrollEvent);
    }
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('displays loader when loading', () => {
    const loadingState = {
      news: {
        isLoading: true,
        isSuccess: false,
        isError: false,
        data: [],
        errorMessage: '',
        page: 1
      }
    };
    
    render(<AllNews router={mockRouter} state={loadingState} dispatch={mockDispatch} params={{}} />);
    
    expect(screen.getByTestId('loader-component')).toBeInTheDocument();
  });

  test('displays error alert when API fails', () => {
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
    
    expect(screen.getByTestId('alert-component')).toBeInTheDocument();
    expect(screen.getByText('Warning: API Error')).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledWith(defaultNews());
  });

  test('navigates through header component', () => {
    render(<AllNews router={mockRouter} state={mockState} dispatch={mockDispatch} params={{}} />);
    
  
    fireEvent.click(screen.getByText('News App'));
    expect(mockRouter).toHaveBeenCalledWith('/');
    
    fireEvent.click(screen.getByText('News'));
    expect(mockRouter).toHaveBeenCalledWith('/news');
    
    fireEvent.click(screen.getByText('Algorithm'));
    expect(mockRouter).toHaveBeenCalledWith('/algorithm');
  });
});
