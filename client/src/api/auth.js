import apiClient from './client';

// Authentication API calls
export const authAPI = {
  // Register new user
  register: async userData => {
    return apiClient.post('/auth/register', userData);
  },

  // Login user
  login: async credentials => {
    return apiClient.post('/auth/login', credentials);
  },

  // Logout user
  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  // Refresh access token
  refresh: async () => {
    return apiClient.post('/auth/refresh');
  },

  // Get current user
  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  },
};
