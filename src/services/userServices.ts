import { get, post, put, del } from './apiClient';
import API_ROUTES from './apiRoutes';

// Appel pour récupérer tous les utilisateurs
export const fetchAllUsers = async () => {
  return await get(API_ROUTES.getAllUsers);
};

// Appel pour récupérer un utilisateur par ID
export const fetchUserById = async (id: string) => {
  return await get(API_ROUTES.getUserById(id));
};

// Appel pour créer un utilisateur
export const signUpUser = async (userData: any) => {
  return await post(API_ROUTES.signUp, userData);
};

// Appel pour mettre à jour un utilisateur
export const updateUser = async (id: string, data: any) => {
  return await put(API_ROUTES.updateUser(id), data);
};

// Appel pour supprimer un utilisateur
export const deleteUser = async (id: string) => {
  return await del(API_ROUTES.deleteUser(id));
};
