const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

/**
 * Middleware to authenticate JWT access token from cookies
 * Attaches decoded user data to req.user
 */
const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NOT_AUTHENTICATED',
          message: 'Authentication required',
        },
      });
    }

    const decoded = jwt.verify(token, jwtConfig.accessToken.secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Access token has expired',
        },
      });
    }

    return res.status(403).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid access token',
      },
    });
  }
};

/**
 * Optional authentication - attaches user if token exists but doesn't fail if not
 */
const optionalAuth = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (token) {
      const decoded = jwt.verify(token, jwtConfig.accessToken.secret);
      req.user = decoded;
    }
  } catch (error) {
    // Silent fail - user remains undefined
  }

  next();
};

module.exports = {
  authenticateToken,
  optionalAuth,
};
