import apiClient from './client';

// Review API calls
export const reviewsAPI = {
  // Get reviews for a book
  getBookReviews: async (bookId, params) => {
    return apiClient.get(`/books/${bookId}/reviews`, { params });
  },

  // Create review for a book
  createReview: async (bookId, reviewData) => {
    return apiClient.post(`/books/${bookId}/reviews`, reviewData);
  },

  // Update own review
  updateReview: async (reviewId, reviewData) => {
    return apiClient.put(`/reviews/${reviewId}`, reviewData);
  },

  // Delete own review
  deleteReview: async reviewId => {
    return apiClient.delete(`/reviews/${reviewId}`);
  },
};
