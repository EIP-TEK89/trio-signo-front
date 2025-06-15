/**
 * Get the base URL for API requests
 * 
 * This function determines the base URL to use for API requests.
 * - In standalone development mode, it points to localhost:3000 (direct backend)
 * - In containerized environment, it uses the current origin (since nginx handles proxying)
 * - In production, it can be overridden with an env variable if needed
 */
export const getBaseUrl = (): string => {
  // Get environment-specific API URL if defined
  const configuredApiUrl = import.meta.env.VITE_API_URL;
  if (configuredApiUrl) {
    return configuredApiUrl;
  }
  
  // In development mode (non-containerized)
  if (process.env.NODE_ENV === 'development' && window.location.hostname === 'localhost' && window.location.port === '5173') {
    return 'http://localhost:3000';
  }
  
  // In containerized or production environment, 
  // API is proxied through nginx at the same origin
  return window.location.origin;
};

/**
 * Get the base URL with the current port (for frontend routing)
 */
export const getBaseUrlWithPort = (): string => {
  return window.location.origin;
};
