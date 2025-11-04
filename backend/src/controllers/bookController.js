const bookService = require('../services/bookService');

/**
 * Book Controller
 * Handles HTTP requests for book-related operations
 */
class BookController {
  /**
   * @route   GET /api/v1/books
   * @desc    Get all books with filtering and pagination
   * @access  Public
   */
  async getAllBooks(req, res) {
    try {
      const result = await bookService.getAllBooks(req.query);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error('Error in getAllBooks:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while retrieving books',
        },
      });
    }
  }

  /**
   * @route   GET /api/v1/books/:id
   * @desc    Get a single book by ID with review statistics
   * @access  Public
   */
  async getBookById(req, res) {
    try {
      const bookId = parseInt(req.params.id);

      // Validate book ID
      if (isNaN(bookId) || bookId <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_BOOK_ID',
            message: 'Book ID must be a positive integer',
          },
        });
      }

      const book = await bookService.getBookById(bookId);

      if (!book) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'BOOK_NOT_FOUND',
            message: `Book with ID ${bookId} not found`,
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: book,
      });
    } catch (error) {
      console.error('Error in getBookById:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while retrieving the book',
        },
      });
    }
  }

  /**
   * @route   GET /api/v1/books/:id/related
   * @desc    Get related books (same category)
   * @access  Public
   */
  async getRelatedBooks(req, res) {
    try {
      const bookId = parseInt(req.params.id);
      const limit = parseInt(req.query.limit) || 6;

      // Validate book ID
      if (isNaN(bookId) || bookId <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_BOOK_ID',
            message: 'Book ID must be a positive integer',
          },
        });
      }

      // First, get the current book to find its category
      const currentBook = await bookService.getBookById(bookId);

      if (!currentBook) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'BOOK_NOT_FOUND',
            message: `Book with ID ${bookId} not found`,
          },
        });
      }

      // Get related books in the same category
      const relatedBooks = await bookService.getRelatedBooks(
        bookId,
        currentBook.category,
        limit
      );

      return res.status(200).json({
        success: true,
        data: {
          books: relatedBooks,
          count: relatedBooks.length,
        },
      });
    } catch (error) {
      console.error('Error in getRelatedBooks:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while retrieving related books',
        },
      });
    }
  }

  /**
   * @route   POST /api/v1/books
   * @desc    Create a new book
   * @access  Private (Admin only)
   */
  async createBook(req, res) {
    try {
      const { title, author, price, category, description, image_url, stock } = req.body;

      // Validate required fields
      if (!title || !author || price === undefined || !category) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing required fields',
            details: {
              title: !title ? 'Title is required' : undefined,
              author: !author ? 'Author is required' : undefined,
              price: price === undefined ? 'Price is required' : undefined,
              category: !category ? 'Category is required' : undefined,
            },
          },
        });
      }

      const bookData = {
        title,
        author,
        price,
        category,
        description: description || null,
        image_url: image_url || null,
        stock: stock !== undefined ? stock : 0,
      };

      const book = await bookService.createBook(bookData);

      return res.status(201).json({
        success: true,
        data: book,
        message: 'Book created successfully',
      });
    } catch (error) {
      console.error('Error in createBook:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid book data',
            details: error.errors.reduce((acc, err) => {
              acc[err.path] = err.message;
              return acc;
            }, {}),
          },
        });
      }

      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while creating the book',
        },
      });
    }
  }

  /**
   * @route   PUT /api/v1/books/:id
   * @desc    Update a book
   * @access  Private (Admin only)
   */
  async updateBook(req, res) {
    try {
      const bookId = parseInt(req.params.id);
      const { title, author, price, category, description, image_url, stock } = req.body;

      // Validate book ID
      if (isNaN(bookId) || bookId <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_BOOK_ID',
            message: 'Book ID must be a positive integer',
          },
        });
      }

      const bookData = {};
      if (title !== undefined) bookData.title = title;
      if (author !== undefined) bookData.author = author;
      if (price !== undefined) bookData.price = price;
      if (category !== undefined) bookData.category = category;
      if (description !== undefined) bookData.description = description;
      if (image_url !== undefined) bookData.image_url = image_url;
      if (stock !== undefined) bookData.stock = stock;

      const updatedBook = await bookService.updateBook(bookId, bookData);

      if (!updatedBook) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'BOOK_NOT_FOUND',
            message: `Book with ID ${bookId} not found`,
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedBook,
        message: 'Book updated successfully',
      });
    } catch (error) {
      console.error('Error in updateBook:', error);

      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid book data',
            details: error.errors.reduce((acc, err) => {
              acc[err.path] = err.message;
              return acc;
            }, {}),
          },
        });
      }

      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while updating the book',
        },
      });
    }
  }

  /**
   * @route   GET /api/v1/books/categories
   * @desc    Get all book categories with counts
   * @access  Public
   */
  async getCategories(req, res) {
    try {
      const categories = await bookService.getCategories();

      return res.status(200).json({
        success: true,
        data: {
          categories,
          count: categories.length,
        },
      });
    } catch (error) {
      console.error('Error in getCategories:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while retrieving categories',
        },
      });
    }
  }

  /**
   * @route   DELETE /api/v1/books/:id
   * @desc    Delete a book
   * @access  Private (Admin only)
   */
  async deleteBook(req, res) {
    try {
      const bookId = parseInt(req.params.id);

      // Validate book ID
      if (isNaN(bookId) || bookId <= 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_BOOK_ID',
            message: 'Book ID must be a positive integer',
          },
        });
      }

      const deleted = await bookService.deleteBook(bookId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'BOOK_NOT_FOUND',
            message: `Book with ID ${bookId} not found`,
          },
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
      });
    } catch (error) {
      console.error('Error in deleteBook:', error);
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'An error occurred while deleting the book',
        },
      });
    }
  }
}

module.exports = new BookController();
