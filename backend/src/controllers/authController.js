const authService = require('../services/authService');
const jwtConfig = require('../config/jwt');

/**
 * AuthController - Handles HTTP requests/responses for authentication endpoints
 * All business logic is delegated to authService
 */
class AuthController {
  /**
   * Register a new user
   * @route POST /api/v1/auth/register
   * @access Public
   */
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Register user via service
      const user = await authService.registerUser({ name, email, password });

      // Generate tokens
      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);

      // Calculate cookie expiration times
      const accessTokenExpiry = authService.calculateCookieExpiry(
        jwtConfig.accessToken.expiresIn
      );
      const refreshTokenExpiry = authService.calculateCookieExpiry(
        jwtConfig.refreshToken.expiresIn
      );

      // Get cookie options
      const cookieOptions = authService.getCookieOptions();

      // Set HTTP-only cookies
      res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        expires: accessTokenExpiry,
      });

      res.cookie('refreshToken', refreshToken, {
        ...cookieOptions,
        expires: refreshTokenExpiry,
      });

      // Return success response
      return res.status(201).json({
        success: true,
        data: {
          user,
        },
        message: 'User registered successfully',
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Login user
   * @route POST /api/v1/auth/login
   * @access Public
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Authenticate user via service
      const user = await authService.authenticateUser({ email, password });

      // Generate tokens
      const accessToken = authService.generateAccessToken(user);
      const refreshToken = authService.generateRefreshToken(user);

      // Calculate cookie expiration times
      const accessTokenExpiry = authService.calculateCookieExpiry(
        jwtConfig.accessToken.expiresIn
      );
      const refreshTokenExpiry = authService.calculateCookieExpiry(
        jwtConfig.refreshToken.expiresIn
      );

      // Get cookie options
      const cookieOptions = authService.getCookieOptions();

      // Set HTTP-only cookies
      res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        expires: accessTokenExpiry,
      });

      res.cookie('refreshToken', refreshToken, {
        ...cookieOptions,
        expires: refreshTokenExpiry,
      });

      // Return success response
      return res.status(200).json({
        success: true,
        data: {
          user,
        },
        message: 'Login successful',
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Logout user
   * @route POST /api/v1/auth/logout
   * @access Private
   */
  async logout(req, res) {
    try {
      // Get cookie options
      const cookieOptions = authService.getCookieOptions();

      // Clear cookies by setting them to expire immediately
      res.cookie('accessToken', '', {
        ...cookieOptions,
        expires: new Date(0),
      });

      res.cookie('refreshToken', '', {
        ...cookieOptions,
        expires: new Date(0),
      });

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Refresh access token
   * @route POST /api/v1/auth/refresh
   * @access Public (requires refresh token cookie)
   */
  async refresh(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;

      // Check if refresh token exists
      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'REFRESH_TOKEN_MISSING',
            message: 'Refresh token is required',
          },
        });
      }

      // Verify refresh token
      let decoded;
      try {
        decoded = authService.verifyRefreshToken(refreshToken);
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({
            success: false,
            error: {
              code: 'REFRESH_TOKEN_EXPIRED',
              message: 'Refresh token has expired. Please login again.',
            },
          });
        }

        return res.status(403).json({
          success: false,
          error: {
            code: 'INVALID_REFRESH_TOKEN',
            message: 'Invalid refresh token',
          },
        });
      }

      // Get user from database (to ensure user still exists and get latest data)
      const user = await authService.getUserById(decoded.id);

      // Generate new access token
      const newAccessToken = authService.generateAccessToken(user);

      // Calculate cookie expiration time
      const accessTokenExpiry = authService.calculateCookieExpiry(
        jwtConfig.accessToken.expiresIn
      );

      // Get cookie options
      const cookieOptions = authService.getCookieOptions();

      // Set new access token cookie
      res.cookie('accessToken', newAccessToken, {
        ...cookieOptions,
        expires: accessTokenExpiry,
      });

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Access token refreshed successfully',
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Get current authenticated user
   * @route GET /api/v1/auth/me
   * @access Private
   */
  async getCurrentUser(req, res) {
    try {
      // req.user is set by authenticateToken middleware
      const userId = req.user.id;

      // Get fresh user data from database
      const user = await authService.getUserById(userId);

      // Return success response
      return res.status(200).json({
        success: true,
        data: {
          user,
        },
      });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  /**
   * Centralized error handler
   * Maps service errors to appropriate HTTP responses
   * @param {Object} res - Express response object
   * @param {Error} error - Error object from service layer
   */
  handleError(res, error) {
    // Log error for debugging (in production, use proper logging service)
    console.error('Auth Controller Error:', error);

    // Handle validation errors
    if (error.code === 'VALIDATION_ERROR') {
      return res.status(400).json({
        success: false,
        error: {
          code: error.code,
          message: error.message,
          details: error.errors,
        },
      });
    }

    // Handle invalid credentials
    if (error.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    // Handle email already exists
    if (error.code === 'EMAIL_EXISTS') {
      return res.status(409).json({
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    // Handle user not found
    if (error.code === 'USER_NOT_FOUND') {
      return res.status(404).json({
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      });
    }

    // Handle Sequelize unique constraint violation
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        error: {
          code: 'EMAIL_EXISTS',
          message: 'Email is already registered',
        },
      });
    }

    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: validationErrors,
        },
      });
    }

    // Handle database errors
    if (error.name === 'SequelizeDatabaseError' || error.name === 'SequelizeConnectionError') {
      return res.status(500).json({
        success: false,
        error: {
          code: 'DATABASE_ERROR',
          message: 'A database error occurred. Please try again later.',
        },
      });
    }

    // Handle unknown errors
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred. Please try again later.',
      },
    });
  }
}

module.exports = new AuthController();
