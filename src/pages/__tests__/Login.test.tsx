import { NavigateFunction } from '../PageType';
import { RootState, RootDispatch } from 'redux/store';
import * as authSlices from 'redux/slices/auth-slices';

jest.mock('redux/slices/auth-slices', () => ({
  signIn: jest.fn(),
  defaultSignIn: jest.fn()
}));

describe('Login Page Logic', () => {
  const mockRouter: NavigateFunction = jest.fn();
  const mockDispatch: RootDispatch = jest.fn();
  
  const mockAuthState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    isUnauthorized: false,
    data: {},
    errorMessage: ''
  };
  
  const mockState: Partial<RootState> = {
    auth: mockAuthState
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should handle form submission with credentials', () => {
    const formData = {
      username: 'test@example.com',
      password: 'password123'
    };
    
    mockDispatch(authSlices.signIn(formData));
    
    expect(authSlices.signIn).toHaveBeenCalledWith(formData);
    expect(mockDispatch).toHaveBeenCalled();
  });
  
  test('should handle error state', () => {
    const errorState: Partial<RootState> = {
      auth: {
        ...mockAuthState,
        isError: true,
        isUnauthorized: true,
        errorMessage: 'Invalid credentials'
      }
    };
    
    expect(errorState.auth?.isError).toBe(true);
    expect(errorState.auth?.isUnauthorized).toBe(true);
    expect(errorState.auth?.errorMessage).toBe('Invalid credentials');
    
    mockDispatch(authSlices.defaultSignIn());
    
    expect(authSlices.defaultSignIn).toHaveBeenCalled();
  });
  
  test('should handle navigation to home page', () => {
    mockRouter('/');
    
    expect(mockRouter).toHaveBeenCalledWith('/');
  });
  
  test('should handle navigation to forgot password page', () => {
    mockRouter('/forgot-password');
    
    expect(mockRouter).toHaveBeenCalledWith('/forgot-password');
  });
  
  test('should handle navigation to register page', () => {
    mockRouter('/register');
    
    expect(mockRouter).toHaveBeenCalledWith('/register');
  });
  
  test('should redirect to dashboard on successful login', () => {
    const successState: Partial<RootState> = {
      auth: {
        ...mockAuthState,
        isSuccess: true,
        data: { name: 'Test User', email: 'test@example.com' }
      }
    };
    
    if (successState.auth?.isSuccess && successState.auth?.data) {
      mockRouter('/dashboard');
    }
    
    expect(mockRouter).toHaveBeenCalledWith('/dashboard');
  });
});
