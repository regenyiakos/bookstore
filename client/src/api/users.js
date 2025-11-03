import apiClient from './client';

// User API calls
export const usersAPI = {
  // Get all users (Admin only)
  getUsers: async params => {
    return apiClient.get('/users', { params });
  },

  // Get user by ID (Admin only)
  getUserById: async id => {
    return apiClient.get(`/users/${id}`);
  },

  // Update user role (Admin only)
  updateUserRole: async (id, role) => {
    return apiClient.patch(`/users/${id}/role`, { role });
  },

  // Delete user (Admin only)
  deleteUser: async id => {
    return apiClient.delete(`/users/${id}`);
  },

  // Get current user profile
  getProfile: async () => {
    return apiClient.get('/profile');
  },

  // Update current user profile
  updateProfile: async profileData => {
    return apiClient.put('/profile', profileData);
  },

  // Change password
  changePassword: async passwordData => {
    return apiClient.put('/profile/password', passwordData);
  },
};
