import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function BookCard({ book }) {
  const { id, title, author, price, image, category } = book;

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/books/${id}`} className="block">
        {/* Book Cover Image */}
        <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {category}
            </span>
          </div>
        </div>

        {/* Book Details */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>

          {/* Author */}
          <p className="text-sm text-slate-600 mb-3">{author}</p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-amber-600">${price.toFixed(2)}</p>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button - Appears on hover */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.preventDefault();
            // Add to cart functionality will be implemented later
            console.log('Add to cart:', id);
          }}
          className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
