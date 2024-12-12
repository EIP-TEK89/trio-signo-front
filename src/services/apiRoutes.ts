const API_ROUTES = {
  // Users
  getAllUsers: '/auth/users',
  getUserById: (id: string) => `/auth/users/${id}`,
  getUserByEmail: (email: string) => `/auth/users/email/${email}`,
  getUserByUsername: (username: string) => `/auth/users/username/${username}`,

  // Authentication
  signUp: '/auth/sign-up',
  logIn: '/auth/log-in',
  refreshToken: '/auth/refresh',

  // User Management
  updateUser: (id: string) => `/auth/user/${id}`,
  deleteUser: (id: string) => `/auth/user/${id}`,

  // OAuth
  googleAuth: '/auth/google',
  googleAuthRedirect: '/auth/google/redirect',
};

export default API_ROUTES;
