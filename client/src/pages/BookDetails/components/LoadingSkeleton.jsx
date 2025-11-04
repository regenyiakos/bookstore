/**
 * LoadingSkeleton Component
 * Skeleton loader for the book details page
 */
const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse bg-gray-50">
      {/* Breadcrumbs Skeleton */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="h-4 w-64 rounded bg-gray-200"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Book Info Skeleton */}
        <div className="rounded-lg bg-white p-6 shadow-md lg:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Image Skeleton */}
            <div className="flex justify-center">
              <div className="h-96 w-64 rounded-lg bg-gray-200"></div>
            </div>

            {/* Info Skeleton */}
            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded bg-gray-200"></div>
              <div className="h-6 w-1/2 rounded bg-gray-200"></div>
              <div className="h-6 w-1/3 rounded bg-gray-200"></div>
              <div className="h-10 w-32 rounded bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              </div>
              <div className="mt-8 h-12 w-48 rounded-lg bg-gray-200"></div>
            </div>
          </div>
        </div>

        {/* Reviews Skeleton */}
        <div className="mt-12 rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6 h-8 w-48 rounded bg-gray-200"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <div className="mb-2 h-6 w-32 rounded bg-gray-200"></div>
                <div className="h-4 w-full rounded bg-gray-200"></div>
                <div className="mt-2 h-4 w-2/3 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
