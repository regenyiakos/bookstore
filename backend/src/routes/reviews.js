const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const reviewController = require('../controllers/reviewController');

/**
 * @route   GET /api/v1/reviews
 * @desc    Get reviews for a specific book (with pagination)
 * @access  Public
 * @query   bookId (required), page, limit, sortBy, rating
 */
router.get('/', reviewController.getReviews.bind(reviewController));

/**
 * @route   GET /api/v1/reviews/stats/:bookId
 * @desc    Get rating statistics for a book
 * @access  Public
 */
router.get('/stats/:bookId', reviewController.getReviewStats.bind(reviewController));

/**
 * @route   GET /api/v1/reviews/user/:bookId
 * @desc    Get current user's review for a specific book
 * @access  Private (Authenticated users)
 */
router.get('/user/:bookId', authenticateToken, reviewController.getUserReview.bind(reviewController));

/**
 * @route   POST /api/v1/reviews
 * @desc    Create a new review
 * @access  Private (Authenticated users)
 */
router.post('/', authenticateToken, reviewController.createReview.bind(reviewController));

/**
 * @route   PUT /api/v1/reviews/:id
 * @desc    Update an existing review
 * @access  Private (Review owner only)
 */
router.put('/:id', authenticateToken, reviewController.updateReview.bind(reviewController));

/**
 * @route   DELETE /api/v1/reviews/:id
 * @desc    Delete a review
 * @access  Private (Review owner or Admin)
 */
router.delete('/:id', authenticateToken, reviewController.deleteReview.bind(reviewController));

module.exports = router;
