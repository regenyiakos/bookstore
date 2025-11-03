const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const bookRoutes = require('./books');
const reviewRoutes = require('./reviews');
const orderRoutes = require('./orders');
const userRoutes = require('./users');

/**
 * API Health Check
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

/**
 * Mount route modules
 */
router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

module.exports = router;
