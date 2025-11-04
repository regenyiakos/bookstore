import { HiBookOpen, HiUsers, HiCalendar, HiStar } from 'react-icons/hi2';

/**
 * Statistics Section Component
 * Displays key metrics and achievements
 */
const stats = [
  {
    id: 1,
    icon: HiBookOpen,
    value: '50,000+',
    label: 'Books Available',
    description: 'Carefully curated collection',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    icon: HiUsers,
    value: '10,000+',
    label: 'Happy Readers',
    description: 'Active community members',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 3,
    icon: HiCalendar,
    value: '5+',
    label: 'Years Experience',
    description: 'Serving book lovers since 2020',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 4,
    icon: HiStar,
    value: '4.8',
    label: 'Average Rating',
    description: 'Customer satisfaction score',
    color: 'from-amber-500 to-amber-600',
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            By The Numbers
          </h2>
          <p className="text-lg text-slate-300">
            Our journey in numbers - a testament to our growth and your trust
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl mb-6 shadow-lg`}>
                <stat.icon className="w-7 h-7 text-white" aria-hidden="true" />
              </div>

              {/* Value */}
              <div className="mb-2">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-amber-400">
                  {stat.label}
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 text-sm leading-relaxed">
                {stat.description}
              </p>

              {/* Decorative Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000" aria-hidden="true" />
    </section>
  );
}
