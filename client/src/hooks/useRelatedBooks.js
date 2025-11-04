import { useQuery } from '@tanstack/react-query';
import { booksAPI } from '@api/books';

/**
 * Custom hook to fetch related books (same category)
 * @param {number} bookId - The current book ID
 * @param {number} limit - Maximum number of related books to fetch (default: 6)
 * @returns {Object} Query result with related books, loading state, and error
 */
export const useRelatedBooks = (bookId, limit = 6) => {
  return useQuery({
    queryKey: ['relatedBooks', bookId, limit],
    queryFn: async () => {
      const response = await booksAPI.getRelatedBooks(bookId, limit);
      return response.data.books;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!bookId,
    retry: 1,
  });
};
