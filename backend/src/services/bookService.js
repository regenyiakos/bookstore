const { Book, Review, User, Order, OrderItem, sequelize } = require('../models');
const { Op } = require('sequelize');

/**
 * Book Service
 * Handles all business logic related to books
 */
class BookService {
  /**
   * Get a single book by ID with review statistics
   * @param {number} bookId - The ID of the book
   * @returns {Promise<Object>} Book with averageRating and reviewCount
   */
  async getBookById(bookId) {
    const book = await Book.findByPk(bookId, {
      attributes: {
        include: [
          [
            sequelize.fn('COALESCE', sequelize.fn('AVG', sequelize.col('reviews.rating')), 0),
            'averageRating',
          ],
          [sequelize.fn('COUNT', sequelize.col('reviews.id')), 'reviewCount'],
        ],
      },
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: [],
        },
      ],
      group: ['Book.id'],
    });

    if (!book) {
      return null;
    }

    // Parse aggregated values
    const bookData = book.toJSON();
    bookData.averageRating = parseFloat(bookData.averageRating) || 0;
    bookData.reviewCount = parseInt(bookData.reviewCount) || 0;

    return bookData;
  }

  /**
   * Get related books (same category, excluding current book)
   * @param {number} bookId - The current book ID to exclude
   * @param {string} category - The category to filter by
   * @param {number} limit - Maximum number of books to return
   * @returns {Promise<Array>} Array of related books with review stats
   */
  async getRelatedBooks(bookId, category, limit = 6) {
    // Simplified query without aggregations that cause SQL issues
    const relatedBooks = await Book.findAll({
      where: {
        category,
        id: { [Op.ne]: bookId },
        stock: { [Op.gt]: 0 }, // Only show books in stock
      },
      attributes: [
        'id',
        'title',
        'author',
        'price',
        'category',
        'description',
        'image_url',
        'stock',
        'created_at',
      ],
      limit,
      order: [['created_at', 'DESC']], // Order by newest
    });

    // Calculate average rating for each book separately
    const booksWithRatings = await Promise.all(
      relatedBooks.map(async (book) => {
        const ratings = await Review.findAll({
          where: { book_id: book.id },
          attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avg'], [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
          raw: true,
        });

        const bookData = book.toJSON();
        bookData.averageRating = parseFloat(ratings[0]?.avg) || 0;
        bookData.reviewCount = parseInt(ratings[0]?.count) || 0;
        return bookData;
      })
    );

    return booksWithRatings;
  }

  /**
   * Get all books with filtering and pagination
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Paginated books with metadata
   */
  async getAllBooks(params) {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      sortBy = 'recent',
      minPrice,
      maxPrice,
    } = params;

    const offset = (page - 1) * limit;
    const where = {};

    // Apply filters
    if (category) {
      where.category = category;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { author: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = minPrice;
      if (maxPrice) where.price[Op.lte] = maxPrice;
    }

    // Determine sort order
    let order = [];
    switch (sortBy) {
      case 'price_asc':
        order = [['price', 'ASC']];
        break;
      case 'price_desc':
        order = [['price', 'DESC']];
        break;
      case 'title':
        order = [['title', 'ASC']];
        break;
      case 'popular':
        order = [[sequelize.literal('reviewCount'), 'DESC']];
        break;
      case 'recent':
      default:
        order = [['created_at', 'DESC']];
        break;
    }

    const { count, rows: books } = await Book.findAndCountAll({
      where,
      attributes: {
        include: [
          [
            sequelize.fn('COALESCE', sequelize.fn('AVG', sequelize.col('reviews.rating')), 0),
            'averageRating',
          ],
          [sequelize.fn('COUNT', sequelize.col('reviews.id')), 'reviewCount'],
        ],
      },
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: [],
        },
      ],
      group: ['Book.id'],
      limit: parseInt(limit),
      offset,
      order,
      subQuery: false,
    });

    const totalBooks = count.length || 0;
    const totalPages = Math.ceil(totalBooks / limit);

    return {
      books: books.map(book => {
        const bookData = book.toJSON();
        bookData.averageRating = parseFloat(bookData.averageRating) || 0;
        bookData.reviewCount = parseInt(bookData.reviewCount) || 0;
        return bookData;
      }),
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalBooks,
        limit: parseInt(limit),
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  /**
   * Create a new book (Admin only)
   * @param {Object} bookData - The book data
   * @returns {Promise<Object>} Created book
   */
  async createBook(bookData) {
    const book = await Book.create(bookData);
    return book.toJSON();
  }

  /**
   * Update a book (Admin only)
   * @param {number} bookId - The book ID
   * @param {Object} bookData - Updated book data
   * @returns {Promise<Object>} Updated book
   */
  async updateBook(bookId, bookData) {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return null;
    }

    await book.update(bookData);
    return book.toJSON();
  }

  /**
   * Delete a book (Admin only)
   * @param {number} bookId - The book ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteBook(bookId) {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return false;
    }

    await book.destroy();
    return true;
  }
}

module.exports = new BookService();
