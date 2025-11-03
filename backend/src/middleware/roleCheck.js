/**
 * Middleware to check if user has required role(s)
 * Must be used after authenticateToken middleware
 * @param  {...string} allowedRoles - Roles that are allowed to access the route
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NOT_AUTHENTICATED',
          message: 'Authentication required',
        },
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'You do not have permission to access this resource',
        },
      });
    }

    next();
  };
};

/**
 * Middleware to check if user is admin
 */
const requireAdmin = requireRole('admin');

/**
 * Middleware to check if user is accessing their own resource or is admin
 * @param {Function} getUserId - Function to extract user ID from request (e.g., req => req.params.id)
 */
const requireOwnershipOrAdmin = (getUserId) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'NOT_AUTHENTICATED',
          message: 'Authentication required',
        },
      });
    }

    const resourceUserId = getUserId(req);
    const isOwner = req.user.userId === parseInt(resourceUserId, 10);
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'You can only access your own resources',
        },
      });
    }

    next();
  };
};

module.exports = {
  requireRole,
  requireAdmin,
  requireOwnershipOrAdmin,
};
