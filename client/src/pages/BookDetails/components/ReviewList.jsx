import ReviewItem from './ReviewItem';

/**
 * ReviewList Component
 * Displays paginated list of reviews
 */
const ReviewList = ({ reviews, isLoading, pagination, onPageChange, currentUserId }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse border-b border-gray-200 pb-6">
            <div className="mb-2 h-6 w-32 rounded bg-gray-200"></div>
            <div className="mb-2 h-4 w-24 rounded bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200"></div>
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 flex justify-center">
          <svg className="h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-700">No reviews yet</h3>
        <p className="text-slate-600">Be the first to review this book!</p>
      </div>
    );
  }

  return (
    <div>
      {/* Reviews */}
      <div className="space-y-6">
        {reviews.map(review => (
          <ReviewItem key={review.id} review={review} isCurrentUser={review.user_id === currentUserId} />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center space-x-2">
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(pageNum => {
              // Show first page, last page, current page, and pages around current
              const showPage =
                pageNum === 1 ||
                pageNum === pagination.totalPages ||
                Math.abs(pageNum - pagination.currentPage) <= 1;

              const showEllipsis =
                (pageNum === 2 && pagination.currentPage > 3) ||
                (pageNum === pagination.totalPages - 1 &&
                  pagination.currentPage < pagination.totalPages - 2);

              if (showEllipsis) {
                return (
                  <span key={pageNum} className="px-2 text-slate-600">
                    ...
                  </span>
                );
              }

              if (!showPage) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`h-10 w-10 rounded-lg font-medium transition-colors ${
                    pageNum === pagination.currentPage
                      ? 'bg-amber-600 text-white'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
