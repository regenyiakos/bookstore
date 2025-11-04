import { features } from '@/data/mockData';
import {
  TruckIcon,
  LockClosedIcon,
  BookOpenIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

// Icon mapping object for features
const featureIconMap = {
  TruckIcon,
  LockClosedIcon,
  BookOpenIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Why Choose BookStore?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We're committed to providing the best book shopping experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            // Get the icon component from the map
            const IconComponent = featureIconMap[feature.icon] || BookOpenIcon;

            return (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg transition-all duration-300 hover:bg-slate-50"
              >
                {/* Icon Container */}
                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                  <IconComponent className="w-12 h-12 text-amber-600" />
                </div>

                {/* Feature Title */}
                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
