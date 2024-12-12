const API_ROUTES = {
  // Users
  getAllUsers: '/api/auth/users',
  getUserById: (id: string) => `/api/auth/users/${id}`,
  getUserByEmail: (email: string) => `/api/auth/users/email/${email}`,
  getUserByUsername: (username: string) => `/api/auth/users/username/${username}`,

  // Authentication
  signUp: '/api/auth/sign-up',
  logIn: '/api/auth/log-in',
  refreshToken: '/api/auth/refresh',

  // User Management
  updateUser: (id: string) => `/api/auth/user/${id}`,
  deleteUser: (id: string) => `/api/auth/user/${id}`,

  // OAuth
  googleAuth: '/api/auth/google',
  googleAuthRedirect: '/api/auth/google/redirect',
};

export default API_ROUTES;
