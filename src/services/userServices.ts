import { get, post, put, del } from './apiClient';
import API_ROUTES from './apiRoutes';

// Call to get all users
export const fetchAllUsers = async () => {
  return await get(API_ROUTES.getAllUsers);
};

// Call to get a user by email
export const fetchUserById = async (id: string) => {
  return await get(API_ROUTES.getUserById(id));
};

// Call to post a user
export const signUpUser = async (userData: any) => {
  return await post(API_ROUTES.signUp, userData);
};

// Call to update a user
export const updateUser = async (id: string, data: any) => {
  return await put(API_ROUTES.updateUser(id), data);
};

// Call to delete a user
export const deleteUser = async (id: string) => {
  return await del(API_ROUTES.deleteUser(id));
};
