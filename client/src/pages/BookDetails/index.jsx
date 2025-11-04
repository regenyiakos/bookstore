import { useParams } from 'react-router-dom';
import { useBookDetails } from '@hooks/useBookDetails';
import { useRelatedBooks } from '@hooks/useRelatedBooks';
import { useAuth } from '@hooks/useAuth';
import BookInfo from './components/BookInfo';
import Reviews from './components/Reviews';
import RelatedBooks from './components/RelatedBooks';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorDisplay from './components/ErrorDisplay';
import Breadcrumbs from './components/Breadcrumbs';

/**
 * BookDetails Page Component
 * Displays comprehensive book information, reviews, and related books
 */
const BookDetails = () => {
  const { id } = useParams();
  const bookId = parseInt(id);
  const { user } = useAuth();

  // Fetch book details
  const {
    data: book,
    isLoading: isLoadingBook,
    isError: isBookError,
    error: bookError,
  } = useBookDetails(bookId);

  // Fetch related books
  const { data: relatedBooks, isLoading: isLoadingRelated } = useRelatedBooks(bookId, 6);

  // Loading state
  if (isLoadingBook) {
    return <LoadingSkeleton />;
  }

  // Error state
  if (isBookError) {
    return <ErrorDisplay error={bookError} bookId={bookId} />;
  }

  // Book not found
  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-800">Book Not Found</h1>
          <p className="mb-8 text-lg text-slate-600">
            The book you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <Breadcrumbs book={book} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Book Information Section */}
        <BookInfo book={book} />

        {/* Reviews Section */}
        <div className="mt-12">
          <Reviews bookId={bookId} initialSummary={book} user={user} />
        </div>

        {/* Related Books Section */}
        {!isLoadingRelated && relatedBooks && relatedBooks.length > 0 && (
          <div className="mt-12">
            <RelatedBooks books={relatedBooks} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
