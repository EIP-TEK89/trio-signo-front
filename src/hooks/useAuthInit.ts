import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../services/userServices';
import { setUser, setToken, clearToken } from '../Store/AuthSlice';

/**
 * Hook to validate and refresh authentication on app startup
 */
export const useAuthInit = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check if we have a token in localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          return; // No token, nothing to do
        }

        // Verify token by getting current user
        const userData = await getCurrentUser();

        if (userData) {
          // If successful, update Redux store with user data
          dispatch(setToken(token));
          dispatch(setUser(userData));

          // Ensure user data is in localStorage
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          // If unsuccessful, clear authentication state
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          dispatch(clearToken());
        }
      } catch (error) {
        console.error('Error initializing authentication:', error);

        // On error, clear authentication state
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        dispatch(clearToken());
      }
    };

    initAuth();
  }, [dispatch]);
};

export default useAuthInit;
