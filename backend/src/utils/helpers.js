/**
 * Helper utility functions
 */

/**
 * Create a standardized success response
 * @param {*} data - Response data
 * @param {Object} meta - Optional metadata (pagination, etc.)
 * @returns {Object} Standardized response object
 */
const successResponse = (data, meta = null) => {
  const response = {
    success: true,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return response;
};

/**
 * Create a standardized error response
 * @param {string} code - Error code
 * @param {string} message - Error message
 * @param {Array} details - Optional error details
 * @returns {Object} Standardized error response object
 */
const errorResponse = (code, message, details = null) => {
  const response = {
    success: false,
    error: {
      code,
      message,
    },
  };

  if (details) {
    response.error.details = details;
  }

  return response;
};

/**
 * Create pagination metadata
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} total - Total number of items
 * @returns {Object} Pagination metadata
 */
const createPaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);

  return {
    pagination: {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

/**
 * Calculate offset for database queries
 * @param {number} page - Page number (1-indexed)
 * @param {number} limit - Items per page
 * @returns {number} Offset value
 */
const calculateOffset = (page, limit) => {
  return (parseInt(page, 10) - 1) * parseInt(limit, 10);
};

/**
 * Sanitize user object (remove sensitive fields)
 * @param {Object} user - User object
 * @returns {Object} Sanitized user object
 */
const sanitizeUser = (user) => {
  const { password_hash, ...sanitized } = user.toJSON ? user.toJSON() : user;
  return sanitized;
};

/**
 * Generate a random alphanumeric string
 * @param {number} length - Length of the string
 * @returns {string} Random string
 */
const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

module.exports = {
  successResponse,
  errorResponse,
  createPaginationMeta,
  calculateOffset,
  sanitizeUser,
  generateRandomString,
};
