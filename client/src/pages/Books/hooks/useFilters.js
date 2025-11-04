import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Custom hook for managing book filters with URL query parameter sync
 * @returns {Object} Filter state and methods
 */
export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL query parameters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const categoryParam = searchParams.get('category');
    return categoryParam ? categoryParam.split(',') : [];
  });
  const [minPrice, setMinPrice] = useState(() => {
    const min = searchParams.get('minPrice');
    return min ? parseFloat(min) : null;
  });
  const [maxPrice, setMaxPrice] = useState(() => {
    const max = searchParams.get('maxPrice');
    return max ? parseFloat(max) : null;
  });
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'created_at');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 1;
  });

  // Sync state to URL query parameters
  useEffect(() => {
    const params = {};

    if (search) params.search = search;
    if (selectedCategories.length > 0) params.category = selectedCategories.join(',');
    if (minPrice !== null) params.minPrice = minPrice.toString();
    if (maxPrice !== null) params.maxPrice = maxPrice.toString();
    if (sortBy !== 'created_at') params.sortBy = sortBy;
    if (sortOrder !== 'desc') params.sortOrder = sortOrder;
    if (currentPage !== 1) params.page = currentPage.toString();

    setSearchParams(params, { replace: true });
  }, [search, selectedCategories, minPrice, maxPrice, sortBy, sortOrder, currentPage, setSearchParams]);

  // Toggle category selection
  const toggleCategory = useCallback((category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Remove specific category
  const removeCategory = useCallback((category) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== category));
    setCurrentPage(1);
  }, []);

  // Set price range
  const setPriceRange = useCallback((min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    setCurrentPage(1);
  }, []);

  // Remove price filter
  const removePriceFilter = useCallback(() => {
    setMinPrice(null);
    setMaxPrice(null);
    setCurrentPage(1);
  }, []);

  // Set sort option
  const setSort = useCallback((field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setSearch('');
    setSelectedCategories([]);
    setMinPrice(null);
    setMaxPrice(null);
    setSortBy('created_at');
    setSortOrder('desc');
    setCurrentPage(1);
  }, []);

  // Check if any filters are active
  const hasActiveFilters =
    search !== '' ||
    selectedCategories.length > 0 ||
    minPrice !== null ||
    maxPrice !== null ||
    sortBy !== 'created_at' ||
    sortOrder !== 'desc';

  // Get active filter count
  const activeFilterCount =
    (search ? 1 : 0) +
    selectedCategories.length +
    (minPrice !== null || maxPrice !== null ? 1 : 0);

  return {
    // State
    search,
    selectedCategories,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    currentPage,

    // Setters
    setSearch,
    setCurrentPage,
    toggleCategory,
    removeCategory,
    setPriceRange,
    removePriceFilter,
    setSort,
    clearAllFilters,

    // Computed
    hasActiveFilters,
    activeFilterCount,
  };
};
