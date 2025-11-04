import { HiSparkles, HiUserGroup, HiGlobeAlt, HiShieldCheck } from 'react-icons/hi2';

/**
 * Values Section Component
 * Displays the company's core values with icons
 */
const values = [
  {
    id: 1,
    icon: HiSparkles,
    title: 'Quality First',
    description:
      'We carefully curate every book in our collection to ensure you get only the best literature. Our team reviews each title for quality, relevance, and reader value.',
  },
  {
    id: 2,
    icon: HiUserGroup,
    title: 'Community Focus',
    description:
      'We believe in the power of community. Our platform connects readers, encourages meaningful discussions, and celebrates diverse perspectives through authentic reviews.',
  },
  {
    id: 3,
    icon: HiGlobeAlt,
    title: 'Accessibility',
    description:
      'Great books should be available to everyone. We offer competitive pricing, regular promotions, and a seamless shopping experience on any device.',
  },
  {
    id: 4,
    icon: HiShieldCheck,
    title: 'Trust & Security',
    description:
      'Your privacy and security are our top priorities. We use industry-leading encryption and secure payment methods to protect your personal information.',
  },
];

export default function ValuesSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Our Mission & Values
          </h2>
          <p className="text-lg text-slate-600">
            These core principles guide everything we do at BookStore
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.id}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-xl mb-6 group-hover:bg-amber-600 transition-colors duration-300">
                <value.icon
                  className="w-8 h-8 text-amber-600 group-hover:text-white transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{value.description}</p>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
