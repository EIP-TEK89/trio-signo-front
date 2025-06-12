import { get, post, put } from './apiClient';
import API_ROUTES from './apiRoutes';

// Get all lessons with user progress
export const fetchAllLessonProgress = async () => {
  return await get(API_ROUTES.getLessonProgress);
};

// Get user progress for a specific lesson
export const fetchLessonProgressById = async (lessonId: string) => {
  return await get(`${API_ROUTES.getLessonProgress}/${lessonId}`);
};

// Start a lesson
export const startLesson = async (lessonId: string) => {
  return await post(`${API_ROUTES.getLessonProgress}/start`, { lessonId });
};

// Update lesson progress (steps and completion status)
export const updateLessonProgress = async (lessonId: string, data: { currentStep: number; completed: boolean }) => {
  return await put(`${API_ROUTES.getLessonProgress}/${lessonId}/update`, data);
};

// Complete a lesson (score calculated by backend)
export const completeLesson = async (lessonId: string) => {
  return await put(`${API_ROUTES.getLessonProgress}/${lessonId}/complete`, {});
};

// Reset lesson progress
export const resetLessonProgress = async (lessonId: string) => {
  return await post(`${API_ROUTES.getLessonProgress}/${lessonId}/reset`, {});
};
