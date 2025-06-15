import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../Store/Store';
import { User, loginUser, logoutUser, setToken, setUser, clearToken } from '../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for handling authentication
 * Provides easy access to auth state and authentication functions
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  /**
   * Login function
   */
  const login = useCallback(
    (credentials: { email: string; password: string }) => {
      return dispatch(loginUser(credentials) as any);
    },
    [dispatch]
  );

  /**
   * Logout function
   */
  const logout = useCallback(() => {
    dispatch(logoutUser() as any);
    navigate('/login');
  }, [dispatch, navigate]);

  /**
   * Update user session manually (e.g., after OAuth login)
   */
  const setSession = useCallback(
    (newToken: string, newUser: User, refreshToken?: string) => {
      localStorage.setItem('token', newToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      localStorage.setItem('user', JSON.stringify(newUser));
      
      dispatch(setToken(newToken));
      dispatch(setUser(newUser));
    },
    [dispatch]
  );

  /**
   * Clear the authentication session
   */
  const clearSession = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    dispatch(clearToken());
  }, [dispatch]);

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    setSession,
    clearSession,
  };
};