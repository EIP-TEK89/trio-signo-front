import apiClient from './apiClient';
import { API_ROUTES } from '$constants/routes';

export interface Sign {
  id: string;
  word: string;
  definition: string;
  mediaUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const signService = {
  getAllSigns: async (): Promise<Sign[]> => {
    const response = await apiClient.get(API_ROUTES.getAllSigns);
    return response.data;
  },

  searchSignByName: async (name: string): Promise<Sign> => {
    const response = await apiClient.get(API_ROUTES.searchSignByName(name));
    return response.data;
  },
};

export default signService; 