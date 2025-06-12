import { get, post } from './apiClient';

// Get all exercises for a specific lesson
export const fetchExercisesByLessonId = async (lessonId: string) => {
  return await get(`/exercises/lesson/${lessonId}`);
};

// Get a specific exercise by ID
export const fetchExerciseById = async (id: string) => {
  return await get(`/exercises/${id}`);
};

// Check an exercise answer and update user progress
export const checkExerciseAnswer = async (
  id: string,
  answer: string,
  multipleChoice: boolean
) => {
  return await post(`/exercises/${id}/check`, { answer, multipleChoice });
}; 