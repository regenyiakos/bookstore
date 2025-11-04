import apiClient from './client.js';

/**
 * Authentication API methods
 * All endpoints use HttpOnly cookies for token management
 */

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password (min 8 characters)
 * @returns {Promise<Object>} Response with user data and success message
 */
export const register = async userData => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response;
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Login user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User's email address
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} Response with user data and success message
 */
export const login = async credentials => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response;
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Logout current user
 * Clears HttpOnly cookies on the server
 * @returns {Promise<Object>} Response with success message
 */
export const logout = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response;
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Get current authenticated user
 * Uses access token from HttpOnly cookie
 * @returns {Promise<Object>} Response with user data
 */
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response;
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Refresh access token
 * Uses refresh token from HttpOnly cookie
 * @returns {Promise<Object>} Response with success message
 */
export const refreshToken = async () => {
  try {
    const response = await apiClient.post('/auth/refresh');
    return response;
  } catch (error) {
    throw handleAuthError(error);
  }
};

/**
 * Handle authentication errors and provide user-friendly messages
 * @param {Error} error - The error object from axios
 * @returns {Error} Formatted error with user-friendly message
 */
const handleAuthError = error => {
  // Network error
  if (!error.response) {
    return new Error('Network error. Please check your internet connection.');
  }

  // Server error with custom message
  const { status, data } = error.response;
  const message = data?.message || data?.error?.message;

  switch (status) {
    case 400:
      return new Error(message || 'Invalid input. Please check your details.');
    case 401:
      return new Error(message || 'Invalid credentials. Please try again.');
    case 403:
      return new Error(message || 'Access denied.');
    case 404:
      return new Error(message || 'Service not found.');
    case 409:
      return new Error(message || 'This email is already registered.');
    case 422:
      return new Error(message || 'Validation failed. Please check your input.');
    case 500:
      return new Error('Server error. Please try again later.');
    default:
      return new Error(message || 'An unexpected error occurred. Please try again.');
  }
};

// Export as default object for convenience
const authAPI = {
  register,
  login,
  logout,
  getCurrentUser,
  refreshToken,
};

export default authAPI;
