export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  SIGNIN: '/signin',
  COURSES: '/courses',
  COURSES_LESSON: '/courses/:lessonId',
  COURSES_JOURNEY: {
    HOME: '/coursesJourney/home',
    QUESTS: '/coursesJourney/quests',
    LEAGUE: '/coursesJourney/league',
    PROFILE: '/coursesJourney/profile',
    TRAINING: '/coursesJourney/training',
    SHOP: '/coursesJourney/shop',
    DICTIONARY: '/coursesJourney/dictionary',
    DICTIONARY_DETAILS: '/coursesJourney/dictionary/:signId',
  },
} as const; 

/**
 * API route definitions
 *
 * This file contains all API endpoint routes used in the application.
 * Update these to match your backend API structure.
 */

export const API_URL: string = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_SUFFIX_URL;

export const API_ROUTES = {
  // Auth endpoints
  signUp: API_URL + '/auth/register',
  logIn: API_URL + '/auth/login',
  logout: API_URL + '/auth/logout',
  refreshToken: API_URL + '/auth/refresh',
  currentUser: API_URL + '/auth/me',

  // User management
  getAllUsers: API_URL + '/user',
  getUserById: (id: string) => API_URL + `/user/${id}`,
  getUserByEmail: (email: string) => API_URL + `/user/email/${email}`,
  getUserByUsername: (username: string) => API_URL + `/user/username/${username}`,
  updateUser: (id: string) => API_URL + `/user/${id}`,
  deleteUser: (id: string) => API_URL + `/user/${id}`,

  // OAuth routes
  googleAuth: API_URL + '/auth/google',
  googleAuthRedirect: API_URL + '/auth/google/callback',

  // Dictionary endpoints
  getDictionary: API_URL + '/dictionary',
  getDictionaryEntry: (id: string) => API_URL + `/dictionary/${id}`,

  // Lesson endpoints
  getLessons: API_URL + '/lesson',
  getLessonById: (id: string) => API_URL + `/lesson/${id}`,
  getLessonProgress: API_URL + '/lesson-progress',
  updateLessonProgress: (id: string) => API_URL + `/lesson-progress/${id}`,

  // Exercise endpoints
  getExercises: (lessonId: string) => API_URL + `/exercise?lessonId=${lessonId}`,
  getExerciseById: (id: string) => API_URL + `/exercise/${id}`,
  submitExerciseAnswer: (id: string) => API_URL + `/exercise/${id}/answer`,

  // Sign endpoints
  getAllSigns: '/signs',
  searchSignByName: (name: string) => API_URL + `/signs/search/${name}`,
};