import { XMarkIcon } from '@heroicons/react/24/outline';

/**
 * ActiveFilters component - displays active filter chips with remove functionality
 * @param {Object} props
 * @param {string} props.search - Active search term
 * @param {string[]} props.selectedCategories - Active categories
 * @param {number} props.minPrice - Minimum price filter
 * @param {number} props.maxPrice - Maximum price filter
 * @param {Function} props.onRemoveSearch - Callback to remove search filter
 * @param {Function} props.onRemoveCategory - Callback to remove category filter
 * @param {Function} props.onRemovePriceFilter - Callback to remove price filter
 * @param {Function} props.onClearAll - Callback to clear all filters
 */
export default function ActiveFilters({
  search,
  selectedCategories,
  minPrice,
  maxPrice,
  onRemoveSearch,
  onRemoveCategory,
  onRemovePriceFilter,
  onClearAll,
}) {
  const hasFilters =
    search ||
    (selectedCategories && selectedCategories.length > 0) ||
    minPrice !== null ||
    maxPrice !== null;

  if (!hasFilters) {
    return null;
  }

  const getPriceLabel = () => {
    if (minPrice !== null && maxPrice !== null) {
      return `$${minPrice} - $${maxPrice}`;
    } else if (minPrice !== null) {
      return `From $${minPrice}`;
    } else if (maxPrice !== null) {
      return `Up to $${maxPrice}`;
    }
    return '';
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-slate-700">Active Filters:</span>

      {/* Search Filter */}
      {search && (
        <FilterChip
          label={`Search: "${search}"`}
          onRemove={onRemoveSearch}
          aria-label={`Remove search filter: ${search}`}
        />
      )}

      {/* Category Filters */}
      {selectedCategories &&
        selectedCategories.map((category) => (
          <FilterChip
            key={category}
            label={category}
            onRemove={() => onRemoveCategory(category)}
            aria-label={`Remove category filter: ${category}`}
          />
        ))}

      {/* Price Filter */}
      {(minPrice !== null || maxPrice !== null) && (
        <FilterChip
          label={getPriceLabel()}
          onRemove={onRemovePriceFilter}
          aria-label="Remove price filter"
        />
      )}

      {/* Clear All Button */}
      <button
        type="button"
        onClick={onClearAll}
        className="ml-2 text-sm font-medium text-amber-600 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded px-2 py-1"
      >
        Clear All
      </button>
    </div>
  );
}

/**
 * FilterChip component - individual filter chip with remove button
 */
function FilterChip({ label, onRemove, 'aria-label': ariaLabel }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-800">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full p-0.5 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
        aria-label={ariaLabel}
      >
        <XMarkIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </span>
  );
}
