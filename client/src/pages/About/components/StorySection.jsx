import { HiBookOpen } from 'react-icons/hi2';

/**
 * Story Section Component
 * Displays the company's story and history with an image
 */
export default function StorySection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80"
                alt="Cozy bookstore interior with wooden shelves"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>

            {/* Decorative Icon */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <HiBookOpen className="w-12 h-12 text-white" aria-hidden="true" />
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Our Story
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                BookStore was founded in 2020 with a simple yet powerful vision: to create
                a platform where book lovers from all walks of life could discover, share,
                and celebrate the joy of reading.
              </p>

              <p>
                What started as a small online bookshop has grown into a thriving community
                of over 10,000 readers. We've carefully curated a collection of more than
                50,000 books spanning every genre imaginable, from timeless classics to
                contemporary bestsellers.
              </p>

              <p>
                Our journey has been driven by a deep passion for literature and a commitment
                to exceptional customer service. Every book we offer is selected with care,
                and every reader who joins our community becomes part of our extended family.
              </p>

              <p className="font-semibold text-slate-900">
                Today, we continue to evolve, but our core mission remains unchanged:
                to inspire a love of reading and make quality books accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
