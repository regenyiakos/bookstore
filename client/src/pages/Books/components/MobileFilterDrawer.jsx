import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

/**
 * MobileFilterDrawer component - slide-up filter panel for mobile
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the drawer is open
 * @param {Function} props.onClose - Callback when drawer is closed
 * @param {Array} props.categories - Available categories with counts
 * @param {string[]} props.selectedCategories - Currently selected categories
 * @param {Function} props.onCategoryToggle - Callback when category is toggled
 * @param {number} props.minPrice - Minimum price filter
 * @param {number} props.maxPrice - Maximum price filter
 * @param {Function} props.onPriceChange - Callback when price range changes
 * @param {Function} props.onClearAll - Callback to clear all filters
 * @param {boolean} props.isLoadingCategories - Loading state for categories
 */
export default function MobileFilterDrawer({
  isOpen,
  onClose,
  categories = [],
  selectedCategories,
  onCategoryToggle,
  minPrice,
  maxPrice,
  onPriceChange,
  onClearAll,
  isLoadingCategories = false,
}) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const min = formData.get('minPrice');
    const max = formData.get('maxPrice');
    onPriceChange(
      min ? parseFloat(min) : null,
      max ? parseFloat(max) : null
    );
  };

  const handleApply = () => {
    onClose();
  };

  const handleClearAll = () => {
    onClearAll();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden rounded-t-2xl bg-white shadow-xl transition-transform lg:hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-gray-100 hover:text-slate-600"
            aria-label="Close filters"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-4 py-4" style={{ maxHeight: 'calc(85vh - 140px)' }}>
          <div className="space-y-6">
            {/* Categories */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {isLoadingCategories ? (
                  // Loading skeleton
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-gray-200 p-3 space-y-2"
                    >
                      <div className="h-4 rounded bg-gray-200 animate-pulse" />
                    </div>
                  ))
                ) : categories.length === 0 ? (
                  <p className="col-span-2 text-sm text-slate-500 text-center py-4">
                    No categories available
                  </p>
                ) : (
                  categories.map((category) => {
                    const isSelected = selectedCategories.includes(category.name);
                    return (
                      <label
                        key={category.id}
                        className="flex cursor-pointer items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:border-amber-300 hover:bg-amber-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onCategoryToggle(category.name)}
                          className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="flex-1 text-xs font-medium text-slate-700">
                          {category.name}
                          <span className="block text-[10px] text-slate-400">
                            ({category.bookCount})
                          </span>
                        </span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Price Range</h3>
              <form onSubmit={handlePriceSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="minPriceMobile" className="mb-1 block text-xs font-medium text-slate-600">
                      Min Price
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        id="minPriceMobile"
                        name="minPrice"
                        min="0"
                        step="0.01"
                        defaultValue={minPrice || ''}
                        placeholder="0"
                        className="block w-full rounded-md border border-gray-300 py-2.5 pl-7 pr-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="maxPriceMobile" className="mb-1 block text-xs font-medium text-slate-600">
                      Max Price
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        id="maxPriceMobile"
                        name="maxPrice"
                        min="0"
                        step="0.01"
                        defaultValue={maxPrice || ''}
                        placeholder="Any"
                        className="block w-full rounded-md border border-gray-300 py-2.5 pl-7 pr-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-amber-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                >
                  Apply Price Range
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleClearAll}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
