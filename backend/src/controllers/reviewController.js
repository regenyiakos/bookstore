const reviewService = require('../services/reviewService');

/**
 * Review Controller
 * Handles HTTP requests for review-related operations
 */
class ReviewController {
  /**
   * @route   GET /api/v1/reviews
   * @desc    Get reviews for a specific book
   * @access  Public
   */
  async getReviews(req, res) {
    try {
      const { bookId, page, limit, sortBy, rating } = req.query;

      // Validate bookId
      if (!bookId) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_BOOK_ID',
            message: 'Book ID is required',
          },
        });
      }

      const bookIdInt = parseInt(bookId);
      if (isNaN(bookIdInt) || bookIdInt <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_BOOK_ID',
            message: 'Book ID must be a positive integer',
          },
        });
      }

      // Validate optional parameters
      const validationErrors = {};

      if (rating && (isNaN(parseInt(rating)) || parseInt(rating) < 1 || parseInt(rating) > 5)) {
        validationErrors.rating = 'Must be an integer between 1 and 5';
      }

      if (sortBy && !['recent', 'oldest', 'highest', 'lowest'].includes(sortBy)) {
        validationErrors.sortBy = 'Must be one of: recent, oldest, highest, lowest';
      }

      if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_PARAMETERS',
            message: 'Invalid query parameters',
            details: validationErrors,
          },
        });
      }

      const result = await reviewService.getReviewsForBook(bookIdInt, req.query);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error in getReviews:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while retrieving reviews',
        },
      });
    }
  }

  /**
   * @route   GET /api/v1/reviews/stats/:bookId
   * @desc    Get rating statistics for a book
   * @access  Public
   */
  async getReviewStats(req, res) {
    try {
      const bookId = parseInt(req.params.bookId);

      if (isNaN(bookId) || bookId <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_BOOK_ID',
            message: 'Book ID must be a positive integer',
          },
        });
      }

      const ratingDistribution = await reviewService.getRatingDistribution(bookId);

      return res.status(200).json({
        success: true,
        data: {
          ratingDistribution,
        },
      });
    } catch (error) {
      console.error('Error in getReviewStats:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while retrieving review statistics',
        },
      });
    }
  }

  /**
   * @route   POST /api/v1/reviews
   * @desc    Create a new review
   * @access  Private (Authenticated users)
   */
  async createReview(req, res) {
    try {
      const { bookId, rating, comment } = req.body;
      const userId = req.user.id;

      // Validate required fields
      const validationErrors = {};

      if (!bookId) {
        validationErrors.bookId = 'Book ID is required';
      } else if (isNaN(parseInt(bookId)) || parseInt(bookId) <= 0) {
        validationErrors.bookId = 'Book ID must be a positive integer';
      }

      if (rating === undefined || rating === null) {
        validationErrors.rating = 'Rating is required and must be between 1 and 5';
      } else if (isNaN(parseInt(rating)) || parseInt(rating) < 1 || parseInt(rating) > 5) {
        validationErrors.rating = 'Rating must be between 1 and 5';
      }

      if (comment && typeof comment === 'string') {
        const trimmedComment = comment.trim();
        if (trimmedComment.length > 0 && trimmedComment.length < 10) {
          validationErrors.comment = 'Comment must be at least 10 characters if provided';
        } else if (trimmedComment.length > 2000) {
          validationErrors.comment = 'Comment cannot exceed 2000 characters';
        }
      }

      if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid review data',
            details: validationErrors,
          },
        });
      }

      const reviewData = {
        rating: parseInt(rating),
        comment: comment ? comment.trim() : null,
      };

      const review = await reviewService.createReview(userId, parseInt(bookId), reviewData);

      return res.status(201).json({
        success: true,
        data: review,
        message: 'Review submitted successfully',
      });
    } catch (error) {
      console.error('Error in createReview:', error);

      if (error.message === 'BOOK_NOT_FOUND') {
        return res.status(404).json({
          success: false,
          error: {
            code: 'BOOK_NOT_FOUND',
            message: `Book with ID ${req.body.bookId} not found`,
          },
        });
      }

      if (error.message === 'REVIEW_ALREADY_EXISTS') {
        return res.status(409).json({
          success: false,
          error: {
            code: 'REVIEW_ALREADY_EXISTS',
            message: 'You have already reviewed this book. Please edit your existing review instead.',
          },
        });
      }

      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while creating the review',
        },
      });
    }
  }

  /**
   * @route   PUT /api/v1/reviews/:id
   * @desc    Update an existing review
   * @access  Private (Review owner only)
   */
  async updateReview(req, res) {
    try {
      const reviewId = parseInt(req.params.id);
      const userId = req.user.id;
      const { rating, comment } = req.body;

      // Validate review ID
      if (isNaN(reviewId) || reviewId <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_REVIEW_ID',
            message: 'Review ID must be a positive integer',
          },
        });
      }

      // Validate review data
      const validationErrors = {};

      if (rating === undefined || rating === null) {
        validationErrors.rating = 'Rating is required and must be between 1 and 5';
      } else if (isNaN(parseInt(rating)) || parseInt(rating) < 1 || parseInt(rating) > 5) {
        validationErrors.rating = 'Rating must be between 1 and 5';
      }

      if (comment && typeof comment === 'string') {
        const trimmedComment = comment.trim();
        if (trimmedComment.length > 0 && trimmedComment.length < 10) {
          validationErrors.comment = 'Comment must be at least 10 characters if provided';
        } else if (trimmedComment.length > 2000) {
          validationErrors.comment = 'Comment cannot exceed 2000 characters';
        }
      }

      if (Object.keys(validationErrors).length > 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid review data',
            details: validationErrors,
          },
        });
      }

      const reviewData = {
        rating: parseInt(rating),
        comment: comment ? comment.trim() : null,
      };

      const updatedReview = await reviewService.updateReview(reviewId, userId, reviewData);

      return res.status(200).json({
        success: true,
        data: updatedReview,
        message: 'Review updated successfully',
      });
    } catch (error) {
      console.error('Error in updateReview:', error);

      if (error.message === 'REVIEW_NOT_FOUND') {
        return res.status(404).json({
          success: false,
          error: {
            code: 'REVIEW_NOT_FOUND',
            message: `Review with ID ${req.params.id} not found`,
          },
        });
      }

      if (error.message === 'FORBIDDEN') {
        return res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'You can only edit your own reviews',
          },
        });
      }

      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while updating the review',
        },
      });
    }
  }

  /**
   * @route   DELETE /api/v1/reviews/:id
   * @desc    Delete a review
   * @access  Private (Review owner or Admin)
   */
  async deleteReview(req, res) {
    try {
      const reviewId = parseInt(req.params.id);
      const userId = req.user.id;
      const userRole = req.user.role;

      // Validate review ID
      if (isNaN(reviewId) || reviewId <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_REVIEW_ID',
            message: 'Review ID must be a positive integer',
          },
        });
      }

      await reviewService.deleteReview(reviewId, userId, userRole);

      return res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
      });
    } catch (error) {
      console.error('Error in deleteReview:', error);

      if (error.message === 'REVIEW_NOT_FOUND') {
        return res.status(404).json({
          success: false,
          error: {
            code: 'REVIEW_NOT_FOUND',
            message: `Review with ID ${req.params.id} not found`,
          },
        });
      }

      if (error.message === 'FORBIDDEN') {
        return res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'You can only delete your own reviews',
          },
        });
      }

      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while deleting the review',
        },
      });
    }
  }

  /**
   * @route   GET /api/v1/reviews/user/:bookId
   * @desc    Get current user's review for a specific book
   * @access  Private (Authenticated users)
   */
  async getUserReview(req, res) {
    try {
      const bookId = parseInt(req.params.bookId);
      const userId = req.user.id;

      if (isNaN(bookId) || bookId <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_BOOK_ID',
            message: 'Book ID must be a positive integer',
          },
        });
      }

      const review = await reviewService.getUserReviewForBook(userId, bookId);

      return res.status(200).json({
        success: true,
        data: review,
      });
    } catch (error) {
      console.error('Error in getUserReview:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while retrieving the review',
        },
      });
    }
  }
}

module.exports = new ReviewController();
