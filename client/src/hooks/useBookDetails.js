import { useQuery } from '@tanstack/react-query';
import { booksAPI } from '@api/books';

/**
 * Custom hook to fetch book details by ID
 * Uses TanStack Query for caching and state management
 * @param {number} bookId - The ID of the book to fetch
 * @returns {Object} Query result with book data, loading state, and error
 */
export const useBookDetails = bookId => {
  return useQuery({
    queryKey: ['book', bookId],
    queryFn: async () => {
      const response = await booksAPI.getBookById(bookId);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!bookId, // Only run query if bookId is provided
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
