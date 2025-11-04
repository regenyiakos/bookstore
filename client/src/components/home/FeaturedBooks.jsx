import { Link } from 'react-router-dom';
import { featuredBooks } from '@/data/mockData';
import BookCard from './BookCard';

export default function FeaturedBooks() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Featured Books
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our bestsellers and staff picks
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/books"
            className="inline-block bg-slate-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg"
          >
            View All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
