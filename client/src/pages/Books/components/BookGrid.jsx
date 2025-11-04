import BookCard from './BookCard';

/**
 * BookGrid component - responsive grid layout for book cards
 * @param {Object} props
 * @param {Array} props.books - Array of book objects
 */
export default function BookGrid({ books }) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
