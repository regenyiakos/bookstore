import { BookOpenIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

/**
 * EmptyState component - displayed when no books are found
 * @param {Object} props
 * @param {boolean} props.hasFilters - Whether any filters are active
 * @param {Function} props.onClearFilters - Callback to clear all filters
 */
export default function EmptyState({ hasFilters = false, onClearFilters }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-12">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          {hasFilters ? (
            <MagnifyingGlassIcon className="h-8 w-8 text-amber-600" aria-hidden="true" />
          ) : (
            <BookOpenIcon className="h-8 w-8 text-amber-600" aria-hidden="true" />
          )}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900">
          {hasFilters ? 'No books found' : 'No books available'}
        </h3>
        <p className="mb-6 max-w-sm text-sm text-slate-600">
          {hasFilters
            ? "We couldn't find any books matching your search criteria. Try adjusting your filters or search terms."
            : 'There are currently no books available in our catalog. Please check back later.'}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
}
