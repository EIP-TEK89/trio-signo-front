/**
 * API route definitions
 * 
 * This file contains all API endpoint routes used in the application.
 * Update these to match your backend API structure.
 */

const API_ROUTES = {
  // Auth endpoints
  signUp: '/auth/register',
  logIn: '/auth/login',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh',
  currentUser: '/auth/me',
  
  // User management
  getAllUsers: '/user',
  getUserById: (id: string) => `/user/${id}`,
  getUserByEmail: (email: string) => `/user/email/${email}`,
  getUserByUsername: (username: string) => `/user/username/${username}`,
  updateUser: (id: string) => `/user/${id}`,
  deleteUser: (id: string) => `/user/${id}`,
  
  // OAuth routes
  googleAuth: '/auth/google',
  googleAuthRedirect: '/auth/google/callback',
  
  // Dictionary endpoints
  getDictionary: '/dictionary',
  getDictionaryEntry: (id: string) => `/dictionary/${id}`,
  
  // Lesson endpoints
  getLessons: '/lesson',
  getLessonById: (id: string) => `/lesson/${id}`,
  getLessonProgress: '/lesson-progress',
  updateLessonProgress: (id: string) => `/lesson-progress/${id}`,
  
  // Exercise endpoints
  getExercises: (lessonId: string) => `/exercise?lessonId=${lessonId}`,
  getExerciseById: (id: string) => `/exercise/${id}`,
  submitExerciseAnswer: (id: string) => `/exercise/${id}/answer`,
};

export default API_ROUTES;
