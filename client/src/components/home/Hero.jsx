import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-50">
      <div className="container-custom py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Discover Your Next Great Read
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
              Explore thousands of books across all genres. From bestsellers to hidden gems,
              find your perfect story and get it delivered to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/books"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Browse Books
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-amber-600">50,000+</p>
                <p className="text-sm text-slate-600">Books Available</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-amber-600">10,000+</p>
                <p className="text-sm text-slate-600">Happy Readers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-amber-600">4.9/5</p>
                <p className="text-sm text-slate-600">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop"
                alt="Books on shelf"
                className="w-full h-full object-cover"
              />
              {/* Overlay decoration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 to-transparent" />
            </div>
            {/* Floating card decoration */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Free Shipping</p>
                  <p className="text-sm text-slate-600">On orders over $50</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
