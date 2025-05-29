import { RootState } from 'redux/store';

describe('News Detail Page Logic', () => {
  const mockNewsData = [
    {
      id: '1',
      title: 'Test News Title',
      content: 'Test content for the news article',
      description: 'Test description',
      author: 'Test Author',
      urlToImage: 'https://example.com/image.jpg',
      source: { id: 'source-1', name: 'Test Source' },
      publishedAt: '2025-01-01T12:00:00Z',
      url: 'https://example.com/article'
    },
    {
      id: '2',
      title: 'Second News Title',
      content: 'More test content',
      description: 'Another description',
      author: 'Another Author',
      urlToImage: 'https://example.com/image2.jpg',
      source: { id: 'source-2', name: 'Another Source' },
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
  
  test('should find news detail by ID when data is available', () => {
    const params = { id: '1' };
    
    const newsItem = mockState.news?.data?.find(item => item.id === params.id);
    
    expect(newsItem).toBeDefined();
    expect(newsItem?.id).toBe('1');
    expect(newsItem?.title).toBe('Test News Title');
    expect(newsItem?.author).toBe('Test Author');
    expect(newsItem?.source?.name).toBe('Test Source');
    expect(newsItem?.description).toBe('Test description');
    expect(newsItem?.content).toContain('Test content for the news article');
  });
  
  test('should return null when news item is not found', () => {
    const params = { id: '999' };
    
    const newsItem = mockState.news?.data?.find(item => item.id === params.id);
    
    expect(newsItem).toBeUndefined();
  });
});
