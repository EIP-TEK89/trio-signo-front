import { ApiError } from '../types/Error';

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export { isApiError };
