import { get } from './apiClient';
import API_ROUTES from './apiRoutes';

// Fetch all published lessons
export const fetchAllLessons = async () => {
  return await get(API_ROUTES.getLessons);
};

// Fetch a specific published lesson by ID
export const fetchLessonById = async (id: string) => {
  return await get(API_ROUTES.getLessonById(id));
};
