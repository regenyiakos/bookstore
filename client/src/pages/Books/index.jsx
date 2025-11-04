import { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import MobileFilterDrawer from './components/MobileFilterDrawer';
import SortDropdown from './components/SortDropdown';
import BookGrid from './components/BookGrid';
import ActiveFilters from './components/ActiveFilters';
import Pagination from './components/Pagination';
import LoadingState from './components/LoadingState';
import EmptyState from './components/EmptyState';
import { useBooks } from './hooks/useBooks';
import { useFilters } from './hooks/useFilters';
import { useCategories } from './hooks/useCategories';

/**
 * Books page - main listing page with filtering, sorting, and pagination
 */
export default function BooksPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter state management
  const {
    search,
    selectedCategories,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    currentPage,
    setSearch,
    setCurrentPage,
    toggleCategory,
    removeCategory,
    setPriceRange,
    removePriceFilter,
    setSort,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useFilters();

  // Fetch categories with real-time counts
  const { categories, isLoading: isLoadingCategories } = useCategories();

  // Fetch books with current filters
  const { books, totalBooks, totalPages, isLoading, isFetching, isError, error } = useBooks({
    search,
    categories: selectedCategories,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    page: currentPage,
    limit: 12,
  });

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search clear
  const handleRemoveSearch = () => {
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">Browse Books</h1>
          <p className="text-slate-600">
            Discover your next favorite book from our collection of {totalBooks.toLocaleString()} titles
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Main Content Area */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={toggleCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={setPriceRange}
              isLoadingCategories={isLoadingCategories}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar: Active Filters, Sort, Mobile Filter Button */}
            <div className="mb-6 space-y-4">
              {/* Mobile Filter Button + Sort */}
              <div className="flex items-center justify-between gap-4">
                {/* Mobile Filter Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 lg:hidden"
                  aria-label="Open filters"
                >
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs font-semibold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <SortDropdown sortBy={sortBy} sortOrder={sortOrder} onChange={setSort} />
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <ActiveFilters
                  search={search}
                  selectedCategories={selectedCategories}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onRemoveSearch={handleRemoveSearch}
                  onRemoveCategory={removeCategory}
                  onRemovePriceFilter={removePriceFilter}
                  onClearAll={clearAllFilters}
                />
              )}
            </div>

            {/* Results Count and Loading Indicator */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                {isLoading ? (
                  'Loading...'
                ) : (
                  <>
                    Showing {books.length > 0 ? ((currentPage - 1) * 12 + 1).toLocaleString() : 0} -{' '}
                    {Math.min(currentPage * 12, totalBooks).toLocaleString()} of{' '}
                    {totalBooks.toLocaleString()} results
                  </>
                )}
              </p>
              {isFetching && !isLoading && (
                <span className="text-sm text-slate-500">Updating...</span>
              )}
            </div>

            {/* Error State */}
            {isError && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4 mb-6">
                <p className="text-sm text-red-800">
                  Error loading books: {error?.message || 'Something went wrong'}
                </p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Book Grid / Loading / Empty State */}
            {isLoading ? (
              <LoadingState count={12} />
            ) : books.length === 0 ? (
              <EmptyState hasFilters={hasActiveFilters} onClearFilters={clearAllFilters} />
            ) : (
              <>
                <BookGrid books={books} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryToggle={toggleCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={setPriceRange}
        onClearAll={clearAllFilters}
        isLoadingCategories={isLoadingCategories}
      />
    </div>
  );
}
