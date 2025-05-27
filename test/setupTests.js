require('@testing-library/jest-dom');

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const originalError = console.error;
console.error = function(message) {
  if (message.includes('Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`') ||
      message.includes('Warning: The current testing environment is not configured to support act')) {
    return;
  }
  originalError.apply(console, arguments);
};
