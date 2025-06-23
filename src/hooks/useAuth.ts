import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import { RootState } from '../Store/Store';
import { User, loginUser, logoutUser, setToken, setUser, clearToken } from '../Store/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { getCurrentUser } from '../services/userServices';

/**
 * Custom hook for handling authentication
 * Provides easy access to auth state and authentication functions
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user, isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isValidating, setIsValidating] = useState(false);

  /**
   * Login function
   */
  const login = useCallback(
    (credentials: { email: string; password: string }) => {
      return dispatch(loginUser(credentials) as any);
    },
    [dispatch],
  );

  /**
   * Validate current token with backend
   */
  const validateToken = useCallback(async () => {
    // If no token exists, we're definitely not authenticated
    if (!token) return false;

    setIsValidating(true);
    try {
      // Fetch current user to validate token
      const userData = await getCurrentUser();
      if (userData) {
        // Ensure user data is up to date
        dispatch(setUser(userData));
        setIsValidating(false);
        return true;
      } else {
        // Token is invalid, clear session
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        dispatch(clearToken());
        setIsValidating(false);
        return false;
      }
    } catch (error) {
      console.error('Token validation error:', error);
      // On error, token is likely invalid
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      dispatch(clearToken());
      setIsValidating(false);
      return false;
    }
  }, [token, dispatch]);

  /**
   * Logout function
   */
  const logout = useCallback(() => {
    // D'abord, effaçons manuellement les tokens du localStorage
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    // Update Redux state
    dispatch(clearToken());

    // Here we assume logoutUser is an async thunk that handles API call
    dispatch(logoutUser() as any);

    // Redirect to sign-in page
    navigate(ROUTES.SIGNIN);
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
    [dispatch],
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
    isValidating,
    login,
    logout,
    setSession,
    clearSession,
    validateToken,
  };
};
