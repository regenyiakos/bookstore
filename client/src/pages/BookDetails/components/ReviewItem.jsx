import { useState } from 'react';
import { useDeleteReview } from '@hooks/useReviews';
import StarRating from './StarRating';

/**
 * ReviewItem Component
 * Displays a single review
 */
const ReviewItem = ({ review, isCurrentUser }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteReview = useDeleteReview();

  const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  const handleDelete = async () => {
    try {
      await deleteReview.mutateAsync({ reviewId: review.id, bookId: review.book_id });
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6 last:border-0">
      {/* Review Header */}
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center space-x-2">
            <span className="font-semibold text-slate-800">
              {review.user?.name || 'Anonymous'}
            </span>
            {isCurrentUser && (
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                Your Review
              </span>
            )}
            {review.isVerifiedPurchase && (
              <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                Verified Purchase
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-sm text-slate-500">{formatDate(review.created_at)}</span>
          </div>
        </div>

        {/* Delete Button (only for own reviews) */}
        {isCurrentUser && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-sm text-red-600 hover:underline"
          >
            Delete
          </button>
        )}
      </div>

      {/* Review Comment */}
      {review.comment && (
        <p className="leading-relaxed text-slate-700">{review.comment}</p>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="mt-4 rounded-lg bg-red-50 p-4">
          <p className="mb-3 text-sm font-medium text-red-800">
            Are you sure you want to delete this review? This action cannot be undone.
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleDelete}
              disabled={deleteReview.isPending}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {deleteReview.isPending ? 'Deleting...' : 'Yes, Delete'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
