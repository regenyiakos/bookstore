import { useState } from 'react';
import { useCart } from '@hooks/useCart';
import StarRating from './StarRating';
import StockBadge from './StockBadge';

/**
 * BookInfo Component
 * Displays complete book information including image, metadata, and add to cart functionality
 */
const BookInfo = ({ book }) => {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleQuantityChange = delta => {
    const newQuantity = quantity + delta;
    const maxQuantity = Math.min(10, book.stock);

    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    // Add to cart
    add({
      id: book.id,
      title: book.title,
      author: book.author,
      price: parseFloat(book.price),
      image_url: book.image_url,
      quantity,
      stock: book.stock,
    });

    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset state
    setIsAdding(false);
    setQuantity(1);
  };

  const isOutOfStock = book.stock === 0;
  const isLowStock = book.stock > 0 && book.stock <= 10;
  const maxQuantity = Math.min(10, book.stock);

  return (
    <div className="rounded-lg bg-white p-6 shadow-md lg:p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Book Image */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative overflow-hidden rounded-lg">
            {book.image_url ? (
              <img
                src={book.image_url}
                alt={`${book.title} by ${book.author}`}
                className="h-auto w-full max-w-sm object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex h-96 w-64 items-center justify-center rounded-lg bg-gray-200">
                <svg
                  className="h-24 w-24 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Book Information */}
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="mb-2 text-3xl font-bold text-slate-800 lg:text-4xl">{book.title}</h1>

          {/* Author */}
          <p className="mb-4 text-lg font-medium text-slate-600">by {book.author}</p>

          {/* Rating */}
          <div className="mb-4 flex items-center space-x-3">
            <StarRating rating={book.averageRating || 0} size="lg" />
            <span className="text-sm text-slate-600">
              {book.averageRating ? book.averageRating.toFixed(1) : '0.0'} ({book.reviewCount || 0}{' '}
              reviews)
            </span>
          </div>

          {/* Category */}
          {book.category && (
            <div className="mb-4">
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                {book.category}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            <p className="text-3xl font-bold text-amber-600">
              ${parseFloat(book.price).toFixed(2)}
            </p>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            <StockBadge stock={book.stock} />
          </div>

          {/* Description */}
          {book.description && (
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-semibold text-slate-800">Description</h3>
              <p className="leading-relaxed text-slate-600">{book.description}</p>
            </div>
          )}

          {/* Add to Cart Section */}
          <div className="mt-auto border-t border-gray-200 pt-6">
            {!isOutOfStock && (
              <div className="mb-4 flex items-center space-x-4">
                <label className="text-sm font-medium text-slate-700">Quantity:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={e => {
                      const val = parseInt(e.target.value) || 1;
                      if (val >= 1 && val <= maxQuantity) setQuantity(val);
                    }}
                    min="1"
                    max={maxQuantity}
                    className="h-10 w-16 rounded-lg border border-slate-300 text-center"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= maxQuantity}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
                {isLowStock && (
                  <span className="text-sm text-amber-600">Only {book.stock} left!</span>
                )}
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAdding}
              className="w-full rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isAdding ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {showSuccess && (
              <div className="mt-4 rounded-lg bg-green-50 p-3 text-center text-sm font-medium text-green-800">
                Added to cart successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
