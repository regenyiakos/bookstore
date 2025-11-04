import { useQuery } from '@tanstack/react-query';
import { booksAPI } from '@/api/books';

/**
 * Custom hook for fetching book categories with real-time counts
 * @returns {Object} Query result with categories data, loading state, and error
 */
export const useCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await booksAPI.getCategories();
      return response;
    },
    staleTime: 1000 * 60 * 10, // Consider data fresh for 10 minutes
    cacheTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
  });

  // Map backend response to frontend expected structure
  const categories = query.data?.data?.categories || [];
  const mappedCategories = categories.map((cat, index) => ({
    id: index + 1,
    name: cat.name,  // Backend sends 'name', not 'category'
    bookCount: cat.count,
  }));

  return {
    categories: mappedCategories,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
