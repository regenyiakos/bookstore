import { Link } from 'react-router-dom';

/**
 * Breadcrumbs Component
 * Navigation breadcrumbs for the book details page
 */
const Breadcrumbs = ({ book }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-slate-600">
          <Link to="/" className="transition-colors hover:text-amber-600">
            Home
          </Link>
          <span>/</span>
          <Link to="/" className="transition-colors hover:text-amber-600">
            Books
          </Link>
          <span>/</span>
          {book.category && (
            <>
              <span className="transition-colors hover:text-amber-600">{book.category}</span>
              <span>/</span>
            </>
          )}
          <span className="font-medium text-slate-800">{book.title}</span>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
