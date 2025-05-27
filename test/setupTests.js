// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom');

// Mock implementation for window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress React act() warnings
// See: https://github.com/testing-library/react-testing-library/issues/281
const originalError = console.error;
console.error = function(message) {
  if (message.includes('Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`') ||
      message.includes('Warning: The current testing environment is not configured to support act')) {
    return;
  }
  originalError.apply(console, arguments);
};
