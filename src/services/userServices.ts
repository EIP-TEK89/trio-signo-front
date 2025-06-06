import { get, post, put, del } from './apiClient';
import API_ROUTES from './apiRoutes';
import { UserCredentials } from '../types/User';

// Call to get all users
export const fetchAllUsers = async () => {
  return await get(API_ROUTES.getAllUsers);
};

// Call to get a user by email
export const fetchUserById = async (id: string) => {
  return await get(API_ROUTES.getUserById(id));
};

// Call to sign up a user
export const signUpUser = async (userData: UserCredentials) => {
  return await post(API_ROUTES.signUp, userData);
};

// Call to log in a user
export const logInUser = async (userData: UserCredentials) => {
  return await post(API_ROUTES.logIn, userData);
};

// Call to update a user
export const updateUser = async (id: string, data: any) => {
  return await put(API_ROUTES.updateUser(id), data);
};

// Call to delete a user
export const deleteUser = async (id: string) => {
  return await del(API_ROUTES.deleteUser(id));
};
