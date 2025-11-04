import { useState } from 'react';
import { useCreateReview, useUpdateReview } from '@hooks/useReviews';
import StarRating from './StarRating';

/**
 * ReviewForm Component
 * Modal form for creating/editing reviews
 */
const ReviewForm = ({ bookId, existingReview, onClose, onSuccess }) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || '');
  const [errors, setErrors] = useState({});

  const createReview = useCreateReview();
  const updateReview = useUpdateReview();

  const isEditing = !!existingReview;

  const validate = () => {
    const newErrors = {};

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (comment.trim().length > 0 && comment.trim().length < 10) {
      newErrors.comment = 'Comment must be at least 10 characters';
    }

    if (comment.trim().length > 2000) {
      newErrors.comment = 'Comment cannot exceed 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (isEditing) {
        await updateReview.mutateAsync({
          reviewId: existingReview.id,
          reviewData: { rating, comment: comment.trim() || null },
        });
      } else {
        await createReview.mutateAsync({
          bookId,
          rating,
          comment: comment.trim() || null,
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({ submit: 'Failed to submit review. Please try again.' });
    }
  };

  const isPending = createReview.isPending || updateReview.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            {isEditing ? 'Edit Your Review' : 'Write a Review'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 transition-colors hover:text-slate-600"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rating */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Rating <span className="text-red-500">*</span>
            </label>
            <StarRating rating={rating} size="lg" interactive onRatingChange={setRating} />
            {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label htmlFor="comment" className="mb-2 block text-sm font-semibold text-slate-700">
              Your Review
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Share your thoughts about this book... (optional)"
              rows={6}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <div className="mt-1 flex items-center justify-between">
              <div>
                {errors.comment && <p className="text-sm text-red-600">{errors.comment}</p>}
              </div>
              <p className="text-sm text-slate-500">{comment.length} / 2000</p>
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700 disabled:opacity-50"
            >
              {isPending ? 'Submitting...' : isEditing ? 'Update Review' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
