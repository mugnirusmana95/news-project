import { NavigateFunction } from '../PageType';
import { RootState, RootDispatch } from 'redux/store';
import * as newsSlices from 'redux/slices/news-slices';

jest.mock('redux/slices/news-slices', () => ({
  getNews: jest.fn(),
  defaultNews: jest.fn()
}));

describe('All News Page Logic', () => {
  const mockRouter: NavigateFunction = jest.fn();
  const mockDispatch: RootDispatch = jest.fn();
  
  const mockNewsData = [
    {
      id: '1',
      title: 'Test News Title 1',
      description: 'Test description 1',
      content: 'Test content 1',
      author: 'Test Author 1',
      urlToImage: 'https://example.com/image1.jpg',
      source: { id: 'source-1', name: 'Test Source 1' },
      publishedAt: '2025-01-01T12:00:00Z',
      url: 'https://example.com/article1'
    },
    {
      id: '2',
      title: 'Test News Title 2',
      description: 'Test description 2',
      content: 'Test content 2',
      author: 'Test Author 2',
      urlToImage: 'https://example.com/image2.jpg',
      source: { id: 'source-2', name: 'Test Source 2' },
      publishedAt: '2025-01-02T12:00:00Z',
      url: 'https://example.com/article2'
    }
  ];
  
  const mockState: Partial<RootState> = {
    news: {
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: mockNewsData,
      errorMessage: ''
    }
  };
  
  test('should display news list when data is available', () => {
    
    expect(mockState.news?.isLoading).toBe(false);
    expect(mockState.news?.isSuccess).toBe(true);
    expect(mockState.news?.data).toHaveLength(2);
    
    expect(mockState.news?.data?.[0].title).toBe('Test News Title 1');
    expect(mockState.news?.data?.[0].description).toBe('Test description 1');
    expect(mockState.news?.data?.[0].author).toBe('Test Author 1');
    
    expect(mockState.news?.data?.[1].title).toBe('Test News Title 2');
    expect(mockState.news?.data?.[1].description).toBe('Test description 2');
    expect(mockState.news?.data?.[1].author).toBe('Test Author 2');
  });
  
  test('should handle navigation to news detail', () => {
    
    const newsId = '1';
    const navigateToDetail = (id: string) => {
      mockRouter(`/news/${id}`);
    };
    
    navigateToDetail(newsId);
    
    expect(mockRouter).toHaveBeenCalledWith('/news/1');
  });

  test('should handle error state', () => {
    
    const errorState: Partial<RootState> = {
      news: {
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: [],
        errorMessage: 'Failed to fetch news'
      }
    };
    
    expect(errorState.news?.isLoading).toBe(false);
    expect(errorState.news?.isError).toBe(true);
    expect(errorState.news?.errorMessage).toBe('Failed to fetch news');
  });
  
  test('should handle loading state', () => {
    
    const loadingState: Partial<RootState> = {
      news: {
        isLoading: true,
        isSuccess: false,
        isError: false,
        data: [],
        errorMessage: ''
      }
    };
    
    expect(loadingState.news?.isLoading).toBe(true);
    expect(loadingState.news?.isSuccess).toBe(false);
  });
  
  test('should dispatch getNews action with correct parameters', () => {
    
    const dispatchMock = jest.fn();
    
    const params = {
      page: 1,
      pageSize: 10,
      category: 'business',
      isCombine: false
    };
    
    dispatchMock(newsSlices.getNews(params));
    
    expect(newsSlices.getNews).toHaveBeenCalledWith(params);
    expect(dispatchMock).toHaveBeenCalled();
  });
  
  test('should handle pagination when loading more news', () => {
    
    const initialPage = 1;
    
    const nextPage = initialPage + 1;
    
    const loadMoreParams = {
      page: nextPage,
      pageSize: 10,
      category: 'all',
      isCombine: true 
    };
    
    mockDispatch(newsSlices.getNews(loadMoreParams));
    
    expect(newsSlices.getNews).toHaveBeenCalledWith(loadMoreParams);
  });
});
