import { Link } from 'react-router-dom';
import StarRating from './StarRating';

/**
 * RelatedBooks Component
 * Displays related books in the same category
 */
const RelatedBooks = ({ books }) => {
  if (!books || books.length === 0) return null;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md lg:p-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">You May Also Like</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {books.map(book => (
          <Link
            key={book.id}
            to={`/books/${book.id}`}
            className="group flex flex-col rounded-lg border border-gray-200 bg-white p-3 transition-all hover:shadow-lg"
          >
            {/* Book Image */}
            <div className="mb-3 aspect-[2/3] overflow-hidden rounded-md bg-gray-100">
              {book.image_url ? (
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <svg
                    className="h-12 w-12 text-gray-300"
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

            {/* Book Info */}
            <div className="flex flex-col">
              <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-slate-800 group-hover:text-amber-600">
                {book.title}
              </h3>
              <p className="mb-2 line-clamp-1 text-xs text-slate-600">{book.author}</p>

              {/* Rating */}
              {book.averageRating > 0 && (
                <div className="mb-2 flex items-center space-x-1">
                  <StarRating rating={book.averageRating} size="sm" />
                  <span className="text-xs text-slate-500">
                    ({book.reviewCount})
                  </span>
                </div>
              )}

              {/* Price */}
              <p className="mt-auto text-sm font-bold text-amber-600">
                ${parseFloat(book.price).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
