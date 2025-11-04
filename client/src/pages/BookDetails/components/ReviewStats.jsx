import StarRating from './StarRating';

/**
 * ReviewStats Component
 * Displays average rating and rating distribution
 */
const ReviewStats = ({ summary, onRatingFilter, activeFilter }) => {
  if (!summary) return null;

  const { averageRating = 0, totalReviews = 0, ratingDistribution = {} } = summary;

  const getPercentage = count => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  return (
    <div className="mb-6 border-b border-gray-200 pb-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Average Rating */}
        <div className="text-center">
          <div className="mb-2 text-5xl font-bold text-slate-800">
            {averageRating.toFixed(1)}
          </div>
          <div className="mb-2 flex justify-center">
            <StarRating rating={averageRating} size="lg" />
          </div>
          <div className="text-sm text-slate-600">Based on {totalReviews} reviews</div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = ratingDistribution[rating] || 0;
            const percentage = getPercentage(count);

            return (
              <button
                key={rating}
                onClick={() => onRatingFilter(rating)}
                className={`flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-left transition-colors ${
                  activeFilter === rating
                    ? 'bg-amber-50 ring-2 ring-amber-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span className="w-12 text-sm font-medium text-slate-700">{rating} star</span>
                <div className="flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-amber-400 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="w-12 text-right text-sm text-slate-600">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewStats;
