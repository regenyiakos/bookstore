/**
 * FilterSidebar component for desktop view
 * @param {Object} props
 * @param {Array} props.categories - Available categories with counts
 * @param {string[]} props.selectedCategories - Currently selected categories
 * @param {Function} props.onCategoryToggle - Callback when category is toggled
 * @param {number} props.minPrice - Minimum price filter
 * @param {number} props.maxPrice - Maximum price filter
 * @param {Function} props.onPriceChange - Callback when price range changes
 * @param {boolean} props.isLoadingCategories - Loading state for categories
 */
export default function FilterSidebar({
  categories = [],
  selectedCategories,
  onCategoryToggle,
  minPrice,
  maxPrice,
  onPriceChange,
  isLoadingCategories = false,
}) {
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

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        {/* Categories Filter */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Categories</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {isLoadingCategories ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-2">
                  <div className="h-4 w-4 rounded bg-gray-200 animate-pulse" />
                  <div className="h-4 flex-1 rounded bg-gray-200 animate-pulse" />
                  <div className="h-4 w-8 rounded bg-gray-200 animate-pulse" />
                </div>
              ))
            ) : categories.length === 0 ? (
              <p className="text-sm text-slate-500">No categories available</p>
            ) : (
              categories.map((category) => {
                const isSelected = selectedCategories.includes(category.name);
                return (
                  <label
                    key={category.id}
                    className="flex cursor-pointer items-center space-x-3 rounded-md p-2 hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onCategoryToggle(category.name)}
                      className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="flex-1 text-sm text-slate-700">{category.name}</span>
                    <span className="text-xs text-slate-400">({category.bookCount})</span>
                  </label>
                );
              })
            )}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Price Range</h3>
          <form onSubmit={handlePriceSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="minPrice" className="mb-1 block text-xs font-medium text-slate-600">
                  Min
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    min="0"
                    step="0.01"
                    defaultValue={minPrice || ''}
                    placeholder="0"
                    className="block w-full rounded-md border border-gray-300 py-2 pl-7 pr-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="maxPrice" className="mb-1 block text-xs font-medium text-slate-600">
                  Max
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    min="0"
                    step="0.01"
                    defaultValue={maxPrice || ''}
                    placeholder="Any"
                    className="block w-full rounded-md border border-gray-300 py-2 pl-7 pr-3 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
