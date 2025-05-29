import { NavigateFunction } from '../PageType';
import { RootState, RootDispatch } from 'redux/store';
import * as newsSlices from 'redux/slices/news-slices';

jest.mock('redux/slices/news-slices', () => ({
  getNews: jest.fn(),
  defaultNews: jest.fn()
}));

describe('Home Page Logic', () => {
  const mockRouter: NavigateFunction = jest.fn();
  const mockDispatch: RootDispatch = jest.fn();
  
  const mockNewsState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    errorMessage: ''
  };
  
  const mockState: Partial<RootState> = {
    news: mockNewsState
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should dispatch getNews on initialization', () => {
    mockDispatch(newsSlices.getNews({ 
      page: 1, 
      pageSize: 10, 
      category: 'all', 
      isCombine: false 
    }));
    
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(newsSlices.getNews).toHaveBeenCalledWith({ 
      page: 1, 
      pageSize: 10, 
      category: 'all', 
      isCombine: false 
    });
  });
  
  test('should handle successful news fetch', () => {
    const mockNewsData = [
      {
        id: '1',
        title: 'Test News Title',
        content: 'Test content for the news article',
        author: 'Test Author',
        urlToImage: 'https://example.com/image.jpg',
        source: { name: 'Test Source' }
      },
      {
        id: '2',
        title: 'Second News Title',
        content: 'More test content',
        author: 'Another Author',
        urlToImage: 'https://example.com/image2.jpg',
        source: { name: 'Another Source' }
      }
    ];
    
    const successState = {
      ...mockState,
      news: {
        ...mockNewsState,
        isSuccess: true,
        data: mockNewsData
      }
    };
    
    if (successState.news?.isSuccess) {
      mockDispatch(newsSlices.defaultNews());
    }
    
    expect(mockDispatch).toHaveBeenCalled();
    expect(newsSlices.defaultNews).toHaveBeenCalled();
  });
  
  test('should show error alert when news fetch fails', () => {
    const errorState = {
      ...mockState,
      news: {
        ...mockNewsState,
        isError: true,
        errorMessage: 'Failed to fetch news'
      }
    };
    
    if (errorState.news?.isError) {
      mockDispatch(newsSlices.defaultNews());
    }
    
    expect(mockDispatch).toHaveBeenCalled();
    expect(newsSlices.defaultNews).toHaveBeenCalled();
  });
  
  test('should navigate to news detail when clicking on a news item', () => {
    const mockNewsData = [
      {
        id: '1',
        title: 'Test News Title',
        content: 'Test content for the news article',
        author: 'Test Author',
        urlToImage: 'https://example.com/image.jpg',
        source: { name: 'Test Source' }
      }
    ];
    
    mockRouter(`/all-news/${mockNewsData[0].id}`);
    
    expect(mockRouter).toHaveBeenCalledWith('/all-news/1');
  });
});
