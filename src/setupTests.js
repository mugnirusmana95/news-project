// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom');

// Mock modules that might cause issues in tests
jest.mock('@react-icons/all-files/io5/IoPerson', () => () => 'IoPerson');
jest.mock('@react-icons/all-files/io5/IoKey', () => () => 'IoKey');
jest.mock('@react-icons/all-files/io5/IoLogoFacebook', () => () => 'IoLogoFacebook');
jest.mock('@react-icons/all-files/io5/IoLogoGoogle', () => () => 'IoLogoGoogle');
jest.mock('@react-icons/all-files/io5/IoCall', () => () => 'IoCall');
jest.mock('@react-icons/all-files/ai/AiOutlineArrowLeft', () => () => 'AiOutlineArrowLeft');

// Mock components that might be used in multiple tests
jest.mock('components/alert', () => ({ show, title, message, type, onCancel }) => (
  show ? <div data-testid="alert" data-type={type}>{title}: {message}</div> : null
));

jest.mock('components/loader', () => ({ show }) => (
  show ? <div data-testid="loader">Loading...</div> : null
));

jest.mock('components/header', () => ({ router, currentRouter }) => (
  <div data-testid="header" data-current={currentRouter}>Header</div>
));

// Mock Redux actions
jest.mock('redux/slices/news-slices', () => ({
  getNews: jest.fn(),
  defaultNews: jest.fn()
}));

jest.mock('redux/slices/auth-slices', () => ({
  signIn: jest.fn(),
  defaultSignIn: jest.fn(),
  logOut: jest.fn()
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1'
  })
}));

// Mock moment
jest.mock('moment', () => {
  const mockMoment = () => ({
    format: () => '01 Jan 2025, 12:00'
  });
  mockMoment.utc = () => mockMoment();
  return mockMoment;
});
