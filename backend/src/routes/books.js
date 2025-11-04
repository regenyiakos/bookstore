const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { requireAdmin } = require('../middleware/roleCheck');
const bookController = require('../controllers/bookController');

/**
 * @route   GET /api/v1/books
 * @desc    Get all books with pagination and filters
 * @access  Public
 */
router.get('/', bookController.getAllBooks.bind(bookController));

/**
 * @route   GET /api/v1/books/categories
 * @desc    Get all book categories with counts
 * @access  Public
 */
router.get('/categories', bookController.getCategories.bind(bookController));

/**
 * @route   GET /api/v1/books/:id/related
 * @desc    Get related books (same category)
 * @access  Public
 */
router.get('/:id/related', bookController.getRelatedBooks.bind(bookController));

/**
 * @route   GET /api/v1/books/:id
 * @desc    Get single book by ID with review statistics
 * @access  Public
 */
router.get('/:id', bookController.getBookById.bind(bookController));

/**
 * @route   POST /api/v1/books
 * @desc    Create a new book
 * @access  Private (Admin only)
 */
router.post('/', authenticateToken, requireAdmin, bookController.createBook.bind(bookController));

/**
 * @route   PUT /api/v1/books/:id
 * @desc    Update a book
 * @access  Private (Admin only)
 */
router.put('/:id', authenticateToken, requireAdmin, bookController.updateBook.bind(bookController));

/**
 * @route   DELETE /api/v1/books/:id
 * @desc    Delete a book
 * @access  Private (Admin only)
 */
router.delete('/:id', authenticateToken, requireAdmin, bookController.deleteBook.bind(bookController));

module.exports = router;
