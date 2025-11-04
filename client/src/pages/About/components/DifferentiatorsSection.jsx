import { HiMagnifyingGlass, HiChatBubbleLeftRight, HiRocketLaunch, HiLightBulb } from 'react-icons/hi2';

/**
 * Differentiators Section Component
 * Displays what makes BookStore unique and different from competitors
 */
const differentiators = [
  {
    id: 1,
    icon: HiMagnifyingGlass,
    title: 'Expert Curation',
    description:
      'Our team of literary experts handpicks every book, ensuring a thoughtfully curated collection that spans genres, cultures, and perspectives.',
    color: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600',
  },
  {
    id: 2,
    icon: HiChatBubbleLeftRight,
    title: 'Authentic Reviews',
    description:
      'Real reviews from real readers. We verify all purchases and maintain a transparent review system that you can trust.',
    color: 'bg-green-100 text-green-600 group-hover:bg-green-600',
  },
  {
    id: 3,
    icon: HiRocketLaunch,
    title: 'Fast Delivery',
    description:
      'Lightning-fast shipping with real-time tracking. Most orders arrive within 2-3 business days with our premium delivery partners.',
    color: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600',
  },
  {
    id: 4,
    icon: HiLightBulb,
    title: 'Smart Recommendations',
    description:
      'Our intelligent recommendation engine learns from your preferences to suggest books you\'ll love, helping you discover your next favorite read.',
    color: 'bg-amber-100 text-amber-600 group-hover:bg-amber-600',
  },
];

export default function DifferentiatorsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            What Makes Us Different
          </h2>
          <p className="text-lg text-slate-600">
            We go beyond being just another bookstore. Here's what sets us apart.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-slate-50 rounded-2xl p-8 hover:bg-white transition-all duration-300 border-2 border-transparent hover:border-amber-200 hover:shadow-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon Container */}
              <div className="flex items-start gap-6">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${item.color}`}>
                  <item.icon
                    className="w-7 h-7 group-hover:text-white transition-colors duration-300"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-amber-400 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
