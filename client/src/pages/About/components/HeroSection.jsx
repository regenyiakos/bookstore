import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';

/**
 * Hero Section Component
 * Displays the main headline, mission statement, and primary CTA
 */
export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 py-20 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Your Gateway to the World of{' '}
            <span className="text-amber-600">Literature</span>
          </h1>

          {/* Mission Statement */}
          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            At BookStore, we believe that every book has the power to transform lives,
            spark imagination, and connect people across the world. Since 2020, we've been
            dedicated to making quality literature accessible to everyone.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/books"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Explore Our Collection
              <HiArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" aria-hidden="true" />
    </section>
  );
}
