import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Base URL
  timeout: 5000, // Request timeout
});

// Error handling
const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error('API error :', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'An error occurred');
  } else {
    console.error('Unknown error :', error);
    throw new Error('Unknown error');
  }
};

// API methods
export const get = async (url: string, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const post = async (url: string, data: any) => {
  try {
    const response = await apiClient.post(url, data);
    console.log('response', response);

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const del = async (url: string) => {
  try {
    const response = await apiClient.delete(url);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const put = async (url: string, data: any) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export default apiClient;
