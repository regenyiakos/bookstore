const { Review, User, Book, Order, OrderItem, sequelize } = require('../models');
const { Op } = require('sequelize');

/**
 * Review Service
 * Handles all business logic related to reviews
 */
class ReviewService {
  /**
   * Get reviews for a specific book with pagination
   * @param {number} bookId - The book ID
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Paginated reviews with summary
   */
  async getReviewsForBook(bookId, params) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'recent',
      rating,
    } = params;

    const offset = (page - 1) * limit;
    const where = { book_id: bookId };

    // Filter by rating if provided
    if (rating) {
      where.rating = parseInt(rating);
    }

    // Determine sort order
    let order = [];
    switch (sortBy) {
      case 'oldest':
        order = [['created_at', 'ASC']];
        break;
      case 'highest':
        order = [['rating', 'DESC'], ['created_at', 'DESC']];
        break;
      case 'lowest':
        order = [['rating', 'ASC'], ['created_at', 'DESC']];
        break;
      case 'recent':
      default:
        order = [['created_at', 'DESC']];
        break;
    }

    // Get reviews with user info
    const { count, rows: reviews } = await Review.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
      limit: parseInt(limit),
      offset,
      order,
    });

    // Check if reviews are from verified purchases
    const reviewsWithVerification = await Promise.all(
      reviews.map(async review => {
        const reviewData = review.toJSON();

        // Check if user purchased this book
        const purchase = await OrderItem.findOne({
          include: [
            {
              model: Order,
              as: 'order',
              where: {
                user_id: review.user_id,
                status: 'completed',
              },
              attributes: [],
            },
          ],
          where: {
            book_id: review.book_id,
          },
        });

        reviewData.isVerifiedPurchase = !!purchase;
        return reviewData;
      })
    );

    // Get rating distribution
    const ratingDistribution = await this.getRatingDistribution(bookId);

    // Calculate average rating
    const averageRating = await Review.findOne({
      where: { book_id: bookId },
      attributes: [
        [sequelize.fn('COALESCE', sequelize.fn('AVG', sequelize.col('rating')), 0), 'average'],
      ],
    });

    const totalPages = Math.ceil(count / limit);

    return {
      reviews: reviewsWithVerification,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalReviews: count,
        limit: parseInt(limit),
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      summary: {
        averageRating: parseFloat(averageRating.toJSON().average) || 0,
        totalReviews: count,
        ratingDistribution,
      },
    };
  }

  /**
   * Get rating distribution for a book
   * @param {number} bookId - The book ID
   * @returns {Promise<Object>} Distribution of ratings (1-5 stars)
   */
  async getRatingDistribution(bookId) {
    const distribution = await Review.findAll({
      where: { book_id: bookId },
      attributes: [
        'rating',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      group: ['rating'],
      order: [['rating', 'DESC']],
    });

    // Initialize all ratings to 0
    const ratingMap = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    // Fill in actual counts
    distribution.forEach(item => {
      const data = item.toJSON();
      ratingMap[data.rating] = parseInt(data.count);
    });

    return ratingMap;
  }

  /**
   * Create a new review
   * @param {number} userId - The user ID (from JWT)
   * @param {number} bookId - The book ID
   * @param {Object} reviewData - The review data (rating, comment)
   * @returns {Promise<Object>} Created review
   */
  async createReview(userId, bookId, reviewData) {
    // Check if book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      throw new Error('BOOK_NOT_FOUND');
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    });

    if (existingReview) {
      throw new Error('REVIEW_ALREADY_EXISTS');
    }

    // Create the review
    const review = await Review.create({
      user_id: userId,
      book_id: bookId,
      rating: reviewData.rating,
      comment: reviewData.comment || null,
    });

    // Fetch the created review with user info
    const createdReview = await Review.findByPk(review.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return createdReview.toJSON();
  }

  /**
   * Update an existing review
   * @param {number} reviewId - The review ID
   * @param {number} userId - The user ID (from JWT)
   * @param {Object} reviewData - Updated review data
   * @returns {Promise<Object>} Updated review
   */
  async updateReview(reviewId, userId, reviewData) {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      throw new Error('REVIEW_NOT_FOUND');
    }

    // Check ownership
    if (review.user_id !== userId) {
      throw new Error('FORBIDDEN');
    }

    // Update the review
    await review.update({
      rating: reviewData.rating,
      comment: reviewData.comment || null,
    });

    // Fetch updated review with user info
    const updatedReview = await Review.findByPk(reviewId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return updatedReview.toJSON();
  }

  /**
   * Delete a review
   * @param {number} reviewId - The review ID
   * @param {number} userId - The user ID (from JWT)
   * @param {string} userRole - The user role
   * @returns {Promise<boolean>} Success status
   */
  async deleteReview(reviewId, userId, userRole) {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      throw new Error('REVIEW_NOT_FOUND');
    }

    // Check ownership or admin role
    if (review.user_id !== userId && userRole !== 'admin') {
      throw new Error('FORBIDDEN');
    }

    await review.destroy();
    return true;
  }

  /**
   * Get a user's review for a specific book
   * @param {number} userId - The user ID
   * @param {number} bookId - The book ID
   * @returns {Promise<Object|null>} User's review or null
   */
  async getUserReviewForBook(userId, bookId) {
    const review = await Review.findOne({
      where: {
        user_id: userId,
        book_id: bookId,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return review ? review.toJSON() : null;
  }
}

module.exports = new ReviewService();
