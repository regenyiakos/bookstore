import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsAPI } from '@api/reviews';

/**
 * Custom hook to fetch reviews for a book with pagination
 * @param {number} bookId - The book ID
 * @param {Object} params - Query parameters (page, limit, sortBy, rating)
 * @returns {Object} Query result with reviews, pagination, and summary
 */
export const useReviews = (bookId, params = {}) => {
  return useQuery({
    queryKey: ['reviews', bookId, params],
    queryFn: async () => {
      const response = await reviewsAPI.getReviewsForBook(bookId, params);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!bookId,
    keepPreviousData: true, // Keep previous data while fetching new page
  });
};

/**
 * Custom hook to get current user's review for a book
 * @param {number} bookId - The book ID
 * @param {boolean} enabled - Whether to enable the query (user must be authenticated)
 * @returns {Object} Query result with user's review or null
 */
export const useUserReview = (bookId, enabled = true) => {
  return useQuery({
    queryKey: ['userReview', bookId],
    queryFn: async () => {
      const response = await reviewsAPI.getUserReview(bookId);
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    enabled: !!bookId && enabled,
    retry: false, // Don't retry on auth errors
  });
};

/**
 * Custom hook to create a review
 * @returns {Object} Mutation object with mutate function and states
 */
export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewData => reviewsAPI.createReview(reviewData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch reviews for this book
      queryClient.invalidateQueries(['reviews', variables.bookId]);
      // Invalidate user's review
      queryClient.invalidateQueries(['userReview', variables.bookId]);
      // Invalidate book details (to update review count)
      queryClient.invalidateQueries(['book', variables.bookId]);
    },
  });
};

/**
 * Custom hook to update a review
 * @returns {Object} Mutation object with mutate function and states
 */
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, reviewData }) =>
      reviewsAPI.updateReview(reviewId, reviewData),
    onSuccess: (data, variables) => {
      // Extract bookId from the response
      const bookId = data.data.book_id;

      // Invalidate queries
      queryClient.invalidateQueries(['reviews', bookId]);
      queryClient.invalidateQueries(['userReview', bookId]);
      queryClient.invalidateQueries(['book', bookId]);
    },
  });
};

/**
 * Custom hook to delete a review
 * @returns {Object} Mutation object with mutate function and states
 */
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, bookId }) => reviewsAPI.deleteReview(reviewId),
    onSuccess: (data, variables) => {
      // Invalidate queries using the bookId passed as a variable
      queryClient.invalidateQueries(['reviews', variables.bookId]);
      queryClient.invalidateQueries(['userReview', variables.bookId]);
      queryClient.invalidateQueries(['book', variables.bookId]);
    },
  });
};
