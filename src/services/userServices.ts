import { get, post, put, del } from './apiClient';
import { API_ROUTES } from '$constants/routes';
import { UserCredentials } from '../types/User';

/**
 * Fetch all users (admin only)
 */
export const fetchAllUsers = async () => {
  return await get(API_ROUTES.getAllUsers);
};

/**
 * Fetch user by ID
 */
export const fetchUserById = async (id: string) => {
  return await get(API_ROUTES.getUserById(id));
};

/**
 * Sign up a new user
 */
export const signUpUser = async (userData: UserCredentials) => {
  return await post(API_ROUTES.signUp, userData);
};

/**
 * Log in a user
 */
export const logInUser = async (userData: UserCredentials) => {
  return await post(API_ROUTES.logIn, userData);
};

/**
 * Log out a user
 */
export const logOutUser = async () => {
  try {
    // Call the backend logout endpoint
    await post(API_ROUTES.logout);
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear local storage regardless of API response
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

/**
 * Refresh tokens
 */
export const refreshTokens = async (refreshToken: string) => {
  return await post(API_ROUTES.refreshToken, { refreshToken });
};

/**
 * Get current user profile
 */
export const getCurrentUser = async () => {
  return await get(API_ROUTES.currentUser);
};

/**
 * Update user profile
 */
export const updateUser = async (id: string, data: any) => {
  return await put(API_ROUTES.updateUser(id), data);
};

/**
 * Delete user account
 */
export const deleteUser = async (id: string) => {
  return await del(API_ROUTES.deleteUser(id));
};
