import { useState } from 'react';
import { useReviews, useUserReview } from '@hooks/useReviews';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import ReviewStats from './ReviewStats';

/**
 * Reviews Component
 * Main container for all review-related functionality
 */
const Reviews = ({ bookId, initialSummary, user }) => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('recent');
  const [ratingFilter, setRatingFilter] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Fetch reviews
  const { data: reviewsData, isLoading, refetch } = useReviews(bookId, {
    page,
    limit: 10,
    sortBy,
    rating: ratingFilter,
  });

  // Fetch user's review (only if authenticated)
  const { data: userReview } = useUserReview(bookId, !!user);

  const handlePageChange = newPage => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = newSort => {
    setSortBy(newSort);
    setPage(1);
  };

  const handleRatingFilter = rating => {
    setRatingFilter(rating === ratingFilter ? null : rating);
    setPage(1);
  };

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    refetch();
  };

  const handleWriteReview = () => {
    if (!user) {
      // Redirect to login
      window.location.href = `/login?redirect=/books/${bookId}`;
      return;
    }
    setShowReviewForm(true);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md lg:p-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">Customer Reviews</h2>

      {/* Review Stats */}
      <ReviewStats
        summary={reviewsData?.summary || initialSummary}
        onRatingFilter={handleRatingFilter}
        activeFilter={ratingFilter}
      />

      {/* Write Review Button */}
      <div className="mb-6 border-t border-gray-200 pt-6">
        {user ? (
          userReview ? (
            <div className="rounded-lg bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                You have already reviewed this book.{' '}
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="font-semibold underline hover:no-underline"
                >
                  Edit your review
                </button>
              </p>
            </div>
          ) : (
            <button
              onClick={handleWriteReview}
              className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
            >
              Write a Review
            </button>
          )
        ) : (
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-slate-600">
              <button
                onClick={() => (window.location.href = `/login?redirect=/books/${bookId}`)}
                className="font-semibold text-amber-600 hover:underline"
              >
                Log in
              </button>{' '}
              to write a review
            </p>
          </div>
        )}
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          bookId={bookId}
          existingReview={userReview}
          onClose={() => setShowReviewForm(false)}
          onSuccess={handleReviewSuccess}
        />
      )}

      {/* Sort Options */}
      <div className="mb-6 flex items-center justify-between border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-slate-800">
          {reviewsData?.pagination?.totalReviews || 0} Reviews
        </h3>
        <select
          value={sortBy}
          onChange={e => handleSortChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      {/* Review List */}
      <ReviewList
        reviews={reviewsData?.reviews || []}
        isLoading={isLoading}
        pagination={reviewsData?.pagination}
        onPageChange={handlePageChange}
        currentUserId={user?.id}
      />
    </div>
  );
};

export default Reviews;
