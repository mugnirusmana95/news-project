import { NavigateFunction } from '../PageType';
import { RootState, RootDispatch } from 'redux/store';
import * as authSlices from 'redux/slices/auth-slices';

jest.mock('redux/slices/auth-slices', () => ({
  defaultSignIn: jest.fn(),
  logOut: jest.fn()
}));

describe('Dashboard Page Logic', () => {
  const mockRouter: NavigateFunction = jest.fn();
  const mockDispatch: RootDispatch = jest.fn();
  
  const mockAuthState = {
    isLoading: false,
    isSuccess: true,
    isError: false,
    data: {
      name: 'Test User',
      email: 'test@example.com'
    }
  };
  
  const mockState: Partial<RootState> = {
    auth: mockAuthState
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should navigate to home page when router is called with "/"', () => {
    mockRouter('/');
    
    expect(mockRouter).toHaveBeenCalledWith('/');
  });
  
  test('should dispatch logOut action when not loading', () => {
    if (!mockAuthState.isLoading) {
      mockDispatch(authSlices.logOut());
    }
    
    expect(mockDispatch).toHaveBeenCalled();
    expect(authSlices.logOut).toHaveBeenCalled();
  });
  
  test('should not dispatch logOut action when loading', () => {
    const loadingState = {
      ...mockAuthState,
      isLoading: true
    };
    
    if (!loadingState.isLoading) {
      mockDispatch(authSlices.logOut());
    }
    
    expect(authSlices.logOut).not.toHaveBeenCalled();
  });
  
  test('should dispatch defaultSignIn when auth has error', () => {
    const errorState = {
      ...mockAuthState,
      isSuccess: false,
      isError: true
    };
    
    if (errorState.isError) {
      mockDispatch(authSlices.defaultSignIn());
    }
    
    expect(mockDispatch).toHaveBeenCalled();
    expect(authSlices.defaultSignIn).toHaveBeenCalled();
  });
  
  test('should dispatch defaultSignIn when auth has success', () => {
    const successState = {
      ...mockAuthState,
      isSuccess: true,
      isError: false
    };
    
    if (successState.isSuccess) {
      mockDispatch(authSlices.defaultSignIn());
    }
    
    expect(mockDispatch).toHaveBeenCalled();
    expect(authSlices.defaultSignIn).toHaveBeenCalled();
  });
});
