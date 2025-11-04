import { Fragment } from 'react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

const SORT_OPTIONS = [
  { label: 'Newest First', field: 'created_at', order: 'desc' },
  { label: 'Oldest First', field: 'created_at', order: 'asc' },
  { label: 'Price: Low to High', field: 'price', order: 'asc' },
  { label: 'Price: High to Low', field: 'price', order: 'desc' },
  { label: 'Title: A to Z', field: 'title', order: 'asc' },
  { label: 'Title: Z to A', field: 'title', order: 'desc' },
  { label: 'Rating: High to Low', field: 'rating', order: 'desc' },
  { label: 'Rating: Low to High', field: 'rating', order: 'asc' },
];

/**
 * SortDropdown component for selecting sort criteria
 * @param {Object} props
 * @param {string} props.sortBy - Current sort field
 * @param {string} props.sortOrder - Current sort order
 * @param {Function} props.onChange - Callback when sort changes
 */
export default function SortDropdown({ sortBy, sortOrder, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentOption = SORT_OPTIONS.find(
    (option) => option.field === sortBy && option.order === sortOrder
  ) || SORT_OPTIONS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option.field, option.order);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Sort options"
      >
        <span>Sort: {currentOption.label}</span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.field === sortBy && option.order === sortOrder;
              return (
                <button
                  key={`${option.field}-${option.order}`}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                    isSelected
                      ? 'bg-amber-50 text-amber-600 font-medium'
                      : 'text-slate-700 hover:bg-gray-50'
                  }`}
                  role="menuitem"
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <CheckIcon className="h-4 w-4 text-amber-600" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
