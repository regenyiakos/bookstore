const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const jwtConfig = require('../config/jwt');

/**
 * AuthService - Handles all authentication business logic
 * Includes password hashing, token generation, and user validation
 */
class AuthService {
  /**
   * Hash a plain text password using bcrypt
   * @param {string} password - Plain text password
   * @returns {Promise<string>} Hashed password
   */
  async hashPassword(password) {
    const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    return await bcrypt.hash(password, rounds);
  }

  /**
   * Compare plain text password with hashed password
   * @param {string} password - Plain text password
   * @param {string} passwordHash - Hashed password from database
   * @returns {Promise<boolean>} True if passwords match
   */
  async comparePassword(password, passwordHash) {
    return await bcrypt.compare(password, passwordHash);
  }

  /**
   * Generate JWT access token (short-lived)
   * @param {Object} user - User object from database
   * @returns {string} JWT access token
   */
  generateAccessToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, jwtConfig.accessToken.secret, {
      expiresIn: jwtConfig.accessToken.expiresIn,
    });
  }

  /**
   * Generate JWT refresh token (long-lived)
   * @param {Object} user - User object from database
   * @returns {string} JWT refresh token
   */
  generateRefreshToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, jwtConfig.refreshToken.secret, {
      expiresIn: jwtConfig.refreshToken.expiresIn,
    });
  }

  /**
   * Verify JWT refresh token
   * @param {string} token - JWT refresh token
   * @returns {Object} Decoded token payload
   * @throws {Error} If token is invalid or expired
   */
  verifyRefreshToken(token) {
    return jwt.verify(token, jwtConfig.refreshToken.secret);
  }

  /**
   * Validate user registration input
   * @param {Object} data - Registration data { name, email, password }
   * @returns {Object} Validation result { valid: boolean, errors: Array }
   */
  validateRegistrationInput(data) {
    const errors = [];

    // Name validation
    if (!data.name || typeof data.name !== 'string') {
      errors.push({ field: 'name', message: 'Name is required' });
    } else if (data.name.trim().length < 2) {
      errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
    } else if (data.name.trim().length > 100) {
      errors.push({ field: 'name', message: 'Name must not exceed 100 characters' });
    }

    // Email validation
    if (!data.email || typeof data.email !== 'string') {
      errors.push({ field: 'email', message: 'Email is required' });
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        errors.push({ field: 'email', message: 'Email must be a valid email address' });
      }
    }

    // Password validation
    if (!data.password || typeof data.password !== 'string') {
      errors.push({ field: 'password', message: 'Password is required' });
    } else if (data.password.length < 8) {
      errors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
    } else if (data.password.length > 128) {
      errors.push({ field: 'password', message: 'Password must not exceed 128 characters' });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate user login input
   * @param {Object} data - Login data { email, password }
   * @returns {Object} Validation result { valid: boolean, errors: Array }
   */
  validateLoginInput(data) {
    const errors = [];

    // Email validation
    if (!data.email || typeof data.email !== 'string') {
      errors.push({ field: 'email', message: 'Email is required' });
    }

    // Password validation
    if (!data.password || typeof data.password !== 'string') {
      errors.push({ field: 'password', message: 'Password is required' });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Sanitize user input (trim whitespace)
   * @param {Object} data - Input data object
   * @returns {Object} Sanitized data object
   */
  sanitizeInput(data) {
    const sanitized = {};

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        sanitized[key] = value.trim();
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Register a new user
   * @param {Object} data - Registration data { name, email, password }
   * @returns {Promise<Object>} Created user object (without password_hash)
   * @throws {Error} If validation fails or user already exists
   */
  async registerUser(data) {
    // Sanitize input
    const sanitizedData = this.sanitizeInput(data);

    // Validate input
    const validation = this.validateRegistrationInput(sanitizedData);
    if (!validation.valid) {
      const error = new Error('Validation failed');
      error.code = 'VALIDATION_ERROR';
      error.errors = validation.errors;
      throw error;
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: sanitizedData.email.toLowerCase() },
    });

    if (existingUser) {
      const error = new Error('Email is already registered');
      error.code = 'EMAIL_EXISTS';
      throw error;
    }

    // Hash password
    const passwordHash = await this.hashPassword(sanitizedData.password);

    // Create user
    const user = await User.create({
      name: sanitizedData.name,
      email: sanitizedData.email.toLowerCase(),
      password_hash: passwordHash,
      role: 'user',
    });

    // Return user without password_hash
    return this.sanitizeUserData(user);
  }

  /**
   * Authenticate user with email and password
   * @param {Object} data - Login data { email, password }
   * @returns {Promise<Object>} User object (without password_hash)
   * @throws {Error} If credentials are invalid
   */
  async authenticateUser(data) {
    // Sanitize input
    const sanitizedData = this.sanitizeInput(data);

    // Validate input
    const validation = this.validateLoginInput(sanitizedData);
    if (!validation.valid) {
      const error = new Error('Validation failed');
      error.code = 'VALIDATION_ERROR';
      error.errors = validation.errors;
      throw error;
    }

    // Find user by email
    const user = await User.findOne({
      where: { email: sanitizedData.email.toLowerCase() },
    });

    if (!user) {
      const error = new Error('Invalid email or password');
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }

    // Compare password
    const isPasswordValid = await this.comparePassword(
      sanitizedData.password,
      user.password_hash
    );

    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      error.code = 'INVALID_CREDENTIALS';
      throw error;
    }

    // Return user without password_hash
    return this.sanitizeUserData(user);
  }

  /**
   * Get user by ID
   * @param {number} userId - User ID
   * @returns {Promise<Object>} User object (without password_hash)
   * @throws {Error} If user not found
   */
  async getUserById(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      const error = new Error('User not found');
      error.code = 'USER_NOT_FOUND';
      throw error;
    }

    return this.sanitizeUserData(user);
  }

  /**
   * Remove sensitive data from user object
   * @param {Object} user - User object from database
   * @returns {Object} User object without password_hash
   */
  sanitizeUserData(user) {
    const userData = user.toJSON ? user.toJSON() : user;
    delete userData.password_hash;
    delete userData.updated_at;
    return userData;
  }

  /**
   * Get cookie options based on environment
   * @returns {Object} Cookie options for res.cookie()
   */
  getCookieOptions() {
    return {
      httpOnly: jwtConfig.cookie.httpOnly,
      secure: process.env.NODE_ENV === 'production',
      sameSite: jwtConfig.cookie.sameSite,
      domain: process.env.NODE_ENV === 'production' ? jwtConfig.cookie.domain : undefined,
    };
  }

  /**
   * Calculate cookie expiration time
   * @param {string} expiresIn - JWT expiration string (e.g., '15m', '7d')
   * @returns {Date} Expiration date
   */
  calculateCookieExpiry(expiresIn) {
    const matches = expiresIn.match(/^(\d+)([smhd])$/);
    if (!matches) {
      throw new Error('Invalid expiration format');
    }

    const value = parseInt(matches[1]);
    const unit = matches[2];

    const now = new Date();

    switch (unit) {
      case 's':
        return new Date(now.getTime() + value * 1000);
      case 'm':
        return new Date(now.getTime() + value * 60 * 1000);
      case 'h':
        return new Date(now.getTime() + value * 60 * 60 * 1000);
      case 'd':
        return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
      default:
        throw new Error('Invalid expiration unit');
    }
  }
}

module.exports = new AuthService();
