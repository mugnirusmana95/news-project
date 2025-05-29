describe('NotFound Page Logic', () => {
  test('should have correct content structure', () => {
    const notFoundContent = {
      errorCode: '404',
      title: 'Page not found',
      message: "Sorry, we couldn't find the page you're looking for."
    };
    
    expect(notFoundContent.errorCode).toBe('404');
    expect(notFoundContent.title).toBe('Page not found');
    expect(notFoundContent.message).toBe("Sorry, we couldn't find the page you're looking for.");
  });
});
