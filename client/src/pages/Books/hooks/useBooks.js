import { useQuery } from '@tanstack/react-query';
import { booksAPI } from '@/api/books';

/**
 * Custom hook for fetching books with filtering, sorting, and pagination
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {string[]} params.categories - Selected categories
 * @param {number} params.minPrice - Minimum price filter
 * @param {number} params.maxPrice - Maximum price filter
 * @param {string} params.sortBy - Sort field
 * @param {string} params.sortOrder - Sort order (asc/desc)
 * @param {number} params.page - Current page number
 * @param {number} params.limit - Items per page
 * @returns {Object} Query result with books data, loading state, and error
 */
export const useBooks = (params = {}) => {
  const {
    search = '',
    categories = [],
    minPrice,
    maxPrice,
    sortBy = 'created_at',
    sortOrder = 'desc',
    page = 1,
    limit = 12,
  } = params;

  // Build query parameters to match backend API format
  const queryParams = {
    page,
    limit,
  };

  // Convert sortBy and sortOrder to backend format
  // Backend expects: 'price_asc', 'price_desc', 'title_asc', 'title_desc', 'newest', 'rating'
  if (sortBy === 'price') {
    queryParams.sort = sortOrder === 'asc' ? 'price_asc' : 'price_desc';
  } else if (sortBy === 'title') {
    queryParams.sort = sortOrder === 'asc' ? 'title_asc' : 'title_desc';
  } else if (sortBy === 'rating') {
    queryParams.sort = 'rating';
  } else {
    queryParams.sort = 'newest';
  }

  if (search) {
    queryParams.search = search;
  }

  if (categories && categories.length > 0) {
    // Backend supports multiple categories as comma-separated string
    queryParams.category = categories.join(',');
  }

  if (minPrice !== undefined && minPrice !== null) {
    queryParams.minPrice = minPrice;
  }

  if (maxPrice !== undefined && maxPrice !== null) {
    queryParams.maxPrice = maxPrice;
  }

  const queryKey = ['books', queryParams];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await booksAPI.getBooks(queryParams);
      return response;
    },
    keepPreviousData: true, // Keep old data while fetching new data for smoother transitions
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  // Map backend response structure to frontend expected structure
  const books = query.data?.data?.books || [];
  const mappedBooks = books.map(book => ({
    ...book,
    image: book.image_url,
    rating: book.averageRating || 0,
  }));

  return {
    books: mappedBooks,
    totalBooks: query.data?.data?.pagination?.totalBooks || 0,
    currentPage: query.data?.data?.pagination?.currentPage || page,
    totalPages: query.data?.data?.pagination?.totalPages || 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
