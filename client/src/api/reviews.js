import apiClient from './client';

/**
 * Review API calls
 * All review-related operations
 */
export const reviewsAPI = {
  /**
   * Get reviews for a specific book with pagination
   * @param {number} bookId - The book ID
   * @param {Object} params - Query parameters (page, limit, sortBy, rating)
   * @returns {Promise} Review data with pagination and summary
   */
  getReviewsForBook: async (bookId, params = {}) => {
    return apiClient.get('/reviews', {
      params: {
        bookId,
        ...params,
      },
    });
  },

  /**
   * Get rating statistics for a book
   * @param {number} bookId - The book ID
   * @returns {Promise} Rating distribution data
   */
  getReviewStats: async bookId => {
    return apiClient.get(`/reviews/stats/${bookId}`);
  },

  /**
   * Get current user's review for a specific book
   * @param {number} bookId - The book ID
   * @returns {Promise} User's review or null
   */
  getUserReview: async bookId => {
    return apiClient.get(`/reviews/user/${bookId}`);
  },

  /**
   * Create a new review
   * @param {Object} reviewData - { bookId, rating, comment }
   * @returns {Promise} Created review
   */
  createReview: async reviewData => {
    return apiClient.post('/reviews', reviewData);
  },

  /**
   * Update an existing review
   * @param {number} reviewId - The review ID
   * @param {Object} reviewData - { rating, comment }
   * @returns {Promise} Updated review
   */
  updateReview: async (reviewId, reviewData) => {
    return apiClient.put(`/reviews/${reviewId}`, reviewData);
  },

  /**
   * Delete a review
   * @param {number} reviewId - The review ID
   * @returns {Promise} Success message
   */
  deleteReview: async reviewId => {
    return apiClient.delete(`/reviews/${reviewId}`);
  },
};
