/**
 * LoadingState component - skeleton screens for loading state
 * @param {Object} props
 * @param {number} props.count - Number of skeleton cards to show
 */
export default function LoadingState({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

/**
 * SkeletonCard component - individual skeleton card
 */
function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Image Skeleton */}
      <div className="aspect-[3/4] bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title */}
        <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
        {/* Author */}
        <div className="mb-3 h-4 w-1/2 rounded bg-gray-200" />
        {/* Rating */}
        <div className="mb-3 flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-4 rounded-full bg-gray-200" />
          ))}
        </div>
        {/* Divider */}
        <div className="mb-3 border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between">
            {/* Price */}
            <div className="h-6 w-20 rounded bg-gray-200" />
            {/* Button */}
            <div className="h-9 w-9 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
