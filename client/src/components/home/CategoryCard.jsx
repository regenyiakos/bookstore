import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  HeartIcon,
  UserIcon,
  LightBulbIcon,
  ClockIcon,
  SparklesIcon,
  FireIcon,
  CpuChipIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

// Icon mapping object
const iconMap = {
  BookOpenIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  HeartIcon,
  UserIcon,
  LightBulbIcon,
  ClockIcon,
  SparklesIcon,
  FireIcon,
  CpuChipIcon,
  GlobeAltIcon,
};

export default function CategoryCard({ category }) {
  const { name, bookCount, icon } = category;

  // Get the icon component from the map
  const IconComponent = iconMap[icon] || BookOpenIcon;

  // Create slug from name (lowercase, replace spaces with hyphens)
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

  return (
    <Link
      to={`/books?category=${slug}`}
      className="group block bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:border-amber-600 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Icon Container */}
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center transition-colors group-hover:bg-amber-100">
          <IconComponent className="w-10 h-10 text-amber-600" />
        </div>

        {/* Category Name */}
        <h3 className="font-bold text-slate-900 text-lg">{name}</h3>

        {/* Book Count */}
        <p className="text-sm text-slate-600">
          {bookCount.toLocaleString()} books
        </p>
      </div>
    </Link>
  );
}
