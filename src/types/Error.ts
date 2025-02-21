type ErrorCredentials = {
  username?: string;
  email?: string;
  password?: string;
  apiError?: string;
};

type ApiError = {
  message: string;
  code?: number;
};

export type { ErrorCredentials, ApiError };
