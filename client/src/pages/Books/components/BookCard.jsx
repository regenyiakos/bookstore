import { memo } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

/**
 * BookCard component - displays individual book information
 * @param {Object} props
 * @param {Object} props.book - Book data object
 */
function BookCard({ book }) {
  const { id, title, author, price, category, image, rating = 0, stock } = book;

  // Convert price to number if it's a string
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;

  // Generate star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIcon key={i} className="h-4 w-4 text-amber-500" aria-hidden="true" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarIconOutline className="h-4 w-4 text-amber-500" aria-hidden="true" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <StarIcon className="h-4 w-4 text-amber-500" aria-hidden="true" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarIconOutline key={i} className="h-4 w-4 text-amber-500" aria-hidden="true" />
        );
      }
    }
    return stars;
  };

  const isOutOfStock = stock === 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-amber-200">
      <Link to={`/books/${id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {/* Book Image */}
        <img
          src={image || 'https://via.placeholder.com/300x400/e5e7eb/9ca3af?text=No+Image'}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Category Badge */}
        {category && (
          <div className="absolute left-2 top-2">
            <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm">
              {category}
            </span>
          </div>
        )}

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Book Details */}
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/books/${id}`} className="flex-1">
          <h3 className="mb-1 text-base font-semibold text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {title}
          </h3>
          <p className="mb-3 text-sm text-slate-600">{author}</p>

          {/* Rating */}
          <div className="mb-3 flex items-center space-x-1">
            <div className="flex items-center" aria-label={`Rating: ${numericRating} out of 5 stars`}>
              {renderStars()}
            </div>
            <span className="text-xs text-slate-500">({numericRating.toFixed(1)})</span>
          </div>
        </Link>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <span className="text-xl font-bold text-slate-900">${numericPrice.toFixed(2)}</span>
            {stock > 0 && stock <= 5 && (
              <p className="text-xs text-red-600 mt-0.5">Only {stock} left</p>
            )}
          </div>
          <button
            type="button"
            disabled={isOutOfStock}
            className={`rounded-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
              isOutOfStock
                ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                : 'bg-amber-600 text-white hover:bg-amber-500'
            }`}
            aria-label={isOutOfStock ? 'Out of stock' : 'Add to cart'}
          >
            <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(BookCard);
